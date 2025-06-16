import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export interface IUserController {
  paginate(data: LoaderFunctionArgs): Promise<Response>;
  create(data: ActionFunctionArgs): Promise<Response>;
  find(data: LoaderFunctionArgs): Promise<Response>;
  update(data: ActionFunctionArgs): Promise<Response>;
  remove(data: ActionFunctionArgs): Promise<Response>;
}
