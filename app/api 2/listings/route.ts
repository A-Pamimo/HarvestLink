// API route for listings

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Listing } from '@/lib/types';
import db from '@/lib/db';

// GET /api/listings?farmId=ID
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Listing[]>>> {
  try {
    const { searchParams } = new URL(request.url);
    const farmId = searchParams.get('farmId');
    
    let listings: Listing[];
    if (farmId) {
      listings = db.getListingsByFarm(farmId);
    } else {
      listings = db.getAllListings();
    }
    
    return NextResponse.json({
      ok: true,
      data: listings,
    });
  } catch (error) {
    console.error('Get listings error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Failed to get listings',
    }, { status: 500 });
  }
}

// POST /api/listings
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Listing>>> {
  try {
    const body = await request.json();
    const { farmId, item, qtyKg, harvestTs, pricePerKg } = body;
    
    // Validate required fields
    if (!farmId || !item || !qtyKg || !harvestTs) {
      return NextResponse.json({
        ok: false,
        error: 'Missing required fields: farmId, item, qtyKg, harvestTs',
      }, { status: 400 });
    }

    // Validate farm exists
    const farm = db.getFarm(farmId);
    if (!farm) {
      return NextResponse.json({
        ok: false,
        error: 'Farm not found',
      }, { status: 404 });
    }

    // Create new listing
    const listing: Listing = {
      id: Math.random().toString(36).substr(2, 9),
      farmId,
      item,
      qtyKg: Number(qtyKg),
      harvestTs,
      pricePerKg: pricePerKg ? Number(pricePerKg) : undefined,
      createdTs: new Date().toISOString(),
    };

    db.addListing(listing);
    
    return NextResponse.json({
      ok: true,
      data: listing,
    });
  } catch (error) {
    console.error('Create listing error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Failed to create listing',
    }, { status: 500 });
  }
}
