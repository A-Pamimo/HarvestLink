'use client';

// Order detail page

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import type { ApiResponse, OrderDetail, Order } from '@/lib/types';
import OrderSummary from '@/components/order/OrderSummary';
import OrderMap from '@/components/order/OrderMap';
import Toast, { useToast } from '@/components/ui/Toast';

interface OrderPageProps {
  params: { id: string };
}

async function fetchOrderDetail(orderId: string): Promise<OrderDetail> {
  const response = await fetch(`/api/orders/${orderId}`);
  const data: ApiResponse<OrderDetail> = await response.json();
  
  if (!data.ok || !data.data) {
    throw new Error(data.error || 'Failed to fetch order details');
  }
  
  return data.data;
}

async function deliverOrder(orderId: string): Promise<Order> {
  const response = await fetch(`/api/orders/${orderId}/deliver`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ confirm: true }),
  });
  
  const result: ApiResponse<Order> = await response.json();
  
  if (!result.ok || !result.data) {
    throw new Error(result.error || 'Failed to mark order as delivered');
  }
  
  return result.data;
}

async function flagOrder(orderId: string, reason: string): Promise<Order> {
  const response = await fetch(`/api/orders/${orderId}/flag`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason }),
  });
  
  const result: ApiResponse<Order> = await response.json();
  
  if (!result.ok || !result.data) {
    throw new Error(result.error || 'Failed to flag order');
  }
  
  return result.data;
}

export default function OrderPage({ params }: OrderPageProps) {
  const [flagReason, setFlagReason] = useState('');
  const [showFlagDialog, setShowFlagDialog] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const queryClient = useQueryClient();

  const { data: orderDetail, isLoading, error } = useQuery({
    queryKey: ['order', params.id],
    queryFn: () => fetchOrderDetail(params.id),
  });

  const deliverMutation = useMutation({
    mutationFn: deliverOrder,
    onSuccess: () => {
      showToast('Order marked as delivered! Metrics updated.', 'success');
      queryClient.invalidateQueries({ queryKey: ['order', params.id] });
      queryClient.invalidateQueries({ queryKey: ['metrics'] });
    },
    onError: (error) => {
      showToast(error.message, 'error');
    },
  });

  const flagMutation = useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) => 
      flagOrder(orderId, reason),
    onSuccess: () => {
      showToast('Order flagged successfully.', 'success');
      setShowFlagDialog(false);
      setFlagReason('');
      queryClient.invalidateQueries({ queryKey: ['order', params.id] });
    },
    onError: (error) => {
      showToast(error.message, 'error');
    },
  });

  const handleDeliver = () => {
    if (window.confirm('Are you sure you want to mark this order as delivered?')) {
      deliverMutation.mutate(params.id);
    }
  };

  const handleFlag = () => {
    if (!flagReason.trim()) {
      showToast('Please provide a reason for flagging', 'error');
      return;
    }
    flagMutation.mutate({ orderId: params.id, reason: flagReason });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-96 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!orderDetail) {
    return null;
  }

  const canDeliver = orderDetail.order.status === 'CREATED';
  const canFlag = orderDetail.order.status !== 'DELIVERED';

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Order Summary */}
          <OrderSummary orderDetail={orderDetail} />

          {/* Order Map */}
          <OrderMap orderDetail={orderDetail} />
        </div>

        {/* Action Buttons */}
        {(canDeliver || canFlag) && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {canDeliver && (
                <button
                  onClick={handleDeliver}
                  disabled={deliverMutation.isPending}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deliverMutation.isPending ? 'Processing...' : '✅ Mark as Delivered'}
                </button>
              )}
              
              {canFlag && (
                <button
                  onClick={() => setShowFlagDialog(true)}
                  disabled={flagMutation.isPending}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🚩 Flag Issue
                </button>
              )}
            </div>
          </div>
        )}

        {/* Flag Dialog */}
        {showFlagDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Flag Order Issue</h3>
              
              <textarea
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                placeholder="Please describe the issue..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={4}
              />
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleFlag}
                  disabled={flagMutation.isPending || !flagReason.trim()}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {flagMutation.isPending ? 'Flagging...' : 'Flag Order'}
                </button>
                <button
                  onClick={() => {
                    setShowFlagDialog(false);
                    setFlagReason('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </>
  );
}
