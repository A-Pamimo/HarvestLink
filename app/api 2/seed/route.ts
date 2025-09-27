// API route for seeding/resetting data

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types';
import { seedAll } from '@/lib/seeds';

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const result = seedAll();
    
    return NextResponse.json({
      ok: true,
      data: {
        message: 'Database seeded successfully',
        ...result,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Failed to seed database',
    }, { status: 500 });
  }
}
