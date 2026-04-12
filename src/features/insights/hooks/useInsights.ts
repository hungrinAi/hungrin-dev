import { useApi } from '@/hooks/useApi';
import { insightsApi } from '../api';
import type { InsightsData } from '../types';

export function useInsights() {
  return useApi<InsightsData>(insightsApi.getAll);
}
