import express from "express";
import upload from "../middleware/upload.js";
import fs from "fs/promises";
import genai from "../services/genaiClient.js";
import { ai } from "../services/genaiClient.js";
import { buildSkincarePrompt } from "../utils/promptBuilder.js";
import { z } from "zod";
import { verifyJwt } from "../src/lib/jwt.js";
import { prisma } from "../src/lib/prisma.js";

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
    // console.log("Final Prompt Form Data:", form);

    files = req.files || [];
    // console.log("Uploaded Files:", files);
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
            uploadResult: u,
          });
        }
        uploaded.push(u);
      } catch (uploadErr) {
        console.error("Image upload error for file:", f.path, uploadErr);
        return res.status(500).json({
          ok: false,
          error: "Failed to upload one or more images to GenAI.",
          file: f.path,
          details: uploadErr?.message || String(uploadErr),
        });
      }
    }

    // 3) Build prompt with all questionnaire data (server-side)\

    const finalPrompt = buildSkincarePrompt(form);
    // console.log("Final Prompt String:", finalPrompt);

    // 4) Create Gemini content parts (prompt + image parts)
    const parts = uploaded.map(({ uri, mimeType }) =>
      genai.createPartFromUri(uri, mimeType)
    );
    // console.log("Image Parts:", parts);
    const contents = [genai.createUserContent([finalPrompt, ...parts])];

    const model = "gemini-2.5-flash";
    const response = await ai.models.generateContent({ model, contents });

    // 5) Try to extract STRICT JSON
    const raw = response.text ?? JSON.stringify(response);
    const json = coerceJson(raw);

    // console.log("Gemini API Response:", response);
    // console.log("Final Gemini Raw Response:", raw);
    // console.log("Final Gemini JSON:", json);

    // 6) If user is authenticated, persist result to DB
    try {
      const token = req.cookies?.token || (req.headers["authorization"] || "").split(" ")[1];
      if (token) {
        const payload = verifyJwt(token);
        if (payload?.sub) {
          await prisma.skincareHistory.create({
            data: {
              userId: payload.sub,
              data: json,
            },
          });
        }
      }
    } catch (persistErr) {
      console.error("Persist skincare history failed:", persistErr);
      // Don't fail the request if saving fails; proceed to return the result
    }

    // 7) Cleanup temp files
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

// Return authenticated user's skincare history (most recent first)
router.get("/history", async (req, res) => {
  try {
    const token = req.cookies?.token || (req.headers["authorization"] || "").split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const payload = verifyJwt(token);
    if (!payload?.sub) return res.status(401).json({ error: "Unauthorized" });

    const items = await prisma.skincareHistory.findMany({
      where: { userId: payload.sub },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { id: true, createdAt: true, data: true },
    });

    return res.json({ ok: true, items });
  } catch (err) {
    console.error("history error:", err);
    return res.status(500).json({ ok: false, error: "Internal error" });
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
