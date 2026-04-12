import { useApi } from '@/hooks/useApi';
import { customersApi } from '../api';
import type { CustomerSummary } from '../types';

export function useCustomers() {
  return useApi<CustomerSummary>(customersApi.getAll);
}
