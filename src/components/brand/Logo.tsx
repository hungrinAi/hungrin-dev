import React from 'react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';

export const HungrinIcon = ({ size = 32, className }: { size?: number; className?: string }) => (
  <Image
    src="/images/robot-thumbsup.jpeg"
    alt="Hungrin"
    width={size}
    height={size}
    className={cn('rounded-xl object-cover', className)}
    style={{ width: size, height: size }}
  />
);

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2', className)}>
    <HungrinIcon size={32} />
    <span className="text-xl font-bold text-g-dark tracking-tight">Hungrin</span>
  </div>
);
