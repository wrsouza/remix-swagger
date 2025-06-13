import { ITag } from "~/hooks/swagger/interfaces";
import { useFindUsers } from "~/hooks/swagger/users/useFindUsers";

export function useUsers() {
  const findUsers = useFindUsers();

  function getTag(): ITag {
    return {
      name: "Users",
      description: "user management",
    };
  }

  function getPath() {
    return { ...findUsers.getPath() };
  }

  return {
    getTag,
    getPath,
  };
}
