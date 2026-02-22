import { z } from "zod";

export const AUTH_FIRST_NAME = {
    MIN_LENGTH: 1,
    MESSAGES: {
        REQUIRED: "First name is required.",
    },
} as const;

export const AUTH_LAST_NAME = {
    MIN_LENGTH: 1,
    MESSAGES: {
        REQUIRED: "Last name is required.",
    },
} as const;

export const AUTH_EMAIL = {
    MIN_LENGTH: 1,
    REGEX: {
        EMAIL: z.regexes.email,
    },

    MESSAGES: {
        REQUIRED: "Email is required.",
        VALID: "Invalid email",
    },
} as const;

export const AUTH_PASSWORD = {
    MIN_LENGTH: 6,
    MAX_LENGTH: 64,

    REGEX: {
        LOWERCASE: /(?=.*[a-z])/,
        UPPERCASE: /(?=.*[A-Z])/,
        NUMBER: /(?=.*\d)/,
        SPECIAL_CHAR: /(?=.*\W)/,
    },

    MESSAGES: {
        MIN_LENGTH: "Password must be at least 6 characters",
        MAX_LENGTH: "Password must be at most 64 characters",
        LOWERCASE: "Password must contain a lowercase letter",
        UPPERCASE: "Password must contain an uppercase letter",
        NUMBER: "Password must contain a number",
        SPECIAL_CHAR: "Password must contain a special character",
        CONFIRM_MATCH: "Passwords do not match",
    },
} as const;
