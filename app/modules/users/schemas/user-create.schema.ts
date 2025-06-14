import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const UserCreateSchema = z.object({
  name: z.string().max(100).openapi({ example: "John Doe" }),
  email: z.string().openapi({ example: "john.doe@domain.com" }),
  isAdmin: z.boolean().default(false),
  isActive: z.boolean().default(false),
  password: z.string().min(6).max(20).openapi({ example: "password" }),
});

export type IUserCreate = z.infer<typeof UserCreateSchema>;
