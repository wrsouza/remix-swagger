import { useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import { generateDocument } from "~/config/swagger";

export function SwaggerPage() {
  const [spec] = useState(generateDocument());
  return <SwaggerUI spec={spec} />;
}
