'use client';

import React from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';

interface ToggleProps {
  on: boolean;
  onToggle: () => void;
}

export function Toggle({ on, onToggle }: ToggleProps) {
  return (
    <button onClick={onToggle} className="transition-all shrink-0">
      {on
        ? <ToggleRight className="w-8 h-8 text-g-dark" />
        : <ToggleLeft className="w-8 h-8 text-text-muted" />
      }
    </button>
  );
}
