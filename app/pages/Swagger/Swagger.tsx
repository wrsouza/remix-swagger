import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { useSwagger } from "~/hooks";

export function SwaggerPage() {
  const { spec } = useSwagger();
  return <SwaggerUI spec={spec} />;
}
