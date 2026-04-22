import {
  registerUserService,
  sendVerificationMailService,
  verifyEmailTokenService,
} from "../services/auth-service";

export async function registerUserController(req) {
  try {
    const body = await req.json();
    const result = await registerUserService({
      name: body?.name,
      email: body?.email,
      password: body?.password,
    });

    return Response.json(result.body, { status: result.status });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Registration failed" },
      { status: 500 }
    );
  }
}

export async function sendVerificationMailController(req) {
  try {
    const body = await req.json();
    const result = await sendVerificationMailService({
      email: body?.email,
    });

    return Response.json(result.body, { status: result.status });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Failed to send verification email" },
      { status: 500 }
    );
  }
}

export async function verifyEmailTokenController(req) {
  try {
    const { searchParams } = new URL(req.url);
    const result = await verifyEmailTokenService({
      token: searchParams.get("token"),
    });

    return Response.json(result.body, { status: result.status });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Verification failed" },
      { status: 500 }
    );
  }
}

