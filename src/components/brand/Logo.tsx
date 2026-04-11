import React from 'react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';

/** Standalone hex icon — always visible, dark bg baked into the SVG */
export const HungrinIcon = ({ size = 32, className }: { size?: number; className?: string }) => (
  <Image
    src="/assets/logo-icon.svg"
    alt="Hungrin"
    width={size}
    height={size}
    className={cn('shrink-0', className)}
    style={{ width: size, height: size, borderRadius: Math.round(size * 0.2) }}
    priority
  />
);

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2.5', className)}>
    <HungrinIcon size={36} />
    <span className="text-[17px] font-bold text-g-dark tracking-tight leading-none">Hungrin</span>
  </div>
);
