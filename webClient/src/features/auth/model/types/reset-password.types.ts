import type { MessageResponse } from "@/shared/model";
import type { ResetPasswordValues } from "../schemas";

export type ResetPasswordDto = ResetPasswordValues & { token: string };

export type ResetPasswordResponse = MessageResponse;
