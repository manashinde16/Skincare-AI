import express from "express";
import upload from "../middleware/upload.js";
import fs from "fs/promises";
import genai from "../services/genaiClient.js";
import { ai } from "../services/genaiClient.js";
import { buildSkincarePrompt } from "../utils/promptBuilder.js";
import { z } from "zod";

const router = express.Router();

const FormSchema = z.object({}).passthrough();

// Accept exactly 3 images named "images"
router.post("/generate", upload.array("images", 3), async (req, res) => {
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


    // 2) Upload images to GenAI with error handling
    const uploaded = [];
    for (const f of files) {
      try {
        const u = await genai.uploadFileToGenAI(f.path);
        if (!u || !u.uri || !u.mimeType) {
          console.error("Upload returned invalid data for file:", f.path, u);
          return res.status(500).json({
            ok: false,
            error: "Image upload to GenAI failed or returned invalid data.",
            file: f.path,
            uploadResult: u
          });
        }
        uploaded.push(u);
      } catch (uploadErr) {
        console.error("Image upload error for file:", f.path, uploadErr);
        return res.status(500).json({
          ok: false,
          error: "Failed to upload one or more images to GenAI.",
          file: f.path,
          details: uploadErr?.message || String(uploadErr)
        });
      }
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

    // 6) Cleanup temp files
    await safeCleanup(files);

    return res.json({ ok: true, result: json });
  } catch (err) {
    console.error("generate error:", err);
    await safeCleanup(files);
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
