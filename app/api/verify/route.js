import { verifyEmailTokenController } from "../../controllers/auth-controller";

export async function GET(req) {
  return verifyEmailTokenController(req);
}
