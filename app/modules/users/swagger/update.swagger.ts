import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { UserParamSchema, UserUpdateSchema } from "~/modules/users/schemas";
import { UserResponseSchema } from "~/modules/users/schemas/user-response.schema";

export function setUpdateSwagger(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "put",
    path: "/api/users/{id}",
    tags: ["Users"],
    summary: "Update User",
    description: "Api for update a user",
    security: [{ ["Auth"]: [] }],
    request: {
      params: UserParamSchema,
      body: {
        content: {
          "application/json": {
            schema: UserUpdateSchema,
          },
        },
      },
    },
    responses: {
      200: {
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
