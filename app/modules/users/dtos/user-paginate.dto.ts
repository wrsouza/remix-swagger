import { SortEnum } from "~/common";
import { IUser } from "../interfaces";
import { IFilter } from "../providers";

export class UserPaginateDto {
  readonly data: IUser[];
  readonly page: number;
  readonly rows: number;
  readonly id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly sort: SortEnum;
  readonly total: number;
  readonly tpages: number;

  constructor(data: IUser[], total: number, tpages: number, filters: IFilter) {
    this.data = data;
    this.page = filters.page;
    this.rows = filters.rows;
    this.id = filters.id?.join(",");
    this.name = filters.name;
    this.email = filters.email;
    this.sort = filters.sort;
    this.total = total;
    this.tpages = tpages;
  }
}
