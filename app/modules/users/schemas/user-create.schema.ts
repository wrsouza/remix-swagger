import z from "zod";

export const UserCreateSchema = z.object({
  name: z.string().max(100),
  email: z.string(),
  isAdmin: z.boolean(),
  isActive: z.boolean(),
  password: z.string().min(6).max(20),
});
