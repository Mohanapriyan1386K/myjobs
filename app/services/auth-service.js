import { hashPassword } from "../lib/password";
import { sendVerificationEmail } from "../lib/mailer";
import {
  createUser,
  findUserByEmail,
  setVerificationToken,
  updateUserById,
  verifyUserByToken,
} from "../lib/user-model";
import { generateToken } from "../utils/token";

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

export async function registerUserService({ name, email, password }) {
  const cleanName = String(name || "").trim();
  const cleanEmail = normalizeEmail(email);
  const cleanPassword = String(password || "");

  if (!cleanName || !cleanEmail || !cleanPassword) {
    return {
      ok: false,
      status: 400,
      body: { error: "Name, email and password are required" },
    };
  }

  if (cleanPassword.length < 6) {
    return {
      ok: false,
      status: 400,
      body: { error: "Password must be at least 6 characters" },
    };
  }

  const passwordHash = await hashPassword(cleanPassword);
  const existingUser = await findUserByEmail(cleanEmail);

  let user;
  if (existingUser) {
    if (existingUser.emailVerified) {
      return {
        ok: false,
        status: 409,
        body: { error: "User already exists. Please log in." },
      };
    }

    user = await updateUserById(existingUser.id, {
      name: cleanName,
      passwordHash,
      provider: "credentials",
    });
  } else {
    user = await createUser({
      name: cleanName,
      email: cleanEmail,
      passwordHash,
      provider: "credentials",
      emailVerified: false,
    });
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  await setVerificationToken(cleanEmail, token, expiresAt);
  await sendVerificationEmail({ to: cleanEmail, token });

  return {
    ok: true,
    status: 200,
    body: {
      message: "Registration successful. Check your email to verify your account.",
      userId: user?.id,
    },
  };
}

export async function sendVerificationMailService({ email }) {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail) {
    return {
      ok: false,
      status: 400,
      body: { error: "Email is required" },
    };
  }

  const user = await findUserByEmail(cleanEmail);
  if (!user) {
    return {
      ok: false,
      status: 404,
      body: { error: "User not found. Please register first." },
    };
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  await setVerificationToken(cleanEmail, token, expiresAt);
  await sendVerificationEmail({ to: cleanEmail, token });

  return {
    ok: true,
    status: 200,
    body: { message: "Verification email sent successfully" },
  };
}

export async function verifyEmailTokenService({ token }) {
  if (!token) {
    return {
      ok: false,
      status: 400,
      body: { error: "Invalid token" },
    };
  }

  const user = await verifyUserByToken(token);
  if (!user) {
    return {
      ok: false,
      status: 400,
      body: { error: "Token is invalid or expired" },
    };
  }

  return {
    ok: true,
    status: 200,
    body: { message: "Account verified successfully. You can now log in." },
  };
}

