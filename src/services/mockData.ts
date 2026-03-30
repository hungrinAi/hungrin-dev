export const MOCK_DASHBOARD_STATS = {
  newOrdersToday: 42,
  weeklyRevenue: 12450,
  weatherEffect: 15,
  totalOrders: 1450,
  salesData: [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ],
  promoOfDay: {
    title: 'Double Cheeseburger',
    price: 8.50,
    oldPrice: 12.00,
    slotsLeft: 12,
    emoji: '🍔',
    tag: 'Popular',
  },
  aiSuggestions: [
    'Run a promotion for "Weekend Brunch" to increase Saturday sales.',
    'Customers are ordering more spicy food on cold days.',
    'Your "Summer Special" campaign has a 4.5% conversion rate.',
  ],
};

export const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'John Doe', total: 45.50, status: 'completed', createdAt: '2026-03-29T10:00:00Z' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 32.00, status: 'pending', createdAt: '2026-03-29T11:30:00Z' },
  { id: 'ORD-003', customer: 'Bob Johnson', total: 12.50, status: 'cancelled', createdAt: '2026-03-29T12:15:00Z' },
];

export const MOCK_CAMPAIGNS = [
  { id: 'CMP-001', name: 'Summer Special', status: 'active', reach: 1200, conversion: '4.5%' },
  { id: 'CMP-002', name: 'Weekend Brunch', status: 'paused', reach: 850, conversion: '3.2%' },
];

export const MOCK_INSIGHTS = {
  customerSegments: [
    { name: 'Loyal', value: 400 },
    { name: 'Returning', value: 300 },
    { name: 'New', value: 300 },
    { name: 'At Risk', value: 200 },
  ],
  salesTrend: [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ],
  recommendations: [
    { id: '1', title: 'Upsell Dessert', description: 'Customers ordering burgers are 40% more likely to order a shake.', category: 'Upsell', impact: 'High', text: 'Upsell Dessert' },
  ],
  topProducts: [
    { name: 'Double Burger', category: 'Main', sales: 450, revenue: '$5,400', growth: '+12%', trend: 'up', emoji: '🍔' },
  ],
};

export const MOCK_CUSTOMERS = {
  totalCustomers: 1250,
  avgOrderValue: 42.50,
  loyaltyRate: 65,
  customers: [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', totalOrders: 12, totalSpent: 450, status: 'Loyal', lastOrder: '2026-03-28', initials: 'JD', spend: 450, color: 'blue', orders: 12 },
  ],
};
