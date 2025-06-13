export class MethodNotAllowedException extends Error {
  readonly statusCode: number;
  readonly statusText: string;

  constructor(message: string) {
    super(message);
    this.name = "MethodNotAllowedException";
    this.statusCode = 405;
    this.statusText = "Method Not Allowed";
    Object.setPrototypeOf(this, MethodNotAllowedException.prototype);
  }
}
