'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useFarmerAuth } from '@/components/FarmerAuthProvider'
import { ListingForm } from '@/components/ListingForm'
import { ListingsTable } from '@/components/ListingsTable'
import { FarmerMessages } from '@/components/FarmerMessages'

export default function FarmerDashboard() {
  const { farmer, isAuthenticated, isLoading, logout } = useFarmerAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'listings' | 'orders' | 'messages'>('listings')

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/farmer/auth')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !farmer) {
    return null // Will redirect in useEffect
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                🌱 HarvestLink
              </Link>
              <span className="ml-4 text-gray-400">|</span>
              <span className="ml-4 text-lg font-medium text-gray-700">Farmer Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/farmer/profile"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome, {farmer.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-primary-50 rounded-lg p-6">
            <div className="flex items-center">
              <span className="text-4xl mr-4">🚜</span>
              <div>
                <h1 className="text-2xl font-bold text-primary-900">
                  Welcome back, {farmer.name}!
                </h1>
                <p className="text-primary-700">
                  Managing {farmer.farmName} • Member since {new Date(farmer.joinedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'listings'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'messages'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Messages
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'listings' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <ListingForm farmId={farmer.id} />
            </div>
            <div>
              <ListingsTable farmId={farmer.id} />
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Orders Coming Soon</h3>
            <p className="text-gray-600">
              Order management features will be available here to track your deliveries and customer orders.
            </p>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <FarmerMessages />
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Listings</p>
                <p className="text-2xl font-semibold text-gray-900">-</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🤝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">-</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
