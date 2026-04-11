import { useState, useCallback } from 'react';
import type { Validator } from '@/src/lib/validators';

type FieldRules<T extends Record<string, string>> = Partial<{
  [K in keyof T]: Validator;
}>;

interface UseFormOptions<T extends Record<string, string>> {
  initialValues: T;
  rules?: FieldRules<T>;
}

interface UseFormReturn<T extends Record<string, string>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (field: keyof T) => () => void;
  setValue: (field: keyof T, value: string) => void;
  validateAll: () => boolean;
  reset: () => void;
}

export function useForm<T extends Record<string, string>>({
  initialValues,
  rules = {},
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (field: keyof T, value: string): string | undefined => {
      const validator = rules[field];
      return validator ? validator(value) : undefined;
    },
    [rules]
  );

  const handleChange = (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const setValue = (field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    const newTouched: Partial<Record<keyof T, boolean>> = {};
    let valid = true;

    for (const field of Object.keys(values) as (keyof T)[]) {
      newTouched[field] = true;
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        valid = false;
      }
    }

    setTouched(newTouched);
    setErrors(newErrors);
    return valid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, handleChange, handleBlur, setValue, validateAll, reset };
}
