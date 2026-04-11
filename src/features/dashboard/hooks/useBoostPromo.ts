import { useState, useCallback } from 'react';

export type Platform = 'Google' | 'Uber Eats' | 'Just Eat' | 'Deliveroo';
export type BoostDuration = 'Day' | 'Week' | 'Month';

export interface BoostPromoState {
  isOpen: boolean;
  selectedPlatforms: Platform[];
  activeDuration: BoostDuration;
  confirmed: boolean;
}

const ALL_PLATFORMS: Platform[] = ['Google', 'Uber Eats', 'Just Eat', 'Deliveroo'];
const DURATIONS: BoostDuration[] = ['Day', 'Week', 'Month'];

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
