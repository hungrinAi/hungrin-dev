import type { DashboardStats } from '../types';

const thisWeekData = [
  { name: 'Mon', sales: 400 },
  { name: 'Tue', sales: 300 },
  { name: 'Wed', sales: 600 },
  { name: 'Thu', sales: 800 },
  { name: 'Fri', sales: 500 },
  { name: 'Sat', sales: 900 },
  { name: 'Sun', sales: 700 },
];

const sevenDaysData = [
  { name: 'Apr 5', sales: 520 },
  { name: 'Apr 6', sales: 480 },
  { name: 'Apr 7', sales: 710 },
  { name: 'Apr 8', sales: 650 },
  { name: 'Apr 9', sales: 390 },
  { name: 'Apr 10', sales: 870 },
  { name: 'Apr 11', sales: 760 },
];

const thirtyDaysData = [
  { name: 'Mar 13', sales: 310 },
  { name: 'Mar 15', sales: 420 },
  { name: 'Mar 17', sales: 380 },
  { name: 'Mar 19', sales: 490 },
  { name: 'Mar 21', sales: 610 },
  { name: 'Mar 23', sales: 540 },
  { name: 'Mar 25', sales: 720 },
  { name: 'Mar 27', sales: 660 },
  { name: 'Mar 29', sales: 580 },
  { name: 'Mar 31', sales: 800 },
  { name: 'Apr 2',  sales: 750 },
  { name: 'Apr 4',  sales: 690 },
  { name: 'Apr 6',  sales: 870 },
  { name: 'Apr 8',  sales: 930 },
  { name: 'Apr 10', sales: 760 },
];

export const mockDashboardStats: DashboardStats = {
  newOrdersToday: 42,
  weeklyRevenue: 1250,
  weatherEffect: 15,
  totalOrders: 1240,
  salesData: thisWeekData,
  salesDataByPeriod: {
    'This Week': thisWeekData,
    '7 Days':    sevenDaysData,
    '30 Days':   thirtyDaysData,
  },
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
