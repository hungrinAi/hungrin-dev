'use client';

import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { FormField, inputCls } from '@/components/ui/FormField';
import { SuccessState } from '@/components/ui/SuccessState';

interface UpdatePaymentModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmed?: (last4: string) => void;
}

function formatCardNumber(v: string) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export function UpdatePaymentModal({ open, onClose, onConfirmed }: UpdatePaymentModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    const raw = cardNumber.replace(/\s/g, '');
    if (raw.length < 16) e.cardNumber = 'Enter a valid 16-digit card number';
    const expiryRaw = expiry.replace(/\s\/\s/, '').replace(/\D/g, '');
    if (expiryRaw.length < 4) e.expiry = 'Enter a valid expiry (MM/YY)';
    if (cvc.length < 3) e.cvc = 'Enter a valid CVC (3-4 digits)';
    if (!name.trim()) e.name = 'Cardholder name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const last4 = cardNumber.replace(/\D/g, '').slice(-4);
    setSaved(true);
    onConfirmed?.(last4);
  };

  const handleClose = () => {
    setSaved(false);
    setCardNumber(''); setExpiry(''); setCvc(''); setName('');
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={<span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-g-dark" /> Update Payment Method</span>} size="sm">
      {saved ? (
        <SuccessState
          title="Payment Method Updated"
          message={`Your card ending in ${cardNumber.replace(/\D/g, '').slice(-4)} is now active.`}
          onDone={handleClose}
          details={[{ label: 'Cardholder', value: name }, { label: 'Expires', value: expiry }]}
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-g-faint rounded-xl border border-border-light">
            <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-dark">Current: Visa ···· 4242</p>
              <p className="text-[10px] text-text-muted">Expires 12/29</p>
            </div>
          </div>

          <div className="space-y-3">
            <FormField label="Card Number" error={errors.cardNumber} required>
              <input
                type="text"
                value={cardNumber}
                onChange={e => { setCardNumber(formatCardNumber(e.target.value)); setErrors(p => ({ ...p, cardNumber: '' })); }}
                placeholder="1234 5678 9012 3456"
                className={inputCls(errors.cardNumber)}
                inputMode="numeric"
              />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Expiry" error={errors.expiry} required>
                <input
                  type="text"
                  value={expiry}
                  onChange={e => { setExpiry(formatExpiry(e.target.value)); setErrors(p => ({ ...p, expiry: '' })); }}
                  placeholder="MM / YY"
                  className={inputCls(errors.expiry)}
                  inputMode="numeric"
                />
              </FormField>
              <FormField label="CVC" error={errors.cvc} required>
                <input
                  type="text"
                  value={cvc}
                  onChange={e => { setCvc(e.target.value.replace(/\D/g, '').slice(0, 4)); setErrors(p => ({ ...p, cvc: '' })); }}
                  placeholder="•••"
                  className={inputCls(errors.cvc)}
                  inputMode="numeric"
                />
              </FormField>
            </div>
            <FormField label="Cardholder Name" error={errors.name} required>
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                placeholder="Sarah Jones"
                className={inputCls(errors.name)}
              />
            </FormField>
          </div>

          <p className="text-[10px] text-text-muted flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-g-dark shrink-0" /> Payment data is encrypted & securely stored.
          </p>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>Cancel</Button>
            <Button className="flex-1" onClick={handleSave}>Save Card</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
