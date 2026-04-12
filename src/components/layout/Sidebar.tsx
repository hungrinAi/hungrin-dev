'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart2,
  Megaphone,
  Target,
  FolderOpen,
  Users,
  Settings,
  X,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '../brand';

const navItems = [
  { icon: Home,       label: 'Dashboard',  path: '/dashboard' },
  { icon: Target,     label: 'AI Promos',  path: '/promotions' },
  { icon: FolderOpen, label: 'CSV Upload', path: '/orders' },
  { icon: Users,      label: 'Customers',  path: '/customers' },
  { icon: Megaphone,  label: 'Campaigns',  path: '/campaigns' },
  { icon: BarChart2,  label: 'Insights',   path: '/insights' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "w-64 h-screen bg-white border-r border-border-light flex flex-col py-5 shrink-0",
      "fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      {/* Logo — links back to home */}
      <div className="px-5 mb-6 flex items-center justify-between">
        <Link href="/" onClick={onClose} className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 text-text-muted hover:text-g-dark hover:bg-g-faint rounded-lg transition-all"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav label */}
      <p className="px-5 mb-1.5 text-[10px] font-bold text-text-muted uppercase tracking-widest">Menu</p>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.path ||
            (item.path !== '/dashboard' && pathname?.startsWith(item.path));
          return (
            <Link
              key={item.label}
              href={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group",
                isActive
                  ? "bg-gradient-to-r from-g-dark to-[#1e5c47] text-white shadow-[0_4px_12px_rgba(45,122,95,0.3)]"
                  : "text-text-mid hover:bg-g-faint hover:text-g-dark"
              )}
            >
              <item.icon className={cn(
                "w-4.5 h-4.5 shrink-0 transition-transform duration-150 group-hover:scale-110",
                isActive ? "text-white" : "text-text-muted group-hover:text-g-dark"
              )} style={{ width: '1.1rem', height: '1.1rem' }} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pt-3 border-t border-border-light mt-3 space-y-1">
        <Link
          href="/settings"
          onClick={onClose}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
            pathname === '/settings' || pathname?.startsWith('/settings/')
              ? "bg-gradient-to-r from-g-dark to-[#1e5c47] text-white shadow-[0_4px_12px_rgba(45,122,95,0.3)]"
              : "text-text-mid hover:bg-g-faint hover:text-g-dark"
          )}
        >
          <Settings style={{ width: '1.1rem', height: '1.1rem' }} className="shrink-0 text-inherit" />
          Settings
        </Link>
        <Link
          href="/demo"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-g-dark to-[#1e5c47] text-white py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_6px_18px_rgba(45,122,95,0.4)] hover:-translate-y-0.5 transition-all duration-200 shadow-[0_4px_12px_rgba(45,122,95,0.25)]"
        >
          <Sparkles className="w-4 h-4" /> Book Demo
        </Link>
      </div>
    </aside>
  );
};
