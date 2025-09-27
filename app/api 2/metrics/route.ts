// API route for getting metrics

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Metrics } from '@/lib/types';
import db from '@/lib/db';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Metrics>>> {
  try {
    const metrics = db.getMetrics();
    
    return NextResponse.json({
      ok: true,
      data: metrics,
    });
  } catch (error) {
    console.error('Metrics error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Failed to get metrics',
    }, { status: 500 });
  }
}
