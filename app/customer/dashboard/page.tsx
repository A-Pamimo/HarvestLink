'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCustomerAuth } from '@/components/CustomerAuthProvider'
import { NeedForm } from '@/components/NeedForm'
import { MatchCard } from '@/components/MatchCard'
import { CustomerMessages } from '@/components/CustomerMessages'
import { Need } from '@/lib/types'

export default function CustomerDashboard() {
  const { customer, isAuthenticated, isLoading, logout } = useCustomerAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'requests' | 'orders' | 'messages'>('requests')
  const [pendingNeeds, setPendingNeeds] = useState<Need[]>([])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/customer/auth')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !customer) {
    return null // Will redirect in useEffect
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleNeedCreated = (need: Need) => {
    setPendingNeeds(prev => [...prev, need])
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
              <span className="ml-4 text-lg font-medium text-gray-700">Customer Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/customer/profile"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome, {customer.name}</span>
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
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center">
              <span className="text-4xl mr-4">🏪</span>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">
                  Welcome back, {customer.name}!
                </h1>
                <p className="text-blue-700">
                  Managing {customer.businessName} • {customer.businessType} • Member since {new Date(customer.joinedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Produce Requests
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Orders
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'messages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Messages
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'requests' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <NeedForm storeId={customer.id} onNeedCreated={handleNeedCreated} />
            </div>
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
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Orders Coming Soon</h3>
            <p className="text-gray-600">
              Order management features will be available here to track your deliveries and farmer orders.
            </p>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <CustomerMessages />
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">🛒</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Requests</p>
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
                <span className="text-2xl">🚚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Deliveries</p>
                <p className="text-2xl font-semibold text-gray-900">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Benefits */}
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
      </div>
    </div>
  )
}
