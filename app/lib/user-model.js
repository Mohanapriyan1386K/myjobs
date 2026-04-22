import mongoose from "mongoose";
import { connectDB } from "./mongodb";
import User from "../modles/User";

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function mapUser(user) {
  if (!user) return null;
  const plain = typeof user.toObject === "function" ? user.toObject() : user;
  return {
    ...plain,
    id: String(plain._id),
  };
}

export function toSafeUser(user) {
  if (!user) return null;
  return {
    id: String(user.id || user._id),
    name: user.name,
    email: user.email,
    image: user.image || null,
    emailVerified: Boolean(user.emailVerified),
  };
}

export async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;
  await connectDB();

  const user = await User.findOne({ email: normalizedEmail });
  return mapUser(user);
}

export async function createUser({
  name,
  email,
  passwordHash = null,
  image = null,
  provider = "credentials",
  emailVerified = false,
}) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) throw new Error("Email is required");
  await connectDB();

  const user = await User.create({
    name: String(name || "").trim() || "User",
    email: normalizedEmail,
    passwordHash,
    image,
    provider,
    emailVerified,
  });

  return mapUser(user);
}

export async function updateUserById(userId, patch = {}) {
  if (!userId) return null;
  await connectDB();

  const id = new mongoose.Types.ObjectId(String(userId));
  const user = await User.findByIdAndUpdate(id, patch, {
    new: true,
  });
  return mapUser(user);
}

export async function setVerificationToken(email, token, expiresAt) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !token) return null;
  await connectDB();

  const user = await User.findOneAndUpdate(
    { email: normalizedEmail },
    {
      verifyToken: token,
      verifyTokenExpiresAt: new Date(expiresAt),
    },
    { new: true }
  );
  return mapUser(user);
}

export async function verifyUserByToken(token) {
  if (!token) return null;
  await connectDB();

  const user = await User.findOneAndUpdate(
    {
      verifyToken: token,
      verifyTokenExpiresAt: { $gt: new Date() },
    },
    {
      emailVerified: true,
      verifyToken: null,
      verifyTokenExpiresAt: null,
    },
    { new: true }
  );

  return mapUser(user);
}

export async function upsertGoogleUser({ name, email, image }) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) throw new Error("Email is required");
  await connectDB();

  const user = await User.findOneAndUpdate(
    { email: normalizedEmail },
    {
      $set: {
        name: String(name || "").trim() || "User",
        email: normalizedEmail,
        image: image || null,
        provider: "google",
        emailVerified: true,
      },
      $setOnInsert: {
        passwordHash: null,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  return mapUser(user);
}

