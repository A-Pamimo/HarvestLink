'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Calendar,
  Heart,
  Leaf,
  MapPin,
  Package,
  Star,
  Trees,
  Truck,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const farmer = {
  id: 'sarah-chen',
  farmName: "Sarah's Heritage Farm",
  coverImage: 'https://images.unsplash.com/photo-farm-field',
  avatar: 'https://images.unsplash.com/photo-farmer-portrait',
  story:
    `Sarah's Heritage Farm has nurtured rare tomato varieties for over three generations. We blend regenerative practices with community storytelling to keep every heirloom thriving.`,
  establishedYear: 1996,
  methods: ['Organic', 'Regenerative', 'Heirloom', 'No-Spray'],
}

const stats = [
  { icon: Trees, label: 'Acres', value: '12' },
  { icon: Users, label: 'Family Members', value: '4' },
  { icon: Package, label: 'Product Types', value: '24' },
  { icon: Truck, label: 'Weekly Pickups', value: '3' },
]

const photos = [
  'https://images.unsplash.com/photo-fresh-vegetables',
  'https://images.unsplash.com/photo-farm-field',
  'https://images.unsplash.com/photo-fresh-vegetables',
  'https://images.unsplash.com/photo-farm-field',
]

const products = [
  {
    name: 'Heritage Tomatoes',
    description: 'Sweet, vibrant tomatoes grown in volcanic soil.',
    price: '6.50',
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-fresh-vegetables',
    isHeritage: true,
  },
  {
    name: 'Rainbow Carrots',
    description: 'Crunchy, colorful carrots harvested this morning.',
    price: '5.00',
    unit: 'bundle',
    image: 'https://images.unsplash.com/photo-fresh-vegetables',
    isHeritage: false,
  },
  {
    name: 'Genovese Basil',
    description: 'Fragrant leaves perfect for pesto nights.',
    price: '4.00',
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-fresh-vegetables',
    isHeritage: false,
  },
]

const TabButton = ({ active, children }: { active?: boolean; children: React.ReactNode }) => (
  <button
    className={`relative px-4 py-3 text-sm font-medium transition-colors ${
      active
        ? 'text-brand-primary'
        : 'text-stone-500 hover:text-brand-primary'
    }`}
  >
    {children}
    {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
  </button>
)

const Stat = ({ icon: Icon, label, value }: { icon: React.ComponentType<any>; label: string; value: string }) => (
  <div className="flex items-center justify-between rounded-lg bg-white/70 px-4 py-3">
    <div className="flex items-center gap-2 text-stone-600">
      <Icon className="h-4 w-4 text-brand-primary" />
      {label}
    </div>
    <span className="font-semibold text-brand-text">{value}</span>
  </div>
)

export default function FarmerProfilePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <div className="bg-brand-background">
      <div ref={heroRef} className="relative h-96 overflow-hidden">
        <motion.img
          style={{ y }}
          src={farmer.coverImage}
          alt="Farm cover"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 text-white lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-6">
              <img
                src={farmer.avatar}
                alt="Farmer"
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-2xl"
              />
              <div>
                <h1 className="mb-2 text-4xl font-playfair font-bold">{farmer.farmName}</h1>
                <div className="flex flex-wrap gap-4 text-white/90">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> 2.3 km away
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Est. {farmer.establishedYear}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400" /> 4.9 (47 reviews)
                  </span>
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-brand-primary">
              <Heart className="mr-2 h-4 w-4" /> Follow Farm
            </Button>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          <nav className="flex gap-8 px-8">
            <TabButton active>Our Story</TabButton>
            <TabButton>Products (12)</TabButton>
            <TabButton>Pickups</TabButton>
            <TabButton>Reviews</TabButton>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-8 py-12">
        <div className="mb-16 grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-playfair font-bold">Our Story</h2>
            <div className="space-y-4 text-lg leading-relaxed text-stone-700">
              <p>{farmer.story}</p>
              <p>
                We cultivate soil with compost teas, harvest at sunrise, and host weekly tasting tours so every visitor can meet the produce they bring home.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {farmer.methods.map((method) => (
                <span key={method} className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-emerald-800">
                  <Leaf className="h-4 w-4" />
                  {method}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl bg-stone-50 p-6">
              <h3 className="mb-4 font-bold text-brand-text">Farm Facts</h3>
              <div className="space-y-3">
                {stats.map((stat) => (
                  <Stat key={stat.label} {...stat} />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
              <h3 className="mb-3 font-bold text-emerald-900">Next Pickup</h3>
              <p className="mb-4 text-emerald-700">
                Saturday, Nov 9 at 10:00 AM
                <br />
                Riverside Community Center
              </p>
              <Button className="w-full bg-brand-primary">Join Pickup (8 spots left)</Button>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-playfair font-bold">From Our Farm</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square overflow-hidden rounded-xl"
              >
                <img src={photo} alt="Farm photo" className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-playfair font-bold">Available This Week</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <motion.div
                key={product.name}
                whileHover={{ y: -4 }}
                className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
              >
                <div className="relative aspect-square">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  {product.isHeritage && (
                    <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2 py-1 text-xs text-white">
                      Heritage Variety
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-brand-text">{product.name}</h3>
                  <p className="mb-3 text-sm text-stone-600">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-brand-primary">${product.price}/{product.unit}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
