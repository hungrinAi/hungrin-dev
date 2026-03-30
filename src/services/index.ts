import { Order, Campaign, Customer, DashboardStats, InsightsData, CustomerSummary, OrderSummary } from '../types';
import { apiRequest } from './api';
import { dataService } from './dataService';
import { authService } from './authService';

export { dataService, authService };

export const dashboardService = {
  getStats: () => dataService.getDashboardStats() as Promise<DashboardStats>,
};

export const insightsService = {
  getInsights: () => dataService.getInsights() as Promise<InsightsData>,
};

export const orderService = {
  getAll: () => dataService.getOrders() as Promise<OrderSummary>,
  getById: (id: string) => apiRequest<Order>(`/orders/${id}`),
  updateStatus: (id: string, status: Order['status']) => 
    apiRequest<Order>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

export const campaignService = {
  getAll: () => dataService.getCampaigns() as Promise<Campaign[]>,
  create: (campaign: Partial<Campaign>) => 
    apiRequest<Campaign>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    }),
};

export const customerService = {
  getAll: () => dataService.getCustomers() as Promise<CustomerSummary>,
};
