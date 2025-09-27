'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { Farm, StoreEnt, Order } from '@/lib/types'

// Fix for default markers in react-leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const FarmIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#16a34a">
      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
})

const StoreIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
      <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z"/>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
})

L.Marker.prototype.options.icon = DefaultIcon

interface OrderMapProps {
  farm: Farm
  store: StoreEnt
  order: Order
}

export function OrderMap({ farm, store, order }: OrderMapProps) {
  // Calculate center point between farm and store
  const centerLat = (farm.loc.lat + store.loc.lat) / 2
  const centerLon = (farm.loc.lon + store.loc.lon) / 2

  // Route line coordinates
  const routeCoordinates: [number, number][] = [
    [farm.loc.lat, farm.loc.lon],
    [store.loc.lat, store.loc.lon]
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return '#16a34a' // green
      case 'FLAGGED': return '#dc2626' // red
      default: return '#2563eb' // blue
    }
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-sm">
      <MapContainer
        center={[centerLat, centerLon]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Farm Marker */}
        <Marker position={[farm.loc.lat, farm.loc.lon]} icon={FarmIcon}>
          <Popup>
            <div className="p-2">
              <div className="font-semibold text-green-700">🚜 {farm.name}</div>
              <div className="text-sm text-gray-600">Farm Location</div>
              <div className="text-xs text-gray-500">
                {farm.loc.lat.toFixed(4)}, {farm.loc.lon.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Customer Marker */}
        <Marker position={[store.loc.lat, store.loc.lon]} icon={StoreIcon}>
          <Popup>
            <div className="p-2">
              <div className="font-semibold text-blue-700">🏪 {store.name}</div>
              <div className="text-sm text-gray-600">Customer Location</div>
              <div className="text-xs text-gray-500">
                {store.loc.lat.toFixed(4)}, {store.loc.lon.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>

        {/* Route Line */}
        <Polyline
          positions={routeCoordinates}
          color={getStatusColor(order.status)}
          weight={4}
          opacity={0.7}
          dashArray={order.status === 'DELIVERED' ? '0' : '10, 10'}
        />
      </MapContainer>
    </div>
  )
}
