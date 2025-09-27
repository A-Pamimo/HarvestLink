'use client';

// Match card component for displaying and creating matches

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import type { ApiResponse, MatchResult, Need } from '@/lib/types';
import Toast, { useToast } from '@/components/ui/Toast';

interface MatchCardProps {
  need: Need;
}

async function findMatch(needId: string): Promise<MatchResult> {
  const response = await fetch('/api/match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ needId }),
  });
  
  const result: ApiResponse<MatchResult> = await response.json();
  
  if (!result.ok || !result.data) {
    throw new Error(result.error || 'Failed to find match');
  }
  
  return result.data;
}

export default function MatchCard({ need }: MatchCardProps) {
  const [match, setMatch] = useState<MatchResult | null>(null);
  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: findMatch,
    onSuccess: (data) => {
      setMatch(data);
      showToast('Match found!', 'success');
    },
    onError: (error) => {
      showToast(error.message, 'error');
    },
  });

  const handleFindMatch = () => {
    mutation.mutate(need.id);
  };

  const handleCreateOrder = () => {
    if (match) {
      router.push(`/orders/${match.order.id}`);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {need.item}
            </h3>
            <p className="text-gray-600">
              Need {need.qtyKg} kg by {new Date(need.needByTs).toLocaleDateString()}
            </p>
          </div>
          <span className="text-xs text-gray-500">
            Posted {new Date(need.createdTs).toLocaleDateString()}
          </span>
        </div>

        {!match ? (
          <button
            onClick={handleFindMatch}
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? 'Finding Match...' : 'Find Match'}
          </button>
        ) : (
          <div className="space-y-4">
            {/* Match Details */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Best Match Found!</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Farm:</span>
                  <span className="font-medium">{match.farm.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium">{match.order.distanceKm} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ETA:</span>
                  <span className="font-medium">{match.order.etaMin} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Match Score:</span>
                  <span className="font-medium">{match.matchScore.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleCreateOrder}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Create Order
              </button>
              <button
                onClick={() => setMatch(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Find Different Match
              </button>
            </div>
          </div>
        )}
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
