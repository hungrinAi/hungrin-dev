export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  restaurantName: string;
  avatar?: string;
}

export interface OrderSummary {
  pending: number;
  completed: number;
  todayRevenue: number;
  orders: Order[];
}

export interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  initials: string;
  customerName: string;
  time: string;
  deliveryPlatform: 'uber' | 'deliveroo' | 'justeat';
  subtotal: number;
  deliveryFee: number;
  tips: number;
  fullTotal: number;
}

export interface Campaign {
  id: string;
  name: string;
  emoji: string;
  meta: string;
  status: 'Active' | 'Paused' | 'Ended';
  orders: number;
  revenue: string;
  startDate: string;
  endDate: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'Loyal' | 'Returning' | 'VIP' | 'New';
  lastOrder: string;
  initials: string;
  spend: number;
  color: string;
  orders: number;
}

export interface CustomerSummary {
  totalCustomers: number;
  avgOrderValue: number;
  loyaltyRate: number;
  customers: Customer[];
}

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

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: string;
  text: string;
}

export interface Product {
  name: string;
  category: string;
  sales: number;
  revenue: string;
  growth: string;
  trend: string;
  emoji: string;
}

export interface InsightsData {
  customerSegments: { name: string; value: number }[];
  salesTrend: { name: string; sales: number }[];
  recommendations: Recommendation[];
  topProducts: Product[];
}
