import { LoaderFunctionArgs } from "@remix-run/node";
import { Fail, Result } from "~/common";
import { AuthService } from "~/modules/users/providers";
import { UsersModule } from "~/modules/users/users.module";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    AuthService.validate(request);

    const controller = UsersModule.getController(request);
    const result = await controller.paginate();
    return Result(result);
  } catch (err) {
    return Fail(err);
  }
}
