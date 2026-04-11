import React from 'react';
import { cn } from '@/src/lib/utils';

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Reusable label + input + error/hint wrapper. Drop any <input> as children. */
export function FormField({ label, error, hint, required, className, children }: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="block text-xs font-bold text-text-dark">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-[10px] font-semibold text-red-500 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-500 shrink-0 inline-block" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-[10px] text-text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

/** Standard input class — pass `error` for red border state. */
export function inputCls(error?: string) {
  return cn(
    'w-full bg-g-faint border rounded-xl px-4 py-2.5 text-sm outline-none transition-all',
    'focus:ring-2 placeholder:text-text-muted/50',
    error
      ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
      : 'border-border-light focus:border-g-dark focus:ring-g-pale'
  );
}
