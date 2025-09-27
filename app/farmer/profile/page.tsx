'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useFarmerAuth } from '@/components/FarmerAuthProvider'

const FARMING_PRACTICES = [
  'Organic',
  'Sustainable',
  'Permaculture',
  'Biodynamic',
  'No-till',
  'Crop rotation',
  'Companion planting',
  'Integrated pest management',
  'Water conservation',
  'Soil health focus'
]

const CERTIFICATIONS = [
  'USDA Organic',
  'Certified Naturally Grown',
  'Fair Trade',
  'Rainforest Alliance',
  'Bird Friendly',
  'Demeter Biodynamic',
  'Food Alliance',
  'Local Harvest',
  'GAP (Good Agricultural Practices)',
  'SQF (Safe Quality Food)'
]

const SPECIALTIES = [
  'Vegetables',
  'Fruits',
  'Herbs',
  'Grains',
  'Legumes',
  'Root vegetables',
  'Leafy greens',
  'Berries',
  'Stone fruits',
  'Citrus',
  'Mushrooms',
  'Microgreens'
]

export default function FarmerProfile() {
  const { farmer, isAuthenticated, isLoading, updateProfile, logout } = useFarmerAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    farmName: '',
    phone: '',
    address: '',
    description: '',
    experience: '',
    practices: [] as string[],
    certifications: [] as string[],
    specialties: [] as string[]
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/farmer/auth')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (farmer) {
      setFormData({
        name: farmer.name || '',
        farmName: farmer.farmName || '',
        phone: farmer.phone || '',
        address: farmer.address || '',
        description: farmer.description || '',
        experience: farmer.experience || '',
        practices: farmer.practices || [],
        certifications: farmer.certifications || [],
        specialties: farmer.specialties || []
      })
    }
  }, [farmer])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !farmer) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleArrayToggle = (array: keyof Pick<typeof formData, 'practices' | 'certifications' | 'specialties'>, item: string) => {
    setFormData(prev => ({
      ...prev,
      [array]: prev[array].includes(item)
        ? prev[array].filter(i => i !== item)
        : [...prev[array], item]
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    const result = await updateProfile(formData)
    if (result.success) {
      setIsEditing(false)
    }
    setIsSaving(false)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                🌱 HarvestLink
              </Link>
              <span className="ml-4 text-gray-400">|</span>
              <Link href="/farmer/dashboard" className="ml-4 text-primary-600 hover:text-primary-800">
                Dashboard
              </Link>
              <span className="ml-2 text-gray-400">→</span>
              <span className="ml-2 text-lg font-medium text-gray-700">Profile</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🚜</span>
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{farmer.name}</h1>
                <p className="text-lg text-gray-600">{farmer.farmName}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(farmer.joinedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900">{farmer.name || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900">{farmer.farmName || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900">{farmer.phone || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <p className="text-gray-900">{farmer.email}</p>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <p className="text-gray-900">{farmer.address || 'Not provided'}</p>
            )}
          </div>
        </div>

        {/* Farm Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">About Your Farm</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm Description</label>
              {isEditing ? (
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell customers about your farm, your story, and what makes your produce special..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900">{farmer.description || 'No description provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farming Experience</label>
              {isEditing ? (
                <textarea
                  name="experience"
                  rows={3}
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Share your farming background and experience..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900">{farmer.experience || 'No experience information provided'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Farming Practices */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Farming Practices</h2>
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {FARMING_PRACTICES.map(practice => (
                <label key={practice} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.practices.includes(practice)}
                    onChange={() => handleArrayToggle('practices', practice)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{practice}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {farmer.practices.length > 0 ? (
                farmer.practices.map(practice => (
                  <span key={practice} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {practice}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No practices specified</p>
              )}
            </div>
          )}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Certifications</h2>
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CERTIFICATIONS.map(cert => (
                <label key={cert} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.certifications.includes(cert)}
                    onChange={() => handleArrayToggle('certifications', cert)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{cert}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {farmer.certifications.length > 0 ? (
                farmer.certifications.map(cert => (
                  <span key={cert} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {cert}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No certifications specified</p>
              )}
            </div>
          )}
        </div>

        {/* Specialties */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Specialties</h2>
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SPECIALTIES.map(specialty => (
                <label key={specialty} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.specialties.includes(specialty)}
                    onChange={() => handleArrayToggle('specialties', specialty)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {farmer.specialties.length > 0 ? (
                farmer.specialties.map(specialty => (
                  <span key={specialty} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {specialty}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No specialties specified</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
