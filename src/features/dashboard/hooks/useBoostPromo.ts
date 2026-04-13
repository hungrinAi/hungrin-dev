import { useState, useCallback } from 'react';
import { ALL_PLATFORMS, DURATIONS } from '../data/constants';
import type { Platform, BoostDuration } from '../data/constants';

export type { Platform, BoostDuration };

export interface BoostPromoState {
  isOpen: boolean;
  selectedPlatforms: Platform[];
  activeDuration: BoostDuration;
  confirmed: boolean;
}

export function useBoostPromo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['Google']);
  const [activeDuration, setActiveDuration] = useState<BoostDuration>('Day');
  const [confirmed, setConfirmed] = useState(false);

  const open = useCallback(() => {
    setConfirmed(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const togglePlatform = useCallback((p: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }, []);

  const confirm = useCallback(() => {
    setConfirmed(true);
  }, []);

  return {
    isOpen, open, close,
    selectedPlatforms, togglePlatform,
    activeDuration, setActiveDuration,
    confirmed, confirm,
    ALL_PLATFORMS, DURATIONS,
  };
}
