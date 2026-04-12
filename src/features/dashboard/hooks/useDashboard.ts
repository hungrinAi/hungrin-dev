import { useApi } from '@/hooks/useApi';
import { dashboardApi } from '../api';
import type { DashboardStats } from '../types';

export function useDashboard() {
  return useApi<DashboardStats>(dashboardApi.getStats);
}
