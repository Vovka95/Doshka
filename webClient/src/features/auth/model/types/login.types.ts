import type { LoginValues } from "../schemas";
import type { RefreshResponse } from "./refresh.types";
import type { User } from "./user.types";

export type LoginDto = LoginValues;

export type LoginResponse = RefreshResponse & {
    user: User;
};
