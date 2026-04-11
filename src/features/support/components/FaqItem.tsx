'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  q: string;
  a: string;
}

export function FaqItem({ q, a }: FaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border-light rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-g-faint transition-colors"
      >
        <span className="text-sm font-bold text-text-dark pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-g-dark shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-text-mid leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}
