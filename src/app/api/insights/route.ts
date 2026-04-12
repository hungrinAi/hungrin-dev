import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { insightsService } from '@/src/services/insightsService';
import { isMockMode, MOCK_INSIGHTS } from '@/src/lib/mockData';

export async function GET(_request: NextRequest) {
  if (isMockMode()) return NextResponse.json(MOCK_INSIGHTS);

  const userId = new URL(_request.url).searchParams.get('userId');

  try {
    await connectDB();
    if (!userId) return NextResponse.json(MOCK_INSIGHTS);
    const data = await insightsService.getInsights(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.warn('[insights] DB unavailable, returning mock data:', (error as Error).message);
    return NextResponse.json(MOCK_INSIGHTS);
  }
}
