import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { orderService } from '@/src/services/orderService';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId   = searchParams.get('userId');
    const status   = searchParams.get('status')   ?? undefined;
    const platform = searchParams.get('platform') ?? undefined;

    if (!userId) return NextResponse.json({ message: 'User ID is required' }, { status: 400 });

    const data = await orderService.getOrders(userId, { status, platform });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Orders error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { userId, restaurantId, platform, orderNumber, items, totalAmount } = await request.json();

    if (!userId || !platform || !orderNumber || !items || !totalAmount) {
      return NextResponse.json({ message: 'Required fields missing' }, { status: 400 });
    }

    const order = await orderService.createOrder({ userId, restaurantId, platform, orderNumber, items, totalAmount });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
