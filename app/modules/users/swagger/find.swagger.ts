import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { UserParamSchema } from "~/modules/users/schemas";
import { UserResponseSchema } from "~/modules/users/schemas/user-response.schema";

export function setFindSwagger(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "get",
    path: "/api/users/{id}",
    tags: ["Users"],
    summary: "Find User",
    description: "Api for find a user",
    security: [{ ["Auth"]: [] }],
    request: {
      params: UserParamSchema,
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
      404: {
        description: "Not found error",
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
