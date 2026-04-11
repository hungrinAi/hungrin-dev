export interface DashboardStats {
  newOrdersToday: number;
  weeklyRevenue: number;
  weatherEffect: number;
  totalOrders: number;
  salesData: { name: string; sales: number }[];
  promoOfDay: {
    title: string;
    price: number;
    oldPrice: number;
    slotsLeft: number;
    emoji: string;
    tag: string;
  };
  aiSuggestions: string[];
}
