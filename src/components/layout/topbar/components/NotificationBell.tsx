'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { NotificationsPanel } from '@/src/components/ui/NotificationsPanel';
import { useNotifications } from '@/src/contexts/NotificationsContext';

interface NotificationBellProps {
  open: boolean;
  onToggle: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function NotificationBell({ open, onToggle, containerRef }: NotificationBellProps) {
  const { unreadCount } = useNotifications();

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={onToggle}
        aria-label="Notifications"
        className={cn(
          "relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl border transition-all duration-200 active:scale-95",
          open
            ? "bg-g-pale border-g-dark/30 text-g-dark shadow-sm"
            : "bg-g-faint border-border-light text-text-muted hover:text-g-dark hover:border-g-dark/20 hover:bg-g-pale"
        )}
      >
        <Bell className="w-[1.05rem] h-[1.05rem]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-red-500 border-2 border-white rounded-full text-white text-[8px] font-black flex items-center justify-center leading-none">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      <NotificationsPanel open={open} onClose={() => onToggle()} />
    </div>
  );
}
