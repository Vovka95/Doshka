import { z } from "zod";
import { AUTH_PASSWORD } from "../../config";

const password = z
    .string()
    .min(AUTH_PASSWORD.NOT_EMPTY_LENGTH, AUTH_PASSWORD.MESSAGES.REQUIRED)
    .min(AUTH_PASSWORD.MIN_LENGTH, AUTH_PASSWORD.MESSAGES.MIN_LENGTH)
    .max(AUTH_PASSWORD.MAX_LENGTH, AUTH_PASSWORD.MESSAGES.MAX_LENGTH)
    .regex(AUTH_PASSWORD.REGEX.LOWERCASE, AUTH_PASSWORD.MESSAGES.LOWERCASE)
    .regex(AUTH_PASSWORD.REGEX.UPPERCASE, AUTH_PASSWORD.MESSAGES.UPPERCASE)
    .regex(AUTH_PASSWORD.REGEX.NUMBER, AUTH_PASSWORD.MESSAGES.NUMBER)
    .regex(
        AUTH_PASSWORD.REGEX.SPECIAL_CHAR,
        AUTH_PASSWORD.MESSAGES.SPECIAL_CHAR,
    );

const confirmPassword = z.string();

export const resetPasswordSchema = z
    .object({
        password,
        confirmPassword,
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: AUTH_PASSWORD.MESSAGES.CONFIRM_MATCH,
                path: ["confirmPassword"],
            });
        }
    });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
