// Role selection component for landing page

import Link from 'next/link';

export default function RoleSwitcher() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          HarvestLink
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connecting local farms directly to stores for fresher produce and sustainable supply chains
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Farmer Card */}
        <Link href="/farmer" className="group">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-2 border-transparent group-hover:border-green-500">
            <div className="text-center">
              <div className="text-6xl mb-4">🚜</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                I'm a Farmer
              </h2>
              <p className="text-gray-600 mb-4">
                List your fresh produce and connect directly with local stores
              </p>
              <div className="inline-flex items-center text-green-600 font-medium group-hover:text-green-700">
                Create Listings
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Store Card */}
        <Link href="/store" className="group">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border-2 border-transparent group-hover:border-blue-500">
            <div className="text-center">
              <div className="text-6xl mb-4">🏪</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                I'm a Store
              </h2>
              <p className="text-gray-600 mb-4">
                Post your produce needs and get matched with the best local farms
              </p>
              <div className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                Find Matches
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Admin Link */}
      <div className="text-center mt-8">
        <Link href="/admin" className="text-gray-500 hover:text-gray-700 text-sm">
          Admin Panel
        </Link>
      </div>
    </div>
  );
}
