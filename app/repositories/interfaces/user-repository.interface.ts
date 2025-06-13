import { Prisma, User } from "@prisma/client";
import { IUserFindMany } from "~/modules/users/mappers";

export interface IUserRepository {
  findMany(data: IUserFindMany): Promise<User[]>;
  findCount(data: IUserFindMany): Promise<number>;
  findOne(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  remove(id: string): Promise<void>;
}
