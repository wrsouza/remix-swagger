import { ActionFunctionArgs } from "@remix-run/node";
import { Fail, MethodNotAllowedException, Result } from "~/common";
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
      return Result(result);
    }

    await controller.remove(id);
    return Result({}, 204);
  } catch (err) {
    return Fail(err);
  }
}
