import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderId = params.id

  const order = db.orders.find(o => o.id === orderId)
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  const listing = db.listings.find(l => l.id === order.listingId)
  const need = db.needs.find(n => n.id === order.needId)
  const farm = listing ? db.farms.find(f => f.id === listing.farmId) : null
  const store = need ? db.stores.find(s => s.id === need.storeId) : null

  return NextResponse.json({
    order,
    listing,
    need,
    farm,
    store,
  })
}
