//export { loader, action } from "../modules/users/user-id";
import { UsersModule } from "../modules/users";
export const loader = UsersModule.handle;
export const action = UsersModule.handle;
