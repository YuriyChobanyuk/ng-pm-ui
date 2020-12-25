export const INVALID_EMAIL = 'Should be valid email';
export const INVALID_PASSWORD = 'Should contain uppercase, lowercase and symbol';
export const INVALID_PASSWORD_LENGTH = 'Should be at least 8 chars long';
export const REQUIRED = 'This field is required';
// At least one uppercase char and one lowercase char, one symbol and one digit
export const PASSWORD_REG_EXP = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
