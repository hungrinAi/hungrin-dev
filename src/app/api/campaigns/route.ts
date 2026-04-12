import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { campaignService } from '@/src/services/campaignService';
import { isMockMode, MOCK_CAMPAIGNS } from '@/src/lib/mockData';

export async function GET(_request: NextRequest) {
  if (isMockMode()) return NextResponse.json(MOCK_CAMPAIGNS);

  const { searchParams } = new URL(_request.url);
  const userId = searchParams.get('userId');
  const status = searchParams.get('status') ?? undefined;

  try {
    await connectDB();
    if (!userId) return NextResponse.json(MOCK_CAMPAIGNS);
    const data = await campaignService.getCampaigns(userId, status);
    return NextResponse.json(data);
  } catch (error) {
    console.warn('[campaigns] DB unavailable, returning mock data:', (error as Error).message);
    return NextResponse.json(MOCK_CAMPAIGNS);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { userId, restaurantId, name, description, platform, budget, startDate, endDate } = await request.json();
    if (!userId || !name) return NextResponse.json({ message: 'Required fields missing' }, { status: 400 });
    const campaign = await campaignService.createCampaign({ userId, restaurantId, name, description, platform, budget, startDate, endDate });
    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('[campaigns] Create campaign error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const { campaignId, status } = await request.json();
    if (!campaignId) return NextResponse.json({ message: 'Campaign ID is required' }, { status: 400 });
    const campaign = await campaignService.updateStatus(campaignId, status);
    return NextResponse.json(campaign);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : '';
    if (msg === 'NOT_FOUND') return NextResponse.json({ message: 'Campaign not found' }, { status: 404 });
    console.error('[campaigns] Update campaign error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
