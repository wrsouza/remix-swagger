import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizeException,
} from "~/common/exceptions";

export const Fail = (err: unknown): Response => {
  if (
    err instanceof BadRequestException ||
    err instanceof ForbiddenException ||
    err instanceof InternalServerErrorException ||
    err instanceof MethodNotAllowedException ||
    err instanceof NotFoundException ||
    err instanceof UnauthorizeException
  ) {
    return new Response(JSON.stringify(err.message), {
      status: err.statusCode,
      statusText: err.statusText,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("unknown error", {
    status: 500,
    statusText: JSON.stringify(err),
    headers: { "Content-Type": "application/json" },
  });
};
