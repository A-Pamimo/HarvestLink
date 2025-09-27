import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Listing } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { farmId, item, qtyKg, harvestTs } = body

    if (!farmId || !item || !qtyKg || !harvestTs) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const listing: Listing = {
      id: `listing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      farmId,
      item,
      qtyKg: Number(qtyKg),
      harvestTs,
      createdTs: new Date().toISOString(),
    }

    db.listings.push(listing)
    return NextResponse.json(listing)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const farmId = searchParams.get('farmId')

  if (farmId) {
    const farmListings = db.listings.filter(listing => listing.farmId === farmId)
    return NextResponse.json(farmListings)
  }

  return NextResponse.json(db.listings)
}
