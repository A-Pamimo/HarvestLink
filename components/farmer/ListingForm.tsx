'use client';

// Form for creating new produce listings

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiResponse, Listing } from '@/lib/types';
import Toast, { useToast } from '@/components/ui/Toast';

interface ListingFormProps {
  farmId: string;
}

interface ListingFormData {
  item: string;
  qtyKg: number;
  harvestTs: string;
  pricePerKg?: number;
}

async function createListing(data: ListingFormData & { farmId: string }): Promise<Listing> {
  const response = await fetch('/api/listings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const result: ApiResponse<Listing> = await response.json();
  
  if (!result.ok || !result.data) {
    throw new Error(result.error || 'Failed to create listing');
  }
  
  return result.data;
}

export default function ListingForm({ farmId }: ListingFormProps) {
  const [formData, setFormData] = useState<ListingFormData>({
    item: '',
    qtyKg: 0,
    harvestTs: new Date().toISOString().split('T')[0], // Today's date
    pricePerKg: undefined,
  });

  const { toast, showToast, hideToast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      showToast('Listing created successfully!', 'success');
      setFormData({
        item: '',
        qtyKg: 0,
        harvestTs: new Date().toISOString().split('T')[0],
        pricePerKg: undefined,
      });
      // Invalidate and refetch listings
      queryClient.invalidateQueries({ queryKey: ['listings', farmId] });
    },
    onError: (error) => {
      showToast(error.message, 'error');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.item.trim() || formData.qtyKg <= 0) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    mutation.mutate({ ...formData, farmId });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'qtyKg' || name === 'pricePerKg' ? Number(value) || 0 : value,
    }));
  };

  const commonProduce = [
    'Tomatoes', 'Carrots', 'Lettuce', 'Spinach', 'Potatoes', 
    'Onions', 'Peppers', 'Cucumbers', 'Broccoli', 'Apples',
    'Oranges', 'Strawberries', 'Corn', 'Squash', 'Zucchini'
  ];

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Create New Listing
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-1">
              Produce Item *
            </label>
            <select
              id="item"
              name="item"
              value={formData.item}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select produce...</option>
              {commonProduce.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="qtyKg" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity (kg) *
            </label>
            <input
              type="number"
              id="qtyKg"
              name="qtyKg"
              value={formData.qtyKg || ''}
              onChange={handleChange}
              min="1"
              step="0.1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g. 25"
            />
          </div>

          <div>
            <label htmlFor="harvestTs" className="block text-sm font-medium text-gray-700 mb-1">
              Harvest Date *
            </label>
            <input
              type="date"
              id="harvestTs"
              name="harvestTs"
              value={formData.harvestTs}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="pricePerKg" className="block text-sm font-medium text-gray-700 mb-1">
              Price per kg (optional)
            </label>
            <input
              type="number"
              id="pricePerKg"
              name="pricePerKg"
              value={formData.pricePerKg || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g. 4.50"
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? 'Creating...' : 'Create Listing'}
          </button>
        </form>
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
