import { IGuard, UnauthorizeException } from "~/common";

export class AuthGuard implements IGuard {
  async validate(request: Request): Promise<void> {
    const token = request.headers.get("Authorization");

    if (!token) {
      throw new UnauthorizeException("token is missing");
    }

    if (token !== process.env.API_KEY) {
      throw new UnauthorizeException("invalid token");
    }
  }

  static async validate(request: Request): Promise<void> {
    const guard = new AuthGuard();
    return guard.validate(request);
  }
}
