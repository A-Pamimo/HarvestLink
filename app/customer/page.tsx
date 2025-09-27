'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCustomerAuth } from '@/components/CustomerAuthProvider'

export default function CustomerPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useCustomerAuth()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/customer/dashboard')
      } else {
        router.push('/customer/auth')
      }
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return null // Will redirect in useEffect
}
