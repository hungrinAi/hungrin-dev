import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface AppLayoutProps {
  children: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
}

export const AppLayout = ({ children, title, subtitle }: AppLayoutProps) => {
  return (
    <div className="flex h-screen bg-[#eaf6f0]">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={title} subtitle={subtitle} />
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};
