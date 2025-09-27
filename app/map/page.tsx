'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import { useMemo, useState } from 'react'
import Map, { Layer, Marker, Source } from 'react-map-gl'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Leaf, MapPin, Search, Star, X } from 'lucide-react'

const userLocation = { lat: 43.6532, lng: -79.3832 }

const farmers = [
  {
    id: 'sarah',
    name: 'Sarah\'s Heritage Farm',
    lat: 43.6632,
    lng: -79.3932,
    image: 'https://images.unsplash.com/photo-fresh-vegetables',
    distance: '2.3',
    rating: '4.9',
    products: ['Heirloom Tomatoes', 'Rainbow Carrots', 'Genovese Basil'],
    tagline: 'Heirloom tomatoes with names and stories.',
    badges: ['Organic', 'Regenerative'],
    isOrganic: true,
  },
  {
    id: 'oakridge',
    name: 'Oakridge Organics',
    lat: 43.6432,
    lng: -79.3732,
    image: 'https://images.unsplash.com/photo-farm-field',
    distance: '4.8',
    rating: '4.7',
    products: ['Baby Kale', 'Farm Eggs', 'Wildflower Honey'],
    tagline: 'Family-run farm focusing on fresh greens.',
    badges: ['No-Spray', 'Pickup Today'],
    isOrganic: true,
  },
  {
    id: 'cedar',
    name: 'Cedar Grove Collective',
    lat: 43.6632,
    lng: -79.3532,
    image: 'https://images.unsplash.com/photo-farm-field',
    distance: '6.2',
    rating: '4.8',
    products: ['Pasture Eggs', 'Sunchokes', 'Cider'],
    tagline: 'Community of growers sharing regenerative practices.',
    badges: ['Community', 'CSA'],
    isOrganic: false,
  },
]

