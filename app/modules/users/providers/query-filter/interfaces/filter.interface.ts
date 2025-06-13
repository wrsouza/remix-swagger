import { SortEnum } from "~/common";

export interface IFilter {
  id?: string[];
  name?: string;
  email?: string;
  page: number;
  rows: number;
  orderBy: {
    [key: string]: "asc" | "desc";
  };
  sort: SortEnum;
}
