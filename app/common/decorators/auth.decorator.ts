import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Fail, IGuard } from "~/common";

export function Auth(guard: IGuard) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (
      data: LoaderFunctionArgs | ActionFunctionArgs
    ) {
      try {
        const requestClone = data.request.clone();
        await guard.validate(requestClone);
        return originalMethod.call(this, data);
      } catch (err) {
        return Fail(err);
      }
    };
  };
}
