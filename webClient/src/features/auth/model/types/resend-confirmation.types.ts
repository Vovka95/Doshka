import type { MessageResponse } from "@/shared/model";

export type ResendConfirmationDto = {
    email: string;
};

export type ResendConfirmationResponse = MessageResponse;
