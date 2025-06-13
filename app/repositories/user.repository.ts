import { Prisma, PrismaClient, User } from "generated/prisma";
import { IUserFindMany } from "~/modules/users/mappers";
import { IUserRepository } from "./interfaces";

export class UserRepository implements IUserRepository {
  constructor(private readonly client: PrismaClient) {}

  async findMany(data: IUserFindMany): Promise<User[]> {
    return this.client.user.findMany(data);
  }

  async findCount(data: IUserFindMany): Promise<number> {
    return this.client.user.count(data);
  }

  async findOne(id: string): Promise<User | null> {
    return this.client.user.findFirst({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.client.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.client.user.update({ where: { id }, data });
  }

  async remove(id: string): Promise<void> {
    await this.client.user.delete({ where: { id } });
  }
}
