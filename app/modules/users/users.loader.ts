import { LoaderFunctionArgs } from "@remix-run/node";
import { UnauthorizeException } from "~/common";
import { AuthService } from "~/modules/users/providers";
import { UsersModule } from "~/modules/users/users.module";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    AuthService.validate(request);

    const controller = UsersModule.getController(request);
    const result = await controller.paginate();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    if (err instanceof UnauthorizeException) {
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
