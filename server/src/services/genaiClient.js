import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GENAI_API_KEY
});

export async function uploadFileToGenAI(localFilePath) {
  const mimeType = (() => {
    const ext = path.extname(localFilePath).toLowerCase();
    if (ext === ".png") return "image/png";
    if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
    return "application/octet-stream";
  })();
  const displayName = path.basename(localFilePath);

  const result = await ai.files.upload({
    file: localFilePath,
    config: { mimeType }
  });

  return result;
}

export { createUserContent, createPartFromUri, ai };
export default { uploadFileToGenAI, createUserContent, createPartFromUri, ai };
