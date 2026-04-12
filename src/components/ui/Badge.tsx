import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ 
  className, 
  variant = 'default', 
  children,
  ...props 
}: BadgeProps) {
  const variants = {
    default: 'bg-g-dark text-white',
    secondary: 'bg-g-pale text-g-dark',
    outline: 'border border-border-light text-text-mid',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors",
        variants[variant],
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}
