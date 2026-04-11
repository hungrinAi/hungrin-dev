'use client';

import React from 'react';
import Image from 'next/image';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { useApi } from '@/src/hooks/useApi';
import { dashboardService } from '@/src/services';
import { StatsGrid } from '@/src/features/dashboard/components/StatsGrid';
import { SalesChart } from '@/src/features/dashboard/components/SalesChart';
import { PromoCard } from '@/src/features/dashboard/components/PromoCard';
import { AiAssistant } from '@/src/features/dashboard/components/AiAssistant';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { PageLoading } from '@/src/components/ui/Loading';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 18) return 'Afternoon';
  return 'Evening';
}

export default function Dashboard() {
  const { data: stats, loading, error } = useApi(dashboardService.getStats);

  if (loading) return <PageLoading message="Loading your dashboard" />;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <AppLayout
      title={<span>{getGreeting()}, <strong className="text-g-dark">Sarah! 👋</strong></span>}
      subtitle="Here's what's happening with your restaurant today."
    >
      <div className="space-y-6">
        <StatsGrid stats={stats} />
        <SalesChart stats={stats} />

        {/* AI Business Insight Banner */}
        <div className="bg-g-dark rounded-2xl p-5 flex items-start gap-4 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-10">
            <Image src="/images/robot-burger.jpeg" alt="" width={120} height={120} className="rounded-xl" />
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-xl">🤖</span>
          </div>
          <div className="flex-1 min-w-0 relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-sm">AI Business Insight</span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Live Analysis</span>
            </div>
            <p className="text-white/80 text-xs leading-relaxed">
              Your <strong className="text-white">Chicken Burger</strong> sales peak on Tuesday nights.
              We recommend launching a <em className="text-white">'Buy 1 Get 1 Free'</em> promo tomorrow
              to increase your order volume by an estimated <strong className="text-white">15%</strong>.
            </p>
          </div>
          <Link
            href="/promotions"
            className="shrink-0 bg-white text-g-dark text-xs font-bold px-4 py-2 rounded-xl hover:bg-g-pale transition-all flex items-center gap-1.5 relative z-10"
          >
            Create Promo <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PromoCard stats={stats} />
          <AiAssistant stats={stats} />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/promotions', emoji: '🎯', label: 'AI Promos', sub: 'Create smart promotions' },
            { href: '/orders',     emoji: '📂', label: 'CSV Upload', sub: 'Upload sales data' },
            { href: '/customers',  emoji: '👥', label: 'Customers', sub: 'View your base' },
            { href: '/insights',   emoji: '📊', label: 'Insights', sub: 'Revenue & trends' },
          ].map(({ href, emoji, label, sub }) => (
            <Link
              key={label}
              href={href}
              className="bg-white border border-border-light rounded-2xl p-4 flex flex-col gap-2 hover:shadow-md hover:border-g-dark/30 transition-all group"
            >
              <span className="text-2xl">{emoji}</span>
              <div>
                <p className="text-sm font-bold text-text-dark group-hover:text-g-dark transition-colors">{label}</p>
                <p className="text-[10px] text-text-muted">{sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
