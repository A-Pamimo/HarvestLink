'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { OrderSummary } from '@/components/OrderSummary'

// Dynamically import the map component to avoid SSR issues
const OrderMap = dynamic(
  () => import('@/components/OrderMap').then(mod => ({ default: mod.OrderMap })),
  { 
    ssr: false,
    loading: () => (
      <div className="h-96 w-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    )
  }
)

interface OrderPageProps {
  params: { id: string }
}

async function fetchOrder(orderId: string) {
  const response = await fetch(`/api/orders/${orderId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch order')
  }
  return response.json()
}

async function deliverOrder(orderId: string) {
  const response = await fetch(`/api/orders/${orderId}/deliver`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to deliver order')
  }
  return response.json()
}

async function flagOrder(orderId: string) {
  const response = await fetch(`/api/orders/${orderId}/flag`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to flag order')
  }
  return response.json()
}

export default function OrderPage({ params }: OrderPageProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const orderId = params.id

  const { data, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrder(orderId),
  })

  const deliverMutation = useMutation({
    mutationFn: () => deliverOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] })
      queryClient.invalidateQueries({ queryKey: ['metrics'] })
    },
  })

  const flagMutation = useMutation({
    mutationFn: () => flagOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] })
    },
  })

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error || !data || !data.order) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-4">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const { order, farm, store, listing } = data

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <span className="mr-2">←</span>
        Back
      </button>

      {/* Order Summary */}
      <div className="mb-8">
        <OrderSummary order={order} farm={farm} store={store} listing={listing} />
      </div>

      {/* Map */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Route</h2>
        {farm && store && (
          <OrderMap farm={farm} store={store} order={order} />
        )}
      </div>

      {/* Action Buttons */}
      {order.status === 'CREATED' && (
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => deliverMutation.mutate()}
            disabled={deliverMutation.isPending}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-6 rounded-md font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-xl">✅</span>
            {deliverMutation.isPending ? 'Marking as Delivered...' : 'Mark as Delivered'}
          </button>
          
          <button
            onClick={() => flagMutation.mutate()}
            disabled={flagMutation.isPending}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 px-6 rounded-md font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-xl">⚠️</span>
            {flagMutation.isPending ? 'Flagging Issue...' : 'Flag Issue'}
          </button>
        </div>
      )}

      {order.status === 'DELIVERED' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-lg font-semibold text-green-900 mb-1">Order Delivered Successfully!</h3>
          <p className="text-green-700">This order has been completed and added to the impact metrics.</p>
        </div>
      )}

      {order.status === 'FLAGGED' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <h3 className="text-lg font-semibold text-red-900 mb-1">Order Flagged</h3>
          <p className="text-red-700">This order has been flagged for review. Please contact support for assistance.</p>
        </div>
      )}

      {/* Error Messages */}
      {deliverMutation.error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800">
            Error delivering order: {deliverMutation.error.message}
          </div>
        </div>
      )}

      {flagMutation.error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800">
            Error flagging order: {flagMutation.error.message}
          </div>
        </div>
      )}
    </div>
  )
}
