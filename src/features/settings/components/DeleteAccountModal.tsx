'use client';

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function DeleteAccountModal({ open, onClose }: DeleteAccountModalProps) {
  const [typed, setTyped] = useState('');
  const canDelete = typed === 'DELETE';

  return (
    <Modal open={open} onClose={onClose} title="Delete Account" size="sm">
      <div className="space-y-4">
        <div className="flex gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs text-red-700 space-y-1.5">
            <p className="font-bold">This action is permanent and cannot be undone.</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>All restaurant data and order history will be deleted</li>
              <li>All active campaigns will be stopped</li>
              <li>Your subscription will be cancelled immediately</li>
              <li>You will lose access to all insights and reports</li>
            </ul>
          </div>
        </div>
        <div>
          <p className="text-xs text-text-muted mb-2">
            Type <strong className="text-text-dark font-mono">DELETE</strong> to confirm
          </p>
          <input
            type="text"
            value={typed}
            onChange={e => setTyped(e.target.value)}
            placeholder="DELETE"
            className="w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-red-400 transition-all font-mono"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>Keep Account</Button>
          <Button
            variant="danger"
            className="flex-1"
            disabled={!canDelete}
            onClick={onClose}
          >
            Delete Forever
          </Button>
        </div>
      </div>
    </Modal>
  );
}
