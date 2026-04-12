'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STEPS } from '../data/constants';

interface StepBreadcrumbProps {
  currentStep: number;
}

export function StepBreadcrumb({ currentStep }: StepBreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
      {STEPS.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all',
                currentStep > s.id
                  ? 'bg-g-dark text-white'
                  : currentStep === s.id
                    ? 'bg-g-dark text-white shadow-[0_0_0_4px_#d1f0e4]'
                    : 'bg-gray-100 text-gray-400',
              )}
            >
              {currentStep > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
            </div>
            <span
              className={cn(
                'text-[11px] font-bold whitespace-nowrap transition-colors',
                currentStep === s.id ? 'text-g-dark' : 'text-text-muted',
              )}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                'flex-1 min-w-[20px] max-w-[60px] h-0.5 rounded-full transition-all',
                currentStep > s.id ? 'bg-g-dark' : 'bg-gray-100',
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
