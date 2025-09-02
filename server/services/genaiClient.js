import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

export async function uploadFileToGenAI(localFilePath) {
  const ext = path.extname(localFilePath).toLowerCase();
  const mimeType =
    ext === ".png"
      ? "image/png"
      : ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : "application/octet-stream";

  try {
    const result = await ai.files.upload({
      file: localFilePath,
      config: { mimeType },
    });

    // Defensive: check for uri in both result.file and result
    const uri = result?.file?.uri || result?.uri;
    if (!uri) {
      throw new Error("GenAI upload did not return a file URI. Raw result: " + JSON.stringify(result));
    }
    return { uri, mimeType };
  } catch (err) {
    console.error("[GenAI Upload] Error uploading file:", localFilePath, err);
    throw new Error("Failed to upload file to GenAI: " + (err?.message || String(err)));
  }
}

export { createUserContent, createPartFromUri };
export default { ai, uploadFileToGenAI, createUserContent, createPartFromUri };
