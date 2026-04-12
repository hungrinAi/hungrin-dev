'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { SuccessState } from '@/components/ui/SuccessState';
import type { Customer } from '@/types';

const inputCls = "w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-g-dark focus:ring-2 focus:ring-g-pale transition-all";
const labelCls = "block text-xs font-bold text-text-dark mb-1.5";

interface SendEmailModalProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer;
  onConfirmed?: () => void;
}

export function SendEmailModal({ open, onClose, customer, onConfirmed }: SendEmailModalProps) {
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleClose = () => { setSent(false); setSubject(''); setBody(''); onClose(); };

  const handleSend = () => {
    setSent(true);
    onConfirmed?.();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`Send Email${customer ? ` — ${customer.name}` : ''}`}
      size="sm"
    >
      {sent ? (
        <SuccessState
          title="Email Sent!"
          message={`Your email was sent to ${customer?.email ?? 'the customer'}.`}
          onDone={handleClose}
          details={[
            { label: 'To', value: customer?.name ?? '—' },
            { label: 'Subject', value: subject },
          ]}
        />
      ) : (
        <div className="space-y-4">
          {customer && (
            <div className="flex items-center gap-3 p-3 bg-g-faint rounded-xl border border-border-light">
              <div className="w-8 h-8 rounded-full bg-g-pale text-g-dark font-black text-sm flex items-center justify-center shrink-0">
                {customer.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-text-dark truncate">{customer.name}</p>
                <p className="text-[10px] text-text-muted truncate">{customer.email}</p>
              </div>
            </div>
          )}
          <div className="space-y-3">
            <label className="block">
              <span className={labelCls}>Subject</span>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. A special offer just for you!"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className={labelCls}>Message</span>
              <textarea
                rows={4}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Write your message here…"
                className={inputCls + ' resize-none'}
              />
            </label>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>Cancel</Button>
            <Button
              className="flex-1 gap-1.5"
              disabled={!subject.trim() || !body.trim()}
              onClick={handleSend}
            >
              <Mail className="w-4 h-4" /> Send Email
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
