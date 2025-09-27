'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFarmerAuth } from '@/components/FarmerAuthProvider'

export default function FarmerPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useFarmerAuth()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/farmer/dashboard')
      } else {
        router.push('/farmer/auth')
      }
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return null // Will redirect in useEffect
}
