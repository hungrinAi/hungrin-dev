import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { authService } from '@/src/services/authService';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { name, email, password, restaurantName } = await request.json();

    if (!name || !email || !password || !restaurantName) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const user = await authService.register({ name, email, password, restaurantName });
    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : '';
    if (msg === 'EMAIL_TAKEN') {
      return NextResponse.json({ message: 'User already exists with this email' }, { status: 400 });
    }
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
