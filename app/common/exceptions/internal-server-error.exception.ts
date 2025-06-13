export class InternalServerErrorException extends Error {
  readonly statusCode: number;
  readonly statusText: string;

  constructor(message: string) {
    super(message);
    this.name = "InternalServerErrorException";
    this.statusCode = 500;
    this.statusText = "Internal Server Error";
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}
