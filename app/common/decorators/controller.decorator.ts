/* eslint-disable @typescript-eslint/no-explicit-any */

import { METADATA_KEYS } from "~/common";

export function Controller(prefix: string) {
  return function (target: any) {
    Reflect.defineMetadata(METADATA_KEYS.PREFIX, prefix, target);
    if (!Reflect.hasMetadata(METADATA_KEYS.ROUTES, target)) {
      Reflect.defineMetadata(METADATA_KEYS.ROUTES, [], target);
    }
  };
}
