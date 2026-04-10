import { NextResponse } from 'next/server';

const mockInsights = {
  customerSegments: [
    { name: 'Loyal', value: 45 },
    { name: 'Returning', value: 30 },
    { name: 'New', value: 15 },
    { name: 'VIP', value: 10 },
  ],
  salesTrend: [
    { name: 'Mon', sales: 400 },
    { name: 'Tue', sales: 300 },
    { name: 'Wed', sales: 600 },
    { name: 'Thu', sales: 800 },
    { name: 'Fri', sales: 500 },
    { name: 'Sat', sales: 900 },
    { name: 'Sun', sales: 700 },
  ],
  recommendations: [
    {
      id: '1',
      title: 'Burger Bundle Optimization',
      description: "Your 'Burger Bundle' is most popular on Tuesdays. Consider a lunch special.",
      category: 'Sales',
      impact: 'High',
      text: "Your 'Burger Bundle' is most popular on Tuesdays. Consider a lunch special."
    },
    {
      id: '2',
      title: 'Retention Growth',
      description: "Customer retention is up 15% this month. Keep it up!",
      category: 'Loyalty',
      impact: 'Medium',
      text: "Customer retention is up 15% this month. Keep it up!"
    },
    {
      id: '3',
      title: 'Happy Hour Detection',
      description: "Slow hours detected between 3 PM - 5 PM. Launch a 'Happy Hour' promo.",
      category: 'Promotion',
      impact: 'High',
      text: "Slow hours detected between 3 PM - 5 PM. Launch a 'Happy Hour' promo."
    }
  ],
  topProducts: [
    { name: 'Classic Cheeseburger', category: 'Main', sales: 142, revenue: '1,846', growth: '+12%', trend: '+12%', emoji: '🍔' },
    { name: 'Spicy Chicken Wings', category: 'Sides', sales: 98, revenue: '882', growth: '+8%', trend: '+8%', emoji: '🍗' },
    { name: 'Truffle Fries', category: 'Sides', sales: 85, revenue: '425', growth: '-2%', trend: '-2%', emoji: '🍟' },
    { name: 'Vanilla Milkshake', category: 'Drinks', sales: 76, revenue: '380', growth: '+15%', trend: '+15%', emoji: '🥤' },
  ]
};

export async function GET() {
  return NextResponse.json(mockInsights);
}
