import { SortEnum } from "~/common";

export interface ISort {
  sort: SortEnum;
  orderBy: {
    [key: string]: "asc" | "desc";
  };
}
