import { NotFoundException } from "~/common";
import { UserPaginateDto, UserResponseDto } from "~/modules/users/dtos";
import { IUserCreate, IUserUpdate } from "~/modules/users/schemas";
import { IUserRepository } from "~/repositories";
import { IUserMapper } from "../../mappers";
import { IQueryFilterService } from "../query-filter";
import { IUserService } from "./interfaces";

export class UserService implements IUserService {
  constructor(
    private readonly filterService: IQueryFilterService,
    private readonly repository: IUserRepository,
    private readonly mapper: IUserMapper
  ) {}

  async paginate(request: Request): Promise<UserPaginateDto> {
    const filters = this.filterService.getFilters(request);
    const mapper = this.mapper.findMany(filters);
    const users = await this.repository.findMany(mapper);
    const userMapped = this.mapper.mapPaginate(users);

    const countMapper = this.mapper.findCount(filters);
    const total = await this.repository.findCount(countMapper);
    const tpages = this.mapper.getTotalPages(total, filters);

    return new UserPaginateDto(userMapped, total, tpages, filters);
  }

  async create(body: IUserCreate): Promise<UserResponseDto> {
    const user = await this.repository.create(body);
    return new UserResponseDto(user);
  }

  async find(id: string): Promise<UserResponseDto> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return new UserResponseDto(user);
  }

  async update(id: string, body: IUserUpdate): Promise<UserResponseDto> {
    const user = await this.repository.update(id, body);
    return new UserResponseDto(user);
  }

  async remove(id: string): Promise<void> {
    await this.repository.remove(id);
  }
}
