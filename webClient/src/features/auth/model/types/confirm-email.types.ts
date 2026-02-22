import type { MessageResponse } from "@/shared/model";

export type ConfirmEmailDto = {
    token: string;
};

export type ConfirmEmailResponse = MessageResponse;
