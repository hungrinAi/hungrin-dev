'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { STORAGE_KEYS, ROUTES } from '@/src/lib/constants';

interface AppLayoutProps {
  children: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
}

export const AppLayout = ({ children, title, subtitle }: AppLayoutProps) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Client-side auth guard — redirect to login if not authenticated
  useEffect(() => {
    const loggedIn = typeof window !== 'undefined'
      ? localStorage.getItem(STORAGE_KEYS.LOGGED_IN)
      : null;
    if (!loggedIn) {
      router.replace(ROUTES.LOGIN);
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  // Don't render anything until auth is confirmed (prevents flash of content)
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#eaf6f0] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-g-dark border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#eaf6f0]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={title} subtitle={subtitle} onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};
