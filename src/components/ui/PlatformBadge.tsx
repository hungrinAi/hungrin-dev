import React from 'react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';

const PLATFORM_META: Record<string, { src: string; label: string }> = {
  uber:      { src: '/images/platforms/uber-eats.svg',  label: 'Uber Eats'  },
  deliveroo: { src: '/images/platforms/deliveroo.svg',  label: 'Deliveroo'  },
  justeat:   { src: '/images/platforms/just-eat.svg',   label: 'Just Eat'   },
};

interface PlatformBadgeProps {
  platform: string;
  /** 'icon' = square logo only; 'pill' = small logo + name in a pill */
  variant?: 'icon' | 'pill';
  size?: number;
  className?: string;
}

export function PlatformBadge({ platform, variant = 'icon', size = 32, className }: PlatformBadgeProps) {
  const meta = PLATFORM_META[platform.toLowerCase()];
  if (!meta) return null;

  if (variant === 'pill') {
    return (
      <div className={cn('inline-flex items-center gap-1.5', className)}>
        <div
          className="rounded-md overflow-hidden shrink-0"
          style={{ width: size, height: size }}
        >
          <Image src={meta.src} alt={meta.label} width={size} height={size} className="w-full h-full object-cover" />
        </div>
        <span className="text-[11px] font-bold text-text-dark leading-none">{meta.label}</span>
      </div>
    );
  }

  return (
    <div
      className={cn('rounded-lg overflow-hidden shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <Image src={meta.src} alt={meta.label} width={size} height={size} className="w-full h-full object-cover" />
    </div>
  );
}
