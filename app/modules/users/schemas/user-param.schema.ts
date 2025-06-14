import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const UserParamSchema = z.object({
  id: z.string().uuid(),
});

export type IUserParam = z.infer<typeof UserParamSchema>;
