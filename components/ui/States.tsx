'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { Button } from '@/components/ui/Button'
import { AlertCircle, Check, Package, RefreshCcw, Search, Map as MapIcon, Info, X } from 'lucide-react'
import Link from 'next/link'

export const FarmerCardSkeleton = () => (
  <div className="animate-pulse rounded-xl bg-white p-5">
    <div className="mb-4 h-48 rounded-lg bg-stone-200" />
    <div className="mb-2 h-4 w-3/4 rounded bg-stone-200" />
    <div className="mb-3 h-3 w-full rounded bg-stone-200" />
    <div className="flex gap-2">
      <div className="h-6 w-16 rounded-full bg-stone-200" />
      <div className="h-6 w-20 rounded-full bg-stone-200" />
    </div>
  </div>
)

export const SuccessAnimation = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 1.5 }}
          className="rounded-full bg-brand-primary p-8"
        >
          <Check className="h-16 w-16 text-white" />
        </motion.div>
        {typeof window !== 'undefined' && (
          <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />
        )}
      </motion.div>
    )}
  </AnimatePresence>
)

export const MobileNav = ({ onClose }: { onClose: () => void }) => (
  <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl">
    <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 hover:bg-stone-100">
      <X className="h-5 w-5" />
    </button>
    <nav className="mt-12 space-y-4 p-6">
      <MobileNavLink href="/discover" icon={Search} label="Discover Farmers" />
      <MobileNavLink href="/map" icon={MapIcon} label="Map View" />
      <MobileNavLink href="/how-it-works" icon={Info} label="How It Works" />
    </nav>
  </motion.div>
)

const MobileNavLink = ({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<any>; label: string }) => (
  <Link href={href} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-brand-text hover:bg-stone-100">
    <Icon className="h-4 w-4" /> {label}
  </Link>
)

export const ErrorState = ({ message, retry }: { message: string; retry: () => void }) => (
  <div className="flex flex-col items-center justify-center p-12">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
      <AlertCircle className="h-8 w-8 text-red-600" />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-brand-text">Something went wrong</h3>
    <p className="mb-4 text-center text-stone-600">{message}</p>
    <Button onClick={retry} variant="outline">
      <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
    </Button>
  </div>
)

export const EmptyState = ({ onReset }: { onReset?: () => void }) => (
  <div className="flex flex-col items-center justify-center p-12">
    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-100">
      <Package className="h-10 w-10 text-stone-400" />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-brand-text">No farmers found</h3>
    <p className="mb-4 text-center text-stone-600">Try adjusting your filters or expanding your search area</p>
    <Button variant="outline" onClick={onReset}>
      Clear Filters
    </Button>
  </div>
)
