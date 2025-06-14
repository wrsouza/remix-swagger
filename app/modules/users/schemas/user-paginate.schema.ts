import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { UserResponseSchema } from "~/modules/users/schemas/user-response.schema";

extendZodWithOpenApi(z);

export const UserPaginateSchema = z.object({
  data: UserResponseSchema,
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  page: z.number(),
  rows: z.number(),
  sort: z.string(),
  total: z.number().default(1),
  tpages: z.number().default(1),
});

export type IUserPaginate = z.infer<typeof UserPaginateSchema>;
