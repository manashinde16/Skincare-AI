// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

import aiRoutes from "./routes/ai.js"; // your ai route
import authRoutes from "./routes/auth.js"; // your auth route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend URL
    credentials: true, // allow cookies
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/ai", aiRoutes);
app.use("/auth", authRoutes);
app.post("/api/generate", (req, res) => {
  res.json({ message: "working" });
});

// Multer/Global error handler
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(413)
        .json({ ok: false, error: "Image file too large. Max 20MB per image." });
    }
    return res.status(400).json({ ok: false, error: err.message });
  }
  return next(err);
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ ok: false, error: "Internal server error" });
});

// Server Start
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
