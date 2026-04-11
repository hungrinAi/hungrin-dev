export type SalesPeriod = 'This Week' | '7 Days' | '30 Days';

export interface SalesDataPoint {
  name: string;
  sales: number;
}

export interface DashboardStats {
  newOrdersToday: number;
  weeklyRevenue: number;
  weatherEffect: number;
  totalOrders: number;
  /** @deprecated use salesDataByPeriod */
  salesData: SalesDataPoint[];
  salesDataByPeriod: Record<SalesPeriod, SalesDataPoint[]>;
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
