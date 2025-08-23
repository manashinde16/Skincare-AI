// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import aiRoutes from "./routes/ai.js"; // your ai route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ai", aiRoutes);
app.post("/api/generate", (req, res) => {
  res.json({ message: "working" });
});

// Server Start
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
