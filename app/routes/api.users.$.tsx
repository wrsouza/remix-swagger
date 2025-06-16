//export { action, loader } from "../modules/users";
import { UsersModule } from "../modules/users";
export const loader = UsersModule.handle;
export const action = UsersModule.handle;
