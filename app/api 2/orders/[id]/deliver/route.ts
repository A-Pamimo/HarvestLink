// API route for marking order as delivered

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Order } from '@/lib/types';
import db from '@/lib/db';
import { calculateDeliveryImpact } from '@/lib/metrics';

// POST /api/orders/:id/deliver
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Order>>> {
  try {
    const { id } = params;
    const body = await request.json();
    const { confirm } = body;
    
    if (!confirm) {
      return NextResponse.json({
        ok: false,
        error: 'Confirmation required',
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

    if (order.status !== 'CREATED') {
      return NextResponse.json({
        ok: false,
        error: 'Order cannot be delivered in current status',
      }, { status: 400 });
    }

    // Update order status
    const updatedOrder = db.updateOrder(id, {
      status: 'DELIVERED',
      deliveredTs: new Date().toISOString(),
    });

    if (!updatedOrder) {
      return NextResponse.json({
        ok: false,
        error: 'Failed to update order',
      }, { status: 500 });
    }

    // Update metrics
    const currentMetrics = db.getMetrics();
    const newMetrics = calculateDeliveryImpact(updatedOrder, currentMetrics);
    db.updateMetrics(newMetrics);
    
    return NextResponse.json({
      ok: true,
      data: updatedOrder,
    });
  } catch (error) {
    console.error('Deliver order error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Failed to mark order as delivered',
    }, { status: 500 });
  }
}
