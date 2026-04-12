import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { customerService } from '@/src/services/customerService';
import { isMockMode, MOCK_CUSTOMERS_SUMMARY } from '@/src/lib/mockData';

export async function GET(_request: NextRequest) {
  if (isMockMode()) return NextResponse.json(MOCK_CUSTOMERS_SUMMARY);

  const userId = new URL(_request.url).searchParams.get('userId');

  try {
    await connectDB();
    if (!userId) return NextResponse.json(MOCK_CUSTOMERS_SUMMARY);
    const data = await customerService.getCustomers(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.warn('[customers] DB unavailable, returning mock data:', (error as Error).message);
    return NextResponse.json(MOCK_CUSTOMERS_SUMMARY);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { userId, restaurantId, name, email, phone, platform } = await request.json();
    if (!userId || !name || !email) {
      return NextResponse.json({ message: 'Required fields missing' }, { status: 400 });
    }
    const customer = await customerService.createCustomer({ userId, restaurantId, name, email, phone, platform });
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('[customers] Create customer error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
