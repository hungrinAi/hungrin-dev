'use client';

import React from 'react';
import Image from 'next/image';
import { Logo } from '@/components/brand';
import { cn } from '@/lib/utils';
import { LEFT_SLIDES } from '../data/constants';

interface LeftPanelProps {
  slide: number;
  onNext: () => void;
  onDotClick: (i: number) => void;
}

export function LeftPanel({ slide, onNext, onDotClick }: LeftPanelProps) {
  const current = LEFT_SLIDES[slide];

  return (
    <div
      className="hidden lg:flex lg:w-[42%] xl:w-[38%] bg-gradient-to-br from-[#1a4d3a] via-[#23664f] to-[#2d7a5f] flex-col justify-between p-10 xl:p-14 relative overflow-hidden shrink-0 cursor-pointer select-none"
      onClick={onNext}
      title="Click to see more"
    >
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
      <div className="absolute bottom-20 -left-16 w-56 h-56 rounded-full bg-white/5" />
      <div className="absolute top-1/2 right-0 w-32 h-32 rounded-full bg-white/5" />

      <div className="relative z-10">
        <Logo className="[&_span]:text-white" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-7 flex-1 justify-center py-8">
        <div className="relative">
          <div className="w-48 h-48 xl:w-56 xl:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 transition-all duration-500">
            <Image
              key={current.robot}
              src={current.robot}
              alt={current.badge}
              width={224}
              height={224}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -inset-2 rounded-3xl border-2 border-white/15 animate-pulse pointer-events-none" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
            Click to explore ›
          </div>
        </div>

        <div className="text-center space-y-3 max-w-xs">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            <span className="text-white/90 text-xs font-bold">{current.badge}</span>
          </div>
          <h2 className="text-2xl xl:text-3xl font-black text-white leading-tight transition-all duration-300">
            {current.title}
          </h2>
          <p className="text-white/65 text-sm leading-relaxed">{current.subtitle}</p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl px-5 py-4 max-w-xs border border-white/15 w-full">
          <p className="text-[11px] text-white/50 uppercase tracking-widest font-bold mb-1">
            {current.tip.label}
          </p>
          <p className="text-white/80 text-xs leading-relaxed">{current.tip.text}</p>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-2 justify-center">
        {LEFT_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); onDotClick(i); }}
            className={cn(
              'rounded-full transition-all duration-300 focus:outline-none',
              i === slide ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60',
            )}
          />
        ))}
      </div>
    </div>
  );
}
