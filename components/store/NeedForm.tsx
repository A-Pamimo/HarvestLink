'use client';

// Form for creating store needs

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiResponse, Need } from '@/lib/types';
import Toast, { useToast } from '@/components/ui/Toast';

interface NeedFormProps {
  storeId: string;
}

interface NeedFormData {
  item: string;
  qtyKg: number;
  needByTs: string;
}

async function createNeed(data: NeedFormData & { storeId: string }): Promise<Need> {
  const response = await fetch('/api/needs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const result: ApiResponse<Need> = await response.json();
  
  if (!result.ok || !result.data) {
    throw new Error(result.error || 'Failed to create need');
  }
  
  return result.data;
}

export default function NeedForm({ storeId }: NeedFormProps) {
  const [formData, setFormData] = useState<NeedFormData>({
    item: '',
    qtyKg: 0,
    needByTs: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
  });

  const { toast, showToast, hideToast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNeed,
    onSuccess: () => {
      showToast('Need created successfully!', 'success');
      setFormData({
        item: '',
        qtyKg: 0,
        needByTs: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      // Invalidate needs query
      queryClient.invalidateQueries({ queryKey: ['needs', storeId] });
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

    mutation.mutate({ ...formData, storeId });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'qtyKg' ? Number(value) || 0 : value,
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
          Post New Need
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select produce...</option>
              {commonProduce.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="qtyKg" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity Needed (kg) *
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. 15"
            />
          </div>

          <div>
            <label htmlFor="needByTs" className="block text-sm font-medium text-gray-700 mb-1">
              Needed By *
            </label>
            <input
              type="date"
              id="needByTs"
              name="needByTs"
              value={formData.needByTs}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? 'Creating...' : 'Post Need'}
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
