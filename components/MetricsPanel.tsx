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

export function MetricsPanel() {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 5000, // Poll every 5 seconds
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">System Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || !metrics) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">System Metrics</h2>
        <div className="text-red-600">Failed to load metrics</div>
      </div>
    )
  }

  const metricCards = [
    {
      title: 'Total Orders',
      value: metrics.totalOrders.toLocaleString(),
      icon: '📦',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Kg Moved',
      value: `${metrics.totalKgMoved.toLocaleString()} kg`,
      icon: '🥬',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Km Saved',
      value: `${metrics.totalKmSaved.toFixed(1)} km`,
      icon: '🚛',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'CO₂ Avoided',
      value: `${metrics.co2Avoided.toFixed(1)} kg`,
      icon: '🌱',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">System Metrics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metricCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-lg p-4`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{card.icon}</span>
              <div className={`text-xl font-bold ${card.color}`}>
                {card.value}
              </div>
            </div>
            <div className="text-sm text-gray-700 font-medium">
              {card.title}
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 text-center">
        Updates every 5 seconds • Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  )
}
