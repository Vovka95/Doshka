import { z } from "zod";

export const AUTH_FIRST_NAME = {
    MIN_LENGTH: 1,
    MESSAGES: {
        REQUIRED: "auth.validation.firstName.required",
    },
} as const;

export const AUTH_LAST_NAME = {
    MIN_LENGTH: 1,
    MESSAGES: {
        REQUIRED: "auth.validation.lastName.required",
    },
} as const;

export const AUTH_EMAIL = {
    MIN_LENGTH: 1,
    REGEX: {
        EMAIL: z.regexes.email,
    },

    MESSAGES: {
        REQUIRED: "auth.validation.email.required",
        VALID: "auth.validation.email.invalid",
    },
} as const;

export const AUTH_PASSWORD = {
    NOT_EMPTY_LENGTH: 1,
    MIN_LENGTH: 6,
    MAX_LENGTH: 64,

    REGEX: {
        LOWERCASE: /(?=.*[a-z])/,
        UPPERCASE: /(?=.*[A-Z])/,
        NUMBER: /(?=.*\d)/,
        SPECIAL_CHAR: /(?=.*\W)/,
    },

    MESSAGES: {
        REQUIRED: "auth.validation.password.required",
        MIN_LENGTH: "auth.validation.password.minLength",
        MAX_LENGTH: "auth.validation.password.maxLength",
        LOWERCASE: "auth.validation.password.lowercase",
        UPPERCASE: "auth.validation.password.uppercase",
        NUMBER: "auth.validation.password.number",
        SPECIAL_CHAR: "auth.validation.password.specialChar",
        CONFIRM_MATCH: "auth.validation.password.confirmMatch",
    },
} as const;
