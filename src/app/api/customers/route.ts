import { NextResponse } from 'next/server';
import { mockCustomerSummary } from '@/src/features/customers/data/mock';

export async function GET() {
  // TODO: replace with real DB/service call
  return NextResponse.json(mockCustomerSummary);
}
