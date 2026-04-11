import { NextResponse } from 'next/server';
import { mockOrderSummary } from '@/src/features/orders/data/mock';

export async function GET() {
  // TODO: replace with real DB/service call
  return NextResponse.json(mockOrderSummary);
}
