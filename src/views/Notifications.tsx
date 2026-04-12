'use client';

import React, { useState } from 'react';
import { Bell, Check, Mail, MessageSquare, Save, Smartphone, TrendingUp, Zap } from 'lucide-react';
import { SettingsShell } from '@/src/components/layout/SettingsShell';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

interface NotifPref {
  id: string;
  label: string;
  desc: string;
  email: boolean;
  push: boolean;
  icon: React.ElementType;
  iconColor: string;
}

const INITIAL_PREFS: NotifPref[] = [
  {
    id: 'new_orders',
    label: 'New Orders',
    desc: 'Get notified when a new order comes in across any connected platform.',
    email: true,
    push: true,
    icon: Bell,
    iconColor: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'order_issues',
    label: 'Order Issues & Cancellations',
    desc: 'Alerts when an order is cancelled or flagged for review.',
    email: true,
    push: true,
    icon: MessageSquare,
    iconColor: 'bg-red-100 text-red-500',
  },
  {
    id: 'promo_updates',
    label: 'Promotion Updates',
    desc: 'Notifications when an AI promotion is ready to review or publish.',
    email: true,
    push: false,
    icon: Zap,
    iconColor: 'bg-amber-100 text-amber-600',
  },
  {
    id: 'weekly_report',
    label: 'Weekly Performance Report',
    desc: 'A summary of sales, top dishes, and platform activity every Monday.',
    email: true,
    push: false,
    icon: TrendingUp,
    iconColor: 'bg-g-pale text-g-dark',
  },
  {
    id: 'ai_insights',
    label: 'AI Insights & Recommendations',
    desc: 'Personalised tips from Hungrin AI on pricing, peak hours, and deals.',
    email: false,
    push: true,
    icon: Smartphone,
    iconColor: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'billing_alerts',
    label: 'Billing Alerts',
    desc: 'Reminders before renewal and confirmation of successful payments.',
    email: true,
    push: false,
    icon: Mail,
    iconColor: 'bg-g-pale text-g-dark',
  },
];

interface QuietHours {
  enabled: boolean;
  from: string;
  to: string;
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={cn(
        'relative inline-flex w-9 h-5 rounded-full transition-colors shrink-0',
        on ? 'bg-g-dark' : 'bg-gray-200'
      )}
    >
      <span className={cn(
        'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
        on ? 'translate-x-4' : 'translate-x-0.5'
      )} />
    </button>
  );
}

export default function Notifications() {
  const [prefs, setPrefs] = useState<NotifPref[]>(INITIAL_PREFS);
  const [quiet, setQuiet] = useState<QuietHours>({ enabled: false, from: '22:00', to: '08:00' });
  const [saved, setSaved] = useState(false);

  const updatePref = (id: string, channel: 'email' | 'push', val: boolean) =>
    setPrefs(prev => prev.map(p => p.id === id ? { ...p, [channel]: val } : p));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SettingsShell active="Notifications">
      <div className="space-y-6">

        {/* Header */}
        <Card className="p-6">
          <h2 className="text-base font-black text-text-dark">Notification Preferences</h2>
          <p className="text-xs text-text-muted mt-1">
            Choose how and when Hungrin contacts you. Changes apply immediately after saving.
          </p>
        </Card>

        {/* Channel legend */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-white border border-border-light rounded-xl">
            <Mail className="w-4 h-4 text-g-dark shrink-0" />
            <div>
              <p className="text-xs font-bold text-text-dark">Email</p>
              <p className="text-[10px] text-text-muted">Sent to your account email</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white border border-border-light rounded-xl">
            <Smartphone className="w-4 h-4 text-g-dark shrink-0" />
            <div>
              <p className="text-xs font-bold text-text-dark">Push</p>
              <p className="text-[10px] text-text-muted">Browser & mobile notifications</p>
            </div>
          </div>
        </div>

        {/* Notification rows */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-dark">Notification Types</h3>
            <div className="hidden sm:flex items-center gap-6 text-[10px] font-bold text-text-muted uppercase tracking-wider pr-1">
              <span className="w-10 text-center">Email</span>
              <span className="w-10 text-center">Push</span>
            </div>
          </div>
          <div className="divide-y divide-border-light">
            {prefs.map(pref => {
              const Icon = pref.icon;
              return (
                <div key={pref.id} className="flex items-center gap-4 px-6 py-4">
                  <span className={cn('w-8 h-8 rounded-xl flex items-center justify-center shrink-0', pref.iconColor)}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-text-dark">{pref.label}</p>
                    <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed">{pref.desc}</p>
                    {/* Mobile toggles */}
                    <div className="flex items-center gap-4 mt-2 sm:hidden">
                      <label className="flex items-center gap-2 text-[10px] text-text-muted font-medium">
                        <Toggle on={pref.email} onChange={v => updatePref(pref.id, 'email', v)} /> Email
                      </label>
                      <label className="flex items-center gap-2 text-[10px] text-text-muted font-medium">
                        <Toggle on={pref.push} onChange={v => updatePref(pref.id, 'push', v)} /> Push
                      </label>
                    </div>
                  </div>
                  {/* Desktop toggles */}
                  <div className="hidden sm:flex items-center gap-6 shrink-0">
                    <div className="w-10 flex justify-center">
                      <Toggle on={pref.email} onChange={v => updatePref(pref.id, 'email', v)} />
                    </div>
                    <div className="w-10 flex justify-center">
                      <Toggle on={pref.push} onChange={v => updatePref(pref.id, 'push', v)} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quiet Hours */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-text-dark">Quiet Hours</h3>
              <p className="text-xs text-text-muted mt-0.5">Pause push notifications during these hours.</p>
            </div>
            <Toggle on={quiet.enabled} onChange={v => setQuiet(q => ({ ...q, enabled: v }))} />
          </div>
          {quiet.enabled && (
            <div className="flex items-center gap-4 pt-1">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">From</label>
                <input
                  type="time"
                  value={quiet.from}
                  onChange={e => setQuiet(q => ({ ...q, from: e.target.value }))}
                  className="w-full rounded-xl border border-border-light bg-white px-3 py-2.5 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-g-dark/20 focus:border-g-dark transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">To</label>
                <input
                  type="time"
                  value={quiet.to}
                  onChange={e => setQuiet(q => ({ ...q, to: e.target.value }))}
                  className="w-full rounded-xl border border-border-light bg-white px-3 py-2.5 text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-g-dark/20 focus:border-g-dark transition-all"
                />
              </div>
            </div>
          )}
        </Card>

        <Button className="gap-2" onClick={handleSave}>
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Preferences</>}
        </Button>
      </div>
    </SettingsShell>
  );
}
