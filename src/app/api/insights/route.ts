import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Customer from '@/models/Customer';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        customerSegments: [
          { name: 'Loyal', value: 0 },
          { name: 'Returning', value: 0 },
          { name: 'New', value: 0 },
          { name: 'VIP', value: 0 },
        ],
        salesTrend: [
          { name: 'Mon', sales: 0 },
          { name: 'Tue', sales: 0 },
          { name: 'Wed', sales: 0 },
          { name: 'Thu', sales: 0 },
          { name: 'Fri', sales: 0 },
          { name: 'Sat', sales: 0 },
          { name: 'Sun', sales: 0 },
        ],
        recommendations: [],
        topProducts: [],
      });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    const customers = await Customer.find({ userId });

    // Customer segments
    const loyal = customers.filter(c => c.totalOrders >= 5).length;
    const returning = customers.filter(c => c.totalOrders >= 2 && c.totalOrders < 5).length;
    const newCustomers = customers.filter(c => c.totalOrders < 2).length;
    const vip = customers.filter(c => c.status === 'vip').length;

    const customerSegments = [
      { name: 'Loyal', value: loyal || 0 },
      { name: 'Returning', value: returning || 0 },
      { name: 'New', value: newCustomers || 0 },
      { name: 'VIP', value: vip || 0 },
    ];

    // Sales trend (last 7 days)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const salesTrend = days.map((day, index) => {
      const dayOrders = orders.filter(o => new Date(o.createdAt).getDay() === (index + 1) % 7);
      return {
        name: day,
        sales: dayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
      };
    });

    // Top products
    const productMap: { [key: string]: { sales: number; revenue: number } } = {};
    orders.forEach(order => {
      order.items.forEach((item: any) => {
        if (!productMap[item.name]) {
          productMap[item.name] = { sales: 0, revenue: 0 };
        }
        productMap[item.name].sales += item.quantity;
        productMap[item.name].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.entries(productMap)
      .map(([name, data]) => ({
        name,
        category: 'Main',
        sales: data.sales,
        revenue: data.revenue.toFixed(2),
        growth: '+0%',
        trend: '+0%',
        emoji: '🍔',
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4);

    // Recommendations
    const recommendations = [
      {
        id: '1',
        title: 'Boost Your Sales',
        description: 'Upload your CSV data to get personalised AI recommendations.',
        category: 'Sales',
        impact: 'High',
        text: 'Upload your CSV data to get personalised AI recommendations.',
      },
    ];

    return NextResponse.json({
      customerSegments,
      salesTrend,
      recommendations,
      topProducts: topProducts.length > 0 ? topProducts : [
        { name: 'No products yet', category: 'Main', sales: 0, revenue: '0', growth: '0%', trend: '0%', emoji: '🍔' },
      ],
    });
  } catch (error) {
    console.error('Insights error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}