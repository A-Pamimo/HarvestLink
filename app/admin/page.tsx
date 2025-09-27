'use client'

import { useState } from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { MetricsPanel } from '@/components/MetricsPanel'

async function resetDatabase() {
  const response = await fetch('/api/seed', {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Failed to reset database')
  }
  return response.json()
}

async function fetchAllData() {
  const [listings, needs, orders] = await Promise.all([
    fetch('/api/listings').then(r => r.json()),
    fetch('/api/needs').then(r => r.json()),
    fetch('/api/orders').then(r => r.json()).catch(() => [])
  ])
  return { listings, needs, orders }
}

export default function AdminPage() {
  const [showConfirm, setShowConfirm] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-data'],
    queryFn: fetchAllData,
  })

  const resetMutation = useMutation({
    mutationFn: resetDatabase,
    onSuccess: () => {
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries()
      setShowConfirm(false)
    },
  })

  const handleReset = () => {
    if (showConfirm) {
      resetMutation.mutate()
    } else {
      setShowConfirm(true)
      // Auto-hide confirm after 5 seconds
      setTimeout(() => setShowConfirm(false), 5000)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">⚙️</span>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <p className="text-gray-600">
          Monitor system metrics and manage the database for HarvestLink.
        </p>
      </div>

      {/* Metrics Panel */}
      <div className="mb-8">
        <MetricsPanel />
      </div>

      {/* Database Management */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Database Management</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <span className="text-yellow-600 text-xl mr-2">⚠️</span>
            <h3 className="font-semibold text-yellow-800">Reset Database</h3>
          </div>
          <p className="text-yellow-700 text-sm mb-4">
            This will clear all existing data and restore sample farms, stores, and listings. 
            All orders and needs will be removed.
          </p>
          
          <button
            onClick={handleReset}
            disabled={resetMutation.isPending}
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              showConfirm
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            } disabled:opacity-50`}
          >
            {resetMutation.isPending ? (
              'Resetting...'
            ) : showConfirm ? (
              'Confirm Reset Database'
            ) : (
              'Reset Database'
            )}
          </button>
          
          {showConfirm && (
            <p className="text-red-600 text-xs mt-2">
              Click again to confirm. This action cannot be undone.
            </p>
          )}
        </div>

        {resetMutation.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="text-red-800">
              Error resetting database: {resetMutation.error.message}
            </div>
          </div>
        )}

        {resetMutation.isSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="text-green-800">
              ✅ Database reset successfully! Sample data has been restored.
            </div>
          </div>
        )}
      </div>

      {/* Data Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Data Overview</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Active Listings</h3>
                <span className="text-2xl">📝</span>
              </div>
              <div className="text-2xl font-bold text-primary-600">
                {data?.listings?.length || 0}
              </div>
              <div className="text-sm text-gray-600">
                Available produce listings
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Pending Needs</h3>
                <span className="text-2xl">🔍</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {data?.needs?.length || 0}
              </div>
              <div className="text-sm text-gray-600">
                Store requests awaiting matches
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Total Orders</h3>
                <span className="text-2xl">📦</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {data?.orders?.length || 0}
              </div>
              <div className="text-sm text-gray-600">
                All-time order count
              </div>
            </div>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-green-600 text-xl mr-2">✅</span>
          <div>
            <h3 className="font-semibold text-green-900">System Status: Online</h3>
            <p className="text-green-700 text-sm">
              All services are running normally. Database is responsive.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
