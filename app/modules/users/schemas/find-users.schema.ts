import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const FindUsersSchema = z.object({
  id: z.string().optional().openapi({ example: "" }),
  name: z.string().optional().openapi({ example: "" }),
  email: z.string().optional().openapi({ example: "" }),
  page: z.number().step(1).default(1),
  rows: z.number().step(1).default(10),
  sort: z
    .enum([
      "id",
      "-id",
      "name",
      "-name",
      "email",
      "-email",
      "createdAt",
      "-createdAt",
    ])
    .openapi({ example: "-createdAt" }),
});

export type IFindUsers = z.infer<typeof FindUsersSchema>;
