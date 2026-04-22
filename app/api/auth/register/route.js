import { registerUserController } from "../../../controllers/auth-controller";

export async function POST(req) {
  return registerUserController(req);
}
