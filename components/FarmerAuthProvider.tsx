'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { FarmerProfile, getCurrentFarmer, loginFarmer, registerFarmer, logoutFarmer, updateFarmerProfile } from '@/lib/auth'

interface FarmerAuthContextType {
  farmer: FarmerProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: { email: string; password: string; name: string; farmName: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (updates: Partial<FarmerProfile>) => Promise<{ success: boolean }>
}

const FarmerAuthContext = createContext<FarmerAuthContextType | undefined>(undefined)

export function FarmerAuthProvider({ children }: { children: React.ReactNode }) {
  const [farmer, setFarmer] = useState<FarmerProfile | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing authentication on mount
    const auth = getCurrentFarmer()
    setFarmer(auth.farmer)
    setIsAuthenticated(auth.isAuthenticated)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const result = loginFarmer(email, password)
    if (result.success && result.farmer) {
      setFarmer(result.farmer)
      setIsAuthenticated(true)
    }
    return result
  }

  const register = async (data: { email: string; password: string; name: string; farmName: string }) => {
    const result = registerFarmer(data)
    if (result.success && result.farmer) {
      setFarmer(result.farmer)
      setIsAuthenticated(true)
    }
    return result
  }

  const logout = () => {
    logoutFarmer()
    setFarmer(null)
    setIsAuthenticated(false)
  }

  const updateProfile = async (updates: Partial<FarmerProfile>) => {
    const result = updateFarmerProfile(updates)
    if (result.success && result.farmer) {
      setFarmer(result.farmer)
    }
    return result
  }

  return (
    <FarmerAuthContext.Provider
      value={{
        farmer,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </FarmerAuthContext.Provider>
  )
}

export function useFarmerAuth() {
  const context = useContext(FarmerAuthContext)
  if (context === undefined) {
    throw new Error('useFarmerAuth must be used within a FarmerAuthProvider')
  }
  return context
}
