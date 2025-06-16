import { useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import { generateDocument } from "~/config/swagger";

export default function Docs() {
  const [spec] = useState(generateDocument());
  return <SwaggerUI spec={spec} />;
}
