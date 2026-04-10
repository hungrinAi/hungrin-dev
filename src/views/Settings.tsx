'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Save, ToggleLeft, ToggleRight, Trash2, User, CreditCard, Users, Bell } from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

const inputCls = "w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-g-dark focus:ring-2 focus:ring-g-pale transition-all";
const labelCls = "block text-xs font-bold text-text-dark mb-1.5";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="transition-all shrink-0">
      {on
        ? <ToggleRight className="w-8 h-8 text-g-dark" />
        : <ToggleLeft className="w-8 h-8 text-text-muted" />
      }
    </button>
  );
}

export default function Settings() {
  const [notifs, setNotifs] = useState({ email: true, promos: true, reports: true });
  const toggle = (key: keyof typeof notifs) => setNotifs(p => ({ ...p, [key]: !p[key] }));

  const [platforms, setPlatforms] = useState({
    deliveroo: true,
    uber: true,
    justeat: false,
  });
  const togglePlatform = (key: keyof typeof platforms) => setPlatforms(p => ({ ...p, [key]: !p[key] }));

  return (
    <AppLayout
      title="Settings"
      subtitle="Manage your account, restaurant profile, and platform integrations."
    >
      {/* Sub-navigation quick links */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Account Profile', href: '/settings/account', icon: User },
          { label: 'Billing', href: '/billing', icon: CreditCard },
          { label: 'Team', href: '/settings/team', icon: Users },
          { label: 'Notifications', href: '/settings/notifications', icon: Bell },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light rounded-xl text-xs font-bold text-text-mid hover:border-g-dark hover:text-g-dark transition-all shadow-sm"
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profile */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Profile</h3>
          <div className="space-y-3">
            <label className="block">
              <span className={labelCls}>Full Name</span>
              <input type="text" defaultValue="Sarah Jones" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Email Address</span>
              <input type="email" defaultValue="sarah@burgershack.com" className={inputCls} />
            </label>
          </div>
          <Button className="w-full gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </Card>

        {/* Restaurant Information */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Restaurant Information</h3>
          <div className="space-y-3">
            <label className="block">
              <span className={labelCls}>Restaurant Name</span>
              <input type="text" defaultValue="Sarah's Burger Shack" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Restaurant Location</span>
              <input type="text" defaultValue="London, UK" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Delivery Platforms</span>
              <input type="text" defaultValue="Uber Eats, Deliveroo" className={inputCls} />
            </label>
          </div>
          <Button className="w-full gap-2">
            <Save className="w-4 h-4" /> Update Restaurant
          </Button>
        </Card>

        {/* Delivery Integrations */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Delivery Integrations</h3>
          <div className="space-y-3">
            {[
              { key: 'deliveroo' as const, name: 'Deliveroo', color: 'bg-[#00CCBC]', letter: 'D' },
              { key: 'uber' as const, name: 'Uber Eats', color: 'bg-black', letter: 'U' },
              { key: 'justeat' as const, name: 'Just Eat', color: 'bg-[#FF8000]', letter: 'J' },
            ].map((p) => (
              <div key={p.key} className="flex items-center justify-between p-3 bg-g-faint rounded-xl border border-border-light">
                <div className="flex items-center gap-3">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0", p.color)}>
                    {p.letter}
                  </div>
                  <p className="text-sm font-medium text-text-dark">{p.name}</p>
                </div>
                <Toggle on={platforms[p.key]} onToggle={() => togglePlatform(p.key)} />
              </div>
            ))}
          </div>
          <Button className="w-full gap-2">
            <Save className="w-4 h-4" /> Update Restaurant
          </Button>
        </Card>

        {/* Notifications */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Notifications</h3>
          <div className="space-y-3">
            {[
              { key: 'email' as const, label: 'Email Alerts', desc: 'Get notified about new orders and activity' },
              { key: 'promos' as const, label: 'Promotion Suggestions', desc: 'AI-generated promo recommendations' },
              { key: 'reports' as const, label: 'Weekly Performance Reports', desc: 'Summary of your weekly sales data' },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between p-3 bg-g-faint rounded-xl border border-border-light">
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-sm font-medium text-text-dark">{n.label}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{n.desc}</p>
                </div>
                <Toggle on={notifs[n.key]} onToggle={() => toggle(n.key)} />
              </div>
            ))}
          </div>
        </Card>

        {/* Password & Security */}
        <Card className="p-6 space-y-4 md:col-span-2">
          <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">Password &amp; Security</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="block">
              <span className={labelCls}>Current Password</span>
              <input type="password" placeholder="••••••••" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>New Password</span>
              <input type="password" placeholder="••••••••" className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Confirm New Password</span>
              <input type="password" placeholder="••••••••" className={inputCls} />
            </label>
          </div>
          <div className="flex items-center justify-between pt-1">
            <Button className="gap-2">
              <Save className="w-4 h-4" /> Update Password
            </Button>
            <Button variant="danger" size="sm" className="gap-2">
              <Trash2 className="w-4 h-4" /> Delete Account
            </Button>
          </div>
        </Card>

      </div>
    </AppLayout>
  );
}
