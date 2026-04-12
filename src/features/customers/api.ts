import { apiRequest } from '@/lib/api';
import type { CustomerSummary } from './types';

/** All HTTP calls for the Customers feature. */
export const customersApi = {
  getAll: () => apiRequest<CustomerSummary>('/customers'),
};
