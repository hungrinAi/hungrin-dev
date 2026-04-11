'use client';

import React, { useState } from 'react';
import { Pause, Play, Pencil, Trash2, X, AlertTriangle, Check, ArrowLeft } from 'lucide-react';
import { Modal } from '@/src/components/ui/Modal';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import type { Campaign } from '../types';

interface CampaignActionsMenuProps {
  open: boolean;
  onClose: () => void;
  campaign?: Campaign;
  onStatusChanged?: (id: string, status: Campaign['status']) => void;
  onDeleted?: (id: string) => void;
}

type ActionState = 'menu' | 'confirmDelete' | 'done';

export function CampaignActionsMenu({ open, onClose, campaign, onStatusChanged, onDeleted }: CampaignActionsMenuProps) {
  const [actionState, setActionState] = useState<ActionState>('menu');
  const [doneMessage, setDoneMessage] = useState('');
  const [doneIcon, setDoneIcon] = useState<'success' | 'danger'>('success');

  const close = () => { setActionState('menu'); onClose(); };

  const handlePauseResume = () => {
    if (!campaign) return;
    const isActive = campaign.status === 'Active';
    const newStatus: Campaign['status'] = isActive ? 'Paused' : 'Active';
    setDoneMessage(isActive
      ? `"${campaign.name}" has been paused.`
      : `"${campaign.name}" is now active.`
    );
    setDoneIcon('success');
    setActionState('done');
    onStatusChanged?.(campaign.id, newStatus);
  };

  const handleDelete = () => {
    if (!campaign) return;
    setDoneMessage(`"${campaign.name}" has been permanently deleted.`);
    setDoneIcon('danger');
    setActionState('done');
    onDeleted?.(campaign.id);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={
        <span className="flex items-center gap-2 text-sm">
          <span className="text-lg">{campaign?.emoji}</span>
          {campaign?.name ?? 'Campaign Actions'}
        </span>
      }
      size="sm"
    >
      {actionState === 'confirmDelete' ? (
        <div className="space-y-4">
          <div className="flex gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs text-red-700 space-y-1">
              <p className="font-bold">Delete "{campaign?.name}"?</p>
              <p>This will permanently remove the campaign and all associated data. This cannot be undone.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-1.5" onClick={() => setActionState('menu')}>
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Button>
            <Button variant="danger" className="flex-1" onClick={handleDelete}>
              Delete Campaign
            </Button>
          </div>
        </div>
      ) : actionState === 'done' ? (
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center",
            doneIcon === 'success' ? "bg-g-pale" : "bg-red-50"
          )}>
            <Check className={cn("w-8 h-8", doneIcon === 'success' ? "text-g-dark" : "text-red-500")} />
          </div>
          <p className="text-sm text-text-mid leading-relaxed">{doneMessage}</p>
          <Button className="w-full" onClick={close}>Done</Button>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Status info row */}
          <div className="flex items-center justify-between p-3 bg-g-faint rounded-xl border border-border-light mb-3">
            <div className="flex items-center gap-2">
              <span className={cn(
                'px-2.5 py-1 rounded-full text-[10px] font-bold',
                campaign?.status === 'Active' ? 'bg-g-pale text-g-dark' :
                campaign?.status === 'Paused' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-500'
              )}>
                {campaign?.status}
              </span>
            </div>
            <span className="text-xs text-text-muted">{campaign?.orders} orders · {campaign?.revenue}</span>
          </div>

          {/* Action buttons */}
          <button
            onClick={handlePauseResume}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border border-transparent',
              campaign?.status === 'Active'
                ? 'text-yellow-700 hover:bg-yellow-50 hover:border-yellow-100'
                : 'text-g-dark hover:bg-g-faint hover:border-border-light'
            )}
          >
            {campaign?.status === 'Active'
              ? <><Pause className="w-4 h-4 shrink-0" /> Pause Campaign</>
              : <><Play className="w-4 h-4 shrink-0" /> Resume Campaign</>
            }
          </button>

          <button
            onClick={() => {
              setDoneMessage(`Edit mode opened for "${campaign?.name}". Changes saved.`);
              setDoneIcon('success');
              setActionState('done');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border border-transparent text-text-mid hover:bg-g-faint hover:border-border-light"
          >
            <Pencil className="w-4 h-4 shrink-0" /> Edit Campaign
          </button>

          <button
            onClick={() => setActionState('confirmDelete')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border border-transparent text-red-500 hover:bg-red-50 hover:border-red-100"
          >
            <Trash2 className="w-4 h-4 shrink-0" /> Delete Campaign
          </button>

          <div className="pt-1">
            <Button variant="outline" className="w-full" onClick={close}>
              <X className="w-4 h-4" /> Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
