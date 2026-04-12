import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import { promotionService } from '@/src/services/promotionService';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId   = searchParams.get('userId');
    const status   = searchParams.get('status')   ?? undefined;
    const platform = searchParams.get('platform') ?? undefined;

    if (!userId) return NextResponse.json({ message: 'User ID is required' }, { status: 400 });

    const data = await promotionService.getPromotions(userId, { status, platform });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Promotions error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { userId, restaurantId, name, offer, details, target, platform, expectedResult, startDate, endDate } = await request.json();

    if (!userId || !name || !offer) return NextResponse.json({ message: 'Required fields missing' }, { status: 400 });

    const promotion = await promotionService.createPromotion({ userId, restaurantId, name, offer, details, target, platform, expectedResult, startDate, endDate });
    return NextResponse.json(promotion, { status: 201 });
  } catch (error) {
    console.error('Create promotion error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const { promotionId, status } = await request.json();

    if (!promotionId) return NextResponse.json({ message: 'Promotion ID is required' }, { status: 400 });

    const promotion = await promotionService.updateStatus(promotionId, status);
    return NextResponse.json(promotion);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : '';
    if (msg === 'NOT_FOUND') return NextResponse.json({ message: 'Promotion not found' }, { status: 404 });
    console.error('Update promotion error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