const FilterChip = ({ active, children }: { active?: boolean; children: React.ReactNode }) => (
  <button
    className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${
      active
        ? 'bg-brand-primary text-white'
        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
    }`}
    type="button"
  >
    {children}
  </button>
)

const FarmerListItem = ({ farmer, compact }: { farmer: (typeof farmers)[number]; compact?: boolean }) => (
  <div className={`flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3 ${compact ? '' : 'shadow-sm'}`}>
    <img src={farmer.image} alt={farmer.name} className="h-14 w-14 rounded-lg object-cover" />
    <div className="flex-1">
      <p className="font-semibold text-brand-text">{farmer.name}</p>
      <p className="text-xs text-stone-500">{farmer.products.slice(0, 2).join(', ')}</p>
    </div>
    <span className="text-xs text-stone-500">{farmer.distance} km</span>
  </div>
)

export default function MapPage() {
  const [selectedFarmer, setSelectedFarmer] = useState<(typeof farmers)[number] | null>(null)
  const [searchRadius, setSearchRadius] = useState(8)
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleFarmers = useMemo(() => farmers, [])

  const circleGeoJSON = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [userLocation.lng, userLocation.lat],
          },
        },
      ],
    }),
    [],
  )

  return (
    <div className="relative h-screen">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ longitude: userLocation.lng, latitude: userLocation.lat, zoom: 12 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <Marker latitude={userLocation.lat} longitude={userLocation.lng} anchor="center">
          <div className="relative">
            <div className="absolute inset-0 h-6 w-6 rounded-full bg-blue-400 opacity-75 animate-ping" />
            <div className="relative h-4 w-4 rounded-full border-2 border-white bg-blue-600 shadow-lg" />
          </div>
        </Marker>

        {farmers.map((farmer) => (
          <Marker key={farmer.id} latitude={farmer.lat} longitude={farmer.lng} anchor="bottom">
            <motion.div
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedFarmer(farmer)}
              className="cursor-pointer"
            >
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-brand-primary shadow-lg">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                {farmer.isOrganic && (
                  <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full border border-white bg-amber-500" />
                )}
              </div>
            </motion.div>
          </Marker>
        ))}

        <Source id="search-radius" type="geojson" data={circleGeoJSON}>
          <Layer
            id="search-radius-layer"
            type="circle"
            paint={{
              'circle-radius': searchRadius * 50,
              'circle-color': '#059669',
              'circle-opacity': 0.1,
              'circle-stroke-color': '#059669',
              'circle-stroke-width': 2,
              'circle-stroke-opacity': 0.3,
            }}
          />
        </Source>
      </Map>

      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-full lg:w-96">
        <div className="pointer-events-auto h-full p-4 lg:pl-6">
          <div className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white/95 backdrop-blur-md shadow-2xl lg:border-none">
            <div className="border-b border-stone-200 p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-5 w-5 text-stone-400" />
                <input
                  placeholder="Search by location..."
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-10 py-3 text-sm text-brand-text focus:border-brand-primary focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <FilterChip active>All Farmers</FilterChip>
                <FilterChip>Organic</FilterChip>
                <FilterChip>Pick Today</FilterChip>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-xs font-semibold text-stone-500">
                  Search radius: {searchRadius}km
                </label>
                <input
                  type="range"
                  min={2}
                  max={20}
                  value={searchRadius}
                  onChange={(event) => setSearchRadius(Number(event.target.value))}
                  className="w-full accent-brand-primary"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {visibleFarmers.map((farmer) => (
                  <motion.div
                    key={farmer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedFarmer(farmer)}
                    className="cursor-pointer rounded-xl border border-stone-200 bg-white p-4 transition-all hover:border-brand-primary"
                  >
                    <div className="flex gap-3">
                      <img src={farmer.image} alt={farmer.name} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-text">{farmer.name}</h3>
                        <p className="mb-1 text-sm text-stone-600">{farmer.products.join(', ')}</p>
                        <div className="flex items-center gap-3 text-xs text-stone-500">
                          <span className="flex items-center gap-1 text-brand-primary">
                            <MapPin className="h-3 w-3" /> {farmer.distance} km
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-400" /> {farmer.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="border-t border-stone-200 bg-stone-50/70 p-4 text-center text-sm text-stone-600">
              Found <span className="font-semibold">{farmers.length} farmers</span> within{' '}
              <span className="font-semibold">{searchRadius}km</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedFarmer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-auto absolute bottom-8 left-1/2 w-96 -translate-x-1/2"
          >
            <div className="relative rounded-2xl bg-white p-6 shadow-2xl">
              <button
                onClick={() => setSelectedFarmer(null)}
                className="absolute right-4 top-4 rounded-lg p-1 text-stone-500 transition-colors hover:bg-stone-100"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-4 flex gap-4">
                <img src={selectedFarmer.image} alt={selectedFarmer.name} className="h-20 w-20 rounded-xl object-cover" />
                <div>
                  <h3 className="text-lg font-bold text-brand-text">{selectedFarmer.name}</h3>
                  <p className="text-sm text-stone-600">{selectedFarmer.tagline}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedFarmer.badges.map((badge) => (
                      <span key={badge} className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-3">
                {selectedFarmer.products.slice(0, 3).map((product) => (
                  <div key={product} className="rounded-lg bg-stone-50 p-2 text-center">
                    <p className="text-xs text-stone-600">{product}</p>
                    <p className="text-sm font-semibold text-brand-primary">$8</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
                <Button className="flex-1 bg-brand-primary">See Pickups</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 lg:hidden">
        <motion.div
          initial={{ y: '80%' }}
          animate={{ y: isExpanded ? 0 : '80%' }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 300 }}
          onDragEnd={(_, info) => {
            if (info.point.y < 200) {
              setIsExpanded(true)
            } else {
              setIsExpanded(false)
            }
          }}
          className="h-96 rounded-t-3xl bg-white p-4 shadow-2xl"
        >
          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-stone-300" />
          <h3 className="mb-3 text-lg font-bold text-brand-text">Nearby Farmers</h3>
          <div className="space-y-2">
            {farmers.slice(0, 3).map((farmer) => (
              <FarmerListItem key={farmer.id} farmer={farmer} compact />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
