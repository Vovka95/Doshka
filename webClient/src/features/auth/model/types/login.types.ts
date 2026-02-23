import type { RefreshResponse } from "./refresh.types";
import type { User } from "./user.types";

export type LoginResponse = RefreshResponse & {
    user: User;
};
