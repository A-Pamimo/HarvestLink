import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Need } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { storeId, item, qtyKg, needByTs } = body

    if (!storeId || !item || !qtyKg || !needByTs) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const need: Need = {
      id: `need_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      storeId,
      item,
      qtyKg: Number(qtyKg),
      needByTs,
      createdTs: new Date().toISOString(),
    }

    db.needs.push(need)
    return NextResponse.json(need)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json(db.needs)
}
