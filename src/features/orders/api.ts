import { apiRequest } from '@/lib/api';
import type { Order, OrderSummary } from './types';

/** All HTTP calls for the Orders feature. */
export const ordersApi = {
  getAll:       ()                               => apiRequest<OrderSummary>('/orders'),
  getById:      (id: string)                     => apiRequest<Order>(`/orders/${id}`),
  updateStatus: (id: string, status: Order['status']) =>
    apiRequest<Order>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};
