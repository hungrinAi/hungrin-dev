'use client';

import React, { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { SuccessState } from '@/components/ui/SuccessState';
import { cn } from '@/lib/utils';

export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '£19',
    priceNum: 19,
    desc: 'Perfect for new restaurants',
    features: ['1 delivery platform', 'Basic insights', '5 promotions/mo'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '£49',
    priceNum: 49,
    desc: 'Most popular for growing restaurants',
    features: ['Unlimited platforms', 'AI insights', 'Unlimited promotions', 'Priority support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '£99',
    priceNum: 99,
    desc: 'For high-volume restaurants',
    features: ['Everything in Growth', 'Dedicated account manager', 'Custom integrations', 'API access'],
  },
];

interface UpdatePlanModalProps {
  open: boolean;
  onClose: () => void;
  currentPlanId?: string;
  onConfirmed?: (planId: string) => void;
}

export function UpdatePlanModal({ open, onClose, currentPlanId = 'growth', onConfirmed }: UpdatePlanModalProps) {
  const [selected, setSelected] = useState(currentPlanId);
  const [confirmed, setConfirmed] = useState(false);

  const selectedPlan = PLANS.find(p => p.id === selected);

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirmed?.(selected);
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={<span className="flex items-center gap-2"><Zap className="w-4 h-4 text-g-dark" /> Update Plan</span>} size="lg">
      {confirmed ? (
        <SuccessState
          title="Plan Updated!"
          message={`You're now on the ${selectedPlan?.name} plan at ${selectedPlan?.price}/month. Changes take effect immediately.`}
          onDone={handleClose}
          details={[
            { label: 'Plan', value: selectedPlan?.name ?? '' },
            { label: 'Price', value: `${selectedPlan?.price}/month` },
          ]}
        />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={cn(
                  'text-left p-4 rounded-xl border-2 transition-all space-y-3 hover:border-g-dark/40 active:scale-[0.98]',
                  selected === plan.id ? 'border-g-dark bg-g-faint shadow-sm' : 'border-border-light bg-white'
                )}
              >
                {plan.id === currentPlanId && (
                  <span className="text-[9px] font-bold bg-g-dark text-white px-2 py-0.5 rounded-full">Current</span>
                )}
                <div>
                  <p className="font-bold text-text-dark text-sm">{plan.name}</p>
                  <p className="text-xl font-black text-g-dark">{plan.price}<span className="text-xs text-text-muted font-normal">/mo</span></p>
                  <p className="text-[10px] text-text-muted mt-0.5">{plan.desc}</p>
                </div>
                <ul className="space-y-1.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-1.5 text-[10px] text-text-mid">
                      <Check className="w-3 h-3 text-g-dark mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>Cancel</Button>
            <Button
              className="flex-1 gap-1.5"
              onClick={handleConfirm}
              disabled={selected === currentPlanId}
            >
              <Zap className="w-4 h-4" />
              {selected === currentPlanId
                ? 'Current Plan'
                : `Switch to ${PLANS.find(p => p.id === selected)?.name}`
              }
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
