import { NextResponse } from 'next/server';

const mockOrders = [
  {
    id: '#ORD-7821',
    customer: 'John Doe',
    customerName: 'John Doe',
    initials: 'JD',
    items: ['Classic Cheeseburger', 'Truffle Fries', 'Vanilla Milkshake'],
    total: 25.50,
    time: '12:45 PM',
    status: 'completed',
    createdAt: '2026-03-22T12:45:00Z',
    deliveryPlatform: 'uber',
    subtotal: 22.00,
    deliveryFee: 2.50,
    tips: 1.00,
    fullTotal: 25.50
  },
  {
    id: '#ORD-7822',
    customer: 'Jane Smith',
    customerName: 'Jane Smith',
    initials: 'JS',
    items: ['Spicy Chicken Wings', 'Diet Coke'],
    total: 18.00,
    time: '01:15 PM',
    status: 'pending',
    createdAt: '2026-03-22T13:15:00Z',
    deliveryPlatform: 'deliveroo',
    subtotal: 15.00,
    deliveryFee: 2.00,
    tips: 1.00,
    fullTotal: 18.00
  },
];

export async function GET() {
  return NextResponse.json({
    pending: 16,
    completed: 78,
    todayRevenue: 178.99,
    orders: mockOrders
  });
}
