import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER || process.env.EMAIL;
const emailPass = process.env.EMAIL_PASS || process.env.PASS;

function getTransportConfig() {
  if (!emailUser || !emailPass) {
    throw new Error("Missing mail credentials. Set EMAIL/EMAIL_USER and PASS/EMAIL_PASS in .env.");
  }

  if (process.env.EMAIL_HOST) {
    return {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: String(process.env.EMAIL_SECURE || "false") === "true",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    };
  }

  return {
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  };
}

export const transporter = nodemailer.createTransport(getTransportConfig());

export async function sendVerificationEmail({ to, token }) {
  const baseUrl =
    process.env.BASE_URL ||
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

  const verifyLink = `${baseUrl}/verify?token=${encodeURIComponent(token)}`;

  await transporter.sendMail({
    from: `"My App" <${emailUser}>`, // ✅ FIXED
    to,
    subject: "Verify your account",
    html: `
      <div style="font-family: Arial; text-align: center;">
        <h2>Verify Your Account</h2>
        <p>Click the button below to verify your email:</p>

        <a href="${verifyLink}" 
          style="
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 10px;
          ">
          Verify Account
        </a>

        <p style="margin-top: 20px; color: gray;">
          This link expires in 1 hour.
        </p>

        <p style="font-size: 12px; color: gray;">
          If you didn’t request this, ignore this email.
        </p>
      </div>
    `,
  });
}
