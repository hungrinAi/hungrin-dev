export type Validator<T = string> = (value: T) => string | undefined;

export const required =
  (message = 'This field is required'): Validator =>
  (value) =>
    value.trim() === '' ? message : undefined;

export const email =
  (message = 'Enter a valid email address'): Validator =>
  (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : message;

export const minLength =
  (min: number, message?: string): Validator =>
  (value) =>
    value.length >= min ? undefined : message ?? `Must be at least ${min} characters`;

export const maxLength =
  (max: number, message?: string): Validator =>
  (value) =>
    value.length <= max ? undefined : message ?? `Must be no more than ${max} characters`;

export const pattern =
  (regex: RegExp, message: string): Validator =>
  (value) =>
    regex.test(value) ? undefined : message;

export const strongPassword: Validator = (value) => {
  if (value.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
  if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
  return undefined;
};

/** Run multiple validators in order; returns first error found. */
export const composeValidators =
  <T = string>(...validators: Validator<T>[]): Validator<T> =>
  (value) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return undefined;
  };
