import React from 'react';
import { DashboardStats } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { STATS_CARDS } from '../data/constants';

interface StatsGridProps {
  stats?: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS_CARDS.map((card) => {
        const raw = stats?.[card.key] ?? 0;
        const value = `${card.prefix ?? ''}${raw}${card.suffix ?? ''}`;

        return (
          <div
            key={card.label}
            className={cn(
              'relative rounded-2xl p-5 bg-gradient-to-br overflow-hidden border border-white/80',
              'shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5',
              card.gradient
            )}
          >
            {/* Decorative circle */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white/30" />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-text-mid uppercase tracking-widest mb-2">
                  {card.label}
                </p>
                <p className="text-2xl font-black text-text-dark tracking-tight">{value}</p>
                <span
                  className={cn(
                    'mt-2 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full',
                    card.positive ? 'bg-white/70 text-g-dark' : 'bg-white/70 text-text-mid'
                  )}
                >
                  {card.change}
                </span>
              </div>
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm', card.iconBg)}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
