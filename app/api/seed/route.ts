import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  db.reset()
  return NextResponse.json({ message: 'Database reset successfully' })
}
