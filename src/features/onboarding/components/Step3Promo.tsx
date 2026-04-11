'use client';

import React from 'react';
import { STEP3_STATS } from '../data/constants';

interface Step3Props {
  onLaunch: () => void;
}

export function Step3Promo({ onLaunch }: Step3Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-text-dark">Your AI Promotion</h1>
        <p className="text-sm text-text-muted mt-1">Hungrin has prepared your first smart promotion.</p>
      </div>

      <div className="relative bg-gradient-to-br from-[#1a4d3a] to-[#2d7a5f] rounded-3xl p-6 overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -left-4 bottom-0 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl shrink-0">
            🍔
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
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
          Launch This Promotion →
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold text-text-dark">This promo will be pushed to:</p>
        <div className="flex gap-2 flex-wrap">
          {['🛵 Uber Eats', '🦘 Deliveroo', '🍽️ Just Eat'].map(p => (
            <span
              key={p}
              className="bg-[#f6fdf9] border border-[#d1f0e4] text-g-dark text-xs font-bold px-3 py-1.5 rounded-full"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

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
    </div>
  );
}
