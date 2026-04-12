import { apiRequest } from '@/lib/api';
import type { Order, OrderSummary } from './types';

/** All HTTP calls for the Orders feature. */
export const ordersApi = {
  getAll: () => {
    const user = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('hungrin_user') || '{}')
      : {};
    const userId = user?.id || '';
    return apiRequest<OrderSummary>(`/orders?userId=${userId}`);
  },
  getById: (id: string) => apiRequest<Order>(`/orders/${id}`),
  updateStatus: (id: string, status: Order['status']) =>
    apiRequest<Order>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};