import Link from 'next/link'
import { ImpactTicker } from '@/components/ImpactTicker'

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Connect Local Farmers
          <br />
<<<<<<< HEAD
          <span className="text-primary-600">with Fresh Customers</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          HarvestLink bridges the gap between local farmers and customers, 
          reducing food miles and ensuring the freshest produce reaches your business.
=======
          <span className="text-primary-600">with Fresh Stores</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          HarvestLink bridges the gap between local farmers and stores, 
          reducing food miles and ensuring the freshest produce reaches your shelves.
>>>>>>> 345756831cd4f8276e0cecc2fecdf867e0a398b9
        </p>
        
        {/* Role Switcher */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/farmer"
            className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">🚜</span>
            I'm a Farmer
          </Link>
          <Link
<<<<<<< HEAD
            href="/customer"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">🏪</span>
            I'm a Customer
=======
            href="/store"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-2xl">🏪</span>
            I'm a Store
>>>>>>> 345756831cd4f8276e0cecc2fecdf867e0a398b9
          </Link>
        </div>
      </div>

      {/* Impact Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Real-Time Impact
        </h2>
        <ImpactTicker />
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">List & Request</h3>
            <p className="text-gray-600">
<<<<<<< HEAD
              Farmers list their fresh produce. Customers post their needs.
=======
              Farmers list their fresh produce. Stores post their needs.
>>>>>>> 345756831cd4f8276e0cecc2fecdf867e0a398b9
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
            <p className="text-gray-600">
              Our algorithm matches by distance, freshness, and quantity.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
<<<<<<< HEAD
              Quick, direct delivery from farm to customer with real-time tracking.
=======
              Quick, direct delivery from farm to store with real-time tracking.
>>>>>>> 345756831cd4f8276e0cecc2fecdf867e0a398b9
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Why Choose HarvestLink?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary-600">For Farmers</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Direct access to local stores
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Fair prices for fresh produce
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Reduced food waste
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Simplified logistics
              </li>
            </ul>
          </div>
          <div>
<<<<<<< HEAD
            <h3 className="text-xl font-semibold mb-4 text-blue-600">For Customers</h3>
=======
            <h3 className="text-xl font-semibold mb-4 text-blue-600">For Stores</h3>
>>>>>>> 345756831cd4f8276e0cecc2fecdf867e0a398b9
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Freshest local produce
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Competitive pricing
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Reliable supply chain
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Support local community
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
