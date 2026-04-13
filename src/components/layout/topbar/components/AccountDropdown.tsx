'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ACCOUNT_MENU_ITEMS } from '../data/constants';

const USER_NAME  = 'Sarah Jones';
const USER_EMAIL = 'sarah@burgerpalace.co.uk';
const USER_ROLE  = 'Owner';
const USER_INITIALS = 'SJ';

interface AccountDropdownProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function AccountDropdown({ open, onToggle, onClose, containerRef }: AccountDropdownProps) {
  const handleLogout = () => {
    if (typeof window !== 'undefined') localStorage.removeItem('hungrinLoggedIn');
    onClose();
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2.5 pl-3 md:pl-4 border-l border-border-light group"
      >
        {/* Name + role — desktop only */}
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-text-dark leading-tight">{USER_NAME}</p>
          <p className="text-[11px] text-text-muted">{USER_ROLE}</p>
        </div>

        {/* Avatar */}
        <div className={cn(
          "w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#f0b8a0] to-[#c96a42]",
          "flex items-center justify-center text-white font-black text-sm shadow-md",
          "border-2 border-white ring-2 transition-all duration-200",
          open ? "ring-g-dark scale-95" : "ring-transparent group-hover:ring-g-dark/40"
        )}>
          {USER_INITIALS}
        </div>

        <ChevronDown className={cn(
          "w-3.5 h-3.5 text-text-muted transition-transform duration-200 hidden sm:block",
          open && "rotate-180"
        )} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-3 w-60 bg-white border border-border-light rounded-2xl shadow-xl z-50 overflow-hidden">

          {/* User info header */}
          <div className="px-4 py-4 flex items-center gap-3 bg-gradient-to-br from-g-faint via-white to-white border-b border-border-light">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f0b8a0] to-[#c96a42] flex items-center justify-center text-white font-black text-sm shadow shrink-0">
              {USER_INITIALS}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-text-dark truncate">{USER_NAME}</p>
              <p className="text-[10px] text-text-muted truncate">{USER_EMAIL}</p>
              <span className="mt-1 inline-block text-[9px] font-bold bg-g-pale text-g-dark px-2 py-0.5 rounded-full">
                {USER_ROLE}
              </span>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            {ACCOUNT_MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-mid hover:bg-g-faint hover:text-g-dark transition-colors group"
              >
                <span className="w-7 h-7 rounded-lg bg-g-faint group-hover:bg-g-pale flex items-center justify-center shrink-0 transition-colors">
                  <item.icon className="w-3.5 h-3.5 text-text-muted group-hover:text-g-dark transition-colors" />
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-border-light py-1.5">
            <Link
              href="/login"
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors group"
            >
              <span className="w-7 h-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center shrink-0 transition-colors">
                <LogOut className="w-3.5 h-3.5" />
              </span>
              Log out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
