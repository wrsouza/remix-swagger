import { IFilter } from "./filter.interface";

export interface IQueryFilterService {
  getFilters(request: Request): IFilter;
}
