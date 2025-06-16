import { BadRequestException, SortEnum } from "~/common";
import { IFilter, IQueryFilterService, ISort } from "./interfaces";

export class QueryFilterService implements IQueryFilterService {
  private params!: URLSearchParams;

  getFilters(request: Request): IFilter {
    this.setParams(request);
    const sortData = this.getSort();
    return {
      id: this.getId(),
      name: this.getName(),
      email: this.getEmail(),
      page: this.getPage(),
      rows: this.getRows(),
      ...sortData,
    };
  }

  private setParams(request: Request): void {
    const urlParts = request.url.split("?");
    if (urlParts.length > 1) {
      this.params = new URLSearchParams(urlParts[1]);
    }
    this.params = new URLSearchParams();
  }

  private getId(): string[] {
    const id = this.params.get("id");
    if (!id) {
      return [];
    }
    return id?.split(",");
  }

  private getName(): string | undefined {
    const name = this.params.get("name");
    if (!name) {
      return undefined;
    }
    return name;
  }

  private getEmail(): string | undefined {
    const email = this.params.get("email");
    if (!email) {
      return undefined;
    }
    return email;
  }

  private getPage(): number {
    const page = this.params.get("page");
    if (!page) {
      return 1;
    }
    return parseInt(page);
  }

  private getRows(): number {
    const rows = this.params.get("rows");
    if (!rows) {
      return 20;
    }
    return parseInt(rows);
  }

  private getSort(): ISort {
    const sort = this.params.get("sort");
    if (!sort) {
      return {
        sort: SortEnum["-createdAt"],
        orderBy: {
          createdAt: "desc",
        },
      };
    }

    if (!(sort in SortEnum)) {
      throw new BadRequestException("sort invalid");
    }

    const direction = sort.charAt(0) === "-" ? "desc" : "asc";
    const order = sort.charAt(0) === "-" ? sort.substring(1) : sort;

    return {
      sort: SortEnum[sort as keyof typeof SortEnum],
      orderBy: {
        [order]: direction,
      },
    };
  }
}
