import { IInfo, ITag } from "~/hooks/swagger/interfaces";
import { useUsers } from "./users";

export function useSwagger() {
  const users = useUsers();

  function getSpec() {
    return {
      openapi: "3.0.0",
      info: getInfo(),
      tags: getTags(),
      components: getComponents(),
      paths: getPaths(),
    };
  }

  function getInfo(): IInfo {
    return {
      description: "Api for Remix",
      version: "1.0.0",
      title: "Remix App",
    };
  }

  function getSecuritySchemes() {
    return {
      Authorization: { type: "apiKey", in: "header", name: "Authorization" },
    };
  }

  function getSchemas() {
    return {};
  }

  function getComponents() {
    return {
      securitySchemes: getSecuritySchemes(),
      schemas: getSchemas(),
    };
  }

  function getTags(): ITag[] {
    return [users.getTag()];
  }

  function getPaths() {
    return {
      ...users.getPath(),
    };
  }

  return {
    getSpec,
  };
}
