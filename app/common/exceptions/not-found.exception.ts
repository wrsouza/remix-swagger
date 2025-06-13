export class NotFoundException extends Error {
  readonly statusCode: number;
  readonly statusText: string;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundException";
    this.statusCode = 404;
    this.statusText = "Not Found";
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
