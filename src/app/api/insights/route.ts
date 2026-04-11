import { NextResponse } from 'next/server';
import { mockInsights } from '@/src/features/insights/data/mock';

export async function GET() {
  // TODO: replace with real DB/service call
  return NextResponse.json(mockInsights);
}
