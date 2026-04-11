'use client';

import React, { useState } from 'react';
import { Modal } from '@/src/components/ui/Modal';
import { Button } from '@/src/components/ui/Button';
import { SuccessState } from '@/src/components/ui/SuccessState';
import { cn } from '@/src/lib/utils';

const inputCls =
  'w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-g-dark transition-all';

interface ContactSalesModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactSalesModal({ open, onClose }: ContactSalesModalProps) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    if (!message.trim()) e.message = 'Please describe your business';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleClose = () => {
    setSent(false);
    setName(''); setEmail(''); setMessage(''); setErrors({});
    onClose();
  };

  const handleSend = () => {
    if (!validate()) return;
    setSent(true);
  };

  return (
    <Modal open={open} onClose={handleClose} title="Contact Sales" size="sm">
      {sent ? (
        <SuccessState
          title="Message sent!"
          message="Our sales team will reach out within 24 hours."
          onDone={handleClose}
          details={[{ label: 'From', value: name }, { label: 'Email', value: email }]}
        />
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-text-mid">
            Tell us about your restaurant and we'll recommend the right plan for you.
          </p>
          <div className="space-y-3">
            <div className="space-y-1">
              <input
                type="text"
                value={name}
                onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                placeholder="Your name"
                className={cn(inputCls, errors.name ? 'border-red-400' : '')}
              />
              {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                placeholder="Email address"
                className={cn(inputCls, errors.email ? 'border-red-400' : '')}
              />
              {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-1">
              <textarea
                rows={3}
                value={message}
                onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: '' })); }}
                placeholder="Tell us about your business…"
                className={cn(inputCls, 'resize-none', errors.message ? 'border-red-400' : '')}
              />
              {errors.message && <p className="text-[10px] text-red-500">{errors.message}</p>}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>Cancel</Button>
            <Button className="flex-1" onClick={handleSend}>Send Message</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
