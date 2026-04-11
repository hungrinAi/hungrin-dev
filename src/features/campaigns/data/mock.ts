import type { Campaign } from '../types';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Burger Fest',
    emoji: '🍔',
    meta: '20% off all bundles',
    status: 'Active',
    orders: 142,
    revenue: '£1,846',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
  },
  {
    id: '2',
    name: 'Weekend Wings',
    emoji: '🍗',
    meta: 'Buy 1 Get 1 Free',
    status: 'Paused',
    orders: 85,
    revenue: '£425',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
  },
];
