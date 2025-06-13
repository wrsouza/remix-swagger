import { ActionFunctionArgs } from "@remix-run/node";
import {
  BadRequestException,
  MethodNotAllowedException,
  UnauthorizeException,
} from "~/common";
import { AuthService } from "~/modules/users/providers";
import { ValidationService } from "~/modules/users/providers/validation/validation.service";
import { UserCreateSchema } from "~/modules/users/schemas";
import { UsersModule } from "~/modules/users/users.module";

export async function action({ request }: ActionFunctionArgs) {
  try {
    if (request.method !== "POST") {
      throw new MethodNotAllowedException(
        `method ${request.method} not allowed`
      );
    }

    AuthService.validate(request);

    const body = await request.json();
    ValidationService.validate(body, UserCreateSchema);

    const controller = UsersModule.getController(request);
    const result = await controller.create(body);
    return new Response(JSON.stringify(result), { status: 201 });
  } catch (err) {
    if (
      err instanceof UnauthorizeException ||
      err instanceof MethodNotAllowedException ||
      err instanceof BadRequestException
    ) {
      return new Response(JSON.stringify(err.message), {
        status: err.statusCode,
        statusText: err.statusText,
      });
    }

    return new Response(JSON.stringify("unknown error"), {
      status: 500,
    });
  }
}
