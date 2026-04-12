import { apiRequest } from '@/lib/api';
import type { CustomerSummary } from './types';

/** All HTTP calls for the Customers feature. */
export const customersApi = {
  getAll: () => {
    const user = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('hungrin_user') || '{}')
      : {};
    const userId = user?.id || '';
    return apiRequest<CustomerSummary>(`/customers?userId=${userId}`);
  },
};