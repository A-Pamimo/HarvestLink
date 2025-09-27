'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Loader2, MapPin, Navigation } from 'lucide-react'

interface Suggestion {
  place_name: string
  context: string
}

export function LocationPermissionModal({
  open,
  onAllow,
  onDismiss,
}: {
  open: boolean
  onAllow: () => void
  onDismiss: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <MapPin className="h-8 w-8 text-brand-primary" />
            </div>
            <h2 className="mb-3 text-center text-2xl font-bold text-brand-text">Enable Location Services</h2>
            <p className="mb-8 text-center text-stone-600">
              We need your location to show farmers near you and calculate accurate delivery distances.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-brand-primary" onClick={onAllow}>
                <MapPin className="mr-2 h-4 w-4" /> Allow Location Access
              </Button>
              <Button variant="outline" className="w-full" onClick={onDismiss}>
                Enter Address Manually
              </Button>
            </div>
            <p className="mt-4 text-center text-xs text-stone-500">
              Your location is only used to show nearby farmers and is never shared.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AddressSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  const handleChange = async (value: string) => {
    setSearchQuery(value)
    if (!value) {
      setSuggestions([])
      return
    }
    setLoading(true)
    // Mock suggestions
    setTimeout(() => {
      setSuggestions([
        { place_name: '123 Market Street, Toronto', context: 'Toronto, Ontario • Canada' },
        { place_name: 'Riverside Community Center', context: 'Vancouver, BC • Pickup Site' },
      ])
      setLoading(false)
    }, 400)
  }

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-4 top-4 h-5 w-5 text-stone-400" />
        <input
          value={searchQuery}
          onChange={(event) => handleChange(event.target.value)}
          className="w-full rounded-xl border-2 border-stone-300 px-4 py-4 pl-12 text-lg focus:border-brand-primary focus:outline-none"
          placeholder="Enter your address or postal code..."
        />
        {loading && (
          <Loader2 className="absolute right-4 top-4 h-5 w-5 animate-spin text-brand-primary" />
        )}
      </div>
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.place_name}
                className="flex w-full items-center gap-3 border-b border-stone-100 px-4 py-3 text-left text-sm last:border-0 hover:bg-stone-50"
                onClick={() => {
                  setSearchQuery(suggestion.place_name)
                  setSuggestions([])
                }}
              >
                <MapPin className="h-4 w-4 text-stone-400" />
                <div>
                  <p className="font-medium text-brand-text">{suggestion.place_name}</p>
                  <p className="text-xs text-stone-500">{suggestion.context}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function DistanceBadge({ distance }: { distance: number }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
      <Navigation className="h-3 w-3" />
      {distance < 1 ? `${Math.round(distance * 1000)}m away` : `${distance.toFixed(1)}km away`}
    </div>
  )
}
