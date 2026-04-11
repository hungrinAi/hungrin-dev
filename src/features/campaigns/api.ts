import { apiRequest } from '@/src/lib/api';
import type { Campaign } from './types';

/** All HTTP calls for the Campaigns feature. */
export const campaignsApi = {
  getAll: ()                         => apiRequest<Campaign[]>('/campaigns'),
  create: (campaign: Partial<Campaign>) =>
    apiRequest<Campaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    }),
};
