import { sendVerificationMailController } from "../../controllers/auth-controller";

export async function POST(req) {
  return sendVerificationMailController(req);
}
