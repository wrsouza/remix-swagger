import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { MethodNotAllowedException } from "~/common";

export function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  return new Response(JSON.stringify({ data: {}, id }), { status: 200 });
}

export function action({ request }: ActionFunctionArgs) {
  if (request.method !== "PUT" && request.method !== "DELETE") {
    throw new MethodNotAllowedException(`Method ${request.method} not allowed`);
  }
}
