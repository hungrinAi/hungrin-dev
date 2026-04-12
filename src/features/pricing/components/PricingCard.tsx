'use client';

import React from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { PricingPlan } from '../types';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: () => void;
}

export function PricingCard({ plan, onSelect }: PricingCardProps) {
  return (
    <Card
      className={cn(
        'p-6 flex flex-col relative',
        plan.popular ? 'border-g-dark border-2 shadow-xl' : '',
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-g-dark text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full flex items-center gap-1.5">
          <Star className="w-3 h-3 fill-current" /> Most Popular
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-base font-black text-text-dark">{plan.name}</h3>
        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{plan.desc}</p>
      </div>
      <div className="mb-5 flex items-baseline gap-1">
        <span className="text-3xl font-black text-text-dark">£{plan.price}</span>
        <span className="text-text-muted text-xs font-bold">/month</span>
      </div>
      <div className="space-y-2.5 mb-6 flex-1">
        {plan.features.map(f => (
          <div key={f} className="flex items-start gap-2 text-xs text-text-mid font-medium">
            <Check className="w-4 h-4 text-g-dark shrink-0 mt-0.5" />
            {f}
          </div>
        ))}
      </div>
      <Button
        variant={plan.popular ? 'primary' : 'outline'}
        className="w-full text-sm"
        onClick={onSelect}
      >
        {plan.cta}
      </Button>
    </Card>
  );
}
