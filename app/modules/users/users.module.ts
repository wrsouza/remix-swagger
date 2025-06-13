import { Database } from "~/config/database";
import { UserRepository } from "~/repositories";
import { IUserController, UserController } from "./controllers";
import { UserMapper } from "./mappers";
import { QueryFilterService, UserService } from "./providers";

export class UsersModule {
  static getController(request: Request): IUserController {
    const params = new URLSearchParams(request.url.split("?")[1]);
    const filterService = new QueryFilterService(params);

    const database = new Database();
    const repository = new UserRepository(database);
    const mapper = new UserMapper();
    const service = new UserService(filterService, repository, mapper);
    return new UserController(service);
  }
}
