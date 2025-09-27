'use client'

import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { Button } from '@/components/ui/Button'
import { QRCodeCanvas } from 'qrcode.react'
import { Calendar, CheckCircle2, MapPin, Share2, User } from 'lucide-react'

const orderId = 'ORDER-8734-ABCD'

export default function ConfirmationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
      >
        <Confetti width={600} height={600} numberOfPieces={150} recycle={false} className="pointer-events-none" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"
        >
          <CheckCircle2 className="h-10 w-10 text-brand-primary" />
        </motion.div>
        <h1 className="mb-2 text-center text-2xl font-bold text-brand-text">Order Confirmed!</h1>
        <p className="mb-8 text-center text-stone-600">Your pickup is scheduled. Show this QR code when you arrive.</p>
        <div className="mb-6 rounded-xl bg-stone-50 p-6 text-center">
          <div className="mx-auto w-48 rounded-lg bg-white p-4">
            <QRCodeCanvas value={orderId} size={176} includeMargin />
          </div>
          <p className="mt-3 text-xs text-stone-500">Order #{orderId.slice(0, 8)}</p>
        </div>
        <div className="mb-6 space-y-4 text-sm text-brand-text">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-stone-400" />
            <div>
              <p className="font-medium">Saturday, November 9</p>
              <p className="text-stone-600">10:00 AM - 11:00 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-stone-400" />
            <div>
              <p className="font-medium">Riverside Community Center</p>
              <p className="text-stone-600">123 Main St, Toronto</p>
              <button className="text-sm text-brand-primary hover:underline">Get directions →</button>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-stone-400" />
            <div>
              <p className="font-medium">Sarah's Heritage Farm</p>
              <p className="text-stone-600">2 other farmers at this pickup</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <Button className="w-full bg-brand-primary">
            <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
          </Button>
          <Button variant="outline" className="w-full">
            <Share2 className="mr-2 h-4 w-4" /> Share with Friends
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
