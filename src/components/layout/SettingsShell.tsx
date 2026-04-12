'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, CreditCard, Users, Bell, ChevronLeft } from 'lucide-react';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { Card } from '@/src/components/ui/Card';
import { cn } from '@/src/lib/utils';

const SETTINGS_TABS = [
  { label: 'Account',       href: '/settings/account',       icon: User },
  { label: 'Billing',       href: '/billing',                 icon: CreditCard },
  { label: 'Team',          href: '/settings/team',           icon: Users },
  { label: 'Notifications', href: '/settings/notifications',  icon: Bell },
] as const;

interface SettingsShellProps {
  /** Active tab label — e.g. 'Account', 'Billing' */
  active: string;
  children: React.ReactNode;
}

export function SettingsShell({ active, children }: SettingsShellProps) {
  const pathname = usePathname();

  const isActive = (href: string, label: string) =>
    pathname === href || label === active;

  return (
    <AppLayout
      title={
        <span className="flex items-center gap-1.5 text-sm font-bold text-text-muted">
          <Link href="/settings/account" className="hover:text-g-dark transition-all">Settings</Link>
          <span className="text-border-light">/</span>
          <span className="text-text-dark">{active}</span>
        </span>
      }
    >
      {/* ── Mobile horizontal tab strip ── */}
      <div className="md:hidden -mx-4 px-4 border-b border-border-light bg-white overflow-x-auto no-scrollbar mb-4">
        <div className="flex gap-1 py-2 min-w-max">
          {SETTINGS_TABS.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all',
                isActive(href, label)
                  ? 'bg-g-pale text-g-dark'
                  : 'text-text-mid hover:bg-g-faint hover:text-g-dark'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex gap-6 min-h-0">
        {/* ── Desktop sidebar ── */}
        <div className="w-48 shrink-0 hidden md:block">
          <Card className="p-2 space-y-0.5 sticky top-4">
            {SETTINGS_TABS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  isActive(href, label)
                    ? 'bg-g-pale text-g-dark font-bold'
                    : 'text-text-mid hover:bg-g-faint hover:text-g-dark'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            ))}
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

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0 space-y-6">
          {children}
        </div>
      </div>
    </AppLayout>
  );
}
