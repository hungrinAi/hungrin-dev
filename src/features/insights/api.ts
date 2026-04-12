import { apiRequest } from '@/lib/api';
import type { InsightsData } from './types';

/** All HTTP calls for the Insights feature. */
export const insightsApi = {
  getAll: () => {
    const user = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('hungrin_user') || '{}')
      : {};
    const userId = user?.id || '';
    return apiRequest<InsightsData>(`/insights?userId=${userId}`);
  },
};
