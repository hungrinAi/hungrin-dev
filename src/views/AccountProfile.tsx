'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User, CreditCard, Users, Bell, ChevronLeft,
  Camera, Save, Check, Trash2
} from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';

const subNavItems = [
  { label: 'Account', href: '/settings/account', icon: User },
  { label: 'Billing', href: '/billing', icon: CreditCard },
  { label: 'Team', href: '/settings/team', icon: Users },
  { label: 'Notifications', href: '/settings/notifications', icon: Bell },
];

const inputCls = "w-full bg-g-faint border border-border-light rounded-xl px-4 py-2.5 text-sm outline-none focus:border-g-dark focus:ring-2 focus:ring-g-pale transition-all";
const labelCls = "block text-xs font-bold text-text-dark mb-1.5";

const PLATFORMS = [
  { id: 'deliveroo', name: 'Deliveroo', color: 'bg-[#00CCBC]', letter: 'D', connected: true },
  { id: 'uber', name: 'Uber Eats', color: 'bg-black', letter: 'U', connected: true },
  { id: 'justeat', name: 'Just Eat', color: 'bg-[#FF8000]', letter: 'J', connected: false },
];

export default function AccountProfile() {
  const pathname = usePathname();
  const [platforms, setPlatforms] = useState<Record<string, boolean>>(
    Object.fromEntries(PLATFORMS.map(p => [p.id, p.connected]))
  );

  const togglePlatform = (id: string) =>
    setPlatforms(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <AppLayout
      title={
        <span className="flex items-center gap-1.5 text-sm font-bold text-text-muted">
          <Link href="/settings" className="hover:text-g-dark transition-all">Settings</Link>
          <span className="text-border-light">/</span>
          <span className="text-text-dark">Account Profile</span>
        </span>
      }
    >
      {/* Mobile horizontal tab strip — visible below md */}
      <div className="md:hidden -mx-4 md:-mx-6 lg:-mx-8 px-4 border-b border-border-light bg-white overflow-x-auto no-scrollbar mb-2">
        <div className="flex gap-1 py-2 min-w-max">
          {subNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all",
                  isActive
                    ? "bg-g-pale text-g-dark"
                    : "text-text-mid hover:bg-g-faint hover:text-g-dark"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex gap-6 min-h-0">
        {/* Sub-navigation sidebar — desktop only */}
        <div className="w-48 shrink-0 hidden md:block">
          <Card className="p-2 space-y-0.5 sticky top-4">
            {subNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-g-pale text-g-dark font-bold"
                      : "text-text-mid hover:bg-g-faint hover:text-g-dark"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 mt-1 border-t border-border-light">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-text-muted hover:bg-g-faint hover:text-g-dark transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
                Back to Dashboard
              </Link>
            </div>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Profile Card */}
          <Card className="p-6 space-y-5">
            <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">
              Profile Information
            </h3>

            {/* Avatar section */}
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-border-light shadow-sm">
                  <Image
                    src="/images/robot-thumbsup.jpeg"
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
              <div>
                <p className="text-sm font-bold text-text-dark">Sarah Jones</p>
                <p className="text-xs text-text-muted mt-0.5">sarah@burgershack.com</p>
                <button className="mt-2 text-[10px] font-bold text-g-dark border border-g-dark/30 bg-g-pale rounded-lg px-3 py-1.5 hover:bg-g-dark hover:text-white transition-all flex items-center gap-1.5">
                  <Camera className="w-3 h-3" /> Change Photo
                </button>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className={labelCls}>First Name</span>
                <input type="text" defaultValue="Sarah" className={inputCls} />
              </label>
              <label className="block">
                <span className={labelCls}>Last Name</span>
                <input type="text" defaultValue="Jones" className={inputCls} />
              </label>
              <label className="block sm:col-span-2">
                <span className={labelCls}>Email Address</span>
                <input type="email" defaultValue="sarah@burgershack.com" className={inputCls} />
              </label>
              <label className="block">
                <span className={labelCls}>Phone Number</span>
                <input type="tel" defaultValue="+44 7700 900123" className={inputCls} />
              </label>
              <label className="block">
                <span className={labelCls}>Role</span>
                <input type="text" defaultValue="Owner" className={inputCls} />
              </label>
            </div>

            <Button className="gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </Card>

          {/* Connected Platforms */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-dark border-b border-border-light pb-3">
              Connected Platforms
            </h3>
            <div className="space-y-3">
              {PLATFORMS.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 rounded-2xl border-2 transition-all"
                  style={{ borderColor: platforms[p.id] ? undefined : undefined }}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0", p.color)}>
                      {p.letter}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-dark">{p.name}</p>
                      <p className="text-xs text-text-muted">
                        {platforms[p.id] ? 'Connected · Syncing orders' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {platforms[p.id] ? (
                      <>
                        <span className="text-[10px] font-bold bg-g-pale text-g-dark px-2 py-1 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Active
                        </span>
                        <button
                          onClick={() => togglePlatform(p.id)}
                          className="text-[10px] font-bold text-text-muted border border-border-light px-2.5 py-1.5 rounded-lg hover:border-red-300 hover:text-red-500 transition-all"
                        >
                          Disconnect
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => togglePlatform(p.id)}
                        className="text-[10px] font-bold text-g-dark border border-g-dark/30 bg-g-pale px-2.5 py-1.5 rounded-lg hover:bg-g-dark hover:text-white transition-all"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 space-y-4 border-red-100">
            <h3 className="text-sm font-bold text-red-500 border-b border-red-100 pb-3">
              Danger Zone
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-dark">Delete Account</p>
                <p className="text-xs text-text-muted mt-0.5">Permanently remove your account and all data.</p>
              </div>
              <Button variant="danger" size="sm" className="gap-2 shrink-0">
                <Trash2 className="w-4 h-4" /> Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
