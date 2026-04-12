import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { campaignService } from '@/src/services/campaignService';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status') ?? undefined;

    if (!userId) return NextResponse.json({ message: 'User ID is required' }, { status: 400 });

    const data = await campaignService.getCampaigns(userId, status);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Campaigns error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
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
    console.error('Create campaign error:', error);
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
    console.error('Update campaign error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
