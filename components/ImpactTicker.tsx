'use client'

import { useQuery } from '@tanstack/react-query'
import { Metrics } from '@/lib/types'

async function fetchMetrics(): Promise<Metrics> {
  const response = await fetch('/api/metrics')
  if (!response.ok) {
    throw new Error('Failed to fetch metrics')
  }
  return response.json()
}

export function ImpactTicker() {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 5000, // Poll every 5 seconds
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="text-center text-red-600">
        Failed to load metrics
      </div>
    )
  }

  const impactCards = [
    {
      title: 'Orders Completed',
      value: metrics.totalOrders.toLocaleString(),
      icon: '📦',
      color: 'text-blue-600',
    },
    {
      title: 'Kg Fresh Produce',
      value: `${metrics.totalKgMoved.toLocaleString()} kg`,
      icon: '🥬',
      color: 'text-green-600',
    },
    {
      title: 'Km Saved',
      value: `${metrics.totalKmSaved.toFixed(1)} km`,
      icon: '🚛',
      color: 'text-orange-600',
    },
    {
      title: 'CO₂ Avoided',
      value: `${metrics.co2Avoided.toFixed(1)} kg`,
      icon: '🌱',
      color: 'text-emerald-600',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {impactCards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{card.icon}</span>
            <div className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </div>
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  )
}
