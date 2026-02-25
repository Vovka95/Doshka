import { z } from "zod";

import { AUTH_EMAIL } from "../../config";

const email = z
    .string()
    .min(AUTH_EMAIL.MIN_LENGTH, AUTH_EMAIL.MESSAGES.REQUIRED);

export const forgotPasswordSchema = z.object({
    email,
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
