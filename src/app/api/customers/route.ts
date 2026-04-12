import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { customerService } from '@/src/services/customerService';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const userId = new URL(request.url).searchParams.get('userId');

    if (!userId) return NextResponse.json({ message: 'User ID is required' }, { status: 400 });

    const data = await customerService.getCustomers(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Customers error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
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
    console.error('Create customer error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
