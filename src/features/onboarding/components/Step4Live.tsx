'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { STEP4_FEATURES, STEP4_STATS } from '../data/constants';

export function Step4Live() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <div className="relative">
          <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#d1f0e4] bg-[#0d3d2c]">
            <Image
              src="/images/robot-happy.jpeg"
              alt="Hungrin is live"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-g-dark rounded-full flex items-center justify-center border-2 border-white">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-[#f0faf5] border border-[#d1f0e4] rounded-full px-5 py-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-g-dark animate-pulse" />
          <span className="text-sm font-black text-g-dark">You're Live!</span>
        </div>
        <div>
          <h1 className="text-2xl font-black text-text-dark">Hungrin is active</h1>
          <p className="text-sm text-text-muted mt-2 max-w-sm">
            Your AI assistant is now monitoring your restaurant and will start generating promotions
            automatically.
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {STEP4_FEATURES.map(f => (
          <div
            key={f.text}
            className="flex items-center gap-3 bg-[#f6fdf9] border border-[#d1f0e4] rounded-2xl px-4 py-3"
          >
            <span className="text-xl shrink-0">{f.icon}</span>
            <p className="text-sm font-medium text-text-dark">{f.text}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {STEP4_STATS.map(s => (
          <div
            key={s.label}
            className="bg-white border border-border-light rounded-2xl p-3 text-center shadow-sm"
          >
            <p className="text-sm font-black text-text-dark">{s.val}</p>
            <p className="text-[10px] text-text-muted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
