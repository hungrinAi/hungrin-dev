'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { DashboardStats } from '@/types';
import { useBoostPromo } from '../hooks/useBoostPromo';
import { BoostPromoModal } from './BoostPromoModal';

interface PromoCardProps {
  stats?: DashboardStats;
}

const PLATFORM_LABELS = [
  { key: 'Google',    short: 'G',  title: 'Google' },
  { key: 'Uber Eats', short: 'U',  title: 'Uber Eats' },
  { key: 'Just Eat',  short: 'J',  title: 'Just Eat' },
  { key: 'Deliveroo', short: 'D',  title: 'Deliveroo' },
] as const;

export function PromoCard({ stats }: PromoCardProps) {
  const boost = useBoostPromo();

  if (!stats?.promoOfDay) return null;

  // Determine which platform labels to show (first active + "+N more" button)
  const activePlatformLabel = PLATFORM_LABELS.find(
    (p) => p.key === boost.selectedPlatforms[0]
  );
  const extraCount = boost.selectedPlatforms.length - 1;

  return (
    <>
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
            <div className="w-32 h-28 rounded-xl relative overflow-hidden shrink-0">
              <Image
                src="/images/food/burger.jpg"
                alt={stats.promoOfDay.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-1.5 left-1.5 right-1.5 bg-g-dark/80 text-white text-[8px] font-bold py-1 px-2 rounded text-center">
                ✨ Limited Time · {stats.promoOfDay.title}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              {/* Platform toggles */}
              <div className="flex gap-1.5 mb-3">
                {/* Active platform badge */}
                <button
                  onClick={boost.open}
                  title={`Active: ${boost.selectedPlatforms.join(', ')}`}
                  className={cn(
                    'px-2 py-1 rounded text-[10px] font-bold transition-all',
                    'bg-g-dark text-white hover:bg-g-mid shadow-sm'
                  )}
                >
                  {activePlatformLabel?.short ?? 'G'}
                </button>

                {/* Extra platforms count */}
                <button
                  onClick={boost.open}
                  className="px-2 py-1 bg-g-faint text-text-mid rounded text-[10px] font-bold border border-border-light hover:bg-g-pale transition-all"
                >
                  {extraCount > 0 ? `+${extraCount}` : '+'}
                </button>

                {/* Duration toggle */}
                <button
                  onClick={boost.open}
                  className={cn(
                    'px-2 py-1 rounded text-[10px] font-bold border transition-all',
                    'bg-g-faint text-text-mid border-border-light hover:bg-g-pale'
                  )}
                >
                  {boost.activeDuration}
                </button>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-bold text-text-dark">£{stats.promoOfDay.price}</span>
                <span className="text-xs text-text-muted line-through">was £{stats.promoOfDay.oldPrice}</span>
                <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded">{stats.promoOfDay.tag}</span>
              </div>
              <p className="text-xs text-text-muted mb-3">Only {stats.promoOfDay.slotsLeft} slots left today.</p>
              <Button className="w-full py-2 text-xs" onClick={boost.open}>Boost Promos</Button>
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

      <BoostPromoModal
        open={boost.isOpen}
        onClose={boost.close}
        promo={stats.promoOfDay}
        selectedPlatforms={boost.selectedPlatforms}
        onTogglePlatform={boost.togglePlatform}
        activeDuration={boost.activeDuration}
        onSetDuration={boost.setActiveDuration}
        confirmed={boost.confirmed}
        onConfirm={boost.confirm}
        allPlatforms={boost.ALL_PLATFORMS}
        durations={boost.DURATIONS}
      />
    </>
  );
}
