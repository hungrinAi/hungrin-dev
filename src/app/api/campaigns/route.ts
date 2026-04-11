import { NextResponse } from 'next/server';
import { mockCampaigns } from '@/src/features/campaigns/data/mock';

export async function GET() {
  // TODO: replace with real DB/service call
  return NextResponse.json(mockCampaigns);
}

export async function POST(request: Request) {
  // TODO: persist to DB
  const body = await request.json();
  return NextResponse.json({ ...body, id: Date.now().toString() }, { status: 201 });
}
