import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
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

    const customers = await Customer.find({ userId }).sort({ createdAt: -1 });

    const totalCustomers = customers.length;
    const vipCustomers = customers.filter(c => c.status === 'vip').length;
    const newCustomers = customers.filter(c => c.status === 'new').length;
    const totalSpend = customers.reduce((sum, c) => sum + c.totalSpend, 0);

    return NextResponse.json({
      customers,
      summary: {
        totalCustomers,
        vipCustomers,
        newCustomers,
        totalSpend,
      },
    });
  } catch (error) {
    console.error('Customers error:', error);
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
    const { userId, restaurantId, name, email, phone, platform } = body;

    if (!userId || !name || !email) {
      return NextResponse.json(
        { message: 'Required fields missing' },
        { status: 400 }
      );
    }

    const customer = await Customer.create({
      userId,
      restaurantId,
      name,
      email,
      phone,
      platform,
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('Create customer error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
