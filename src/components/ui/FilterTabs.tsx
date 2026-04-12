import React from 'react';
import { cn } from '@/src/lib/utils';

interface FilterTabsProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Horizontally-scrollable pill tab bar — used for filtering lists.
 * Scrolls on mobile without a scrollbar, wraps natively on wider screens.
 */
export function FilterTabs({ options, value, onChange, className }: FilterTabsProps) {
  return (
    <div className={cn('overflow-x-auto no-scrollbar shrink-0', className)}>
      <div className="flex bg-g-faint p-1 rounded-xl border border-border-light w-max min-w-full sm:min-w-0 gap-0.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              'px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap',
              value === opt
                ? 'bg-g-dark text-white shadow-md'
                : 'text-text-mid hover:bg-g-pale hover:text-g-dark'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
