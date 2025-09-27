'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import { useMemo, useState } from 'react'
import Map, { Layer, Marker, Source } from 'react-map-gl'
import { Button } from '@/components/ui/Button'
import {
  ArrowRight,
  Download,
  Loader2,
  Navigation,
  Package,
  Sparkles,
  TrendingUp,
  Users,
  GripVertical,
} from 'lucide-react'
import { motion, Reorder } from 'framer-motion'

interface Pickup {
  id: string
  location: string
  time: string
  customers: number
  orders: number
  lat: number
  lng: number
  isOptimized?: boolean
}

const initialPickups: Pickup[] = [
  {
    id: '1',
    location: 'Riverside Community Center',
    time: '10:00 AM',
    customers: 12,
    orders: 24,
    lat: 43.6532,
    lng: -79.3832,
    isOptimized: true,
  },
  {
    id: '2',
    location: 'Harborfront Market',
    time: '11:00 AM',
    customers: 8,
    orders: 17,
    lat: 43.6432,
    lng: -79.382,
  },
  {
    id: '3',
    location: 'North Loop Co-op',
    time: '12:00 PM',
    customers: 6,
    orders: 10,
    lat: 43.6632,
    lng: -79.3632,
  },
]

function SortablePickupCard({ pickup, index }: { pickup: Pickup; index: number }) {
  return (
    <motion.div
      layout
      className="cursor-grab rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-brand-primary">
          {index + 1}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-brand-text">{pickup.location}</h4>
          <p className="text-sm text-stone-600">{pickup.time}</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> {pickup.customers} customers
            </span>
            <span className="flex items-center gap-1">
              <Package className="h-3 w-3" /> {pickup.orders} orders
            </span>
          </div>
        </div>
        <GripVertical className="h-5 w-5 text-stone-400" />
      </div>
    </motion.div>
  )
}

export default function RoutePage() {
  const [pickups, setPickups] = useState(initialPickups)
  const [optimizing, setOptimizing] = useState(false)
  const [optimizationResult, setOptimizationResult] = useState<string | null>(null)

  const routeGeoJSON = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: pickups.map((pickup) => [pickup.lng, pickup.lat]),
          },
        },
      ],
    }),
    [pickups],
  )

  const optimizeRoute = async () => {
    setOptimizing(true)
    setTimeout(() => {
      setOptimizationResult('✨ Route optimized! You\'ll save 12 minutes and 3.2km')
      setOptimizing(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-text">Tomorrow's Delivery Route</h1>
            <p className="text-stone-600">Saturday, November 9 • 4 pickup locations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Route
            </Button>
            <Button className="bg-brand-primary">
              <Navigation className="mr-2 h-4 w-4" /> Start Navigation
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="h-96">
                <Map
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                  initialViewState={{ longitude: -79.3832, latitude: 43.6532, zoom: 11.5 }}
                  mapStyle="mapbox://styles/mapbox/light-v11"
                  style={{ width: '100%', height: '100%' }}
                >
                  <Source id="route" type="geojson" data={routeGeoJSON}>
                    <Layer
                      id="route-line"
                      type="line"
                      paint={{ 'line-color': '#059669', 'line-width': 4, 'line-opacity': 0.8 }}
                    />
                  </Source>
                  {pickups.map((pickup, index) => (
                    <Marker key={pickup.id} latitude={pickup.lat} longitude={pickup.lng} anchor="bottom">
                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-primary bg-white text-brand-primary shadow-lg">
                          {index + 1}
                        </div>
                        {pickup.isOptimized && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-amber-500"
                          />
                        )}
                      </div>
                    </Marker>
                  ))}
                </Map>
              </div>
              <div className="border-t border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-100 p-4">
                <div className="grid grid-cols-3 text-center">
                  <div>
                    <p className="text-2xl font-bold text-brand-primary">23km</p>
                    <p className="text-sm text-emerald-700">Total Distance</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-brand-primary">45min</p>
                    <p className="text-sm text-emerald-700">Drive Time</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-brand-primary">$127</p>
                    <p className="text-sm text-emerald-700">Fuel Saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border-2 border-brand-primary bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-brand-text">Optimize Route</h3>
                <Sparkles className="h-5 w-5 text-amber-500" />
              </div>
              <p className="mb-4 text-sm text-stone-600">Reorder stops to save time and fuel</p>
              <Button onClick={optimizeRoute} className="w-full bg-brand-primary" disabled={optimizing}>
                {optimizing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Optimizing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" /> Optimize Route
                  </>
                )}
              </Button>
              {optimizationResult && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700"
                >
                  {optimizationResult}
                </motion.div>
              )}
            </div>
            <Reorder.Group axis="y" values={pickups} onReorder={setPickups} className="space-y-3">
              {pickups.map((pickup, index) => (
                <Reorder.Item key={pickup.id} value={pickup} className="list-none">
                  <SortablePickupCard pickup={pickup} index={index} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      </div>
    </div>
  )
}
