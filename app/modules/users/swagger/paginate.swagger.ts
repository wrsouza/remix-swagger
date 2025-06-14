import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { FindUsersSchema } from "~/modules/users/schemas";
import { UserPaginateSchema } from "~/modules/users/schemas/user-paginate.schema";

export function setPaginateSwagger(registry: OpenAPIRegistry) {
  registry.registerPath({
    method: "get",
    path: "/api/users",
    tags: ["Users"],
    summary: "Find Users",
    description: "Api for search users",
    security: [{ ["Auth"]: [] }],
    request: {
      query: FindUsersSchema,
    },
    responses: {
      200: {
        description: "List of object with user data",
        content: {
          "application/json": {
            schema: UserPaginateSchema,
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
