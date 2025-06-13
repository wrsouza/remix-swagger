import { UnauthorizeException } from "~/common";

export class AuthService {
  static validate(request: Request) {
    const token = request.headers.get("Authorization");

    if (!token) {
      throw new UnauthorizeException("token is missing");
    }

    if (token !== process.env.API_KEY) {
      throw new UnauthorizeException("invalid token");
    }
  }
}
