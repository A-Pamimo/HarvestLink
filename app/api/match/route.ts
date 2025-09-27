import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Order, MatchResult } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { needId } = body

    if (!needId) {
      return NextResponse.json({ error: 'Missing needId' }, { status: 400 })
    }

    // Find the need
    const need = db.needs.find(n => n.id === needId)
    if (!need) {
      return NextResponse.json({ error: 'Need not found' }, { status: 404 })
    }

    // Find the store
    const store = db.stores.find(s => s.id === need.storeId)
    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    // Find matching listings (same item, sufficient quantity)
    const matchingListings = db.listings.filter(listing => 
      listing.item.toLowerCase() === need.item.toLowerCase() && 
      listing.qtyKg >= need.qtyKg
    )

    if (matchingListings.length === 0) {
      return NextResponse.json({ error: 'No matching listings found' }, { status: 404 })
    }

    // Calculate distances and find best match
    let bestMatch = null
    let bestScore = -1

    for (const listing of matchingListings) {
      const farm = db.farms.find(f => f.id === listing.farmId)
      if (!farm) continue

      const distance = db.calculateDistance(farm.loc, store.loc)
      const freshness = (new Date().getTime() - new Date(listing.harvestTs).getTime()) / (1000 * 60 * 60) // hours
      
      // Score: lower distance and fresher produce = higher score
      const score = 100 - (distance * 2) - (freshness * 0.5)

      if (score > bestScore) {
        bestScore = score
        bestMatch = { listing, farm, distance }
      }
    }

    if (!bestMatch) {
      return NextResponse.json({ error: 'No suitable match found' }, { status: 404 })
    }

    // Create order
    const order: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      listingId: bestMatch.listing.id,
      needId: need.id,
      item: need.item,
      qtyKg: need.qtyKg,
      distanceKm: Math.round(bestMatch.distance * 100) / 100,
      etaMin: Math.round(bestMatch.distance * 3), // ~3 min per km
      status: 'CREATED',
      createdTs: new Date().toISOString(),
    }

    db.orders.push(order)

    // Remove fulfilled need and reduce listing quantity
    db.needs = db.needs.filter(n => n.id !== needId)
    const listingIndex = db.listings.findIndex(l => l.id === bestMatch!.listing.id)
    if (listingIndex !== -1) {
      db.listings[listingIndex].qtyKg -= need.qtyKg
      if (db.listings[listingIndex].qtyKg <= 0) {
        db.listings.splice(listingIndex, 1)
      }
    }

    const result: MatchResult = {
      order,
      farm: bestMatch.farm,
      store,
      matchScore: bestScore,
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
