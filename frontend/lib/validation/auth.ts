export const NAME_MIN = 2;
export const NAME_MAX = 50;

export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 20;

export function validateName(name: string, field: string): string | null {
  if (!name) return `${field} is required`;
  if (name.length < NAME_MIN)
    return `${field} must be at least ${NAME_MIN} characters`;
  if (name.length > NAME_MAX)
    return `${field} must be less than ${NAME_MAX} characters`;
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < PASSWORD_MIN)
    return `Password must be at least ${PASSWORD_MIN} characters`;
  if (password.length > PASSWORD_MAX) return `Maximum password length is ${PASSWORD_MAX} characters`;
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  return null;
}
export function validateTerms(terms: boolean): string | null {
  if (!terms) return "You must accept Terms and Privacy Policy";
  return null;
}

type LoginErrors = {
  email?: string;
  password?: string;
  terms?: string;
};

export function validateLoginForm(data: {
  email: string;
  password: string;
  terms: boolean;
}): LoginErrors {
  const errors: LoginErrors = {};

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  const termsError = validateTerms(data.terms);
  if (termsError) errors.terms = termsError;

  return errors;
}
type SignUpErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  terms?: string;
};

export function validateSignUpForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}): SignUpErrors {
  const errors: SignUpErrors = {};

  const firstNameError = validateName(data.firstName, "First name");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateName(data.lastName, "Last name");
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  const termsError = validateTerms(data.terms);
  if (termsError) errors.terms = termsError;

  return errors;
}