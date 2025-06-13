import { LoaderFunctionArgs } from "@remix-run/node";
import { NotFoundException, UnauthorizeException } from "~/common";
import { AuthService } from "~/modules/users/providers";
import { UsersModule } from "~/modules/users/users.module";

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    AuthService.validate(request);

    const id = params.id as string;
    const controller = UsersModule.getController(request);
    const result = await controller.find(id);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    if (
      err instanceof UnauthorizeException ||
      err instanceof NotFoundException
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
