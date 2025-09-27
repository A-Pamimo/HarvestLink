'use client';

// Map component showing farm to store route

import { useEffect, useRef } from 'react';
import type { OrderDetail } from '@/lib/types';

interface OrderMapProps {
  orderDetail: OrderDetail;
}

// Simple map placeholder component since react-leaflet requires more complex setup
export default function OrderMap({ orderDetail }: OrderMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { farm, store, order } = orderDetail;

  useEffect(() => {
    // In a real implementation, you would initialize Leaflet map here
    // For now, we'll show a placeholder with route information
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Route</h2>
      
      {/* Map Placeholder */}
      <div 
        ref={mapRef}
        className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4"
      >
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-gray-600 mb-2">Interactive Map</p>
          <p className="text-sm text-gray-500">
            Route from {farm.name} to {store.name}
          </p>
        </div>
      </div>

      {/* Route Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-green-600">📍</span>
            <span className="font-medium text-green-900">Origin</span>
          </div>
          <p className="text-green-800">{farm.name}</p>
          <p className="text-green-600 text-xs">
            {farm.loc.lat.toFixed(4)}, {farm.loc.lon.toFixed(4)}
          </p>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-blue-600">🏪</span>
            <span className="font-medium text-blue-900">Destination</span>
          </div>
          <p className="text-blue-800">{store.name}</p>
          <p className="text-blue-600 text-xs">
            {store.loc.lat.toFixed(4)}, {store.loc.lon.toFixed(4)}
          </p>
        </div>
      </div>

      {/* Route Stats */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Total Distance:</span>
          <span className="font-medium">{order.distanceKm} km</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-gray-600">Estimated Travel Time:</span>
          <span className="font-medium">{order.etaMin} minutes</span>
        </div>
      </div>

      {/* Map Implementation Note */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-xs">
          <strong>Note:</strong> In production, this would show an interactive map with the actual route using react-leaflet and OpenStreetMap tiles.
        </p>
      </div>
    </div>
  );
}
