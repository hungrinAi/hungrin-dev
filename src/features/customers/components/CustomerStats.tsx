import React from 'react';
import { Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { CustomerSummary } from '@/types';

interface CustomerStatsProps {
  summary?: CustomerSummary;
}

export function CustomerStats({ summary }: CustomerStatsProps) {
  const stats = [
    { label: 'Total Customers', val: summary?.totalCustomers || 0, icon: Users, color: 'text-g-dark', bg: 'bg-g-pale' },
    { label: 'Avg Order Value', val: `£${summary?.avgOrderValue || 0}`, icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Loyalty Rate', val: `${summary?.loyaltyRate || 0}%`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
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
