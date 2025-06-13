import { ActionFunctionArgs } from "@remix-run/node";
import {
  BadRequestException,
  MethodNotAllowedException,
  UnauthorizeException,
} from "~/common";
import { AuthService } from "~/modules/users/providers";
import { ValidationService } from "~/modules/users/providers/validation/validation.service";
import { UserUpdateSchema } from "~/modules/users/schemas";
import { UsersModule } from "~/modules/users/users.module";

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    if (request.method !== "PUT" && request.method !== "DELETE") {
      throw new MethodNotAllowedException(
        `Method ${request.method} not allowed`
      );
    }

    AuthService.validate(request);

    const id = params.id as string;
    const controller = UsersModule.getController(request);

    if (request.method === "PUT") {
      const body = await request.json();
      ValidationService.validate(body, UserUpdateSchema);
      const result = await controller.update(id, body);
      return new Response(JSON.stringify(result), { status: 200 });
    }

    await controller.remove(id);
    return new Response(undefined, { status: 204 });
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
