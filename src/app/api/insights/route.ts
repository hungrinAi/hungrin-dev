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
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get all orders
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    // Total stats
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Platform breakdown
    const platforms = ['Uber Eats', 'Deliveroo', 'Just Eat'];
    const platformStats = platforms.map(platform => {
      const platformOrders = orders.filter(o => o.platform === platform);
      const revenue = platformOrders.reduce((sum, o) => sum + o.totalAmount, 0);
      return {
        platform,
        orders: platformOrders.length,
        revenue,
        share: totalRevenue > 0 ? ((revenue / totalRevenue) * 100).toFixed(1) : '0',
      };
    });

    // Weekly revenue trend (last 8 weeks)
    const weeklyTrend = Array.from({ length: 8 }, (_, i) => {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (7 * (7 - i)));
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const weekOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate >= weekStart && orderDate < weekEnd;
      });

      return {
        week: `W${i + 1}`,
        revenue: weekOrders.reduce((sum, o) => sum + o.totalAmount, 0),
        orders: weekOrders.length,
      };
    });

    // Customer stats
    const totalCustomers = await Customer.countDocuments({ userId });
    const repeatCustomers = await Customer.countDocuments({
      userId,
      totalOrders: { $gt: 1 },
    });
    const repeatRate = totalCustomers > 0
      ? ((repeatCustomers / totalCustomers) * 100).toFixed(1)
      : '0';

    // Peak day analysis
    const dayStats = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
      const dayOrders = orders.filter(o => new Date(o.createdAt).getDay() === index);
      return {
        day,
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
      };
    });

    const peakDay = dayStats.reduce((max, day) => day.orders > max.orders ? day : max, dayStats[0]);

    return NextResponse.json({
      stats: {
        totalRevenue,
        totalOrders,
        avgOrderValue: avgOrderValue.toFixed(2),
        totalCustomers,
        repeatRate,
        peakDay: peakDay.day,
      },
      platformStats,
      weeklyTrend,
      dayStats,
    });
  } catch (error) {
    console.error('Insights error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
