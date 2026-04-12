import { apiRequest } from '@/lib/api';
import type { DashboardStats } from './types';

/** All HTTP calls for the Dashboard feature. */
export const dashboardApi = {
  getStats: () => {
    const user = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('hungrin_user') || '{}')
      : {};
    const userId = user?.id || '';
    return apiRequest<DashboardStats>(`/dashboard/stats?userId=${userId}`);
  },
};