import { verifyJwt } from "../lib/jwt.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  const payload = verifyJwt(token);
  if (!payload)
    return res.status(401).json({ error: "Invalid or expired token" });

  req.user = payload; // attach user data (id, email, etc.)
  next();
}
//
