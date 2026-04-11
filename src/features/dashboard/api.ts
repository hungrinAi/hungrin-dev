import { apiRequest } from '@/src/lib/api';
import type { DashboardStats } from './types';

/** All HTTP calls for the Dashboard feature. */
export const dashboardApi = {
  getStats: () => apiRequest<DashboardStats>('/dashboard/stats'),
};
