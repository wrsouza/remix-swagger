import { ActionFunctionArgs } from "@remix-run/node";
import { Fail, MethodNotAllowedException, Result } from "~/common";
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
    return Result(result, 201);
  } catch (err) {
    return Fail(err);
  }
}
