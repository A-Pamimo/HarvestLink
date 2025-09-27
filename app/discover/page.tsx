'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Star } from 'lucide-react'

const methods = ['Organic', 'No-Spray', 'Regenerative', 'Hydroponic', 'Permaculture']

const farmers = Array.from({ length: 12 }).map((_, i) => ({
  id: `farmer-${i}`,
  name: ['Sarah Chen', 'Oakridge Farm', 'North Loop Greens', 'Cedar Grove'][i % 4],
  image: 'https://images.unsplash.com/photo-farm-field',
  distance: (2.5 + i * 0.7).toFixed(1),
  rating: (4.6 + (i % 3) * 0.1).toFixed(1),
  reviews: 42 + i,
  tagline: 'Heritage tomatoes and seasonal vegetables grown with love.',
  methods: ['Organic', 'No-Spray', 'Heirloom', 'Regenerative'],
}))

export default function DiscoverPage() {
  const [distance, setDistance] = useState(15)

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="border-b border-stone-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="mb-2 text-3xl font-playfair font-bold text-brand-text">Discover Local Farmers</h1>
          <p className="text-stone-600">Found 12 farmers within 15km of your location</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full flex-shrink-0 lg:w-64">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-brand-text">Filters</h3>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Distance: {distance}km
                </label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={distance}
                  onChange={(event) => setDistance(Number(event.target.value))}
                  className="w-full accent-brand-primary"
                />
              </div>
              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-stone-700">Growing Methods</label>
                <div className="space-y-2">
                  {methods.map((method) => (
                    <label key={method} className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded text-brand-primary" />
                      <span className="text-sm text-stone-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Button className="w-full">Apply Filters</Button>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {farmers.map((farmer, index) => (
                <motion.div
                  key={farmer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -4 }}
                  className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative h-48">
                    <img src={farmer.image} alt={farmer.name} className="h-full w-full object-cover" />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium">
                        {farmer.distance} km away
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-1 text-lg font-bold text-brand-text">{farmer.name}</h3>
                    <p className="mb-3 line-clamp-2 text-sm text-stone-600">{farmer.tagline}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {farmer.methods.slice(0, 3).map((method) => (
                        <span key={method} className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                          {method}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400" />
                        <span className="text-sm font-medium">{farmer.rating}</span>
                        <span className="text-sm text-stone-500">({farmer.reviews})</span>
                      </div>
                      <Button size="sm" variant="ghost" className="px-3">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
