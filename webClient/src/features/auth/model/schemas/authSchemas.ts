import { z } from "zod";
import {
    AUTH_EMAIL,
    AUTH_FIRST_NAME,
    AUTH_LAST_NAME,
    AUTH_PASSWORD,
} from "../../config";

const email = z
    .string()
    .min(AUTH_EMAIL.MIN_LENGTH, AUTH_EMAIL.MESSAGES.REQUIRED)
    .regex(AUTH_EMAIL.REGEX.EMAIL, AUTH_EMAIL.MESSAGES.VALID);

const password = z
    .string()
    .min(AUTH_PASSWORD.MIN_LENGTH, AUTH_PASSWORD.MESSAGES.MIN_LENGTH)
    .max(AUTH_PASSWORD.MAX_LENGTH, AUTH_PASSWORD.MESSAGES.MAX_LENGTH)
    .regex(AUTH_PASSWORD.REGEX.LOWERCASE, AUTH_PASSWORD.MESSAGES.LOWERCASE)
    .regex(AUTH_PASSWORD.REGEX.UPPERCASE, AUTH_PASSWORD.MESSAGES.MAX_LENGTH)
    .regex(AUTH_PASSWORD.REGEX.NUMBER, AUTH_PASSWORD.MESSAGES.NUMBER)
    .regex(
        AUTH_PASSWORD.REGEX.SPECIAL_CHAR,
        AUTH_PASSWORD.MESSAGES.SPECIAL_CHAR,
    );

const firstName = z
    .string()
    .min(AUTH_FIRST_NAME.MIN_LENGTH, AUTH_FIRST_NAME.MESSAGES.REQUIRED);

const lastName = z
    .string()
    .min(AUTH_LAST_NAME.MIN_LENGTH, AUTH_LAST_NAME.MESSAGES.REQUIRED);

const confirmPassword = z.string();

export const signupSchema = z
    .object({
        firstName,
        lastName,
        email,
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

export type SignupValues = z.infer<typeof signupSchema>;
