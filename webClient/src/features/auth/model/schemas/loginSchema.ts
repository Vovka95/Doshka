import { z } from "zod";

import { AUTH_EMAIL, AUTH_PASSWORD } from "../../config";

const email = z
    .string()
    .min(AUTH_EMAIL.MIN_LENGTH, AUTH_EMAIL.MESSAGES.REQUIRED);
const password = z
    .string()
    .min(AUTH_PASSWORD.NOT_EMPTY_LENGTH, AUTH_PASSWORD.MESSAGES.REQUIRED);

export const loginSchema = z.object({
    email,
    password,
});

export type LoginValues = z.infer<typeof loginSchema>;
