'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Minus, Plus, MapPin } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  unit: string
  quantity: number
}

interface FarmerGroup {
  farmerId: string
  farmerName: string
  farmerImage: string
  items: CartItem[]
}

const initialGroups: FarmerGroup[] = [
  {
    farmerId: 'sarah',
    farmerName: "Sarah's Heritage Farm",
    farmerImage: 'https://images.unsplash.com/photo-farmer-portrait',
    items: [
      {
        id: 'tomatoes',
        name: 'Heirloom Tomatoes',
        image: 'https://images.unsplash.com/photo-fresh-vegetables',
        price: 6.5,
        unit: 'lb',
        quantity: 2,
      },
      {
        id: 'basil',
        name: 'Genovese Basil',
        image: 'https://images.unsplash.com/photo-fresh-vegetables',
        price: 4,
        unit: 'bunch',
        quantity: 1,
      },
    ],
  },
  {
    farmerId: 'oakridge',
    farmerName: 'Oakridge Organics',
    farmerImage: 'https://images.unsplash.com/photo-farm-field',
    items: [
      {
        id: 'kale',
        name: 'Baby Kale',
        image: 'https://images.unsplash.com/photo-fresh-vegetables',
        price: 5.75,
        unit: 'bag',
        quantity: 1,
      },
    ],
  },
]

export default function CartPage() {
  const [groups, setGroups] = useState(initialGroups)

  const updateQuantity = (farmerId: string, itemId: string, delta: number) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.farmerId === farmerId
          ? {
              ...group,
              items: group.items
                .map((item) =>
                  item.id === itemId
                    ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                    : item,
                )
                .filter((item) => item.quantity > 0),
            }
          : group,
      ),
    )
  }

  const subtotal = groups
    .flatMap((group) => group.items)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  const platformFee = subtotal * 0.05
  const total = subtotal + platformFee

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-brand-text">Your Basket</h1>

        <div className="mb-8 space-y-6">
          {groups.map((group) => (
            <div key={group.farmerId} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4 border-b border-stone-200 pb-4">
                <img src={group.farmerImage} alt={group.farmerName} className="h-12 w-12 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-text">{group.farmerName}</h3>
                  <p className="text-sm text-stone-600">
                    {group.items.length} items • ${group.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                  </p>
                </div>
                <Button size="sm" variant="ghost">
                  View Farm
                </Button>
              </div>
              <div className="divide-y divide-stone-100">
                {group.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-medium text-brand-text">{item.name}</h4>
                      <p className="text-sm text-stone-600">${item.price} / {item.unit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 hover:bg-stone-200"
                        onClick={() => updateQuantity(group.farmerId, item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 hover:bg-stone-200"
                        onClick={() => updateQuantity(group.farmerId, item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-brand-text">${(item.price * item.quantity).toFixed(2)}</p>
                      <button className="text-sm text-red-600 hover:underline" onClick={() => updateQuantity(group.farmerId, item.id, -item.quantity)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-brand-text">Order Summary</h3>
          <div className="space-y-2 text-sm text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-brand-text">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span className="font-medium text-brand-text">${platformFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-stone-200 pt-3 text-base">
              <div className="flex justify-between font-semibold text-brand-text">
                <span>Total</span>
                <span className="text-emerald-600">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Button className="mt-6 w-full bg-brand-primary" size="lg">
            <MapPin className="mr-2 h-4 w-4" /> Choose Pickup Location
          </Button>
        </div>
      </div>
    </div>
  )
}
