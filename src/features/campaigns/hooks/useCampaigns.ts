import { useApi } from '@/src/hooks/useApi';
import { campaignsApi } from '../api';
import type { Campaign } from '../types';

export function useCampaigns() {
  return useApi<Campaign[]>(campaignsApi.getAll);
}
