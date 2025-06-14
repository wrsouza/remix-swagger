import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { UserCreateSchema } from "~/modules/users/schemas";
import { UserResponseSchema } from "~/modules/users/schemas/user-response.schema";

export function setCreateSwagger(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "post",
    path: "/api/users",
    tags: ["Users"],
    summary: "Create User",
    description: "Api for create a user",
    security: [{ ["Auth"]: [] }],
    request: {
      body: {
        content: {
          "application/json": {
            schema: UserCreateSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Object with user data",
        content: {
          "application/json": {
            schema: UserResponseSchema,
          },
        },
      },
      400: {
        description: "Validation error",
      },
      401: {
        description: "Unauthorize access error",
      },
      500: {
        description: "Internal error",
      },
    },
  });
}
