import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        pending: 0,
        completed: 0,
        todayRevenue: 0,
        orders: [],
      });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = orders.filter(o => new Date(o.createdAt) >= today);
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    const formattedOrders = orders.map(o => ({
      id: o._id.toString(),
      customer: o.items?.[0]?.name || 'Customer',
      customerName: o.items?.[0]?.name || 'Customer',
      initials: 'CU',
      items: o.items.map((item: any) => item.name),
      total: o.totalAmount,
      time: new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: o.status,
      createdAt: o.createdAt,
      deliveryPlatform: o.platform.toLowerCase().includes('uber') ? 'uber' : 'deliveroo',
      subtotal: o.totalAmount,
      deliveryFee: 0,
      tips: 0,
      fullTotal: o.totalAmount,
    }));

    return NextResponse.json({
      pending: orders.filter(o => o.status === 'pending').length,
      completed: orders.filter(o => o.status === 'completed').length,
      todayRevenue,
      orders: formattedOrders,
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