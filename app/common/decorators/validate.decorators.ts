import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ZodSchema } from "zod";
import { ErrorFormat, ErrorResponse } from "~/common";

export function formatErrors(error: ErrorFormat) {
  const response: ErrorResponse = {};
  for (const field of Object.keys(error)) {
    if (!Array.isArray(error[field])) {
      response[field] = [];
      Object.values(error[field]).forEach((err) => {
        if (Array.isArray(err) && err.length) {
          response[field].push(err[0]);
        } else if (!Array.isArray(err)) {
          response[field].push(err._errors[0]);
        }
      });
    }
  }
  return response;
}

export function Validate(schema: ZodSchema) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      data: LoaderFunctionArgs | ActionFunctionArgs
    ) {
      const requestClone = data.request.clone();

      const body = await requestClone.json();
      const validation = schema.safeParse(body);

      if (!validation.success) {
        const response = formatErrors(validation.error.format());
        return new Response(JSON.stringify(response), {
          status: 400,
          statusText: "Bad Request",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      return originalMethod.call(this, data);
    };
  };
}
