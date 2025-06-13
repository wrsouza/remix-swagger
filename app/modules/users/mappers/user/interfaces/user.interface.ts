import { User } from "generated/prisma";
import { IUser } from "~/modules/users/interfaces";
import { IFilter } from "~/modules/users/providers";
import { IUserFindMany } from "./find-many.interface";

export interface IUserMapper {
  findMany(filters: IFilter): IUserFindMany;
  findCount(filters: IFilter): IUserFindMany;
  getTotalPages(total: number, filters: IFilter): number;
  mapPaginate(users: User[]): IUser[];
}
