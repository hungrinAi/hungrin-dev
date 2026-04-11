import { NextResponse } from 'next/server';
import { mockDashboardStats } from '@/src/features/dashboard/data/mock';

export async function GET() {
  // TODO: replace with real DB/service call
  return NextResponse.json(mockDashboardStats);
}
