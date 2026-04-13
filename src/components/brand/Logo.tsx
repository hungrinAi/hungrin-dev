import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/** Standalone hex icon — no background box, just the raw logo image */
export const HungrinIcon = ({ size = 36, className }: { size?: number; className?: string }) => (
  <span
    className={cn('shrink-0 inline-flex items-center justify-center', className)}
    style={{ width: size, height: size }}
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
export const Logo = ({ className, size = 40 }: { className?: string; size?: number }) => (
  <div className={cn('flex items-center gap-2', className)}>
    <HungrinIcon size={size} />
    <span
      className="font-black text-g-dark tracking-tight leading-none"
      style={{ fontSize: Math.round(size * 0.48) }}
    >
      Hungrin
    </span>
  </div>
);
