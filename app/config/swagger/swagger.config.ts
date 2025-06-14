import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { registerUser } from "~/modules/users/swagger";

export const generateDocument = () => {
  const registry = new OpenAPIRegistry();

  registry.registerComponent("securitySchemes", "Auth", {
    type: "apiKey",
    in: "header",
    name: "Authorization",
  });

  registerUser(registry);

  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Remix App",
      description: "Api for Remix",
    },
  });
};
