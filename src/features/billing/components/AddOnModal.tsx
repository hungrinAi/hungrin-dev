'use client';

import React, { useState } from 'react';
import { CheckCircle2, Plus } from 'lucide-react';
import { Modal } from '@/src/components/ui/Modal';
import { Button } from '@/src/components/ui/Button';
import { SuccessState } from '@/src/components/ui/SuccessState';

interface AddOnModalProps {
  open: boolean;
  onClose: () => void;
  addonName: string;
  onConfirmed?: (addonName: string) => void;
}

const ADD_ON_DETAILS: Record<string, { price: string; perks: string[] }> = {
  'SMS Marketing': {
    price: '£5/mo',
    perks: [
      'Send promos directly to customer phones',
      'Up to 500 SMS/month',
      'Automated win-back campaigns',
      'Delivery confirmation texts',
    ],
  },
  'Customer Loyalty': {
    price: '£5/mo',
    perks: [
      'Points-based loyalty programme',
      'Reward your top customers',
      'Custom loyalty card branding',
      'Automated reward notifications',
    ],
  },
};

export function AddOnModal({ open, onClose, addonName, onConfirmed }: AddOnModalProps) {
  const [added, setAdded] = useState(false);
  const detail = ADD_ON_DETAILS[addonName] ?? { price: '£5/mo', perks: [] };

  const handleAdd = () => {
    setAdded(true);
    onConfirmed?.(addonName);
  };

  const handleClose = () => {
    setAdded(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={`Add ${addonName}`} size="sm">
      {added ? (
        <SuccessState
          title={`${addonName} Added!`}
          message={`${detail.price} has been added to your next invoice.`}
          onDone={handleClose}
          details={[
            { label: 'Add-on', value: addonName },
            { label: 'Billed', value: `${detail.price} monthly` },
          ]}
        />
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-g-faint rounded-xl border border-border-light space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-text-dark">{addonName}</p>
              <p className="text-lg font-black text-g-dark">{detail.price}</p>
            </div>
            <ul className="space-y-2">
              {detail.perks.map(p => (
                <li key={p} className="flex items-start gap-2 text-xs text-text-mid">
                  <CheckCircle2 className="w-3.5 h-3.5 text-g-dark mt-0.5 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[10px] text-text-muted leading-relaxed">
            Billed monthly alongside your plan. Cancel separately at any time from your billing settings.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>Not now</Button>
            <Button className="flex-1 gap-1.5" onClick={handleAdd}>
              <Plus className="w-4 h-4" /> Add {detail.price}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
