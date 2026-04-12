'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { useTopbarState } from './topbar/hooks/useTopbarState';
import { NotificationBell } from './topbar/components/NotificationBell';
import { AccountDropdown } from './topbar/components/AccountDropdown';

interface TopbarProps {
  title: React.ReactNode;
  subtitle?: string;
  onMenuClick?: () => void;
}

export const Topbar = ({ title, subtitle, onMenuClick }: TopbarProps) => {
  const {
    dropdownOpen, setDropdownOpen,
    notifOpen, setNotifOpen,
    dropdownRef, notifRef,
  } = useTopbarState();

  return (
    <header className="h-16 md:h-[68px] bg-white/95 backdrop-blur-sm border-b border-border-light px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">

      {/* Left — mobile menu button + page title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="lg:hidden w-9 h-9 flex items-center justify-center text-text-mid hover:text-g-dark rounded-xl hover:bg-g-faint border border-transparent hover:border-border-light transition-all active:scale-95 shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base md:text-lg font-bold tracking-tight text-text-dark truncate leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-text-muted mt-0.5 hidden sm:block truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <NotificationBell
          open={notifOpen}
          onToggle={() => setNotifOpen(o => !o)}
          containerRef={notifRef}
        />
        <AccountDropdown
          open={dropdownOpen}
          onToggle={() => setDropdownOpen(o => !o)}
          onClose={() => setDropdownOpen(false)}
          containerRef={dropdownRef}
        />
      </div>
    </header>
  );
};
