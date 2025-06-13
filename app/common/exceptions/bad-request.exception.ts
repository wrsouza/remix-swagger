export class BadRequestException extends Error {
  readonly statusCode: number;
  readonly statusText: string;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestException";
    this.statusCode = 400;
    this.statusText = "Bad Request";
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
