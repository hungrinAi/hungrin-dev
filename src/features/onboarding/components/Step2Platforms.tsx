'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PLATFORMS } from '../data/constants';
import type { OnboardingForm } from '../types';

interface Step2Props {
  form: OnboardingForm;
  errors: Record<string, string>;
  onTogglePlatform: (id: string) => void;
}

function UberEatsLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      <rect width="48" height="48" rx="10" fill="#000"/>
      <path d="M10 24c0-7.18 5.82-13 13-13s13 5.82 13 13c0 3.59-1.46 6.84-3.82 9.18A12.95 12.95 0 0123 37c-7.18 0-13-5.82-13-13z" fill="#06C167"/>
      <text x="24" y="29" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="sans-serif">eats</text>
    </svg>
  );
}

function DeliverooLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      <rect width="48" height="48" rx="10" fill="#00CCBC"/>
      {/* Kangaroo silhouette simplified */}
      <text x="24" y="31" textAnchor="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="sans-serif">D</text>
      {/* Roo tail detail */}
      <circle cx="33" cy="20" r="3" fill="white" opacity="0.3"/>
    </svg>
  );
}

function JustEatLogo() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      <rect width="48" height="48" rx="10" fill="#FF6600"/>
      {/* Fork icon */}
      <rect x="20" y="10" width="3" height="14" rx="1.5" fill="white"/>
      <rect x="25" y="10" width="3" height="14" rx="1.5" fill="white"/>
      <rect x="30" y="10" width="3" height="14" rx="1.5" fill="white"/>
      <path d="M21.5 22 Q25 26 28.5 22" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="23.5" y="24" width="1" height="12" rx="0.5" fill="white"/>
    </svg>
  );
}

const PLATFORM_LOGO: Record<string, React.ReactNode> = {
  uber: <UberEatsLogo />,
  deliveroo: <DeliverooLogo />,
  justeat: <JustEatLogo />,
};

export function Step2Platforms({ form, errors, onTogglePlatform }: Step2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-text-dark">Connect Platforms</h1>
        <p className="text-sm text-text-muted mt-1">
          Connect your accounts to sync sales data. Select all that apply.
        </p>
      </div>

      <div className="bg-[#f6fdf9] border border-[#d1f0e4] rounded-2xl px-4 py-3 flex items-center gap-3">
        <span className="text-lg">🔒</span>
        <p className="text-xs text-text-mid leading-relaxed">
          Your data is <strong className="text-text-dark">100% secure</strong>. We only read order
          history — never modify your account.
        </p>
      </div>

      <div className="space-y-3">
        {PLATFORMS.map(p => {
          const selected = form.platforms.includes(p.id);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onTogglePlatform(p.id)}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group',
                selected
                  ? 'border-g-dark bg-[#f0faf5] shadow-sm'
                  : 'border-border-light bg-white hover:border-g-dark/30 hover:shadow-sm',
              )}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden bg-gray-50">
                {PLATFORM_LOGO[p.id]}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-text-dark">{p.name}</p>
                <p className="text-xs text-text-muted">{p.desc}</p>
              </div>
              <div
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                  selected ? 'bg-g-dark border-g-dark' : 'border-gray-200 group-hover:border-g-dark/40',
                )}
              >
                {selected && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
            </button>
          );
        })}
      </div>

      {form.platforms.length > 0 ? (
        <div className="bg-[#f0faf5] border border-[#d1f0e4] rounded-2xl p-4 flex items-center gap-3">
          <span className="text-xl">✅</span>
          <p className="text-xs font-bold text-g-dark">
            {form.platforms.length} platform{form.platforms.length > 1 ? 's' : ''} selected — great choice!
          </p>
        </div>
      ) : errors.platforms ? (
        <p className="text-[10px] font-bold text-red-500">{errors.platforms}</p>
      ) : null}
    </div>
  );
}
