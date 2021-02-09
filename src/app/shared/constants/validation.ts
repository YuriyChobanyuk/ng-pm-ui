// At least one uppercase char and one lowercase char, one symbol and one digit
export const PASSWORD_REG_EXP = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
