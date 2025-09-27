'use client'

import { Farm, StoreEnt, Order, Listing } from '@/lib/types'

interface OrderSummaryProps {
  order: Order
  farm: Farm
  store: StoreEnt
  listing: Listing | null
}

export function OrderSummary({ order, farm, store, listing }: OrderSummaryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200'
      case 'FLAGGED': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED': return '✅'
      case 'FLAGGED': return '⚠️'
      default: return '🚚'
    }
  }

  const estimatedDelivery = new Date(
    new Date(order.createdTs).getTime() + order.etaMin * 60 * 1000
  )

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Order #{order.id.slice(-8)}
          </h1>
          <p className="text-gray-600">
            {order.item} • {order.qtyKg} kg
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
          <span className="mr-1">{getStatusIcon(order.status)}</span>
          {order.status}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* From Section */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">🚜</span>
            <div>
              <h3 className="font-semibold text-gray-900">From Farm</h3>
              <p className="text-gray-600">{farm.name}</p>
            </div>
          </div>
          
          {listing && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Harvested:</span>
                <span className="font-medium">{formatDate(listing.harvestTs)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">
                  {farm.loc.lat.toFixed(3)}, {farm.loc.lon.toFixed(3)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* To Section */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">🏪</span>
            <div>
              <h3 className="font-semibold text-gray-900">To Customer</h3>
              <p className="text-gray-600">{store.name}</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Distance:</span>
              <span className="font-medium">{order.distanceKm} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">
                {store.loc.lat.toFixed(3)}, {store.loc.lon.toFixed(3)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Delivery Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Order Created</div>
            <div className="font-medium">{formatDate(order.createdTs)}</div>
          </div>
          <div>
            <div className="text-gray-600">Estimated ETA</div>
            <div className="font-medium">{order.etaMin} minutes</div>
          </div>
          <div>
            <div className="text-gray-600">Expected Delivery</div>
            <div className="font-medium">{formatDate(estimatedDelivery.toISOString())}</div>
          </div>
          {order.deliveredTs && (
            <div>
              <div className="text-gray-600">Delivered At</div>
              <div className="font-medium text-green-600">{formatDate(order.deliveredTs)}</div>
            </div>
          )}
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="mt-6 bg-green-50 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-3">🌱 Environmental Impact</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-green-700">Direct Farm-to-Customer</div>
            <div className="text-green-600">Reduced supply chain</div>
          </div>
          <div>
            <div className="text-green-700">CO₂ Efficiency</div>
            <div className="text-green-600">~{(order.distanceKm * 0.4).toFixed(1)} kg CO₂ vs traditional</div>
          </div>
        </div>
      </div>
    </div>
  )
}
