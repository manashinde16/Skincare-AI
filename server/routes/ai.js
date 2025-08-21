import express from "express";
import upload from "../middleware/upload.js";
import fs from "fs/promises";
import genai from "../services/genaiClient.js";
import { ai } from "../services/genaiClient.js";
import { buildSkincarePrompt } from "../utils/promptBuilder.js";
import { z } from "zod";

const router = express.Router();

const FormSchema = z
  .object({
    prompt: z.string().min(1), // frontend sends "prompt" plus all other fields
    // everything else is optional and will be merged into the prompt
  })
  .passthrough();

// Accept exactly 3 images named "images"
router.post("/generate", upload.array("images", 3), async (req, res) => {
  const pool = getPool();
  let files = [];
  try {
    // 1) Validate & collect form fields
    const bodyAny = { ...req.body };
    const parsed = FormSchema.safeParse(bodyAny);
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: "Invalid form data",
        issues: parsed.error.issues,
      });
    }
    const form = parsed.data;

    files = req.files || [];
    if (files.length !== 3) {
      return res.status(400).json({
        ok: false,
        error: "Please upload exactly 3 images in the `images` field.",
      });
    }

    // 2) Upload images to GenAI
    const uploaded = [];
    for (const f of files) {
      const u = await genai.uploadFileToGenAI(f.path);
      uploaded.push(u);
    }

    // 3) Build prompt with all questionnaire data (server-side)
    const finalPrompt = buildSkincarePrompt(form);

    // 4) Create Gemini content parts (prompt + image parts)
    const parts = uploaded.map(({ uri, mimeType }) =>
      genai.createPartFromUri(uri, mimeType)
    );
    const contents = [genai.createUserContent([finalPrompt, ...parts])];

    const model = "gemini-2.5-flash";
    const response = await ai.models.generateContent({ model, contents });

    // 5) Try to extract STRICT JSON
    const raw = response.text ?? JSON.stringify(response);
    const json = coerceJson(raw);

    // 6) Persist in DB (no images stored)
    const [result] = await pool.execute(
      `INSERT INTO analyses (user_id, client_id, prompt, form_json, ai_model, ai_raw_response, ai_result_json, status)
       VALUES (NULL, :client_id, :prompt, :form_json, :model, :raw, :result, 'success')`,
      {
        client_id: form.clientId || null,
        prompt: finalPrompt,
        form_json: JSON.stringify(form),
        model,
        raw,
        result: JSON.stringify(json),
      }
    );

    // 7) Cleanup temp files
    await safeCleanup(files);

    return res.json({ ok: true, id: result.insertId, result: json });
  } catch (err) {
    console.error("generate error:", err);
    await safeCleanup(files);
    // best-effort DB log
    try {
      const pool = getPool();
      await pool.execute(
        `INSERT INTO analyses (user_id, client_id, prompt, form_json, ai_model, ai_raw_response, ai_result_json, status, error_message)
         VALUES (NULL, NULL, :prompt, :form_json, :model, :raw, NULL, 'error', :msg)`,
        {
          prompt: req?.body?.prompt ?? "",
          form_json: JSON.stringify(req?.body ?? {}),
          model: "gemini-2.5-flash",
          raw: "",
          msg: err?.message || String(err),
        }
      );
    } catch {}

    return res
      .status(500)
      .json({ ok: false, error: err?.message || "Internal error" });
  }
});

function coerceJson(raw) {
  // If Gemini returns fenced code blocks, strip them
  const cleaned = String(raw)
    .trim()
    .replace(/```json/gi, "")
    .replace(/```/g, "");

  try {
    return JSON.parse(cleaned);
  } catch {}
  // last resort: try to find a JSON object substring
  const match = cleaned.match(/\{[\s\S]*\}$/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {}
  }
  // fallback minimal shape
  return {
    summary: { keyFindings: [], overallAssessment: "" },
    morningRoutine: [],
    nightRoutine: [],
    lifestyle: { dos: [], donts: [] },
    notes: "",
  };
}

async function safeCleanup(files) {
  await Promise.all(
    (files || []).map((f) => fs.unlink(f.path).catch(() => {}))
  );
}

export default router;
