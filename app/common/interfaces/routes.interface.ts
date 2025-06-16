export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface IRouteDefinition {
  path: string;
  requestMethod: HttpMethod;
  methodName: string | symbol;
}

export const METADATA_KEYS = {
  PREFIX: "prefix",
  ROUTES: "routes",
};
