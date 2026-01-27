export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 64;

export const ENCRYPTION_ROUNDS = 10;

export const PASSWORD_REGEX = {
  lowercase: /(?=.*[a-z])/,
  uppercase: /(?=.*[A-Z])/,
  number: /(?=.*\d)/,
  specialChar: /(?=.*\W)/,
};

export const PASSWORD_VALIDATION_ERRORS = {
  lowercase: 'Password must contain lowercase letters',
  uppercase: 'Password must contain uppercase letters',
  number: 'Password must contain numbers',
  specialChar: 'Password must contain special characters',
};

export const CONFIRM_PASSWORD_VALIDATIO_ERRORS = {
  match: 'Passwords do not match',
};
