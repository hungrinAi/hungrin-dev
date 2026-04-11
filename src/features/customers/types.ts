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
