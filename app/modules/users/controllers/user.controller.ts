import { UserPaginateDto, UserResponseDto } from "~/modules/users/dtos";
import { IUserService } from "~/modules/users/providers";
import { IUserCreate, IUserUpdate } from "~/modules/users/schemas";
import { IUserController } from "./interfaces";

export class UserController implements IUserController {
  constructor(private readonly service: IUserService) {}

  async paginate(): Promise<UserPaginateDto> {
    return this.service.paginate();
  }

  async create(body: IUserCreate): Promise<UserResponseDto> {
    return this.service.create(body);
  }

  async find(id: string): Promise<UserResponseDto> {
    return this.service.find(id);
  }

  async update(id: string, body: IUserUpdate): Promise<UserResponseDto> {
    return this.service.update(id, body);
  }

  async remove(id: string): Promise<void> {
    return this.service.remove(id);
  }
}
