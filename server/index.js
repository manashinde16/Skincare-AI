// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import aiRoutes from "./routes/ai.js"; // your ai route
import authRoutes from "./routes/auth.js"; // your auth route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Server Start
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
