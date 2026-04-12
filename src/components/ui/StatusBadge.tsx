import React from 'react';
import { cn } from '@/src/lib/utils';

type Status =
  | 'active'   | 'Active'
  | 'paused'   | 'Paused'
  | 'ended'    | 'Ended'
  | 'pending'  | 'Pending'
  | 'completed'| 'Completed'
  | 'paid'     | 'Paid'
  | 'invited'  | 'Invited'
  | (string & {});  // allow arbitrary strings — falls back to default style

const STYLE_MAP: Record<string, string> = {
  active:    'bg-g-pale text-g-dark',
  Active:    'bg-g-pale text-g-dark',
  completed: 'bg-g-pale text-g-dark',
  Completed: 'bg-g-pale text-g-dark',
  paid:      'bg-g-pale text-g-dark',
  Paid:      'bg-g-pale text-g-dark',
  paused:    'bg-yellow-50 text-yellow-700',
  Paused:    'bg-yellow-50 text-yellow-700',
  pending:   'bg-amber-100 text-amber-700',
  Pending:   'bg-amber-100 text-amber-700',
  invited:   'bg-amber-100 text-amber-700',
  Invited:   'bg-amber-100 text-amber-700',
  ended:     'bg-gray-100 text-gray-500',
  Ended:     'bg-gray-100 text-gray-500',
};

interface StatusBadgeProps {
  status: Status;
  /** Show a leading coloured dot (default true) */
  dot?: boolean;
  className?: string;
}

/**
 * Consistent status pill used across Orders, Campaigns, and Billing.
 * Pass any known status string — unknown values fall back to a neutral grey style.
 */
export function StatusBadge({ status, dot = true, className }: StatusBadgeProps) {
  const style = STYLE_MAP[status] ?? 'bg-gray-100 text-gray-600';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap',
        style,
        className
      )}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />}
      {status}
    </span>
  );
}
