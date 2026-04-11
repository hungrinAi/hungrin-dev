'use client';

import React from 'react';
import { Rocket, CheckCircle2, Zap } from 'lucide-react';
import { Modal } from '@/src/components/ui/Modal';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import type { DashboardStats } from '../types';
import type { Platform, BoostDuration } from '../hooks/useBoostPromo';

const PLATFORM_ICONS: Record<Platform, string> = {
  Google:     '🔍',
  'Uber Eats': '🟢',
  'Just Eat':  '🟠',
  Deliveroo:  '🔵',
};

interface BoostPromoModalProps {
  open: boolean;
  onClose: () => void;
  promo?: DashboardStats['promoOfDay'];
  selectedPlatforms: Platform[];
  onTogglePlatform: (p: Platform) => void;
  activeDuration: BoostDuration;
  onSetDuration: (d: BoostDuration) => void;
  confirmed: boolean;
  onConfirm: () => void;
  allPlatforms: Platform[];
  durations: BoostDuration[];
}

export function BoostPromoModal({
  open,
  onClose,
  promo,
  selectedPlatforms,
  onTogglePlatform,
  activeDuration,
  onSetDuration,
  confirmed,
  onConfirm,
  allPlatforms,
  durations,
}: BoostPromoModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-g-dark" /> Boost Promo
        </span>
      }
    >
      {confirmed ? (
        /* ── Success state ── */
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="w-16 h-16 bg-g-pale rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-g-dark" />
          </div>
          <div>
            <p className="text-base font-bold text-text-dark mb-1">Promo Boosted!</p>
            <p className="text-xs text-text-muted">
              <strong className="text-text-dark">{promo?.title}</strong> is now live on{' '}
              {selectedPlatforms.join(', ')} for 1 {activeDuration.toLowerCase()}.
            </p>
          </div>
          <div className="w-full bg-g-faint border border-border-light rounded-xl p-4 text-left space-y-1.5">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Estimated Impact</p>
            <p className="text-sm font-bold text-g-dark flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> +15–22% more orders this {activeDuration.toLowerCase()}</p>
            <p className="text-xs text-text-muted">Based on similar promotions at comparable restaurants.</p>
          </div>
          <Button className="w-full" onClick={onClose}>Done</Button>
        </div>
      ) : (
        /* ── Configuration state ── */
        <div className="space-y-5">
          {/* Promo summary */}
          {promo && (
            <div className="flex items-center gap-4 p-3 bg-g-faint rounded-xl border border-border-light">
              <div className="w-12 h-12 bg-gradient-to-br from-[#c8edd8] to-[#8fd4b0] rounded-lg flex items-center justify-center text-2xl shrink-0">
                {promo.emoji}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-text-dark truncate">{promo.title}</p>
                <p className="text-xs text-text-muted">
                  <span className="font-bold text-g-dark">£{promo.price}</span>
                  <span className="line-through ml-1.5 text-text-muted">£{promo.oldPrice}</span>
                  <span className="ml-2 text-yellow-700 bg-yellow-100 text-[10px] font-bold px-1.5 py-0.5 rounded">{promo.tag}</span>
                </p>
              </div>
            </div>
          )}

          {/* Duration selector */}
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Boost Duration</p>
            <div className="flex gap-2">
              {durations.map((d) => (
                <button
                  key={d}
                  onClick={() => onSetDuration(d)}
                  className={cn(
                    'flex-1 py-2 rounded-xl text-xs font-bold border transition-all',
                    activeDuration === d
                      ? 'bg-g-dark text-white border-g-dark shadow-sm'
                      : 'bg-g-faint text-text-mid border-border-light hover:bg-g-pale'
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Platform selector */}
          <div>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Platforms</p>
            <div className="grid grid-cols-2 gap-2">
              {allPlatforms.map((p) => {
                const active = selectedPlatforms.includes(p);
                return (
                  <button
                    key={p}
                    onClick={() => onTogglePlatform(p)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-left',
                      active
                        ? 'bg-g-pale border-g-dark text-g-dark ring-1 ring-g-dark/20'
                        : 'bg-white border-border-light text-text-mid hover:bg-g-faint'
                    )}
                  >
                    <span className="text-base">{PLATFORM_ICONS[p]}</span>
                    {p}
                    {active && <CheckCircle2 className="w-3.5 h-3.5 text-g-dark ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={onConfirm}
              disabled={selectedPlatforms.length === 0}
            >
              <Rocket className="w-4 h-4" />
              Boost Now — {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
            </Button>
            <p className="text-[10px] text-text-muted text-center">No contracts. Cancel anytime.</p>
          </div>
        </div>
      )}
    </Modal>
  );
}
