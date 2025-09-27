'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Bell, Check, ChevronRight, MessageCircle, Printer, QrCode, Users } from 'lucide-react'
import { useState } from 'react'

const customers = Array.from({ length: 8 }).map((_, index) => ({
  id: `customer-${index}`,
  name: ['Emma', 'Owen', 'Maya', 'Lucas', 'Sophie', 'Noah', 'Ava', 'Ethan'][index],
  items: `${3 + index} items`,
  total: `$${(22 + index * 3).toFixed(2)}`,
  checked: index % 3 === 0,
}))

const upcomingPickups = [
  { id: 'north', location: 'North Loop Co-op', time: '12:00 PM', customers: 9 },
  { id: 'harbor', location: 'Harborfront Market', time: '2:00 PM', customers: 11 },
]

const products = [
  { id: 'tomatoes', name: 'Heritage Tomatoes', quantity: 24, packed: true },
  { id: 'carrots', name: 'Rainbow Carrots', quantity: 16, packed: false },
  { id: 'basil', name: 'Genovese Basil', quantity: 18, packed: false },
]

const notifications = [
  'Emma confirmed pickup (2 min ago)',
  'Weather alert: Light rain expected',
  '2 new customers joined North pickup',
]

export default function TodayDashboardPage() {
  const [checkedCustomers, setCheckedCustomers] = useState(customers)

  const toggleCustomer = (id: string) => {
    setCheckedCustomers((prev) => prev.map((customer) => (customer.id === id ? { ...customer, checked: !customer.checked } : customer)))
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-8 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brand-text">Today's Pickups</h1>
              <p className="text-stone-600">Saturday, Nov 9 • 3 locations • 24 customers</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" /> Print List
              </Button>
              <Button className="bg-blue-600 text-white">
                <MessageCircle className="mr-2 h-4 w-4" /> Message All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <motion.div layoutId="current-pickup" className="rounded-2xl bg-gradient-to-br from-brand-primary to-emerald-600 p-6 text-white shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-100">Current Stop</p>
                  <h2 className="text-2xl font-bold">Riverside Community Center</h2>
                  <p className="text-emerald-100">10:00 AM - 11:00 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">8/12</p>
                  <p className="text-sm text-emerald-100">customers checked</p>
                </div>
              </div>
              <div className="mb-6 h-3 w-full overflow-hidden rounded-full bg-white/20">
                <motion.div initial={{ width: 0 }} animate={{ width: '66%' }} transition={{ duration: 1 }} className="h-full bg-white" />
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <h3 className="mb-3 font-semibold">Remaining Customers</h3>
                <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                  {checkedCustomers.map((customer) => (
                    <motion.div
                      key={customer.id}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between rounded-lg bg-white/10 p-2 text-sm transition-all hover:bg-white/20"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleCustomer(customer.id)}
                          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white ${
                            customer.checked ? 'bg-white text-brand-primary' : 'bg-transparent'
                          }`}
                        >
                          {customer.checked && <Check className="h-4 w-4" />}
                        </button>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-emerald-100">{customer.items} • {customer.total}</p>
                        </div>
                      </div>
                      <button className="rounded-lg p-2 hover:bg-white/20">
                        <QrCode className="h-5 w-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
              <Button className="mt-4 w-full bg-white text-brand-primary">
                Complete This Pickup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <div>
              <h3 className="mb-4 font-semibold text-brand-text">Next Stops</h3>
              <div className="space-y-3">
                {upcomingPickups.map((pickup, index) => (
                  <div key={pickup.id} className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 font-bold text-brand-text">
                        {index + 2}
                      </div>
                      <div>
                        <p className="font-medium text-brand-text">{pickup.location}</p>
                        <p className="text-sm text-stone-600">{pickup.time} • {pickup.customers} customers</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-brand-text">Today's Summary</h3>
              <div className="space-y-3 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Total Revenue</span>
                  <span className="font-bold text-brand-primary">$847</span>
                </div>
                <div className="flex justify-between">
                  <span>Customers</span>
                  <span className="font-bold text-brand-text">24</span>
                </div>
                <div className="flex justify-between">
                  <span>Products</span>
                  <span className="font-bold text-brand-text">67</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance</span>
                  <span className="font-bold text-brand-text">18 km</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-brand-text">Pack List</h3>
              <div className="space-y-2 text-sm text-brand-text">
                {products.map((product) => (
                  <label key={product.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-stone-50">
                    <input type="checkbox" className="h-4 w-4 text-brand-primary" defaultChecked={product.packed} />
                    <span className={product.packed ? 'flex-1 text-stone-400 line-through' : 'flex-1'}>{product.name}</span>
                    <span className="text-sm text-stone-600">×{product.quantity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              <div className="flex items-start gap-3">
                <Bell className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="mb-2 font-medium text-amber-900">New Updates</p>
                  <div className="space-y-2">
                    {notifications.map((note) => (
                      <p key={note}>• {note}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
