import { Module } from "~/common";
import { getConnection } from "~/config/database";
import { UserRepository } from "~/repositories";
import { UserController } from "./controllers";
import { UserMapper } from "./mappers";
import { QueryFilterService, UserService } from "./providers";

export class UsersModule {
  @Module(UserController)
  static handle() {
    const filterService = new QueryFilterService();
    const prismaClient = getConnection();
    const repository = new UserRepository(prismaClient);
    const mapper = new UserMapper();
    const service = new UserService(filterService, repository, mapper);
    return new UserController(service);
  }
}
