import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

export async function hashPassword(password) {
  const input = String(password || "");
  if (!input) throw new Error("Password is required");

  const salt = crypto.randomBytes(16).toString("hex");
  const key = await scryptAsync(input, salt, 64);
  return `${salt}:${Buffer.from(key).toString("hex")}`;
}

export async function verifyPassword(password, storedHash) {
  const input = String(password || "");
  const stored = String(storedHash || "");
  if (!input || !stored.includes(":")) return false;

  const [salt, keyHex] = stored.split(":");
  const key = await scryptAsync(input, salt, 64);
  const derived = Buffer.from(key).toString("hex");

  const a = Buffer.from(derived, "hex");
  const b = Buffer.from(keyHex, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

