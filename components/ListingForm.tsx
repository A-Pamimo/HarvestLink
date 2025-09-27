'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Listing } from '@/lib/types'

interface ListingFormProps {
  farmId: string
}

async function createListing(data: {
  farmId: string
  item: string
  qtyKg: number
  harvestTs: string
}): Promise<Listing> {
  const response = await fetch('/api/listings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create listing')
  }

  return response.json()
}

export function ListingForm({ farmId }: ListingFormProps) {
  const [item, setItem] = useState('')
  const [qtyKg, setQtyKg] = useState('')
  const [harvestDate, setHarvestDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      // Reset form
      setItem('')
      setQtyKg('')
      setHarvestDate(new Date().toISOString().split('T')[0])
      
      // Invalidate listings query to refresh the table
      queryClient.invalidateQueries({ queryKey: ['listings', farmId] })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!item || !qtyKg || !harvestDate) {
      alert('Please fill in all fields')
      return
    }

    const harvestTs = new Date(harvestDate).toISOString()

    mutation.mutate({
      farmId,
      item,
      qtyKg: Number(qtyKg),
      harvestTs,
    })
  }

  const commonItems = [
    'Tomatoes', 'Carrots', 'Lettuce', 'Potatoes', 'Onions', 
    'Apples', 'Oranges', 'Bananas', 'Broccoli', 'Spinach'
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Listing</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-2">
            Produce Item
          </label>
          <input
            type="text"
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="e.g., Tomatoes"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            list="common-items"
          />
          <datalist id="common-items">
            {commonItems.map((commonItem) => (
              <option key={commonItem} value={commonItem} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="qtyKg" className="block text-sm font-medium text-gray-700 mb-2">
            Quantity (kg)
          </label>
          <input
            type="number"
            id="qtyKg"
            value={qtyKg}
            onChange={(e) => setQtyKg(e.target.value)}
            placeholder="50"
            min="1"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-2">
            Harvest Date
          </label>
          <input
            type="date"
            id="harvestDate"
            value={harvestDate}
            onChange={(e) => setHarvestDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-2 px-4 rounded-md font-semibold transition-colors"
        >
          {mutation.isPending ? 'Adding Listing...' : 'Add Listing'}
        </button>

        {mutation.error && (
          <div className="text-red-600 text-sm">
            Error: {mutation.error.message}
          </div>
        )}

        {mutation.isSuccess && (
          <div className="text-green-600 text-sm">
            Listing added successfully!
          </div>
        )}
      </form>
    </div>
  )
}
