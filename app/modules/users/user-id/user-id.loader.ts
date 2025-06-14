import { LoaderFunctionArgs } from "@remix-run/node";
import { Fail, Result } from "~/common";
import { AuthService } from "~/modules/users/providers";
import { UsersModule } from "~/modules/users/users.module";

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    AuthService.validate(request);

    const id = params.id as string;
    const controller = UsersModule.getController(request);
    const result = await controller.find(id);
    return Result(result);
  } catch (err) {
    return Fail(err);
  }
}
