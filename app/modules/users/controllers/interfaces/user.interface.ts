import { UserPaginateDto, UserResponseDto } from "~/modules/users/dtos";
import { IUserCreate, IUserUpdate } from "~/modules/users/schemas";

export interface IUserController {
  paginate(): Promise<UserPaginateDto>;

  create(body: IUserCreate): Promise<UserResponseDto>;

  find(id: string): Promise<UserResponseDto>;

  update(id: string, body: IUserUpdate): Promise<UserResponseDto>;

  remove(id: string): Promise<void>;
}
