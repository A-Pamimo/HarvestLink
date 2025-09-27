'use client';

// Store dashboard page

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import type { ApiResponse, StoreEnt, Need } from '@/lib/types';
import NeedForm from '@/components/store/NeedForm';
import MatchCard from '@/components/store/MatchCard';

async function fetchStores(): Promise<StoreEnt[]> {
  const response = await fetch('/api/seed', { method: 'POST' }); // Auto-seed for demo
  const data: ApiResponse<any> = await response.json();
  
  if (!data.ok) {
    throw new Error(data.error || 'Failed to initialize data');
  }
  
  return data.data.stores || [];
}

async function fetchNeeds(storeId: string): Promise<Need[]> {
  // For demo purposes, we'll fetch all needs and filter client-side
  // In production, you'd want a dedicated API endpoint
  const response = await fetch('/api/needs', { method: 'GET' });
  if (!response.ok) {
    return []; // Return empty array if no API endpoint exists yet
  }
  
  const data: ApiResponse<Need[]> = await response.json();
  if (!data.ok || !data.data) {
    return [];
  }
  
  return data.data.filter(need => need.storeId === storeId);
}

export default function StorePage() {
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');

  const { data: stores, isLoading: storesLoading } = useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
    staleTime: 60000, // 1 minute
  });

  const { data: needs, isLoading: needsLoading } = useQuery({
    queryKey: ['needs', selectedStoreId],
    queryFn: () => selectedStoreId ? fetchNeeds(selectedStoreId) : Promise.resolve([]),
    enabled: !!selectedStoreId,
  });

  // Auto-select first store when stores load
  useEffect(() => {
    if (stores && stores.length > 0 && !selectedStoreId) {
      setSelectedStoreId(stores[0].id);
    }
  }, [stores, selectedStoreId]);

  if (storesLoading) {
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

  if (!stores || stores.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Stores Available</h1>
          <p className="text-gray-600 mb-4">Please seed the database first.</p>
          <Link href="/admin" className="text-blue-600 hover:underline">
            Go to Admin Panel
          </Link>
        </div>
      </div>
    );
  }

  const selectedStore = stores.find(s => s.id === selectedStoreId);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Store Dashboard</h1>
          <p className="text-gray-600">Post your needs and find matches</p>
        </div>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Store Selection */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <label htmlFor="store-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Store
        </label>
        <select
          id="store-select"
          value={selectedStoreId}
          onChange={(e) => setSelectedStoreId(e.target.value)}
          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {stores.map(store => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
        {selectedStore && (
          <p className="text-sm text-gray-500 mt-1">
            Location: {selectedStore.loc.lat.toFixed(4)}, {selectedStore.loc.lon.toFixed(4)}
          </p>
        )}
      </div>

      {selectedStoreId && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Need Form */}
          <div>
            <NeedForm storeId={selectedStoreId} />
          </div>

          {/* Needs & Matches */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Your Posted Needs</h2>
            
            {needsLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : needs && needs.length > 0 ? (
              needs.map(need => (
                <MatchCard key={need.id} need={need} />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl mb-2">📋</div>
                <p className="text-gray-500">No needs posted yet. Create your first need!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
