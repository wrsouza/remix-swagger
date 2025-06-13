import { UserCreateSchema, UserUpdateSchema } from "../../schemas";

export class ValidationService {
  static validate<T>(
    data: T,
    schema: typeof UserCreateSchema | typeof UserUpdateSchema
  ) {
    const result = schema.safeParse(data);
    return result.success;
  }
}
