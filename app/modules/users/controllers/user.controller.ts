import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { UserPaginateDto, UserResponseDto } from "~/modules/users/dtos";
import { IUserService } from "~/modules/users/providers";
import { IUserCreate } from "~/modules/users/schemas";
import { IUserController } from "./interfaces";

export class UserController implements IUserController {
  constructor(private readonly service: IUserService) {}

  async paginate(): Promise<UserPaginateDto> {
    return this.service.paginate();
  }

  async create(body: IUserCreate): Promise<UserResponseDto> {
    return this.service.create(body);
  }

  async find({ params }: LoaderFunctionArgs): Promise<UserResponseDto> {
    const id = params.id as string;
    return this.service.find(id);
  }

  async update({
    request,
    params,
  }: ActionFunctionArgs): Promise<UserResponseDto> {
    const id = params.id as string;
    return this.service.update(id, request);
  }

  async remove({ params }: ActionFunctionArgs): Promise<void> {
    const id = params.id as string;
    return this.service.remove(id);
  }
}
