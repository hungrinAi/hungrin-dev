import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { orderService } from '@/src/services/orderService';
import { isMockMode, MOCK_ORDERS_SUMMARY } from '@/src/lib/mockData';

export async function GET(_request: NextRequest) {
  if (isMockMode()) return NextResponse.json(MOCK_ORDERS_SUMMARY);

  const { searchParams } = new URL(_request.url);
  const userId   = searchParams.get('userId');
  const status   = searchParams.get('status')   ?? undefined;
  const platform = searchParams.get('platform') ?? undefined;

  try {
    await connectDB();
    if (!userId) return NextResponse.json(MOCK_ORDERS_SUMMARY);
    const data = await orderService.getOrders(userId, { status, platform });
    return NextResponse.json(data);
  } catch (error) {
    console.warn('[orders] DB unavailable, returning mock data:', (error as Error).message);
    return NextResponse.json(MOCK_ORDERS_SUMMARY);
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
    console.error('[orders] Create order error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
