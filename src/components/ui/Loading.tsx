'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';

// ─── Animated dots ────────────────────────────────────────────────────────────
function Dots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-g-dark animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
        />
      ))}
    </div>
  );
}

// ─── Full-page loading screen ─────────────────────────────────────────────────
interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = 'Loading…' }: PageLoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#eaf6f0]">
      {/* Outer pulse ring */}
      <div className="relative flex items-center justify-center">
        <span className="absolute w-36 h-36 rounded-3xl bg-g-dark/10 animate-ping" style={{ animationDuration: '1.4s' }} />
        <span className="absolute w-28 h-28 rounded-3xl bg-g-dark/15 animate-ping" style={{ animationDuration: '1.4s', animationDelay: '0.2s' }} />

        {/* Robot image */}
        <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-g-dark/20 bg-[#0d3d2c]">
          <Image
            src="/images/robot-thumbsup.jpeg"
            alt="Hungrin loading"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Small live badge */}
        <div className="absolute -bottom-2 -right-2 bg-g-dark text-white text-[9px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
          AI
        </div>
      </div>

      {/* Brand name */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="text-xl font-black text-g-dark tracking-tight">Hungrin</p>
        <div className="flex items-center gap-2 text-sm font-medium text-text-mid">
          <span>{message}</span>
          <Dots />
        </div>
      </div>
    </div>
  );
}

// ─── Inline / card-level spinner ─────────────────────────────────────────────
interface InlineLoadingProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function InlineLoading({ message = 'Loading…', className, size = 'md' }: InlineLoadingProps) {
  const imgSize = size === 'sm' ? 'w-8 h-8' : 'w-12 h-12';
  const ringSize = size === 'sm' ? 'w-11 h-11' : 'w-16 h-16';

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-10', className)}>
      <div className="relative flex items-center justify-center">
        {/* Spinning ring */}
        <div className={cn('absolute rounded-full border-4 border-g-pale border-t-g-dark animate-spin', ringSize)} />
        {/* Robot avatar */}
        <div className={cn('rounded-2xl overflow-hidden border-2 border-white shadow-md bg-[#0d3d2c]', imgSize)}>
          <Image
            src="/images/robot-thumbsup.jpeg"
            alt="Loading"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-text-mid">
        <span>{message}</span>
        <Dots />
      </div>
    </div>
  );
}

// ─── Skeleton block (text / card placeholder) ─────────────────────────────────
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-gradient-to-r from-[#e2f3ec] via-[#d1f0e4] to-[#e2f3ec] bg-[length:200%_100%]',
        className
      )}
      style={{ backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite linear' }}
    />
  );
}

// ─── Skeleton card preset ──────────────────────────────────────────────────────
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-border-light p-5 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-3/4 rounded-lg" />
          <Skeleton className="h-2.5 w-1/2 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-2.5 w-full rounded-lg" />
      <Skeleton className="h-2.5 w-5/6 rounded-lg" />
    </div>
  );
}
