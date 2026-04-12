import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
  className?: string;
  key?: React.Key;
}

export const Card = ({ children, className, ...props }: CardProps) => (
  <div 
    className={cn("bg-white border border-border-light rounded-2xl shadow-sm overflow-hidden", className)} 
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className }: CardProps) => (
  <div className={cn("p-6 border-b border-border-light", className)}>
    {children}
  </div>
);

export const CardContent = ({ children, className }: CardProps) => (
  <div className={cn("p-6", className)}>
    {children}
  </div>
);
