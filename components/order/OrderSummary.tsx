// Order summary component

import type { OrderDetail } from '@/lib/types';
import StatusChip from '@/components/ui/StatusChip';
import FreshnessBadge from '@/components/ui/FreshnessBadge';

interface OrderSummaryProps {
  orderDetail: OrderDetail;
}

export default function OrderSummary({ orderDetail }: OrderSummaryProps) {
  const { order, listing, need, farm, store } = orderDetail;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-gray-600">Created {new Date(order.createdTs).toLocaleString()}</p>
        </div>
        <StatusChip status={order.status} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Item:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{order.item}</span>
                <FreshnessBadge harvestTs={listing.harvestTs} />
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-medium">{order.qtyKg} kg</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Harvest Date:</span>
              <span className="font-medium">{new Date(listing.harvestTs).toLocaleDateString()}</span>
            </div>

            {listing.pricePerKg && (
              <div className="flex justify-between">
                <span className="text-gray-600">Price per kg:</span>
                <span className="font-medium">${listing.pricePerKg.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Delivery Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Distance:</span>
              <span className="font-medium">{order.distanceKm} km</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">ETA:</span>
              <span className="font-medium">{order.etaMin} minutes</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Need by:</span>
              <span className="font-medium">{new Date(need.needByTs).toLocaleDateString()}</span>
            </div>

            {order.deliveredTs && (
              <div className="flex justify-between">
                <span className="text-gray-600">Delivered:</span>
                <span className="font-medium text-green-600">
                  {new Date(order.deliveredTs).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Farm & Store Info */}
      <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">From Farm</h3>
          <div className="space-y-1">
            <p className="font-medium">{farm.name}</p>
            <p className="text-sm text-gray-600">
              {farm.loc.lat.toFixed(4)}, {farm.loc.lon.toFixed(4)}
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">To Store</h3>
          <div className="space-y-1">
            <p className="font-medium">{store.name}</p>
            <p className="text-sm text-gray-600">
              {store.loc.lat.toFixed(4)}, {store.loc.lon.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
