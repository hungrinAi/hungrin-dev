import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Customer from '@/models/Customer';
import Promotion from '@/models/Promotion';

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

    // Get all orders for this user
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    // Calculate stats
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;

    // Get today's orders
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = orders.filter(o => new Date(o.createdAt) >= today);
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    // Get weekly orders
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyOrders = orders.filter(o => new Date(o.createdAt) >= weekAgo);
    const weeklyRevenue = weeklyOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    // Get customers count
    const totalCustomers = await Customer.countDocuments({ userId });

    // Get active promotions
    const activePromotions = await Promotion.countDocuments({
      userId,
      status: 'active',
    });

    // Weekly performance data for chart
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyData = days.map((day, index) => {
      const dayDate = new Date();
      dayDate.setDate(dayDate.getDate() - (6 - index));
      dayDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(dayDate);
      nextDay.setDate(nextDay.getDate() + 1);

      const dayOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate >= dayDate && orderDate < nextDay;
      });

      return {
        day,
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
      };
    });

    return NextResponse.json({
      stats: {
        totalRevenue,
        totalOrders,
        completedOrders,
        pendingOrders,
        todayRevenue,
        todayOrders: todayOrders.length,
        weeklyRevenue,
        weeklyOrders: weeklyOrders.length,
        totalCustomers,
        activePromotions,
      },
      weeklyData,
      recentOrders: orders.slice(0, 5),
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
