// testGenAI.js
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

console.log("API Key:", process.env.GENAI_API_KEY);

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

const models = await ai.models.list();
console.log("Models:", models);
