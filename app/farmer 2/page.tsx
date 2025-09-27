'use client';

// Farmer dashboard page

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import type { ApiResponse, Farm } from '@/lib/types';
import ListingForm from '@/components/farmer/ListingForm';
import ListingsTable from '@/components/farmer/ListingsTable';

async function fetchFarms(): Promise<Farm[]> {
  const response = await fetch('/api/seed', { method: 'POST' }); // Auto-seed for demo
  const data: ApiResponse<any> = await response.json();
  
  if (!data.ok) {
    throw new Error(data.error || 'Failed to initialize data');
  }
  
  return data.data.farms || [];
}

export default function FarmerPage() {
  const [selectedFarmId, setSelectedFarmId] = useState<string>('');

  const { data: farms, isLoading } = useQuery({
    queryKey: ['farms'],
    queryFn: fetchFarms,
    staleTime: 60000, // 1 minute
  });

  // Auto-select first farm when farms load
  useEffect(() => {
    if (farms && farms.length > 0 && !selectedFarmId) {
      setSelectedFarmId(farms[0].id);
    }
  }, [farms, selectedFarmId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!farms || farms.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Farms Available</h1>
          <p className="text-gray-600 mb-4">Please seed the database first.</p>
          <Link href="/admin" className="text-blue-600 hover:underline">
            Go to Admin Panel
          </Link>
        </div>
      </div>
    );
  }

  const selectedFarm = farms.find(f => f.id === selectedFarmId);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600">Manage your produce listings</p>
        </div>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Farm Selection */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <label htmlFor="farm-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Farm
        </label>
        <select
          id="farm-select"
          value={selectedFarmId}
          onChange={(e) => setSelectedFarmId(e.target.value)}
          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {farms.map(farm => (
            <option key={farm.id} value={farm.id}>
              {farm.name}
            </option>
          ))}
        </select>
        {selectedFarm && (
          <p className="text-sm text-gray-500 mt-1">
            Location: {selectedFarm.loc.lat.toFixed(4)}, {selectedFarm.loc.lon.toFixed(4)}
          </p>
        )}
      </div>

      {selectedFarmId && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Listing Form */}
          <div>
            <ListingForm farmId={selectedFarmId} />
          </div>

          {/* Listings Table */}
          <div>
            <ListingsTable farmId={selectedFarmId} />
          </div>
        </div>
      )}
    </div>
  );
}
