import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const UserUpdateSchema = z.object({
  name: z.string().optional().openapi({ example: "John Doe" }),
  email: z
    .string()
    .email()
    .optional()
    .openapi({ example: "john.doe@domain.com" }),
  isAdmin: z.boolean().optional().openapi({ example: false }),
  isActive: z.boolean().optional().openapi({ example: false }),
  password: z.string().min(6).max(20).optional(),
});

export type IUserUpdate = z.infer<typeof UserUpdateSchema>;
