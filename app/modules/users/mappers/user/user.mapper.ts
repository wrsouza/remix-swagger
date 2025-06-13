import { Prisma, User } from "generated/prisma";
import { IUser } from "~/modules/users/interfaces";
import { IFilter } from "~/modules/users/providers";
import { IUserCreate, IUserUpdate } from "~/modules/users/schemas";
import { IUserFindMany, IUserMapper } from "./interfaces";

export class UserMapper implements IUserMapper {
  findMany(filters: IFilter): IUserFindMany {
    return {
      where: {
        ...this.getWhereId(filters),
        ...this.getWhereName(filters),
        ...this.getEmailWhere(filters),
      },
      take: filters.rows,
      skip: filters.rows * (filters.page - 1),
      orderBy: filters.orderBy,
    };
  }

  findCount(filters: IFilter): IUserFindMany {
    return {
      where: {
        ...this.getWhereId(filters),
        ...this.getWhereName(filters),
        ...this.getEmailWhere(filters),
      },
    };
  }

  getTotalPages(total: number, filters: IFilter): number {
    return total % filters.rows === 0
      ? total / filters.rows
      : Math.ceil(total / filters.rows) + 1;
  }

  mapPaginate(users: User[]): IUser[] {
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      createdAt: user.createdAt,
    }));
  }

  async create(request: Request): Promise<IUserCreate> {
    const json = await request.json();
    const name = json.name;
    const email = json.email;
    const isAdmin = json.isAdmin;
    const isActive = json.isActive;
    const password = json.password;

    return {
      name,
      email,
      isAdmin,
      isActive,
      password,
    };
  }

  async update(request: Request): Promise<IUserUpdate> {
    const json = 
    const name = json.name;
    const email = json.email;
    const isAdmin = json.isAdmin;
    const isActive = json.isActive;
    const password = json.password;

    return {
      name,
      email,
      isAdmin,
      isActive,
      password,
    };
  }

  private getWhereId(filters: IFilter): Prisma.UserWhereInput {
    if (!filters.id) {
      return {};
    }
    return {
      id: {
        in: filters.id,
      },
    };
  }

  private getWhereName(filters: IFilter): Prisma.UserWhereInput {
    if (!filters.name) {
      return {};
    }
    return {
      name: {
        contains: filters.name,
        mode: "insensitive",
      },
    };
  }

  private getEmailWhere(filters: IFilter): Prisma.UserWhereInput {
    if (!filters.email) {
      return {};
    }
    return {
      email: {
        contains: filters.email,
        mode: "insensitive",
      },
    };
  }
}
