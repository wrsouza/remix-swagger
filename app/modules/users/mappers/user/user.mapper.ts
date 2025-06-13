import { IUser } from "~/modules/users/interfaces";
import { IFilter } from "~/modules/users/providers";
import { IUserFindMany, IUserMapper } from "./interfaces";
import { Prisma, User } from "@prisma/client";

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
