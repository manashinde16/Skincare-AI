import "dotenv/config";

export const env = {
  port: process.env.PORT || 4000,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  genaiKey: process.env.GENAI_API_KEY,
};
