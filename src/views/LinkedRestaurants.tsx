'use client';

import React, { useState } from 'react';
import { Check, GitMerge, Link2, Mail, MapPin, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import { SettingsShell } from '@/src/components/layout/SettingsShell';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

interface LinkedRestaurant {
  id: string;
  name: string;
  location: string;
  email: string;
  initials: string;
  color: string;
  status: 'active' | 'pending';
}

const INITIAL_LINKED: LinkedRestaurant[] = [
  {
    id: '1',
    name: "Sarah's Pizza Palace",
    location: 'Manchester, UK',
    email: 'pizza@sarahgroup.co.uk',
    initials: 'PP',
    color: 'bg-amber-600',
    status: 'active',
  },
];

const CURRENT: LinkedRestaurant = {
  id: '0',
  name: "Sarah's Burger Shack",
  location: 'London, UK',
  email: 'sarah@burgershack.com',
  initials: 'BS',
  color: 'bg-[#0d3d2c]',
  status: 'active',
};

interface LinkModalProps {
  open: boolean;
  onClose: () => void;
  onLink: (name: string, location: string, email: string) => void;
}

function LinkModal({ open, onClose, onLink }: LinkModalProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const inputCls = 'mt-1 block w-full rounded-xl border border-border-light bg-white px-3 py-2.5 text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-g-dark/20 focus:border-g-dark transition-all';
  const labelCls = 'text-[10px] font-bold text-text-muted uppercase tracking-wider';

  const handleSubmit = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Restaurant name is required';
    if (!email.trim()) errs.email = 'Account email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onLink(name.trim(), location.trim() || 'Unknown location', email.trim());
    setName(''); setLocation(''); setEmail(''); setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-text-dark">Link a Restaurant</h3>
          <button onClick={onClose} className="text-text-muted hover:text-text-dark transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-text-muted leading-relaxed">
          Enter the details of another restaurant you own that already has a Hungrin account.
          We&apos;ll send a verification email to confirm ownership before linking.
        </p>

        <div className="space-y-4">
          <div className="space-y-1">
            <label>
              <span className={labelCls}>Restaurant Name <span className="text-red-500">*</span></span>
              <input type="text" value={name}
                onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                placeholder="e.g. Sarah's Pizza Palace"
                className={cn(inputCls, errors.name ? 'border-red-400' : '')} />
            </label>
            {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label>
              <span className={labelCls}>Location</span>
              <input type="text" value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Manchester, UK"
                className={inputCls} />
            </label>
          </div>

          <div className="space-y-1">
            <label>
              <span className={labelCls}>Account Email <span className="text-red-500">*</span></span>
              <input type="email" value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                placeholder="e.g. manager@restaurant.co.uk"
                className={cn(inputCls, errors.email ? 'border-red-400' : '')} />
            </label>
            {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email}</p>}
          </div>
        </div>

        <div className="p-3 bg-g-faint rounded-xl border border-border-light">
          <p className="text-[10px] text-text-muted leading-relaxed">
            <span className="font-bold text-g-dark">How it works:</span> After linking, you can switch between
            restaurants from this page without logging out. Each restaurant keeps its own data, orders, and promotions.
          </p>
        </div>

        <div className="flex gap-2 pt-1">
          <Button onClick={handleSubmit} className="flex-1 gap-2">
            <Mail className="w-4 h-4" /> Send Verification
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function RestaurantCard({
  restaurant,
  isCurrent,
  onSwitch,
  onRemove,
}: {
  restaurant: LinkedRestaurant;
  isCurrent?: boolean;
  onSwitch?: () => void;
  onRemove?: () => void;
}) {
  return (
    <div className={cn(
      'flex items-center gap-4 p-4 rounded-2xl border-2 transition-all',
      isCurrent
        ? 'border-g-dark bg-g-pale'
        : restaurant.status === 'pending'
          ? 'border-amber-200 bg-amber-50/40'
          : 'border-border-light hover:border-g-dark/20'
    )}>
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0',
        restaurant.color
      )}>
        {restaurant.initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-bold text-text-dark truncate">{restaurant.name}</p>
          {isCurrent && (
            <span className="text-[9px] font-bold bg-g-dark text-white px-2 py-0.5 rounded-full">
              Current
            </span>
          )}
          {restaurant.status === 'pending' && (
            <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <RefreshCw className="w-2.5 h-2.5" /> Pending
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="flex items-center gap-1 text-[10px] text-text-muted">
            <MapPin className="w-3 h-3 shrink-0" /> {restaurant.location}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-text-muted">
            <Mail className="w-3 h-3 shrink-0" /> {restaurant.email}
          </span>
        </div>
      </div>

      {!isCurrent && (
        <div className="flex items-center gap-2 shrink-0">
          {restaurant.status === 'active' && (
            <button
              onClick={onSwitch}
              className="text-[10px] font-bold text-g-dark border border-g-dark/30 bg-g-pale px-2.5 py-1.5 rounded-lg hover:bg-g-dark hover:text-white transition-all whitespace-nowrap flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Switch
            </button>
          )}
          <button
            onClick={onRemove}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted border border-border-light hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function LinkedRestaurants() {
  const [linked, setLinked] = useState<LinkedRestaurant[]>(INITIAL_LINKED);
  const [showModal, setShowModal] = useState(false);
  const [switched, setSwitched] = useState(false);

  const handleLink = (name: string, location: string, email: string) => {
    const initials = name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const colors = ['bg-purple-600', 'bg-blue-600', 'bg-rose-600', 'bg-teal-700', 'bg-orange-600'];
    const color = colors[linked.length % colors.length];
    setLinked(prev => [...prev, { id: Date.now().toString(), name, location, email, initials, color, status: 'pending' }]);
  };

  const handleRemove = (id: string) =>
    setLinked(prev => prev.filter(r => r.id !== id));

  const handleSwitch = () => {
    setSwitched(true);
    setTimeout(() => setSwitched(false), 2000);
  };

  return (
    <SettingsShell active="Account">
      <div className="space-y-6">

        {/* Header */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-g-pale border border-g-dark/20 flex items-center justify-center shrink-0">
                <GitMerge className="w-5 h-5 text-g-dark" />
              </div>
              <div>
                <h2 className="text-base font-black text-text-dark">Linked Restaurants</h2>
                <p className="text-xs text-text-muted mt-1">
                  Connect multiple restaurants you own so you can switch between them instantly without logging out.
                </p>
              </div>
            </div>
            <Button className="gap-2 shrink-0" onClick={() => setShowModal(true)}>
              <Plus className="w-4 h-4" /> Link Restaurant
            </Button>
          </div>
        </Card>

        {/* Current restaurant */}
        <Card className="p-6 space-y-3">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">
            Currently Active
          </h3>
          <RestaurantCard restaurant={CURRENT} isCurrent />
        </Card>

        {/* Linked restaurants */}
        <Card className="p-6 space-y-3">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">
            {linked.length === 0 ? 'No Linked Restaurants' : `${linked.length} Linked ${linked.length === 1 ? 'Restaurant' : 'Restaurants'}`}
          </h3>

          {linked.length === 0 ? (
            <div className="py-8 flex flex-col items-center gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-g-faint border border-border-light flex items-center justify-center">
                <Link2 className="w-7 h-7 text-text-muted" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-dark">No linked restaurants yet</p>
                <p className="text-xs text-text-muted mt-1">Link another restaurant you own to manage everything from one account.</p>
              </div>
              <Button size="sm" className="gap-2 mt-1" onClick={() => setShowModal(true)}>
                <Plus className="w-4 h-4" /> Link Your First Restaurant
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {linked.map(r => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  onSwitch={handleSwitch}
                  onRemove={() => handleRemove(r.id)}
                />
              ))}
            </div>
          )}

          {switched && (
            <div className="flex items-center gap-2 p-3 bg-g-pale border border-g-dark/20 rounded-xl text-sm font-bold text-g-dark">
              <Check className="w-4 h-4 shrink-0" /> Switched restaurant! Reloading your dashboard...
            </div>
          )}
        </Card>

        {/* Info box */}
        <div className="p-4 bg-g-faint border border-border-light rounded-2xl">
          <p className="text-xs text-text-muted leading-relaxed">
            <span className="font-bold text-text-dark">About linking:</span> Each linked restaurant is a separate Hungrin account.
            Linking lets you switch between them quickly. Orders, promotions, and data remain separate per restaurant.
            Pending restaurants require email verification before becoming active.
          </p>
        </div>
      </div>

      <LinkModal open={showModal} onClose={() => setShowModal(false)} onLink={handleLink} />
    </SettingsShell>
  );
}
