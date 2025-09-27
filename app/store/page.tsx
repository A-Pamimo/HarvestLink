'use client'

import { useState } from 'react'
import { NeedForm } from '@/components/NeedForm'
import { MatchCard } from '@/components/MatchCard'
import { Need } from '@/lib/types'

// Sample stores - in a real app, this would come from authentication
const sampleStores = [
  { id: 'store1', name: 'Fresh Market' },
  { id: 'store2', name: 'Local Grocer' },
  { id: 'store3', name: 'Organic Plus' },
]

export default function StorePage() {
  const [selectedStoreId, setSelectedStoreId] = useState(sampleStores[0].id)
  const [pendingNeeds, setPendingNeeds] = useState<Need[]>([])
  
  const handleNeedCreated = (need: Need) => {
    setPendingNeeds(prev => [...prev, need])
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🏪</span>
          <h1 className="text-3xl font-bold text-gray-900">Store Dashboard</h1>
        </div>
        <p className="text-gray-600">
          Request fresh produce from local farmers and get matched with the best available options.
        </p>
      </div>

      {/* Store Selector */}
      <div className="mb-8">
        <label htmlFor="store-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Store
        </label>
        <select
          id="store-select"
          value={selectedStoreId}
          onChange={(e) => setSelectedStoreId(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {sampleStores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Need Form */}
        <div>
          <NeedForm storeId={selectedStoreId} onNeedCreated={handleNeedCreated} />
        </div>

        {/* Pending Matches */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Requests</h2>
          
          {pendingNeeds.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-500">No pending requests. Submit a request to find matches!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingNeeds.map((need) => (
                <MatchCard 
                  key={need.id} 
                  need={need}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">🎯 Smart Matching</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
          <div>
            <h3 className="font-medium mb-2">Distance Priority</h3>
            <p>We prioritize the closest farms to minimize delivery time and costs.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Freshness First</h3>
            <p>Recently harvested produce gets priority to ensure maximum freshness.</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Perfect Quantities</h3>
            <p>Our algorithm finds farms with sufficient quantities to meet your needs.</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-blue-600">&lt; 30min</div>
          <div className="text-sm text-gray-600">Avg Match Time</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-green-600">98%</div>
          <div className="text-sm text-gray-600">Match Success</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-orange-600">5km</div>
          <div className="text-sm text-gray-600">Avg Distance</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl font-bold text-purple-600">2hrs</div>
          <div className="text-sm text-gray-600">Avg Delivery</div>
        </div>
      </div>
    </div>
  )
}