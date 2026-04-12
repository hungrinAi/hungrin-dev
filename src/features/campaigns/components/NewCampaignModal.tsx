'use client';

import React, { useState } from 'react';
import { Rocket, CheckCircle2, Calendar, Tag } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Campaign } from '../types';

const inputCls = "w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-g-dark focus:ring-2 focus:ring-g-pale transition-all";
const labelCls = "block text-xs font-bold text-text-dark mb-1.5";

const CAMPAIGN_TYPES = ['Food Promo', 'Seasonal', 'Loyalty', 'Win-Back', 'Flash Sale'];
const PLATFORMS = ['All Platforms', 'Uber Eats', 'Deliveroo', 'Just Eat', 'Google'];

const TYPE_EMOJIS: Record<string, string> = {
  'Food Promo': '🍔', 'Seasonal': '🌸', 'Loyalty': '⭐',
  'Win-Back': '🎯', 'Flash Sale': '⚡',
};

interface NewCampaignModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (campaign: Campaign) => void;
}

export function NewCampaignModal({ open, onClose, onCreated }: NewCampaignModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState('Food Promo');
  const [platform, setPlatform] = useState('All Platforms');
  const [discount, setDiscount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [created, setCreated] = useState(false);

  const canProceedStep1 = name.trim().length > 0;
  const canCreate = discount.trim().length > 0 && startDate && endDate;

  const reset = () => {
    setStep(1); setName(''); setType('Food Promo'); setPlatform('All Platforms');
    setDiscount(''); setStartDate(''); setEndDate(''); setCreated(false);
  };

  const handleCreate = () => {
    const newCampaign: Campaign = {
      id: `c-${Date.now()}`,
      name,
      emoji: TYPE_EMOJIS[type] ?? '🎯',
      meta: `${discount} · ${platform}`,
      status: 'Active',
      orders: 0,
      revenue: '£0',
      startDate,
      endDate,
    };
    setCreated(true);
    onCreated?.(newCampaign);
  };

  return (
    <Modal
      open={open}
      onClose={() => { reset(); onClose(); }}
      title={
        <span className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-g-dark" />
          New Campaign
          <span className="ml-1 text-[10px] text-text-muted font-normal bg-g-faint px-2 py-0.5 rounded-full border border-border-light">
            Step {step} of 2
          </span>
        </span>
      }
    >
      {created ? (
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="w-16 h-16 bg-g-pale rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-g-dark" />
          </div>
          <div>
            <p className="font-bold text-text-dark text-base">Campaign Created!</p>
            <p className="text-sm text-text-muted mt-1.5 leading-relaxed">
              <strong className="text-text-dark">"{name}"</strong> is now live and showing in your campaigns list.
            </p>
          </div>
          <div className="w-full p-3 bg-g-faint rounded-xl border border-border-light text-left space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Type</span>
              <span className="font-bold text-text-dark">{type}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Offer</span>
              <span className="font-bold text-text-dark">{discount}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Platform</span>
              <span className="font-bold text-text-dark">{platform}</span>
            </div>
          </div>
          <Button className="w-full" onClick={() => { reset(); onClose(); }}>Done</Button>
        </div>
      ) : step === 1 ? (
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="block">
              <span className={labelCls}>Campaign Name</span>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Weekend Burger Feast"
                className={inputCls}
              />
            </label>
            <div>
              <span className={labelCls}>Campaign Type</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {CAMPAIGN_TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all',
                      type === t
                        ? 'bg-g-dark text-white border-g-dark shadow-sm'
                        : 'bg-white text-text-mid border-border-light hover:bg-g-faint hover:border-g-dark/30'
                    )}
                  >
                    {TYPE_EMOJIS[t]} {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className={labelCls}>Platform</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {PLATFORMS.map(p => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all',
                      platform === p
                        ? 'bg-g-dark text-white border-g-dark shadow-sm'
                        : 'bg-white text-text-mid border-border-light hover:bg-g-faint hover:border-g-dark/30'
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1" onClick={() => { reset(); onClose(); }}>Cancel</Button>
            <Button className="flex-1" disabled={!canProceedStep1} onClick={() => setStep(2)}>
              Next →
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="block">
              <span className={labelCls}><Tag className="w-3 h-3 inline mr-1" />Discount / Offer</span>
              <input
                type="text"
                value={discount}
                onChange={e => setDiscount(e.target.value)}
                placeholder="e.g. 20% off, Buy 1 Get 1, Free side"
                className={inputCls}
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className={labelCls}><Calendar className="w-3 h-3 inline mr-1" />Start Date</span>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputCls} />
              </label>
              <label className="block">
                <span className={labelCls}><Calendar className="w-3 h-3 inline mr-1" />End Date</span>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className={inputCls} />
              </label>
            </div>
          </div>
          <div className="p-3 bg-g-faint rounded-xl border border-border-light space-y-1.5">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Summary</p>
            <p className="text-xs text-text-dark"><strong>{name}</strong> · {TYPE_EMOJIS[type]} {type}</p>
            <p className="text-xs text-text-muted">{platform}</p>
          </div>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>← Back</Button>
            <Button className="flex-1 gap-1.5" disabled={!canCreate} onClick={handleCreate}>
              <Rocket className="w-4 h-4" /> Create Campaign
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
