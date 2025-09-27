// API route for flagging order issues

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Order } from '@/lib/types';
import db from '@/lib/db';

// POST /api/orders/:id/flag
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Order>>> {
  try {
    const { id } = params;
    const body = await request.json();
    const { reason } = body;
    
    if (!reason || typeof reason !== 'string') {
      return NextResponse.json({
        ok: false,
        error: 'Reason is required',
      }, { status: 400 });
    }

    // Get the order
    const order = db.getOrder(id);
    if (!order) {
      return NextResponse.json({
        ok: false,
        error: 'Order not found',
      }, { status: 404 });
    }

    if (order.status === 'DELIVERED') {
      return NextResponse.json({
        ok: false,
        error: 'Cannot flag delivered order',
      }, { status: 400 });
    }

    // Update order status
    const updatedOrder = db.updateOrder(id, {
      status: 'FLAGGED',
    });

    if (!updatedOrder) {
      return NextResponse.json({
        ok: false,
        error: 'Failed to update order',
      }, { status: 500 });
    }

    // In a real app, we might store the reason or send notifications
    console.log(`Order ${id} flagged with reason: ${reason}`);
    
    return NextResponse.json({
      ok: true,
      data: updatedOrder,
    });
  } catch (error) {
    console.error('Flag order error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Failed to flag order',
    }, { status: 500 });
  }
}
