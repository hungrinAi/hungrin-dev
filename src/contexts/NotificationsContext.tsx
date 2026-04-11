'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  time: string;
  read: boolean;
}

interface NotificationsContextValue {
  notifications: AppNotification[];
  addNotification: (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
  unreadCount: number;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'seed-1',
    title: 'Campaign going live soon',
    message: '"Summer Burger Fest" starts in 2 hours on Uber Eats & Deliveroo.',
    type: 'info',
    time: '5 min ago',
    read: false,
  },
  {
    id: 'seed-2',
    title: 'New order received',
    message: 'Order #1042 from Sarah M. — £18.99 via Deliveroo.',
    type: 'success',
    time: '12 min ago',
    read: false,
  },
  {
    id: 'seed-3',
    title: 'AI promo suggestion',
    message: 'Your Tuesday traffic is low. Launch a mid-week deal?',
    type: 'info',
    time: '1 hr ago',
    read: true,
  },
  {
    id: 'seed-4',
    title: 'Weekly report ready',
    message: 'Your week 14 performance summary is now available.',
    type: 'info',
    time: '3 hrs ago',
    read: true,
  },
];

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(SEED_NOTIFICATIONS);

  const addNotification = useCallback((n: Omit<AppNotification, 'id' | 'time' | 'read'>) => {
    const newNotif: AppNotification = {
      ...n,
      id: Date.now().toString(),
      time: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, markRead, markAllRead, clearAll, unreadCount }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
}
