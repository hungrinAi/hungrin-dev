'use client';

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { SuccessState } from '@/components/ui/SuccessState';
import { inputCls } from '@/components/ui/FormField';

interface CancelPlanModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmed?: () => void;
}

export function CancelPlanModal({ open, onClose, onConfirmed }: CancelPlanModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [typed, setTyped] = useState('');

  const canConfirm = typed.toLowerCase() === 'cancel';

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirmed?.();
  };

  const handleClose = () => {
    setConfirmed(false);
    setTyped('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Cancel Plan" size="sm">
      {confirmed ? (
        <SuccessState
          title="Cancellation Confirmed"
          message="Your plan stays active until May 20, 2025. You won't be charged again."
          onDone={handleClose}
          variant="warning"
          details={[
            { label: 'Active until', value: 'May 20, 2025' },
            { label: 'Final charge', value: 'None' },
          ]}
        />
      ) : (
        <div className="space-y-4">
          <div className="flex gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs text-red-700 space-y-1.5">
              <p className="font-bold text-sm">Cancel your Growth Plan?</p>
              <p className="leading-relaxed">You'll lose access to AI promotions, campaign tools, and priority support at the end of your billing period (May 20, 2025).</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-text-muted">
              Type <strong className="text-text-dark font-mono bg-g-faint px-1 rounded">cancel</strong> to confirm
            </p>
            <input
              type="text"
              value={typed}
              onChange={e => setTyped(e.target.value)}
              placeholder="cancel"
              className={inputCls(undefined)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleClose}>Keep Plan</Button>
            <Button
              variant="danger"
              className="flex-1"
              disabled={!canConfirm}
              onClick={handleConfirm}
            >
              Cancel Plan
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
