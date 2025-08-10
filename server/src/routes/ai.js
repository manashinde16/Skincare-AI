import express from "express";
import upload from "../middleware/upload.js";
import fs from "fs/promises";
import path from "path";
import genai from "../services/genaiClient.js";

const router = express.Router();

// Accept exactly 3 images
router.post("/generate", upload.array("images", 3), async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing `prompt` field." });

    const files = req.files || [];
    if (files.length !== 3) {
      return res.status(400).json({ error: "Please upload exactly 3 images in the `images` field." });
    }

    // 1) upload images to GenAI
    const uploaded = [];
    for (const f of files) {
      const uploadResp = await genai.uploadFileToGenAI(f.path);
      uploaded.push({ localPath: f.path, uploadResp });
    }

    // 2) create parts from URIs returned by the SDK
    // (your snippet uses createPartFromUri(image.uri, image.mimeType))
    const parts = uploaded.map(u => {
      const { uri, mimeType } = u.uploadResp;
      return genai.createPartFromUri(uri, mimeType);
    });

    // 3) generate content
    const contents = [
      genai.createUserContent([prompt, ...parts])
    ];

    const response = await genai.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents
    });

    // 4) cleanup local uploaded files
    await Promise.all(files.map(f => fs.unlink(f.path).catch(() => {})));

    // Try to return a textual result. many SDK responses put text on `response.text`.
    // If your SDK returns nested structure, inspect `response` and return the correct field.
    return res.json({ ok: true, result: response.text ?? response });
  } catch (err) {
    console.error("generate error:", err);
    return res.status(500).json({ error: err.message || "Internal error", raw: String(err) });
  }
});

export default router;
