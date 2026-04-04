import React from 'react';

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <div className="w-7 h-7 grid grid-cols-2 gap-[3px]">
      <span className="bg-g-dark rounded-tl-full rounded-tr-full rounded-bl-full" />
      <span className="bg-g-dark rounded-tl-full rounded-tr-full rounded-br-full" />
      <span className="bg-g-dark rounded-tl-full rounded-bl-full rounded-br-full" />
      <span className="bg-g-dark rounded-tr-full rounded-bl-full rounded-br-full" />
    </div>
    <span className="text-xl font-bold text-g-dark tracking-tight">Hungrin</span>
  </div>
);

import { cn } from '@/src/lib/utils';
