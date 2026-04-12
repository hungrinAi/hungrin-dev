import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import Order from '@/src/models/Order';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const platform = searchParams.get('platform');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Build query
    const query: any = { userId };
    if (status) query.status = status;
    if (platform) query.platform = platform;

    const orders = await Order.find(query).sort({ createdAt: -1 });

    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    return NextResponse.json({
      orders,
      summary: {
        totalOrders,
        completedOrders,
        pendingOrders,
        cancelledOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error('Orders error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, restaurantId, platform, orderNumber, items, totalAmount } = body;

    if (!userId || !platform || !orderNumber || !items || !totalAmount) {
      return NextResponse.json(
        { message: 'Required fields missing' },
        { status: 400 }
      );
    }

    const order = await Order.create({
      userId,
      restaurantId,
      platform,
      orderNumber,
      items,
      totalAmount,
      status: 'pending',
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
