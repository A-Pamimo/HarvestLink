import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderId = params.id

  const orderIndex = db.orders.findIndex(o => o.id === orderId)
  if (orderIndex === -1) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  // Update order status
  db.orders[orderIndex].status = 'FLAGGED'

  return NextResponse.json(db.orders[orderIndex])
}
