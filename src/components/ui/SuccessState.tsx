import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface SuccessStateProps {
  title: string;
  message?: string;
  onDone: () => void;
  doneLabel?: string;
  variant?: 'success' | 'warning' | 'danger';
  details?: Array<{ label: string; value: string }>;
}

const VARIANTS = {
  success: { bg: 'bg-g-pale', icon: CheckCircle2, iconColor: 'text-g-dark' },
  warning: { bg: 'bg-yellow-50', icon: AlertTriangle, iconColor: 'text-yellow-600' },
  danger:  { bg: 'bg-red-50',    icon: AlertTriangle, iconColor: 'text-red-500' },
};

/** Standard success/confirmation screen used at the end of every modal flow. */
export function SuccessState({ title, message, onDone, doneLabel = 'Done', variant = 'success', details }: SuccessStateProps) {
  const { bg, icon: Icon, iconColor } = VARIANTS[variant];
  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center', bg)}>
        <Icon className={cn('w-8 h-8', iconColor)} />
      </div>
      <div className="space-y-1.5">
        <p className="font-bold text-text-dark text-base">{title}</p>
        {message && <p className="text-sm text-text-muted leading-relaxed max-w-xs mx-auto">{message}</p>}
      </div>
      {details && details.length > 0 && (
        <div className="w-full p-3 bg-g-faint rounded-xl border border-border-light text-left space-y-1.5">
          {details.map(d => (
            <div key={d.label} className="flex justify-between text-xs">
              <span className="text-text-muted">{d.label}</span>
              <span className="font-bold text-text-dark">{d.value}</span>
            </div>
          ))}
        </div>
      )}
      <Button className="w-full" onClick={onDone}>{doneLabel}</Button>
    </div>
  );
}
