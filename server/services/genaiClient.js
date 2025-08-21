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

  const result = await ai.files.upload({
    file: localFilePath,
    config: { mimeType },
  });

  return { uri: result.file.uri ?? result.uri, mimeType };
}

export { createUserContent, createPartFromUri };
export default { ai, uploadFileToGenAI, createUserContent, createPartFromUri };
