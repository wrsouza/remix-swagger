import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { IRouteDefinition, METADATA_KEYS } from "~/common";
import { getConnection } from "~/config/database";
import { UserRepository } from "~/repositories";
import { IUserController, UserController } from "./controllers";
import { UserMapper } from "./mappers";
import { QueryFilterService, UserService } from "./providers";

export class UsersModule {
  static matchRoute(pattern: string, url: string): boolean {
    const patternSegments = pattern.split("/").filter(Boolean);
    const urlSegments = url.split("/").filter(Boolean);

    if (patternSegments.length !== urlSegments.length) {
      return false;
    }

    for (let i = 0; i < patternSegments.length; i++) {
      const patternSegment = patternSegments[i];
      const urlSegment = urlSegments[i];

      if (patternSegment.startsWith(":")) {
        continue;
      }

      if (patternSegment !== urlSegment) {
        return false;
      }
    }

    return true;
  }

  static handle(data: LoaderFunctionArgs | ActionFunctionArgs) {
    const { request } = data;
    const url = new URL(request.url);
    const baseUrl = url.origin;
    const defaultUrl = request.url.replace(baseUrl, "").split("?")[0];

    const method = request.method;
    const prefix = Reflect.getMetadata(METADATA_KEYS.PREFIX, UserController);
    const routes: IRouteDefinition[] = Reflect.getMetadata(
      METADATA_KEYS.ROUTES,
      UserController
    );

    for (const route of routes) {
      const fullPath = `/${prefix}${
        route.path ? "/" + route.path : ""
      }`.replace("//", "/");
      const isRouteMatch = UsersModule.matchRoute(fullPath, defaultUrl);
      console.log(isRouteMatch, fullPath, defaultUrl);
      if (isRouteMatch && method === route.requestMethod) {
        const controller = UsersModule.getController();
        return controller[route.methodName as keyof UserController](data);
      }
    }

    return new Response(undefined, {
      status: 404,
      statusText: "Not Found",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static getController(): IUserController {
    const filterService = new QueryFilterService();
    const prismaClient = getConnection();
    const repository = new UserRepository(prismaClient);
    const mapper = new UserMapper();
    const service = new UserService(filterService, repository, mapper);
    return new UserController(service);
  }
}
