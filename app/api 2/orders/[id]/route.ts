// API route for individual order details

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, OrderDetail } from '@/lib/types';
import db from '@/lib/db';

// GET /api/orders/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<OrderDetail>>> {
  try {
    const { id } = params;
    
    // Get the order
    const order = db.getOrder(id);
    if (!order) {
      return NextResponse.json({
        ok: false,
        error: 'Order not found',
      }, { status: 404 });
    }

    // Get related data
    const listing = db.getListing(order.listingId);
    const need = db.getNeed(order.needId);
    
    if (!listing || !need) {
      return NextResponse.json({
        ok: false,
        error: 'Related listing or need not found',
      }, { status: 404 });
    }

    const farm = db.getFarm(listing.farmId);
    const store = db.getStore(need.storeId);
    
    if (!farm || !store) {
      return NextResponse.json({
        ok: false,
        error: 'Related farm or store not found',
      }, { status: 404 });
    }

    const orderDetail: OrderDetail = {
      order,
      listing,
      need,
      farm,
      store,
    };
    
    return NextResponse.json({
      ok: true,
      data: orderDetail,
    });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json({
      ok: false,
      error: 'Failed to get order details',
    }, { status: 500 });
  }
}
