'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppLayout } from '@/src/components/layout/AppLayout';
import { useDashboard, StatsGrid, SalesChart, PromoCard, AiAssistant } from '@/src/features/dashboard';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { PageLoading } from '@/src/components/ui/Loading';
import { cn } from '@/src/lib/utils';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
}

const QUICK_LINKS = [
  {
    href: '/promotions',
    emoji: '🎯',
    label: 'AI Promos',
    sub: 'Create smart promotions',
    gradient: 'from-[#e8f8f0] to-[#d0eedd]',
    hoverRing: 'hover:ring-g-dark/30',
  },
  {
    href: '/orders',
    emoji: '📂',
    label: 'CSV Upload',
    sub: 'Upload sales data',
    gradient: 'from-[#eef3ff] to-[#dde8ff]',
    hoverRing: 'hover:ring-[#4f6ef7]/30',
  },
  {
    href: '/customers',
    emoji: '👥',
    label: 'Customers',
    sub: 'View your base',
    gradient: 'from-[#fdf0f8] to-[#f7ddf0]',
    hoverRing: 'hover:ring-[#c050a0]/30',
  },
  {
    href: '/insights',
    emoji: '📊',
    label: 'Insights',
    sub: 'Revenue & trends',
    gradient: 'from-[#fff8e8] to-[#ffefc8]',
    hoverRing: 'hover:ring-[#e5a020]/30',
  },
];

export default function Dashboard() {
  const { data: stats, loading, error } = useDashboard();

  if (loading) return <PageLoading message="Loading your dashboard" />;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <AppLayout
      title={
        <span>
          {getGreeting()},{' '}
          <strong className="text-g-dark">Sarah! 👋</strong>
        </span>
      }
      subtitle="Here's what's happening with your restaurant today."
    >
      <div className="space-y-5 md:space-y-6">

        {/* Stats */}
        <StatsGrid stats={stats} />

        {/* AI Business Insight Banner */}
        <div className="relative bg-gradient-to-br from-[#1a4d3a] via-[#23664f] to-[#2d7a5f] rounded-2xl md:rounded-3xl overflow-hidden">
          {/* Background orbs */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-1/3 w-24 h-24 rounded-full bg-white/5" />

          {/* Robot image — decorative, right side */}
          <div className="absolute right-0 bottom-0 h-full flex items-end pointer-events-none select-none">
            <Image
              src="/images/robot-burger.jpeg"
              alt=""
              width={140}
              height={140}
              className="h-full w-auto object-cover opacity-30 md:opacity-40 rounded-r-3xl"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>

          <div className="relative z-10 p-4 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Icon + text */}
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/15 backdrop-blur rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-white font-bold text-sm">AI Business Insight</span>
                  <span className="bg-white/20 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                    Live
                  </span>
                </div>
                <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-lg">
                  Your <strong className="text-white">Chicken Burger</strong> sales peak on Tuesday nights.
                  Launching a <em className="text-white not-italic font-bold">'Buy 1 Get 1 Free'</em> promo tomorrow
                  could lift order volume by an estimated{' '}
                  <strong className="text-green-300">+15%</strong>.
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/promotions"
              className="shrink-0 self-start sm:self-auto bg-white text-g-dark text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-g-pale transition-all flex items-center gap-1.5 shadow-lg whitespace-nowrap"
            >
              Create Promo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Sales + promos */}
        <SalesChart stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          <PromoCard stats={stats} />
          <AiAssistant stats={stats} />
        </div>

        {/* Quick Links */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-g-dark" />
            <h3 className="text-sm font-bold text-text-dark">Quick Access</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {QUICK_LINKS.map(({ href, emoji, label, sub, gradient, hoverRing }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  'relative bg-gradient-to-br rounded-2xl p-4 md:p-5 flex flex-col gap-3 border border-white/80',
                  'shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5',
                  'ring-2 ring-transparent',
                  gradient,
                  hoverRing
                )}
              >
                <div className="w-10 h-10 bg-white/60 backdrop-blur rounded-xl flex items-center justify-center text-xl shadow-sm">
                  {emoji}
                </div>
                <div>
                  <p className="text-sm font-bold text-text-dark">{label}</p>
                  <p className="text-[10px] text-text-mid mt-0.5">{sub}</p>
                </div>
                <ArrowRight className="absolute bottom-4 right-4 w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

