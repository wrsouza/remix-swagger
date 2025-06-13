export class ForbiddenException extends Error {
  readonly statusCode: number;
  readonly statusText: string;

  constructor(message: string) {
    super(message);
    this.name = "ForbiddenException";
    this.statusCode = 403;
    this.statusText = "Forbidden";
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}
