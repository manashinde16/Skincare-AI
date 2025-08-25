import { Router } from "express";
import { prisma } from "../src/lib/prisma.js";
import { hashPassword, verifyPassword } from "../src/lib/password.js";
import { signJwt, verifyJwt } from "../src/lib/jwt.js";
import { authMiddleware } from "../src/middleware/auth.js";

const router = Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only https in prod
  sameSite: "strict",
  maxAge: 15 * 60 * 1000, // 15 min
};

// POST /auth/signup
router.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "User already exists." });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, name, passwordHash },
  });

  // sign JWT
  const token = signJwt({ sub: user.id, email: user.email, name: user.name });

  // Set cookie
  res.cookie("token", token, COOKIE_OPTIONS);

  return res.json({
    user: { id: user.id, email: user.email, name: user.name },
    token,
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signJwt({ sub: user.id, email: user.email, name: user.name });

    // Set cookie
    res.cookie("token", token, COOKIE_OPTIONS);

    return res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const payload = verifyJwt(token);
  if (!payload) return res.status(401).json({ error: "Invalid token" });

  return res.json({ user: payload });
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  return res.json({ message: "Logged out successfully" });
});

export default router;
//
