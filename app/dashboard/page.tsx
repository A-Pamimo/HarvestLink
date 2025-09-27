'use client'

import { Button } from '@/components/ui/Button'
import { FarmerAvatar } from '@/components/ui/FarmerAvatar'
import {
  ArrowRight,
  BarChart2,
  Calendar,
  DollarSign,
  Eye,
  Home,
  Image as ImageIcon,
  Italic,
  List,
  Package,
  Save,
  Sparkles,
  ShoppingBag,
  Upload,
  User,
  Users,
  Bold,
} from 'lucide-react'
import { cn } from '@/lib/cn'

const stats = [
  {
    icon: Eye,
    label: 'Profile Views',
    value: '1,234',
    change: '+12%',
    className: 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200',
  },
  {
    icon: Users,
    label: 'Customers',
    value: '89',
    change: '+8',
    className: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200',
  },
  {
    icon: ShoppingBag,
    label: 'This Week',
    value: '23',
    change: '+5',
    className: 'bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200',
  },
  {
    icon: DollarSign,
    label: 'Revenue',
    value: '$1,847',
    change: '+23%',
    className: 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200',
  },
]

const methods = ['Organic', 'No-Spray', 'Regenerative', 'Permaculture', 'Greenhouse', 'Heritage Varieties']

const navItems = [
  { icon: Home, label: 'Overview', active: true },
  { icon: User, label: 'Profile' },
  { icon: Package, label: 'Products' },
  { icon: Calendar, label: 'Pickups' },
  { icon: BarChart2, label: 'Analytics' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-stone-200 bg-white lg:block">
        <div className="p-6">
          <div className="mb-8 flex items-center gap-3">
            <FarmerAvatar src="https://images.unsplash.com/photo-farmer-portrait" size={48} />
            <div>
              <p className="font-semibold text-brand-text">Sarah's Farm</p>
              <p className="text-sm text-stone-600">Premium Farmer</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-emerald-50 text-brand-primary'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-brand-text',
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="min-h-screen px-4 py-10 lg:ml-64 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ icon: Icon, label, value, change, className }) => (
              <div key={label} className={cn('rounded-2xl border p-6 shadow-sm', className)}>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/60">
                    <Icon className="h-6 w-6 text-brand-primary" />
                  </div>
                  <span className="text-sm font-medium text-emerald-700">{change}</span>
                </div>
                <p className="text-sm text-stone-600">{label}</p>
                <p className="text-2xl font-bold text-brand-text">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-brand-text">
              <Sparkles className="h-6 w-6 text-amber-500" /> Tell Your Story
            </h2>

            <div className="mb-8">
              <label className="mb-2 block text-sm font-medium text-stone-700">Cover Photo</label>
              <div className="relative h-48 rounded-xl border-2 border-dashed border-stone-300 bg-stone-100 transition-colors hover:border-brand-primary">
                <div className="flex h-full flex-col items-center justify-center text-stone-500">
                  <Upload className="mb-2 h-8 w-8" />
                  <p className="text-sm">Drop image or click to upload</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-sm font-medium text-stone-700">Your Farm's Story</label>
              <div className="overflow-hidden rounded-lg border border-stone-300">
                <div className="flex gap-2 border-b border-stone-300 bg-stone-50 p-2">
                  {[Bold, Italic, List, ImageIcon].map((Icon, index) => (
                    <button
                      key={index}
                      className="rounded-lg p-2 text-stone-500 hover:bg-white hover:text-brand-primary"
                      type="button"
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
                <textarea
                  className="min-h-[200px] w-full resize-none p-4 text-stone-700 outline-none"
                  placeholder="Tell customers about your farm's history, your growing methods, what makes your produce special..."
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="mb-3 block text-sm font-medium text-stone-700">Growing Methods</label>
              <div className="flex flex-wrap gap-3">
                {methods.map((method) => (
                  <label key={method} className="inline-flex items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="cursor-pointer rounded-full border-2 border-stone-300 px-4 py-2 transition-all peer-checked:border-brand-primary peer-checked:bg-brand-primary peer-checked:text-white">
                      {method}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button size="lg" className="px-8">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-brand-primary to-emerald-600 p-8 text-white shadow-xl">
            <div className="flex flex-col gap-4 text-left md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-bold">Share your weekly harvest in seconds</h3>
                <p className="text-white/80">Use our template to post products, photos, and pickup times.</p>
              </div>
              <Button variant="secondary" className="bg-white text-brand-primary">
                <ArrowRight className="mr-2 h-4 w-4" /> Create Weekly Update
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
