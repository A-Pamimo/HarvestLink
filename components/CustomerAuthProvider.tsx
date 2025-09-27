'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { CustomerProfile, getCurrentCustomer, loginCustomer, registerCustomer, logoutCustomer, updateCustomerProfile } from '@/lib/auth'

interface CustomerAuthContextType {
  customer: CustomerProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: { email: string; password: string; name: string; businessName: string; businessType: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (updates: Partial<CustomerProfile>) => Promise<{ success: boolean }>
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined)

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerProfile | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing authentication on mount
    const auth = getCurrentCustomer()
    setCustomer(auth.customer)
    setIsAuthenticated(auth.isAuthenticated)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const result = loginCustomer(email, password)
    if (result.success && result.customer) {
      setCustomer(result.customer)
      setIsAuthenticated(true)
    }
    return result
  }

  const register = async (data: { email: string; password: string; name: string; businessName: string; businessType: string }) => {
    const result = registerCustomer(data)
    if (result.success && result.customer) {
      setCustomer(result.customer)
      setIsAuthenticated(true)
    }
    return result
  }

  const logout = () => {
    logoutCustomer()
    setCustomer(null)
    setIsAuthenticated(false)
  }

  const updateProfile = async (updates: Partial<CustomerProfile>) => {
    const result = updateCustomerProfile(updates)
    if (result.success && result.customer) {
      setCustomer(result.customer)
    }
    return result
  }

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  )
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext)
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider')
  }
  return context
}
