import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { dashboardService } from '@/src/services/dashboardService';
import { isMockMode, MOCK_DASHBOARD_STATS } from '@/src/lib/mockData';

export async function GET(request: NextRequest) {
  // Instant mock response — no DB connection attempted
  if (isMockMode()) return NextResponse.json(MOCK_DASHBOARD_STATS);

  const userId = new URL(request.url).searchParams.get('userId');

  try {
    await connectDB();
    if (!userId) return NextResponse.json(MOCK_DASHBOARD_STATS);
    const data = await dashboardService.getStats(userId);
    return NextResponse.json(data);
  } catch (error) {
    console.warn('[dashboard/stats] DB unavailable, returning mock data:', (error as Error).message);
    return NextResponse.json(MOCK_DASHBOARD_STATS);
  }
}
