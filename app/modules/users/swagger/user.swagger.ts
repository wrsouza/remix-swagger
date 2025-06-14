import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { setCreateSwagger } from "~/modules/users/swagger/create.swagger";
import { setFindSwagger } from "~/modules/users/swagger/find.swagger";
import { setPaginateSwagger } from "~/modules/users/swagger/paginate.swagger";
import { setRemoveSwagger } from "~/modules/users/swagger/remove.swagger";
import { setUpdateSwagger } from "~/modules/users/swagger/update.swagger";

export function registerUser(registry: OpenAPIRegistry) {
  setPaginateSwagger(registry);
  setCreateSwagger(registry);
  setFindSwagger(registry);
  setUpdateSwagger(registry);
  setRemoveSwagger(registry);
}
