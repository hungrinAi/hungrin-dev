import React from 'react';
import { Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { OrderSummary } from '@/src/types';

interface OrderStatsProps {
  summary?: OrderSummary;
}

export function OrderStats({ summary }: OrderStatsProps) {
  const stats = [
    { label: 'Pending Orders', val: summary?.pending || 0, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Completed Today', val: summary?.completed || 0, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Today Revenue', val: `£${summary?.todayRevenue || 0}`, icon: TrendingUp, color: 'text-g-dark', bg: 'bg-g-pale' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-border-light shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 ${s.bg} ${s.color} rounded-xl flex items-center justify-center`}>
            <s.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">{s.label}</p>
            <p className="text-xl font-bold text-text-dark">{s.val}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
