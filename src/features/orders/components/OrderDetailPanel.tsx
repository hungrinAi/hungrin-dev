'use client';

import React, { useState } from 'react';
import { Phone, CheckCircle2, Check, Clock } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Modal } from '@/src/components/ui/Modal';
import { cn } from '@/src/lib/utils';
import { OrderSummary } from '@/src/types';

interface OrderDetailPanelProps {
  order: OrderSummary['orders'][0];
  isCompleted?: boolean;
  onCompleted?: (id: string) => void;
}

export function OrderDetailPanel({ order, isCompleted: isCompletedProp, onCompleted }: OrderDetailPanelProps) {
  const [localCompleted, setLocalCompleted] = useState(order.status === 'completed');
  const [confirmModal, setConfirmModal] = useState(false);

  const completed = isCompletedProp ?? localCompleted;

  const handleMarkComplete = () => {
    setLocalCompleted(true);
    setConfirmModal(false);
    onCompleted?.(order.id);
  };

  return (
    <>
      <div className="w-full md:w-[340px] bg-white overflow-y-auto p-6 space-y-6 flex-1">
        {/* Customer */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-g-dark text-white text-xl font-bold flex items-center justify-center shrink-0">{order.initials}</div>
          <div>
            <h3 className="text-lg font-bold text-text-dark leading-tight">{order.customerName}</h3>
            <p className="text-xs text-text-mid flex items-center gap-1 mt-1"><Phone className="w-3 h-3" /> 07421 892 102</p>
          </div>
        </div>

        {/* Order ID + time */}
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-text-dark">Order {order.id} Details</h4>
          <p className="text-xs text-text-muted flex items-center gap-1">
            <Clock className="w-3 h-3" /> {order.time}
          </p>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-g-pale rounded-lg flex items-center justify-center text-xl shrink-0">{item.includes('Burger') ? '🍔' : '🥤'}</div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-text-dark truncate">{item}</p></div>
              <p className="text-sm font-bold text-text-dark">£{Math.floor(order.total / order.items.length)}</p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="pt-4 border-t border-border-light space-y-2">
          <div className="flex justify-between text-sm text-text-mid"><span>Subtotal</span><span className="font-semibold text-text-dark">£{order.subtotal}</span></div>
          <div className="flex justify-between text-sm text-text-mid"><span>Delivery Fee</span><span className="font-semibold text-text-dark">£{order.deliveryFee}</span></div>
          <div className="flex justify-between text-base font-bold text-text-dark pt-2 border-t border-border-light"><span>Total</span><span>£{order.fullTotal}</span></div>
        </div>

        {/* Platform */}
        <div className="bg-g-faint p-4 rounded-xl border border-border-light flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-[10px]", order.deliveryPlatform === 'uber' ? "bg-black" : "bg-[#00ccbc]")}>{order.deliveryPlatform[0].toUpperCase()}</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-text-dark">{order.deliveryPlatform === 'uber' ? 'Uber Eats' : 'Deliveroo'}</p>
            <p className="text-[10px] text-g-dark font-bold">{completed ? 'Delivered' : 'Awaiting pickup'}</p>
          </div>
        </div>

        {/* Action */}
        {completed ? (
          <div className="w-full py-3.5 bg-g-pale rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-g-dark">
            <CheckCircle2 className="w-4 h-4" /> Completed
          </div>
        ) : (
          <Button className="w-full py-3.5" onClick={() => setConfirmModal(true)}>
            Mark as Completed
          </Button>
        )}
      </div>

      {/* Confirm modal */}
      <Modal
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="Mark as Completed"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-text-mid leading-relaxed">
            Confirm order <strong className="text-text-dark">{order.id}</strong> for{' '}
            <strong className="text-text-dark">{order.customerName}</strong> has been delivered?
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setConfirmModal(false)}>Cancel</Button>
            <Button className="flex-1 gap-1.5" onClick={handleMarkComplete}>
              <Check className="w-4 h-4" /> Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
