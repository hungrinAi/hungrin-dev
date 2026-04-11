'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, ChevronDown, User, CreditCard, Tag, HelpCircle, Utensils, LogOut } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { useNotifications } from '@/src/contexts/NotificationsContext';
import { NotificationsPanel } from '@/src/components/ui/NotificationsPanel';

interface TopbarProps {
  title: React.ReactNode;
  subtitle?: string;
  onMenuClick?: () => void;
}

const accountMenuItems = [
  { icon: User,      label: 'My Account',         href: '/settings/account' },
  { icon: CreditCard, label: 'Billing',            href: '/billing' },
  { icon: Tag,        label: 'Pricing',            href: '/pricing' },
  { icon: HelpCircle, label: 'Support',            href: '/support' },
  { icon: Utensils,   label: 'Linked Restaurants', href: '/settings' },
];

export const Topbar = ({ title, subtitle, onMenuClick }: TopbarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 md:h-[68px] bg-white border-b border-border-light px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-text-mid hover:text-g-dark rounded-xl hover:bg-g-faint transition-all shrink-0 active:scale-95"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-base md:text-lg font-bold tracking-tight text-text-dark truncate leading-tight">{title}</h1>
          {subtitle && <p className="text-[11px] text-text-muted mt-0.5 hidden sm:block truncate">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Notification bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(o => !o)}
            className={cn(
              "relative p-2.5 border rounded-xl transition-all active:scale-95",
              notifOpen
                ? "bg-g-pale border-g-dark/30 text-g-dark"
                : "bg-g-faint border-border-light text-text-mid hover:text-g-dark hover:border-g-dark/30 hover:bg-g-pale"
            )}
          >
            <Bell style={{ width: '1.1rem', height: '1.1rem' }} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 border-2 border-white rounded-full text-white text-[9px] font-black flex items-center justify-center leading-none">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>

        {/* Account dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={cn(
              "flex items-center gap-2.5 pl-3 md:pl-4 border-l border-border-light hover:opacity-90 transition-opacity",
              dropdownOpen && "opacity-90"
            )}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-text-dark leading-tight">Sarah Jones</p>
              <p className="text-[11px] text-text-muted">Owner</p>
            </div>
            <div className={cn(
              "w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#f0b8a0] to-[#c96a42]",
              "border-2 border-white flex items-center justify-center text-white font-black text-sm shadow-md",
              "ring-2 transition-all duration-200",
              dropdownOpen ? "ring-g-dark" : "ring-transparent hover:ring-g-dark/40"
            )}>
              SJ
            </div>
            <ChevronDown className={cn(
              "w-3.5 h-3.5 text-text-muted transition-transform duration-200 hidden sm:block",
              dropdownOpen && "rotate-180"
            )} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-56 max-w-[calc(100vw-1rem)] bg-white border border-border-light rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3.5 border-b border-border-light bg-gradient-to-br from-g-faint to-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f0b8a0] to-[#c96a42] flex items-center justify-center text-white font-black text-xs shadow-sm shrink-0">
                    SJ
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-text-dark truncate">Sarah Jones</p>
                    <p className="text-[10px] text-text-muted truncate">sarah@burgerpalace.co.uk</p>
                  </div>
                </div>
              </div>

              <div className="py-1.5">
                {accountMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-mid hover:bg-g-faint hover:text-g-dark transition-colors group"
                  >
                    <item.icon className="w-4 h-4 shrink-0 text-text-muted group-hover:text-g-dark transition-colors" />
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-border-light py-1.5">
                <Link
                  href="/login"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      localStorage.removeItem('hungrinLoggedIn');
                    }
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Log out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
