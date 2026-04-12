'use client';

import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { STEP3_STATS } from '../data/constants';
import type { OnboardingForm } from '../types';

interface Step3Props {
  form: OnboardingForm;
  onLaunch: () => void;
  onSkip: () => void;
}

const PLATFORM_LINKS = [
  { id: 'uber',      label: 'Uber Eats',  color: 'bg-black text-white',         href: 'https://restaurant.uber.com' },
  { id: 'deliveroo', label: 'Deliveroo',  color: 'bg-[#00CCBC] text-white',     href: 'https://restaurant-hub.deliveroo.com' },
  { id: 'justeat',   label: 'Just Eat',   color: 'bg-[#FF6600] text-white',     href: 'https://restaurants.just-eat.co.uk' },
];

export function Step3Promo({ form, onLaunch, onSkip }: Step3Props) {
  const hasEmailData = form.emailConsent || form.csvFileName;
  const connectedPlatforms = PLATFORM_LINKS.filter(p => form.platforms.includes(p.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-text-dark">Your AI Promotion</h1>
        <p className="text-sm text-text-muted mt-1">
          Hungrin has prepared your first smart promotion based on your restaurant profile.
        </p>
      </div>

      {/* Accuracy badge if data was connected */}
      {hasEmailData && (
        <div className="flex items-center gap-2 bg-[#eaf6f0] border border-[#d1f0e4] rounded-2xl px-4 py-2.5">
          <Sparkles className="w-4 h-4 text-g-dark shrink-0" />
          <p className="text-xs font-bold text-g-dark">
            Personalised using your sales data — higher accuracy
          </p>
        </div>
      )}

      {/* Promo card */}
      <div className="relative bg-gradient-to-br from-[#1a4d3a] to-[#2d7a5f] rounded-3xl p-6 overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -left-4 bottom-0 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl shrink-0">
            🍔
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-orange-400 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                🔥 HOT DEAL
              </span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                High conversion
              </span>
            </div>
            <p className="text-white font-black text-lg leading-tight">Burger Bundle!</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-white font-black text-2xl">£12.99</span>
              <span className="text-white/50 text-sm line-through">£16.99</span>
            </div>
            <p className="text-white/60 text-xs mt-1">Only 7 slots left today · Auto-Monday Traffic</p>
          </div>
        </div>
        <button
          onClick={onLaunch}
          className="relative z-10 mt-4 w-full py-3 bg-white text-g-dark rounded-2xl text-sm font-black hover:bg-g-pale transition-all"
        >
          Save This Promotion →
        </button>
      </div>

      {/* Platform publishing — honest: manual publish through each portal */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-text-dark">Publish on your platforms</p>
        <p className="text-[11px] text-text-muted leading-relaxed">
          Copy this promo and publish it through each platform&apos;s own restaurant portal. We&apos;ll track how each one performs from your dashboard.
        </p>
        <div className="flex gap-2 flex-wrap mt-2">
          {(connectedPlatforms.length > 0 ? connectedPlatforms : PLATFORM_LINKS).map(p => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${p.color} text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:opacity-90 transition-opacity`}
            >
              {p.label}
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {STEP3_STATS.map(s => (
          <div
            key={s.label}
            className="bg-[#f6fdf9] border border-[#d1f0e4] rounded-2xl p-3 text-center"
          >
            <p className="text-lg font-black text-g-dark">{s.val}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Skip */}
      <button
        type="button"
        onClick={onSkip}
        className="w-full text-center text-xs text-text-muted hover:text-g-dark transition-colors py-1"
      >
        Skip for now — I&apos;ll launch a promo from my dashboard later →
      </button>
    </div>
  );
}
