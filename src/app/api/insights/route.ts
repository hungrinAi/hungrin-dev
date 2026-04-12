import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { insightsService } from '@/src/services/insightsService';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const userId = new URL(request.url).searchParams.get('userId');

    if (!userId) return NextResponse.json({ message: 'User ID is required' }, { status: 400 });

    const data = await insightsService.getInsights(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Insights error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
