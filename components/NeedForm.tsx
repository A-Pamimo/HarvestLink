'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Need } from '@/lib/types'

interface NeedFormProps {
  storeId: string // Keep as storeId for backward compatibility with API
  onNeedCreated: (need: Need) => void
}

async function createNeed(data: {
  storeId: string
  item: string
  qtyKg: number
  needByTs: string
}): Promise<Need> {
  const response = await fetch('/api/needs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create need')
  }

  return response.json()
}

export function NeedForm({ storeId, onNeedCreated }: NeedFormProps) {
  const [item, setItem] = useState('')
  const [qtyKg, setQtyKg] = useState('')
  const [needByDate, setNeedByDate] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Tomorrow
  )

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createNeed,
    onSuccess: (need) => {
      // Reset form
      setItem('')
      setQtyKg('')
      setNeedByDate(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      
      // Call callback to trigger matching
      onNeedCreated(need)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!item || !qtyKg || !needByDate) {
      alert('Please fill in all fields')
      return
    }

    const needByTs = new Date(needByDate).toISOString()

    mutation.mutate({
      storeId,
      item,
      qtyKg: Number(qtyKg),
      needByTs,
    })
  }

  const commonItems = [
    'Tomatoes', 'Carrots', 'Lettuce', 'Potatoes', 'Onions', 
    'Apples', 'Oranges', 'Bananas', 'Broccoli', 'Spinach'
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Produce</h2>
      
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            Quantity Needed (kg)
          </label>
          <input
            type="number"
            id="qtyKg"
            value={qtyKg}
            onChange={(e) => setQtyKg(e.target.value)}
            placeholder="25"
            min="1"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="needByDate" className="block text-sm font-medium text-gray-700 mb-2">
            Needed By Date
          </label>
          <input
            type="date"
            id="needByDate"
            value={needByDate}
            onChange={(e) => setNeedByDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md font-semibold transition-colors"
        >
          {mutation.isPending ? 'Finding Matches...' : 'Find Matches'}
        </button>

        {mutation.error && (
          <div className="text-red-600 text-sm">
            Error: {mutation.error.message}
          </div>
        )}
      </form>
    </div>
  )
}
