import { useApi } from '@/src/hooks/useApi';
import { ordersApi } from '../api';
import type { OrderSummary } from '../types';

export function useOrders() {
  return useApi<OrderSummary>(ordersApi.getAll);
}
