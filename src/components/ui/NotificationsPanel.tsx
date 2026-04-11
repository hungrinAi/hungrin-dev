'use client';

import React, { useRef, useEffect } from 'react';
import { Bell, CheckCheck, Trash2, Info, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { useNotifications, type AppNotification } from '@/src/contexts/NotificationsContext';
import { cn } from '@/src/lib/utils';

const TYPE_STYLES: Record<AppNotification['type'], { icon: React.ElementType; bg: string; iconColor: string; dot: string }> = {
  success: { icon: CheckCircle2, bg: 'bg-g-pale', iconColor: 'text-g-dark', dot: 'bg-g-dark' },
  info:    { icon: Info,         bg: 'bg-blue-50',  iconColor: 'text-blue-500', dot: 'bg-blue-500' },
  warning: { icon: AlertTriangle, bg: 'bg-yellow-50', iconColor: 'text-yellow-600', dot: 'bg-yellow-500' },
};

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ open, onClose }: NotificationsPanelProps) {
  const { notifications, markRead, markAllRead, clearAll, unreadCount } = useNotifications();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2.5 w-80 max-w-[calc(100vw-1rem)] bg-white border border-border-light rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border-light bg-gradient-to-br from-g-faint to-white">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-g-dark" />
          <h3 className="text-sm font-bold text-text-dark">Notifications</h3>
          {unreadCount > 0 && (
            <span className="w-5 h-5 bg-g-dark text-white text-[10px] font-black rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              title="Mark all as read"
              className="p-1.5 text-text-muted hover:text-g-dark hover:bg-g-pale rounded-lg transition-all"
            >
              <CheckCheck className="w-3.5 h-3.5" />
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              title="Clear all"
              className="p-1.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-dark hover:bg-g-faint rounded-lg transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notification list */}
      <div className="max-h-[340px] overflow-y-auto divide-y divide-border-light">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center px-4">
            <div className="w-12 h-12 bg-g-faint rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-text-muted" />
            </div>
            <div>
              <p className="text-sm font-bold text-text-dark">All caught up!</p>
              <p className="text-[11px] text-text-muted mt-0.5">No notifications right now.</p>
            </div>
          </div>
        ) : (
          notifications.map((n) => {
            const { icon: Icon, bg, iconColor, dot } = TYPE_STYLES[n.type];
            return (
              <button
                key={n.id}
                onClick={() => markRead(n.id)}
                className={cn(
                  'w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-g-faint/60 transition-colors',
                  !n.read && 'bg-g-faint/40'
                )}
              >
                <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5', bg)}>
                  <Icon className={cn('w-4 h-4', iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn('text-xs leading-snug', n.read ? 'font-medium text-text-mid' : 'font-bold text-text-dark')}>
                      {n.title}
                    </p>
                    {!n.read && (
                      <span className={cn('w-2 h-2 rounded-full shrink-0 mt-1', dot)} />
                    )}
                  </div>
                  <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed line-clamp-2">{n.message}</p>
                  <p className="text-[10px] text-text-muted/70 mt-1">{n.time}</p>
                </div>
              </button>
            );
          })
        )}
      </div>

      {notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-border-light bg-g-faint/50 text-center">
          <p className="text-[10px] text-text-muted">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
              : 'All notifications read'}
          </p>
        </div>
      )}
    </div>
  );
}
