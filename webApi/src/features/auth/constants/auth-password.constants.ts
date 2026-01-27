export const AUTH_PASSWORD = {
  HASH_ROUNDS: 10,

  MIN_LENGTH: 6,
  MAX_LENGTH: 64,

  REGEX: {
    LOWERCASE: /(?=.*[a-z])/,
    UPPERCASE: /(?=.*[A-Z])/,
    NUMBER: /(?=.*\d)/,
    SPECIAL_CHAR: /(?=.*\W)/,
  },

  MESSAGES: {
    MIN_LENGTH: 'Password must be at least 6 characters',
    MAX_LENGTH: 'Password must be at most 64 characters',
    LOWERCASE: 'Password must contain a lowercase letter',
    UPPERCASE: 'Password must contain an uppercase letter',
    NUMBER: 'Password must contain a number',
    SPECIAL_CHAR: 'Password must contain a special character',
    CONFIRM_MATCH: 'Passwords do not match',
  },
} as const;
