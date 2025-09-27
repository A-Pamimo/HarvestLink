// API route for needs

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Need } from '@/lib/types';
import db from '@/lib/db';

// POST /api/needs
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Need>>> {
  try {
    const body = await request.json();
    const { storeId, item, qtyKg, needByTs } = body;
    
    // Validate required fields
    if (!storeId || !item || !qtyKg || !needByTs) {
      return NextResponse.json({
        ok: false,
        error: 'Missing required fields: storeId, item, qtyKg, needByTs',
      }, { status: 400 });
    }

    // Validate store exists
    const store = db.getStore(storeId);
    if (!store) {
      return NextResponse.json({
        ok: false,
        error: 'Store not found',
      }, { status: 404 });
    }

    // Create new need
    const need: Need = {
      id: Math.random().toString(36).substr(2, 9),
      storeId,
      item,
      qtyKg: Number(qtyKg),
      needByTs,
      createdTs: new Date().toISOString(),
    };

    db.addNeed(need);
    
    return NextResponse.json({
      ok: true,
      data: need,
    });
  } catch (error) {
    console.error('Create need error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Failed to create need',
    }, { status: 500 });
  }
}
