import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Campaign from '@/models/Campaign';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }

    const query: any = { userId };
    if (status) query.status = status;

    const campaigns = await Campaign.find(query).sort({ createdAt: -1 });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Campaigns error:', error);
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
    const { userId, restaurantId, name, description, platform, budget, startDate, endDate } = body;

    if (!userId || !name) {
      return NextResponse.json(
        { message: 'Required fields missing' },
        { status: 400 }
      );
    }

    const campaign = await Campaign.create({
      userId,
      restaurantId,
      name,
      description,
      platform,
      budget,
      startDate,
      endDate,
      status: 'draft',
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('Create campaign error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { campaignId, status } = body;

    if (!campaignId) {
      return NextResponse.json(
        { message: 'Campaign ID is required' },
        { status: 400 }
      );
    }

    const campaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { status },
      { new: true }
    );

    if (!campaign) {
      return NextResponse.json(
        { message: 'Campaign not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Update campaign error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}