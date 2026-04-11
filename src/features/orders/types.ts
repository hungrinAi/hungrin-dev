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

export interface OrderSummary {
  pending: number;
  completed: number;
  todayRevenue: number;
  orders: Order[];
}
