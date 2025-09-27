'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Need, MatchResult } from '@/lib/types'
import { useRouter } from 'next/navigation'

interface MatchCardProps {
  need: Need
}

async function findMatch(needId: string): Promise<MatchResult> {
  const response = await fetch('/api/match', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ needId }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to find match')
  }

  return response.json()
}

export function MatchCard({ need }: MatchCardProps) {
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: () => findMatch(need.id),
    onSuccess: (result) => {
      setMatchResult(result)
    },
  })

  const handleFindMatch = () => {
    mutation.mutate()
  }

  const handleViewOrder = () => {
    if (matchResult) {
      router.push(`/orders/${matchResult.order.id}`)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{need.item}</h3>
          <p className="text-gray-600">{need.qtyKg} kg needed by {formatDate(need.needByTs)}</p>
        </div>
        <div className="text-sm text-gray-500">
          Requested: {formatDate(need.createdTs)}
        </div>
      </div>

      {!matchResult && !mutation.isPending && (
        <button
          onClick={handleFindMatch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition-colors"
        >
          Find Match
        </button>
      )}

      {mutation.isPending && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Finding best match...</span>
        </div>
      )}

      {mutation.error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800 font-medium mb-2">No Match Found</div>
          <div className="text-red-600 text-sm">
            {mutation.error.message}
          </div>
          <button
            onClick={handleFindMatch}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {matchResult && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex items-center mb-3">
            <span className="text-green-600 text-2xl mr-2">✅</span>
            <div>
              <div className="text-green-800 font-medium">Match Found!</div>
              <div className="text-green-600 text-sm">
                Order #{matchResult.order.id.slice(-8)} created
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <div className="font-medium text-gray-700">Farm</div>
              <div className="text-gray-600">{matchResult.farm.name}</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Distance</div>
              <div className="text-gray-600">{matchResult.order.distanceKm} km</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">ETA</div>
              <div className="text-gray-600">{matchResult.order.etaMin} min</div>
            </div>
            <div>
              <div className="font-medium text-gray-700">Match Score</div>
              <div className="text-gray-600">{Math.round(matchResult.matchScore)}/100</div>
            </div>
          </div>

          <button
            onClick={handleViewOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold transition-colors"
          >
            View Order Details
          </button>
        </div>
      )}
    </div>
  )
}
