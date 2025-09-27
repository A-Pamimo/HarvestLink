// API route for matching needs to listings

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, MatchResult, Order } from '@/lib/types';
import db from '@/lib/db';
import { haversine, calculateETA } from '@/lib/geo';

// POST /api/match
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<MatchResult>>> {
  try {
    const body = await request.json();
    const { needId } = body;
    
    if (!needId) {
      return NextResponse.json({
        ok: false,
        error: 'Missing required field: needId',
      }, { status: 400 });
    }

    // Get the need
    const need = db.getNeed(needId);
    if (!need) {
      return NextResponse.json({
        ok: false,
        error: 'Need not found',
      }, { status: 404 });
    }

    // Get the store
    const store = db.getStore(need.storeId);
    if (!store) {
      return NextResponse.json({
        ok: false,
        error: 'Store not found',
      }, { status: 404 });
    }

    // Find matching listings
    const matchingListings = db.getListingsByItem(need.item)
      .filter(listing => listing.qtyKg >= need.qtyKg);

    if (matchingListings.length === 0) {
      return NextResponse.json({
        ok: false,
        error: 'No matching listings found',
      }, { status: 404 });
    }

    // Calculate scores for each listing
    const scoredListings = matchingListings.map(listing => {
      const farm = db.getFarm(listing.farmId);
      if (!farm) return null;

      const distanceKm = haversine(farm.loc, store.loc);
      const harvestDate = new Date(listing.harvestTs);
      const harvestAgeHours = (Date.now() - harvestDate.getTime()) / (1000 * 60 * 60);
      
      // Score = distanceKm + 0.02 * harvestAgeHours
      const score = distanceKm + 0.02 * harvestAgeHours;

      return {
        listing,
        farm,
        distanceKm,
        score,
      };
    }).filter(Boolean);

    if (scoredListings.length === 0) {
      return NextResponse.json({
        ok: false,
        error: 'No valid farms found for matching listings',
      }, { status: 404 });
    }

    // Choose the best match (lowest score)
    const bestMatch = scoredListings.reduce((best, current) => 
      current!.score < best!.score ? current : best
    )!;

    // Create the order
    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      listingId: bestMatch.listing.id,
      needId: need.id,
      item: need.item,
      qtyKg: need.qtyKg,
      distanceKm: Math.round(bestMatch.distanceKm * 100) / 100, // Round to 2 decimal places
      etaMin: calculateETA(bestMatch.distanceKm),
      status: 'CREATED',
      createdTs: new Date().toISOString(),
    };

    db.addOrder(order);

    const result: MatchResult = {
      order,
      matchScore: Math.round(bestMatch.score * 100) / 100,
      farm: bestMatch.farm,
      store,
    };
    
    return NextResponse.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.error('Match error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Failed to match need to listing',
    }, { status: 500 });
  }
}
