import { NextResponse } from 'next/server';

const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '07421 892 102',
    totalOrders: 12,
    totalSpent: 245.50,
    initials: 'JD',
    orders: 12,
    spend: 245.50,
    lastOrder: '2 hours ago',
    status: 'active',
    color: 'bg-purple-500'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '07421 892 103',
    totalOrders: 5,
    totalSpent: 85.00,
    initials: 'JS',
    orders: 5,
    spend: 85.00,
    lastOrder: 'Yesterday',
    status: 'active',
    color: 'bg-g-dark'
  },
];

export async function GET() {
  return NextResponse.json({
    totalCustomers: 1284,
    avgOrderValue: 24.50,
    loyaltyRate: 68,
    customers: mockCustomers
  });
}
