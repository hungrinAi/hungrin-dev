import { apiRequest } from '@/lib/api';
import type { InsightsData } from './types';

/** All HTTP calls for the Insights feature. */
export const insightsApi = {
  getAll: () => apiRequest<InsightsData>('/insights'),
};
