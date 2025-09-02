import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"; // set strong secret in .env
const EXPIRES_IN = "15m"; // token expiry

// Generate a JWT
export function signJwt(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

// Verify & decode a JWT
export function verifyJwt(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null; // invalid/expired
  }
}
//
