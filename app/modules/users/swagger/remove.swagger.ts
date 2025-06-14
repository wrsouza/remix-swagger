import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { UserParamSchema } from "~/modules/users/schemas";

export function setRemoveSwagger(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "delete",
    path: "/api/users/{id}",
    tags: ["Users"],
    summary: "Remove User",
    description: "Api for remove a user",
    security: [{ ["Auth"]: [] }],
    request: {
      params: UserParamSchema,
    },
    responses: {
      204: {
        description: "No content",
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
