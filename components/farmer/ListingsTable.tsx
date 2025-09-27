'use client';

// Table component for displaying farmer's listings

import { useQuery } from '@tanstack/react-query';
import type { ApiResponse, Listing } from '@/lib/types';
import FreshnessBadge from '@/components/ui/FreshnessBadge';

interface ListingsTableProps {
  farmId: string;
}

async function fetchListings(farmId: string): Promise<Listing[]> {
  const response = await fetch(`/api/listings?farmId=${farmId}`);
  const data: ApiResponse<Listing[]> = await response.json();
  
  if (!data.ok || !data.data) {
    throw new Error(data.error || 'Failed to fetch listings');
  }
  
  return data.data;
}

export default function ListingsTable({ farmId }: ListingsTableProps) {
  const { data: listings, isLoading, error } = useQuery({
    queryKey: ['listings', farmId],
    queryFn: () => fetchListings(farmId),
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Listings</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Listings</h2>
        <div className="text-red-600">
          Failed to load listings: {error.message}
        </div>
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Listings</h2>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📦</div>
          <p>No listings yet. Create your first listing above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Your Listings ({listings.length})
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-700">Item</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Quantity</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Harvest</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Price</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Created</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{listing.item}</span>
                    <FreshnessBadge harvestTs={listing.harvestTs} />
                  </div>
                </td>
                <td className="py-3 px-2">
                  {listing.qtyKg} kg
                </td>
                <td className="py-3 px-2">
                  {new Date(listing.harvestTs).toLocaleDateString()}
                </td>
                <td className="py-3 px-2">
                  {listing.pricePerKg ? `$${listing.pricePerKg.toFixed(2)}/kg` : 'Not set'}
                </td>
                <td className="py-3 px-2 text-gray-500">
                  {new Date(listing.createdTs).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
