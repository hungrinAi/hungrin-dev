'use client';

import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { SuccessState } from '@/components/ui/SuccessState';
import { cn } from '@/lib/utils';
import type { Customer } from '@/types';

interface SendPromoModalProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer;
  onConfirmed?: () => void;
}

const PROMO_TEMPLATES = [
  { id: 'winback', label: 'Win-Back', emoji: '🎯', text: 'We miss you! Come back and get 20% off your next order today only.' },
  { id: 'loyalty', label: 'Loyalty Reward', emoji: '⭐', text: "You're one of our best customers! Enjoy a FREE side with your next order." },
  { id: 'bundle', label: 'Bundle Deal', emoji: '🍔', text: 'Burger Bundle is back! Get 2 burgers + fries for just £12.99 — tonight only.' },
  { id: 'custom', label: 'Custom', emoji: '✏️', text: '' },
];

export function SendPromoModal({ open, onClose, customer, onConfirmed }: SendPromoModalProps) {
  const [selectedId, setSelectedId] = useState('winback');
  const [customText, setCustomText] = useState('');
  const [sent, setSent] = useState(false);

  const selected = PROMO_TEMPLATES.find(t => t.id === selectedId)!;
  const message = selectedId === 'custom' ? customText : selected.text;

  const handleClose = () => { setSent(false); setCustomText(''); onClose(); };

  const handleSend = () => {
    setSent(true);
    onConfirmed?.();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`Send Promo${customer ? ` — ${customer.name}` : ''}`}
    >
      {sent ? (
        <SuccessState
          title="Promo Sent!"
          message={`Your promo was sent to ${customer?.name ?? 'the customer'} via SMS & email.`}
          onDone={handleClose}
          details={[
            { label: 'Customer', value: customer?.name ?? '—' },
            { label: 'Template', value: selected.label },
          ]}
        />
      ) : (
        <div className="space-y-4">
          {/* Template picker */}
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Choose Template</p>
            <div className="grid grid-cols-2 gap-2">
              {PROMO_TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-xl border text-xs font-bold text-left transition-all',
                    selectedId === t.id
                      ? 'border-g-dark bg-g-faint text-g-dark ring-1 ring-g-dark/20'
                      : 'border-border-light bg-white text-text-mid hover:bg-g-faint'
                  )}
                >
                  <span className="text-base">{t.emoji}</span> {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message preview / custom input */}
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Message</p>
            {selectedId === 'custom' ? (
              <textarea
                rows={3}
                value={customText}
                onChange={e => setCustomText(e.target.value)}
                placeholder="Write your custom promo message…"
                className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-g-dark resize-none transition-all"
              />
            ) : (
              <div className="bg-g-faint border border-border-light rounded-xl px-4 py-3 text-sm text-text-mid">
                {selected.text}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>Cancel</Button>
            <Button
              className="flex-1 gap-1.5"
              disabled={!message.trim()}
              onClick={handleSend}
            >
              <Zap className="w-4 h-4" /> Send Promo
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
