import { useState, useCallback } from 'react';
import type { Campaign } from '../types';

export type CampaignModal = 'new' | 'actions' | null;

export function useCampaignActions() {
  const [modal, setModal] = useState<CampaignModal>(null);
  const [targetCampaign, setTargetCampaign] = useState<Campaign | null>(null);

  const openNew = useCallback(() => setModal('new'), []);

  const openActions = useCallback((campaign: Campaign) => {
    setTargetCampaign(campaign);
    setModal('actions');
  }, []);

  const close = useCallback(() => {
    setModal(null);
    setTargetCampaign(null);
  }, []);

  return { modal, targetCampaign, openNew, openActions, close };
}
