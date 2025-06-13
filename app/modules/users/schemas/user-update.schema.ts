import z from "zod";

export const UserUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  isAdmin: z.boolean().optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(6).max(20).optional(),
});

export type IUserUpdate = z.infer<typeof UserUpdateSchema>;
