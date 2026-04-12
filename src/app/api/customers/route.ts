import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Customer from '@/models/Customer';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        customers: [],
        summary: {
          totalCustomers: 0,
          vipCustomers: 0,
          newCustomers: 0,
          totalSpend: 0,
        },
      });
    }

    const customers = await Customer.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({
      customers,
      summary: {
        totalCustomers: customers.length,
        vipCustomers: customers.filter((c: any) => c.status === 'vip').length,
        newCustomers: customers.filter((c: any) => c.status === 'new').length,
        totalSpend: customers.reduce((sum: number, c: any) => sum + c.totalSpend, 0),
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