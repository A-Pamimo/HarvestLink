'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Leaf, UserRound, ShoppingCart } from 'lucide-react'

const heroImage = 'https://images.unsplash.com/photo-farm-field'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-background">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="relative block h-64 w-full lg:hidden">
          <motion.img
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={heroImage}
            alt="Sunset over farm"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col justify-center bg-white px-6 py-12 sm:px-12">
          <div className="mx-auto w-full max-w-sm">
            <Link href="/" className="mb-8 flex items-center gap-2">
              <Leaf className="h-8 w-8 text-brand-primary" />
              <span className="text-2xl font-playfair text-brand-text">FarmDirect</span>
            </Link>

            <h2 className="mb-2 text-3xl font-bold text-brand-text">Welcome back</h2>
            <p className="mb-8 text-stone-600">Connect with local farmers in your area</p>

            <form className="space-y-6">
              <Input label="Email" type="email" placeholder="you@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button variant="outline" className="border-2">
                  <UserRound className="mr-2 h-4 w-4" /> Demo as Farmer
                </Button>
                <Button variant="outline" className="border-2">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Demo as Customer
                </Button>
              </div>

              <Button type="submit" className="w-full bg-brand-primary">
                Sign In
              </Button>
            </form>
          </div>
        </div>

        <div className="relative hidden flex-1 lg:block">
          <motion.img
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={heroImage}
            alt="Sunset over farm"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <blockquote className="mb-4 text-2xl font-playfair">
              “Every farmer has a story. Every tomato has a name.”
            </blockquote>
            <p className="text-white/80">Sarah Chen, Heritage Farm</p>
          </div>
        </div>
      </div>
    </div>
  )
}
