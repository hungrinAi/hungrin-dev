import React from 'react';
import { Bell, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface TopbarProps {
  title: React.ReactNode;
  subtitle?: string;
}

export const Topbar = ({ title, subtitle }: TopbarProps) => {
  return (
    <header className="h-20 bg-white border-bottom border-border-light px-8 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-text-dark">{title}</h1>
        {subtitle && <p className="text-sm text-text-muted mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2.5 bg-g-faint border border-border-light rounded-xl text-text-mid hover:text-g-dark transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-border-light">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-text-dark">Sarah Jones</p>
            <p className="text-xs text-text-muted">Owner</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f0b8a0] to-[#d4805a] border-2 border-border-light flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer">
            SJ
          </div>
        </div>
      </div>
    </header>
  );
};
