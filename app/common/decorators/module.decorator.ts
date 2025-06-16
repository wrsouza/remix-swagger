/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { IRouteDefinition, METADATA_KEYS } from "~/common";

function matchRoute(pattern: string, url: string): boolean {
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

export function Module(controllerClass: any) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (
      data: LoaderFunctionArgs | ActionFunctionArgs
    ) {
      const { request } = data;
      const url = new URL(request.url);
      const baseUrl = url.origin;
      const defaultUrl = request.url.replace(baseUrl, "").split("?")[0];

      const method = request.method;
      const prefix = Reflect.getMetadata(METADATA_KEYS.PREFIX, controllerClass);
      const routes: IRouteDefinition[] = Reflect.getMetadata(
        METADATA_KEYS.ROUTES,
        controllerClass
      );

      for (const route of routes) {
        const fullPath = `/${prefix}${
          route.path ? "/" + route.path : ""
        }`.replace("//", "/");
        const isRouteMatch = matchRoute(fullPath, defaultUrl);
        if (isRouteMatch && method === route.requestMethod) {
          const controller = originalMethod.call(this, data);
          return controller[route.methodName](data);
        }
      }

      return new Response(undefined, {
        status: 404,
        statusText: "Not Found",
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
  };
}
