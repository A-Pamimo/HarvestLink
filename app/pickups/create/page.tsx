'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import { useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Calendar,
  Check,
  GraduationCap,
  MapPin,
  Sparkles,
  Store,
  Users,
} from 'lucide-react'

interface SuggestedLocation {
  id: string
  name: string
  address: string
  coords: { lat: number; lng: number }
  avgCustomers: number
  type: 'market' | 'community' | 'school'
}

const suggestedLocations: SuggestedLocation[] = [
  {
    id: 'market',
    name: 'Harborfront Market',
    address: '12 Water Street, Toronto',
    coords: { lat: 43.6426, lng: -79.3871 },
    avgCustomers: 18,
    type: 'market',
  },
  {
    id: 'community',
    name: 'Riverside Community Center',
    address: '123 Riverside Ave',
    coords: { lat: 43.652, lng: -79.362 },
    avgCustomers: 22,
    type: 'community',
  },
  {
    id: 'school',
    name: 'Greenview Schoolyard',
    address: '88 Oak Street',
    coords: { lat: 43.662, lng: -79.372 },
    avgCustomers: 15,
    type: 'school',
  },
  {
    id: 'coop',
    name: 'North Loop Co-op',
    address: '5 Queen Street',
    coords: { lat: 43.668, lng: -79.382 },
    avgCustomers: 12,
    type: 'community',
  },
]

const timeSlots = ['8:00 AM', '9:30 AM', '11:00 AM', '12:30 PM', '2:00 PM', '3:30 PM']

const dates = Array.from({ length: 7 }).map((_, index) => {
  const date = new Date()
  date.setDate(date.getDate() + index)
  return {
    key: date.toISOString(),
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.getDate(),
  }
})

export default function CreatePickupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState<SuggestedLocation | null>(suggestedLocations[0])
  const [selectedDate, setSelectedDate] = useState(dates[2])
  const [selectedTime, setSelectedTime] = useState(timeSlots[2])
  const [saving, setSaving] = useState(false)

  const iconForType = (type: SuggestedLocation['type']) => {
    switch (type) {
      case 'market':
        return Store
      case 'community':
        return Building
      case 'school':
      default:
        return GraduationCap
    }
  }

  const handleNext = () => {
    if (currentStep === 2) {
      setSaving(true)
      setTimeout(() => setSaving(false), 1200)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-8 flex items-center gap-3 text-2xl font-bold text-brand-text">
          <Calendar className="h-6 w-6 text-brand-primary" /> Schedule Community Pickup
        </h1>

        <div className="mb-8 flex items-center justify-between gap-4">
          {['Location', 'Time', 'Details'].map((step, index) => {
            const Icon = index < currentStep ? Check : null
            return (
              <div key={step} className="flex flex-1 items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                    currentStep > index
                      ? 'bg-brand-primary text-white'
                      : currentStep === index
                      ? 'bg-emerald-100 text-brand-primary ring-2 ring-brand-primary'
                      : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  {currentStep > index ? <Check className="h-5 w-5" /> : index + 1}
                </div>
                {index < 2 && (
                  <div
                    className={`mx-2 h-1 flex-1 rounded ${
                      currentStep > index ? 'bg-brand-primary' : 'bg-stone-200'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        {currentStep === 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="mb-4 text-lg font-semibold text-brand-text">Choose Pickup Location</h2>
            <p className="mb-4 text-sm text-stone-600">Suggested Locations</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {suggestedLocations.map((location) => {
                const Icon = iconForType(location.type)
                const isSelected = selectedLocation?.id === location.id
                return (
                  <motion.button
                    key={location.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedLocation(location)}
                    className={`text-left transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    } rounded-xl border-2 p-4`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
                        <Icon className="h-5 w-5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-brand-text">{location.name}</p>
                        <p className="text-xs text-stone-600">{location.address}</p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-brand-primary">
                          <Users className="h-3 w-3" /> {location.avgCustomers} avg customers
                        </div>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
            <div className="relative mt-6">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-stone-400" />
              <input
                className="w-full rounded-lg border border-stone-300 px-4 py-3 pl-10 focus:border-brand-primary focus:outline-none"
                placeholder="Or enter a custom address..."
              />
            </div>
            {selectedLocation && (
              <div className="mt-6 h-48 overflow-hidden rounded-xl">
                <Map
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                  initialViewState={{ latitude: selectedLocation.coords.lat, longitude: selectedLocation.coords.lng, zoom: 13 }}
                  mapStyle="mapbox://styles/mapbox/light-v11"
                  style={{ width: '100%', height: '100%' }}
                >
                  <Marker latitude={selectedLocation.coords.lat} longitude={selectedLocation.coords.lng} anchor="bottom">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-white">
                      <MapPin className="h-4 w-4" />
                    </div>
                  </Marker>
                </Map>
              </div>
            )}
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="mb-4 text-lg font-semibold text-brand-text">Select Date & Time</h2>
            <div className="mb-6 grid grid-cols-7 gap-2">
              {dates.map((dateObj) => {
                const isSelected = dateObj.key === selectedDate.key
                return (
                  <button
                    key={dateObj.key}
                    onClick={() => setSelectedDate(dateObj)}
                    className={`flex aspect-square flex-col items-center justify-center rounded-lg transition-all ${
                      isSelected ? 'bg-brand-primary text-white' : 'hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-xs">{dateObj.day}</span>
                    <span className="text-lg font-bold">{dateObj.date}</span>
                  </button>
                )
              })}
            </div>
            <p className="mb-3 text-sm text-stone-600">Available Time Slots</p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`rounded-lg border-2 px-4 py-2 font-medium transition-colors ${
                    selectedTime === slot
                      ? 'border-emerald-500 bg-emerald-50 text-brand-primary'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-stone-50 p-4">
              <label className="flex items-center gap-3 text-sm font-medium text-brand-text">
                <input type="checkbox" className="h-4 w-4 text-brand-primary" /> Repeat weekly on {selectedDate.day}s
              </label>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="mb-4 text-lg font-semibold text-brand-text">Pickup Details</h2>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-stone-700">Notes for customers</label>
              <textarea
                className="w-full rounded-xl border border-stone-300 p-4 focus:border-brand-primary focus:outline-none"
                placeholder="Share parking tips, bring-your-own-bag reminders, or collaboration notes."
                rows={4}
              />
              <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
                <Sparkles className="mb-2 h-5 w-5" />
                <p>
                  Boost turnout by sharing behind-the-scenes prep photos with your customers a day before pickup.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button className="bg-brand-primary" onClick={handleNext} isLoading={saving}>
            {currentStep === 2 ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Create Pickup
              </>
            ) : (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
