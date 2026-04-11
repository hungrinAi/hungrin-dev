import type { DashboardStats } from '../types';

export const mockDashboardStats: DashboardStats = {
  newOrdersToday: 42,
  weeklyRevenue: 1250,
  weatherEffect: 15,
  totalOrders: 1240,
  salesData: [
    { name: 'Mon', sales: 400 },
    { name: 'Tue', sales: 300 },
    { name: 'Wed', sales: 600 },
    { name: 'Thu', sales: 800 },
    { name: 'Fri', sales: 500 },
    { name: 'Sat', sales: 900 },
    { name: 'Sun', sales: 700 },
  ],
  promoOfDay: {
    title: 'Burger Bundle!',
    price: 12.99,
    oldPrice: 16.99,
    slotsLeft: 7,
    emoji: '🍔',
    tag: '🔥 Hot',
  },
  aiSuggestions: [
    '+ Suggest A Promo',
    '+ Current offers',
    '+ Get More Customers',
    '+ Create a Post',
  ],
};
