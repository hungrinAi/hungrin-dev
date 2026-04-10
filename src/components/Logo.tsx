import React from 'react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <Image
      src="/images/robot-thumbsup.jpeg"
      alt="Hungrin"
      width={32}
      height={32}
      className="rounded-lg object-cover w-8 h-8"
    />
    <span className="text-xl font-bold text-g-dark tracking-tight">Hungrin</span>
  </div>
);
