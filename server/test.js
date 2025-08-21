import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });
const models = await ai.models.list();
console.log(models);
