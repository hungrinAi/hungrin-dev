'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { SuccessState } from '@/components/ui/SuccessState';
import { cn } from '@/lib/utils';

const inputCls = "w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-g-dark focus:ring-2 focus:ring-g-pale transition-all";
const labelCls = "block text-xs font-bold text-text-dark mb-1.5";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmed?: () => void;
}

export function ContactModal({ open, onClose, onConfirmed }: ContactModalProps) {
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState('Billing question');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleClose = () => { setSent(false); setMessage(''); setMessageError(''); onClose(); };

  const handleSend = () => {
    if (!message.trim()) { setMessageError('Please enter a message'); return; }
    setSent(true);
    onConfirmed?.();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Contact Support" size="sm">
      {sent ? (
        <SuccessState
          title="Message Sent!"
          message="Our billing team will reply to you within 1 business day."
          onDone={handleClose}
          details={[{ label: 'Subject', value: subject }]}
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-g-faint rounded-xl border border-border-light">
            <MessageCircle className="w-5 h-5 text-g-dark shrink-0" />
            <p className="text-xs text-text-mid">
              Billing queries are handled within <strong className="text-text-dark">1 business day</strong>.
            </p>
          </div>
          <div className="space-y-3">
            <label className="block">
              <span className={labelCls}>Subject</span>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className={inputCls}
              >
                <option>Billing question</option>
                <option>Invoice request</option>
                <option>Refund request</option>
                <option>Plan question</option>
                <option>Other</option>
              </select>
            </label>
            <div className="space-y-1">
              <label className="block">
                <span className={labelCls}>Message <span className="text-red-500">*</span></span>
                <textarea
                  rows={4}
                  value={message}
                  onChange={e => { setMessage(e.target.value); setMessageError(''); }}
                  placeholder="Describe your issue or question…"
                  className={cn(inputCls, 'resize-none', messageError ? 'border-red-400 focus:border-red-500' : '')}
                />
              </label>
              {messageError && <p className="text-[10px] text-red-500 font-medium">{messageError}</p>}
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
