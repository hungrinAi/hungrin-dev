'use client';

import { NotificationsProvider } from '@/src/contexts/NotificationsContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <NotificationsProvider>{children}</NotificationsProvider>;
}
