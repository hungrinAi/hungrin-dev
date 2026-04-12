import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { dashboardService } from '@/src/services/dashboardService';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const userId = new URL(request.url).searchParams.get('userId');

    if (!userId) return NextResponse.json({ message: 'User ID is required' }, { status: 400 });

    const data = await dashboardService.getStats(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
