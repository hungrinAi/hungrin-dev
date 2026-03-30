import React from 'react';
import { cn } from '@/src/lib/utils';

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
    primary: "bg-g-dark text-white hover:bg-g-mid shadow-[0_3px_12px_rgba(45,122,95,0.28)]",
    secondary: "bg-g-pale text-g-dark hover:bg-g-mid hover:text-white shadow-sm",
    outline: "bg-white text-g-dark border-2 border-g-dark/20 hover:border-g-dark/50 hover:bg-g-faint shadow-sm",
    ghost: "bg-transparent text-text-mid hover:bg-g-faint hover:text-g-dark",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-[0_3px_12px_rgba(220,38,38,0.2)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
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
