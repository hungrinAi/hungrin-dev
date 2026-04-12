import React from 'react';
import { cn } from '@/lib/utils';
import { OrderSummary } from '@/types';

interface OrderStatsPillsProps {
  summary: OrderSummary;
}

export function OrderStatsPills({ summary }: OrderStatsPillsProps) {
  const stats = [
    { label: 'Pending', val: summary.pending.toString(), color: 'bg-yellow-400' },
    { label: 'Completed', val: summary.completed.toString(), color: 'bg-g-dark' },
    { label: 'Today', val: `£${summary.todayRevenue.toFixed(2)}`, color: 'bg-gray-500' },
  ];

  return (
    <div className="flex gap-3">
      {stats.map((s, i) => (
        <div key={i} className="flex-1 bg-white p-4 rounded-xl border border-border-light shadow-sm flex items-center gap-3">
          <div className={cn("w-2 h-2 rounded-full", s.color)} />
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{s.label}</p>
            <p className="text-sm font-bold text-text-dark">{s.val}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
