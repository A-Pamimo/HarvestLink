'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import { useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Clock, Info, MapPin, Users, ArrowRight } from 'lucide-react'

const userLocation = { lat: 43.6532, lng: -79.3832 }

const pickups = [
  {
    id: 'riverside',
    locationName: 'Riverside Community Center',
    address: '123 Main St, Toronto',
    time: '10:00 AM - 11:00 AM',
    distance: 2.4,
    currentCustomers: 8,
    maxCustomers: 16,
    spotsLeft: 8,
    lat: 43.6532,
    lng: -79.3732,
  },
  {
    id: 'harbor',
    locationName: 'Harborfront Market',
    address: '12 Water St, Toronto',
    time: '12:00 PM - 1:00 PM',
    distance: 4.1,
    currentCustomers: 12,
    maxCustomers: 16,
    spotsLeft: 4,
    lat: 43.6426,
    lng: -79.3822,
  },
  {
    id: 'north',
    locationName: 'North Loop Co-op',
    address: '5 Queen St, Toronto',
    time: '2:00 PM - 3:00 PM',
    distance: 5.5,
    currentCustomers: 6,
    maxCustomers: 20,
    spotsLeft: 14,
    lat: 43.662,
    lng: -79.362,
  },
]

export default function PickupSelectionPage() {
  const [selectedPickup, setSelectedPickup] = useState(pickups[0])

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-6xl p-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-brand-text">Choose Your Pickup</h1>
          <p className="text-stone-600">Join a community pickup near you for Saturday, Nov 9</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="h-96 overflow-hidden rounded-2xl bg-white shadow-sm lg:col-span-2">
            <Map
              mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
              initialViewState={{ latitude: userLocation.lat, longitude: userLocation.lng, zoom: 12 }}
              mapStyle="mapbox://styles/mapbox/light-v11"
              style={{ width: '100%', height: '100%' }}
            >
              <Marker latitude={userLocation.lat} longitude={userLocation.lng} anchor="center">
                <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-600 shadow-lg" />
              </Marker>
              {pickups.map((pickup) => (
                <Marker key={pickup.id} latitude={pickup.lat} longitude={pickup.lng} anchor="bottom">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className={`rounded-full border-2 px-3 py-1 text-sm font-medium shadow-lg transition-all ${
                      selectedPickup.id === pickup.id
                        ? 'border-brand-primary bg-brand-primary text-white'
                        : 'border-white bg-white text-brand-text'
                    }`}
                    onClick={() => setSelectedPickup(pickup)}
                  >
                    {pickup.spotsLeft} spots
                  </motion.button>
                </Marker>
              ))}
            </Map>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-900">How pickups work</p>
                  <p className="mt-1">
                    Meet your farmer at the pickup location. They'll have your order packed and ready. Show your QR code to confirm.
                  </p>
                </div>
              </div>
            </div>
            {pickups.map((pickup) => {
              const percent = Math.round((pickup.currentCustomers / pickup.maxCustomers) * 100)
              const isSelected = selectedPickup.id === pickup.id
              return (
                <motion.button
                  key={pickup.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedPickup(pickup)}
                  className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                    isSelected ? 'border-brand-primary bg-emerald-50' : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-brand-text">{pickup.locationName}</h3>
                      <p className="text-sm text-stone-600">{pickup.address}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        pickup.spotsLeft < 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-brand-primary'
                      }`}
                    >
                      {pickup.spotsLeft} spots left
                    </span>
                  </div>
                  <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-stone-600">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {pickup.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {pickup.distance} km away
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {pickup.currentCustomers} joining
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
                    <div className="h-full bg-brand-primary" style={{ width: `${percent}%` }} />
                  </div>
                </motion.button>
              )
            })}
            <Button className="w-full bg-brand-primary" size="lg" disabled={!selectedPickup}>
              Confirm Pickup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
