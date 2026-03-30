import React from 'react';
import { TrendingUp, CloudSun, Utensils } from 'lucide-react';
import { DashboardStats } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface StatsGridProps {
  stats?: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    { icon: TrendingUp, label: 'New Orders Today', val: stats?.newOrdersToday || 0, change: '+12%', color: 'g-dark' },
    { icon: TrendingUp, label: 'Weekly Revenue', val: `£${stats?.weeklyRevenue || 0}`, change: '+22%', color: 'g-dark', sub: 'For customers' },
    { icon: CloudSun, label: 'Weather effect', val: `+${stats?.weatherEffect || 0}%`, change: '↑', color: 'g-dark' },
    { icon: Utensils, label: 'Total Orders', val: stats?.totalOrders || 0, change: '→ 34%', color: 'text-muted', sub: 'Weather effect' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((s, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 bg-g-faint rounded-xl flex items-center justify-center text-g-dark">
            <s.icon className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">{s.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-text-dark">{s.val}</span>
              <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", s.color === 'g-dark' ? "bg-g-pale text-g-dark" : "bg-gray-100 text-gray-500")}>
                {s.change}
              </span>
            </div>
            {s.sub && <p className="text-[10px] text-text-muted mt-0.5">{s.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
