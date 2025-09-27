'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Leaf,
  MapPin,
  Sparkles,
  Truck,
  Users,
  Zap,
  Github,
  Code,
  ShoppingBag,
  Play,
  User,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const trustBadges = [
  { icon: CheckCircle2, label: '23 Local Farmers' },
  { icon: Users, label: '450+ Happy Customers' },
  { icon: Truck, label: '12 Pickup Locations' },
]

const demoActions = [
  { label: '👤 Login as Farmer' },
  { label: '🛒 Login as Customer' },
  { label: '📍 Change Location' },
  { label: '🎲 Generate Orders' },
  { label: '🔄 Reset Demo Data', warning: true },
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-brand-primary" />
            <span className="font-playfair text-2xl text-brand-text">FarmDirect</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a className="text-stone-700 transition-colors hover:text-brand-primary" href="#how-it-works">
              How it Works
            </a>
            <Link className="text-stone-700 transition-colors hover:text-brand-primary" href="/farmers/sarah-chen">
              For Farmers
            </Link>
            <Link href="/auth/login">
              <Button size="sm" className="bg-brand-primary">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section className="relative flex min-h-screen items-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-200 opacity-70 mix-blend-multiply filter blur-xl animate-blob" />
            <div className="animation-delay-2000 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-200 opacity-70 mix-blend-multiply filter blur-xl animate-blob" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <span className="mb-6 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                <Sparkles className="mr-2 h-4 w-4" /> Launching in Toronto & Vancouver
              </span>
              <h1 className="mb-6 text-5xl font-playfair font-bold leading-tight text-brand-text md:text-7xl">
                Farm-Fresh Stories,
                <br />
                <span className="text-brand-primary">Delivered Together</span>
              </h1>
              <p className="mx-auto mb-12 max-w-2xl text-xl text-stone-600">
                Discover local farmers, read their stories, and join community pickups for fresh, sustainable produce.
              </p>

              <div className="mx-auto max-w-2xl">
                <div className="relative">
                  <input
                    className="w-full rounded-full border-2 border-stone-300 px-6 py-4 pl-12 text-lg shadow-lg focus:border-brand-primary focus:outline-none"
                    placeholder="Enter your postal code..."
                    type="text"
                  />
                  <MapPin className="absolute left-4 top-5 h-5 w-5 text-stone-400" />
                  <Button className="absolute right-2 top-2 rounded-full px-8">Discover Farmers</Button>
                </div>
              </div>

              <div className="mt-12 flex justify-center gap-8 text-sm text-stone-600">
                {trustBadges.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-brand-primary" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="bg-stone-50 py-24">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl font-playfair font-bold text-brand-text">Farmers Are Invisible. Until Now.</h2>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-3">
              <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-brand-text">The Problem</h3>
                <p className="text-stone-600">
                  Amazing farmers like Sarah grow heritage tomatoes but compete on price alone, invisible to customers who'd pay more for their story.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ rotateY: 180 }}
                className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 text-white shadow-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Our Innovation</h3>
                <p className="text-white/90">
                  We transform farmers into discoverable brands with stories, coordinating community pickups for efficient distribution.
                </p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-brand-text">The Result</h3>
                <p className="text-stone-600">
                  Farmers build loyal customer bases. Customers discover meaningful food sources. Communities reconnect with their food system.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative py-24">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
                <Zap className="h-4 w-4" /> Built in 24 hours at HackathonName
              </span>
              <h2 className="mb-4 text-4xl font-bold text-white">See It In Action</h2>
              <p className="mb-8 text-xl text-white/90">Experience how FarmDirect transforms local food systems</p>
            </motion.div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: 'Demo as Farmer', icon: User },
                { label: 'Demo as Customer', icon: ShoppingBag },
                { label: 'Watch Video', icon: Play },
              ].map(({ label, icon: Icon }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-white px-6 py-4 font-semibold text-purple-600 shadow-xl"
                >
                  <Icon className="mx-auto mb-2 h-5 w-5" />
                  {label}
                </motion.button>
              ))}
            </div>
            <div className="mt-12 flex justify-center gap-6">
              <a
                href="https://github.com/yourteam/farmdirect"
                className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <Github className="h-5 w-5" /> View Code
              </a>
              <a href="/tech-stack" className="flex items-center gap-2 text-white/80 transition-colors hover:text-white">
                <Code className="h-5 w-5" /> Tech Stack
              </a>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600 to-purple-700" aria-hidden="true" />
        </section>
      </main>

      <div className="fixed bottom-8 right-8 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="rounded-2xl border-2 border-purple-500 bg-white p-4 shadow-2xl"
        >
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="font-bold text-purple-600">Demo Mode</span>
          </div>
          <div className="space-y-2">
            {demoActions.map((action) => (
              <button
                key={action.label}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  action.warning
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
