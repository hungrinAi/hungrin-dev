import React from 'react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';

/** Standalone hex icon — the real Hungrin brand mark on a pale-green background */
export const HungrinIcon = ({ size = 36, className }: { size?: number; className?: string }) => (
  <span
    className={cn(
      'shrink-0 inline-flex items-center justify-center rounded-xl',
      'bg-g-pale border border-g-dark/15',
      className
    )}
    style={{ width: size, height: size, padding: Math.round(size * 0.12) }}
  >
    <Image
      src="/logo/hungrin-logo-main.png"
      alt="Hungrin"
      width={size}
      height={size}
      className="w-full h-full object-contain"
      priority
    />
  </span>
);

/** Full logo — icon + "Hungrin" wordmark */
export const Logo = ({ className, size = 34 }: { className?: string; size?: number }) => (
  <div className={cn('flex items-center gap-2.5', className)}>
    <HungrinIcon size={size} />
    <span
      className="font-black text-g-dark tracking-tight leading-none"
      style={{ fontSize: Math.round(size * 0.5) }}
    >
      Hungrin
    </span>
  </div>
);
