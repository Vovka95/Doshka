export const AUTH_ERROR = {
  EMAIL_ALREADY_EXISTS: {
    code: 'AUTH_EMAIL_ALREADY_EXISTS',
    message: 'User with this email already exists',
  },

  INVALID_CREDENTIALS: {
    code: 'AUTH_INVALID_CREDENTIALS',
    message: 'Invalid credentials',
  },

  EMAIL_NOT_CONFIRMED: {
    code: 'AUTH_EMAIL_NOT_CONFIRMED',
    message: 'Email is not confirmed',
  },

  ACCESS_DENIED: {
    code: 'AUTH_ACCESS_DENIED',
    message: 'Access denied',
  },

  USER_NOT_FOUND: {
    code: 'AUTH_USER_NOT_FOUND',
    message: 'User not found',
  },
} as const;
