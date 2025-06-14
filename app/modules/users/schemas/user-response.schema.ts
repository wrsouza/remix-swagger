import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const UserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  isAdmin: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string(),
});

export type IUserResponse = z.infer<typeof UserResponseSchema>;
