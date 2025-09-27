'use client'

import { useState } from 'react'
import { ListingForm } from '@/components/ListingForm'
import { ListingsTable } from '@/components/ListingsTable'

// Sample farms - in a real app, this would come from authentication
const sampleFarms = [
  { id: 'farm1', name: 'Green Valley Farm' },
  { id: 'farm2', name: 'Sunny Acres' },
  { id: 'farm3', name: 'Organic Hills' },
]

export default function FarmerPage() {
  const [selectedFarmId, setSelectedFarmId] = useState(sampleFarms[0].id)
  const selectedFarm = sampleFarms.find(f => f.id === selectedFarmId)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🚜</span>
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
        </div>
        <p className="text-gray-600">
          List your fresh produce and connect with local stores looking for quality ingredients.
        </p>
      </div>

      {/* Farm Selector */}
      <div className="mb-8">
        <label htmlFor="farm-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Farm
        </label>
        <select
          id="farm-select"
          value={selectedFarmId}
          onChange={(e) => setSelectedFarmId(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {sampleFarms.map((farm) => (
            <option key={farm.id} value={farm.id}>
              {farm.name}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Listing Form */}
        <div>
          <ListingForm farmId={selectedFarmId} />
        </div>

        {/* Listings Table */}
        <div>
          <ListingsTable farmId={selectedFarmId} />
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12 bg-primary-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-primary-900 mb-4">💡 Tips for Success</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-primary-800">
          <div>
            <h3 className="font-medium mb-2">Freshness Matters</h3>
            <p>List produce as soon as possible after harvest for the best matches.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Accurate Quantities</h3>
            <p>Be precise with quantities to help stores plan their orders effectively.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Popular Items</h3>
            <p>Tomatoes, lettuce, and seasonal fruits tend to match quickly with stores.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Regular Updates</h3>
            <p>Keep your listings current to maintain a good reputation with stores.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
