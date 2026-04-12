import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/mongodb';
import Promotion from '@/src/models/Promotion';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const platform = searchParams.get('platform');

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const query: any = { userId };
    if (status) query.status = status;
    if (platform) query.platform = platform;

    const promotions = await Promotion.find(query).sort({ createdAt: -1 });

    const totalPromotions = promotions.length;
    const activePromotions = promotions.filter(p => p.status === 'active').length;
    const draftPromotions = promotions.filter(p => p.status === 'draft').length;

    return NextResponse.json({
      promotions,
      summary: {
        totalPromotions,
        activePromotions,
        draftPromotions,
      },
    });
  } catch (error) {
    console.error('Promotions error:', error);
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
    const { userId, restaurantId, name, offer, details, target, platform, expectedResult, startDate, endDate } = body;

    if (!userId || !name || !offer) {
      return NextResponse.json(
        { message: 'Required fields missing' },
        { status: 400 }
      );
    }

    const promotion = await Promotion.create({
      userId,
      restaurantId,
      name,
      offer,
      details,
      target,
      platform,
      expectedResult,
      startDate,
      endDate,
      status: 'draft',
    });

    return NextResponse.json(promotion, { status: 201 });
  } catch (error) {
    console.error('Create promotion error:', error);
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
    const { promotionId, status } = body;

    if (!promotionId) {
      return NextResponse.json(
        { message: 'Promotion ID is required' },
        { status: 400 }
      );
    }

    const promotion = await Promotion.findByIdAndUpdate(
      promotionId,
      { status },
      { new: true }
    );

    if (!promotion) {
      return NextResponse.json(
        { message: 'Promotion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(promotion);
  } catch (error) {
    console.error('Update promotion error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}