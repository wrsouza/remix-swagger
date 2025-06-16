import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Auth,
  AuthGuard,
  Controller,
  Delete,
  Fail,
  Get,
  Post,
  Put,
  Result,
  Validate,
} from "~/common";
import type { IUserService } from "~/modules/users/providers";
import { UserCreateSchema, UserUpdateSchema } from "~/modules/users/schemas";
import { IUserController } from "./interfaces";

@Controller("/api/users")
export class UserController implements IUserController {
  constructor(private readonly service: IUserService) {}

  @Get()
  @Auth(AuthGuard)
  async paginate({ request }: LoaderFunctionArgs): Promise<Response> {
    try {
      const data = await this.service.paginate(request);
      return Result(data);
    } catch (err) {
      return Fail(err);
    }
  }

  @Post()
  @Auth(AuthGuard)
  @Validate(UserCreateSchema)
  async create({ request }: ActionFunctionArgs): Promise<Response> {
    try {
      const body = await request.json();
      const data = await this.service.create(body);
      return Result(data, 201);
    } catch (err) {
      return Fail(err);
    }
  }

  @Get(":id")
  @Auth(AuthGuard)
  async find({ params }: LoaderFunctionArgs): Promise<Response> {
    try {
      const id = params.id as string;
      const data = await this.service.find(id);
      return Result(data);
    } catch (err) {
      return Fail(err);
    }
  }

  @Put(":id")
  @Auth(AuthGuard)
  @Validate(UserUpdateSchema)
  async update({ request, params }: ActionFunctionArgs): Promise<Response> {
    try {
      const id = params.id as string;
      const body = await request.json();
      const data = await this.service.update(id, body);
      return Result(data);
    } catch (err) {
      return Fail(err);
    }
  }

  @Delete(":id")
  @Auth(AuthGuard)
  async remove({ params }: ActionFunctionArgs): Promise<Response> {
    try {
      const id = params.id as string;
      await this.service.remove(id);
      return Result(undefined, 204);
    } catch (err) {
      return Fail(err);
    }
  }
}
