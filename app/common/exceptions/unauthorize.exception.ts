export class UnauthorizeException extends Error {
  readonly statusCode: number;
  readonly statusText: string;

  constructor(message: string) {
    super(message);
    this.name = "UnauthorizeException";
    this.statusCode = 401;
    this.statusText = "Unauthorize";
    Object.setPrototypeOf(this, UnauthorizeException.prototype);
  }
}
