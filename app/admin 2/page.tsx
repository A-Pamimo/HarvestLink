'use client';

// Admin panel for seeding data and viewing metrics

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import type { ApiResponse, Metrics } from '@/lib/types';
import Toast, { useToast } from '@/components/ui/Toast';
import { formatMetrics } from '@/lib/metrics';

async function fetchMetrics(): Promise<Metrics> {
  const response = await fetch('/api/metrics');
  const data: ApiResponse<Metrics> = await response.json();
  
  if (!data.ok || !data.data) {
    throw new Error(data.error || 'Failed to fetch metrics');
  }
  
  return data.data;
}

async function seedDatabase(): Promise<any> {
  const response = await fetch('/api/seed', { method: 'POST' });
  const data: ApiResponse<any> = await response.json();
  
  if (!data.ok) {
    throw new Error(data.error || 'Failed to seed database');
  }
  
  return data.data;
}

export default function AdminPage() {
  const { toast, showToast, hideToast } = useToast();
  const queryClient = useQueryClient();

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const seedMutation = useMutation({
    mutationFn: seedDatabase,
    onSuccess: (data) => {
      showToast('Database seeded successfully!', 'success');
      // Invalidate all queries to refresh data
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      showToast(error.message, 'error');
    },
  });

  const handleSeed = () => {
    if (window.confirm('This will reset all data. Are you sure?')) {
      seedMutation.mutate();
    }
  };

  const formattedMetrics = metrics ? formatMetrics(metrics) : null;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">Manage data and view system metrics</p>
          </div>
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Database Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Database Management</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-900 mb-2">Seed Database</h3>
                <p className="text-yellow-800 text-sm mb-3">
                  This will reset all data and create sample farms, stores, listings, and needs for testing.
                </p>
                <button
                  onClick={handleSeed}
                  disabled={seedMutation.isPending}
                  className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {seedMutation.isPending ? 'Seeding...' : 'Reset & Seed Data'}
                </button>
              </div>

              {seedMutation.isSuccess && seedMutation.data && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-900 mb-2">Seed Results</h3>
                  <div className="text-green-800 text-sm space-y-1">
                    <p>✅ {seedMutation.data.farms?.length || 0} farms created</p>
                    <p>✅ {seedMutation.data.stores?.length || 0} stores created</p>
                    <p>✅ {seedMutation.data.listings?.length || 0} listings created</p>
                    <p>✅ {seedMutation.data.needs?.length || 0} needs created</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* System Metrics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">System Metrics</h2>
            
            {metricsLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : metrics && formattedMetrics ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formattedMetrics.orders}
                    </div>
                    <div className="text-sm text-green-800">Orders Completed</div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formattedMetrics.kgMoved}
                    </div>
                    <div className="text-sm text-blue-800">kg Produce Moved</div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {formattedMetrics.kmSaved}
                    </div>
                    <div className="text-sm text-purple-800">km Supply Chain Saved</div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {formattedMetrics.co2KgAvoided}
                    </div>
                    <div className="text-sm text-orange-800">kg CO₂ Avoided*</div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  *Estimates based on reduced transport distance
                </p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📊</div>
                <p>No metrics data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              href="/farmer"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <div className="text-3xl mr-3">🚜</div>
              <div>
                <div className="font-medium text-gray-900">Farmer Dashboard</div>
                <div className="text-sm text-gray-600">Create and manage listings</div>
              </div>
            </Link>
            
            <Link 
              href="/store"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="text-3xl mr-3">🏪</div>
              <div>
                <div className="font-medium text-gray-900">Store Dashboard</div>
                <div className="text-sm text-gray-600">Post needs and find matches</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </>
  );
}
