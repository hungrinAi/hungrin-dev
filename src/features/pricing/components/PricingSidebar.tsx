'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { cn } from '@/src/lib/utils';

const RECOMMENDATION_POINTS = [
  '→ Growth Plan',
  '✓ Advanced AI insights',
  '✓ Targeted campaigns',
  '✓ Priority support',
];

export function PricingSidebar() {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-border-light pb-3">
        <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-white border border-border-light flex items-center justify-center">
          <Image
            src="/images/robot-thumbsup.jpeg"
            alt="AI"
            width={32}
            height={32}
            className="w-full h-full object-cover object-center"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
        <h3 className="text-sm font-bold text-text-dark">AI Recommendations</h3>
      </div>
      <div className="w-full h-28 rounded-xl overflow-hidden bg-white border border-border-light flex items-center justify-center">
        <Image
          src="/images/robot-happy.jpeg"
          alt="AI"
          width={280}
          height={112}
          className="w-full h-full object-cover object-center"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
      <p className="text-xs text-text-muted leading-relaxed">
        Find the best plan for your business.
      </p>
      <div className="bg-g-pale border border-g-dark/20 rounded-xl p-3 space-y-1">
        <p className="text-xs font-bold text-g-dark flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" /> Best choice for you:
        </p>
        <p className="text-sm font-black text-text-dark">Growth Plan</p>
      </div>
      <p className="text-xs text-text-muted">Based on your current needs:</p>
      <div className="space-y-2">
        {RECOMMENDATION_POINTS.map(item => (
          <p
            key={item}
            className={cn(
              'text-xs font-medium',
              item.startsWith('→') ? 'text-g-dark font-bold' : 'text-text-mid',
            )}
          >
            {item}
          </p>
        ))}
      </div>
      <p className="text-[10px] text-text-muted leading-relaxed border-t border-border-light pt-3">
        Upgrade to accelerate your growth and maximise your success.
      </p>
    </Card>
  );
}
