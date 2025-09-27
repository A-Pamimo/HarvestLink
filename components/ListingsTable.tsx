'use client'

import { useQuery } from '@tanstack/react-query'
import { Listing } from '@/lib/types'

interface ListingsTableProps {
  farmId: string
}

async function fetchListings(farmId: string): Promise<Listing[]> {
  const response = await fetch(`/api/listings?farmId=${farmId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch listings')
  }
  return response.json()
}

export function ListingsTable({ farmId }: ListingsTableProps) {
  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['listings', farmId],
    queryFn: () => fetchListings(farmId),
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-red-600">Failed to load listings</div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getDaysOld = (harvestTs: string) => {
    const harvestDate = new Date(harvestTs)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - harvestDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getFreshnessColor = (daysOld: number) => {
    if (daysOld <= 1) return 'text-green-600 bg-green-50'
    if (daysOld <= 3) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Listings</h2>
      
      {!listings || listings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">📝</div>
          <p>No listings yet. Add your first listing above!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Item</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Harvest Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Freshness</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Listed</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => {
                const daysOld = getDaysOld(listing.harvestTs)
                const freshnessColor = getFreshnessColor(daysOld)
                
                return (
                  <tr key={listing.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{listing.item}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {listing.qtyKg} kg
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {formatDate(listing.harvestTs)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${freshnessColor}`}>
                        {daysOld === 0 ? 'Today' : `${daysOld} day${daysOld > 1 ? 's' : ''} old`}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm">
                      {formatDate(listing.createdTs)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
