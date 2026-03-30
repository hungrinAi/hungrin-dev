import { Order, Campaign, Customer, DashboardStats, InsightsData, CustomerSummary, OrderSummary } from '../types';
import { apiRequest } from './api';

export const dashboardService = {
  getStats: () => apiRequest<DashboardStats>('/dashboard/stats'),
};

export const insightsService = {
  getInsights: () => apiRequest<InsightsData>('/insights'),
};

export const orderService = {
  getAll: () => apiRequest<OrderSummary>('/orders'),
  getById: (id: string) => apiRequest<Order>(`/orders/${id}`),
  updateStatus: (id: string, status: Order['status']) => 
    apiRequest<Order>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

export const campaignService = {
  getAll: () => apiRequest<Campaign[]>('/campaigns'),
  create: (campaign: Partial<Campaign>) => 
    apiRequest<Campaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    }),
};

export const customerService = {
  getAll: () => apiRequest<CustomerSummary>('/customers'),
};
