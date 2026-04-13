'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PLATFORMS } from '../data/constants';
import type { OnboardingForm } from '../types';

interface Step2Props {
  form: OnboardingForm;
  errors: Record<string, string>;
  onTogglePlatform: (id: string) => void;
}

const PLATFORM_LOGO: Record<string, { src: string; alt: string }> = {
  uber:      { src: '/images/platforms/uber-eats.svg',  alt: 'Uber Eats'  },
  deliveroo: { src: '/images/platforms/deliveroo.svg',  alt: 'Deliveroo'  },
  justeat:   { src: '/images/platforms/just-eat.svg',   alt: 'Just Eat'   },
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
<<<<<<< HEAD
              <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden', p.bg)}>
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span className="text-2xl">{p.emoji}</span>
=======
              <div className="w-14 h-14 rounded-2xl shrink-0 overflow-hidden shadow-sm">
                {PLATFORM_LOGO[p.id] && (
                  <Image
                    src={PLATFORM_LOGO[p.id].src}
                    alt={PLATFORM_LOGO[p.id].alt}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
>>>>>>> a57bb53724bb3d20f5b7d0e8f273295089a036cb
                )}
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