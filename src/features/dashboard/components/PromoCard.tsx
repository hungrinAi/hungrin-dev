import React from 'react';
import { Card, CardHeader, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { DashboardStats } from '@/src/types';

interface PromoCardProps {
  stats?: DashboardStats;
}

export function PromoCard({ stats }: PromoCardProps) {
  if (!stats?.promoOfDay) return null;

  return (
    <Card className="flex flex-col gap-6">
      <CardHeader className="flex flex-row items-center justify-between border-none pb-0">
        <h3 className="text-lg font-bold text-text-dark flex items-center gap-2">
          🎯 Promo of the Day
        </h3>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-border-light" />
          <div className="w-1 h-1 rounded-full bg-border-light" />
          <div className="w-1 h-1 rounded-full bg-border-light" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-6">
          <div className="w-32 h-28 bg-gradient-to-br from-[#c8edd8] to-[#8fd4b0] rounded-xl flex items-center justify-center text-4xl relative overflow-hidden shrink-0">
            {stats.promoOfDay.emoji}
            <div className="absolute top-1.5 left-1.5 right-1.5 bg-g-dark/80 text-white text-[8px] font-bold py-1 px-2 rounded text-center">
              ✨ Limited Time · {stats.promoOfDay.title}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex gap-1.5 mb-3">
              <button className="px-2 py-1 bg-g-dark text-white rounded text-[10px] font-bold">G</button>
              <button className="px-2 py-1 bg-g-faint text-text-mid rounded text-[10px] font-bold border border-border-light">+2</button>
              <button className="px-2 py-1 bg-g-faint text-text-mid rounded text-[10px] font-bold border border-border-light">Day</button>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold text-text-dark">£{stats.promoOfDay.price}</span>
              <span className="text-xs text-text-muted line-through">was £{stats.promoOfDay.oldPrice}</span>
              <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded">{stats.promoOfDay.tag}</span>
            </div>
            <p className="text-xs text-text-muted mb-3">Only {stats.promoOfDay.slotsLeft} slots left today.</p>
            <Button className="w-full py-2 text-xs">Boost Promos</Button>
          </div>
        </div>
        <div className="pt-4 border-t border-border-light">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-sm font-bold text-text-dark">{stats.promoOfDay.title}</span>
            <span className="text-xs font-bold text-g-dark">£{stats.promoOfDay.oldPrice}</span>
          </div>
          <p className="text-xs text-text-muted">Only {stats.promoOfDay.slotsLeft} slots left today.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-medium">
            <div className="w-1 h-1 rounded-full bg-g-dark" /> No contracts
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-medium">
            <div className="w-1 h-1 rounded-full bg-g-dark" /> Cancel anytime
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
