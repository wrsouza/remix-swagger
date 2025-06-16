/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpMethod, IRouteDefinition, METADATA_KEYS } from "~/common";

function createRouter(method: HttpMethod) {
  return (path: string = ""): MethodDecorator => {
    return (
      target: any,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) => {
      const controllerClass = target.constructor;
      const routes: IRouteDefinition[] =
        Reflect.getMetadata(METADATA_KEYS.ROUTES, controllerClass) || [];
      routes.push({
        path,
        requestMethod: method,
        methodName: propertyKey,
      });
      Reflect.defineMetadata(METADATA_KEYS.ROUTES, routes, controllerClass);
    };
  };
}

export const Get = createRouter("GET");
export const Post = createRouter("POST");
export const Put = createRouter("PUT");
export const Patch = createRouter("PATCH");
export const Delete = createRouter("DELETE");
