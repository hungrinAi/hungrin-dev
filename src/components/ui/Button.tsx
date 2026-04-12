import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  key?: React.Key;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) => {
  const variants = {
    primary:
      'bg-gradient-to-br from-[#2d7a5f] to-[#1e5c47] text-white ' +
      'shadow-[0_4px_14px_rgba(45,122,95,0.35)] ' +
      'hover:shadow-[0_6px_20px_rgba(45,122,95,0.45)] hover:-translate-y-0.5 hover:from-[#348c6c] hover:to-[#256b54]',
    secondary:
      'bg-g-pale text-g-dark border border-g-dark/10 ' +
      'hover:bg-g-dark hover:text-white hover:-translate-y-0.5 shadow-sm hover:shadow-md',
    outline:
      'bg-white text-g-dark border-2 border-g-dark/25 ' +
      'hover:border-g-dark hover:bg-g-faint hover:-translate-y-0.5 shadow-sm hover:shadow-md',
    ghost:
      'bg-transparent text-text-mid hover:bg-g-faint hover:text-g-dark',
    danger:
      'bg-gradient-to-br from-red-500 to-red-700 text-white ' +
      'shadow-[0_4px_14px_rgba(220,38,38,0.25)] hover:shadow-[0_6px_18px_rgba(220,38,38,0.35)] hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-bold',
        'transition-all duration-200 active:scale-95 active:translate-y-0',
        'disabled:opacity-50 disabled:pointer-events-none disabled:translate-y-0',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
