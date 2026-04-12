import { apiRequest } from '@/lib/api';
import type { Campaign } from './types';

/** All HTTP calls for the Campaigns feature. */
export const campaignsApi = {
  getAll: () => {
    const user = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('hungrin_user') || '{}')
      : {};
    const userId = user?.id || '';
    return apiRequest<Campaign[]>(`/campaigns?userId=${userId}`);
  },
  create: (campaign: Partial<Campaign>) => {
    const user = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('hungrin_user') || '{}')
      : {};
    const userId = user?.id || '';
    return apiRequest<Campaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify({ ...campaign, userId }),
    });
  },
};