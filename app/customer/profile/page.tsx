'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCustomerAuth } from '@/components/CustomerAuthProvider'

const BUSINESS_TYPES = [
  'Grocery Store',
  'Restaurant',
  'Cafe',
  'Bakery',
  'Food Truck',
  'Catering Company',
  'Market Vendor',
  'Juice Bar',
  'Health Food Store',
  'Specialty Store',
  'Other'
]

const PREFERRED_SUPPLIERS = [
  'Organic farms',
  'Local producers',
  'Certified growers',
  'Family farms',
  'Sustainable farms',
  'Biodynamic farms',
  'Small-scale farms',
  'Specialty crop growers',
  'Seasonal producers',
  'Artisan growers'
]

const CERTIFICATION_REQUIREMENTS = [
  'USDA Organic',
  'Certified Naturally Grown',
  'Fair Trade',
  'Rainforest Alliance',
  'Bird Friendly',
  'Demeter Biodynamic',
  'Food Alliance',
  'Local Harvest',
  'GAP (Good Agricultural Practices)',
  'SQF (Safe Quality Food)',
  'Non-GMO Project',
  'Kosher',
  'Halal'
]

export default function CustomerProfile() {
  const { customer, isAuthenticated, isLoading, updateProfile, logout } = useCustomerAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    businessType: 'Grocery Store',
    phone: '',
    address: '',
    description: '',
    preferredSuppliers: [] as string[],
    certificationRequirements: [] as string[]
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/customer/auth')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        businessName: customer.businessName || '',
        businessType: customer.businessType || 'Grocery Store',
        phone: customer.phone || '',
        address: customer.address || '',
        description: customer.description || '',
        preferredSuppliers: customer.preferredSuppliers || [],
        certificationRequirements: customer.certificationRequirements || []
      })
    }
  }, [customer])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !customer) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleArrayToggle = (array: keyof Pick<typeof formData, 'preferredSuppliers' | 'certificationRequirements'>, item: string) => {
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
              <Link href="/customer/dashboard" className="ml-4 text-blue-600 hover:text-blue-800">
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
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏪</span>
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
                <p className="text-lg text-gray-600">{customer.businessName}</p>
                <p className="text-sm text-gray-500">
                  {customer.businessType} • Member since {new Date(customer.joinedDate).toLocaleDateString()}
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{customer.name || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{customer.businessName || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              {isEditing ? (
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {BUSINESS_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              ) : (
                <p className="text-gray-900">{customer.businessType || 'Not provided'}</p>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{customer.phone || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <p className="text-gray-900">{customer.email}</p>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{customer.address || 'Not provided'}</p>
            )}
          </div>
        </div>

        {/* Business Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">About Your Business</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
            {isEditing ? (
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell farmers about your business, your customers, and what kind of produce you're looking for..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{customer.description || 'No description provided'}</p>
            )}
          </div>
        </div>

        {/* Preferred Suppliers */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferred Suppliers</h2>
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PREFERRED_SUPPLIERS.map(supplier => (
                <label key={supplier} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.preferredSuppliers.includes(supplier)}
                    onChange={() => handleArrayToggle('preferredSuppliers', supplier)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{supplier}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {customer.preferredSuppliers.length > 0 ? (
                customer.preferredSuppliers.map(supplier => (
                  <span key={supplier} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {supplier}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No preferences specified</p>
              )}
            </div>
          )}
        </div>

        {/* Certification Requirements */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Certification Requirements</h2>
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CERTIFICATION_REQUIREMENTS.map(cert => (
                <label key={cert} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.certificationRequirements.includes(cert)}
                    onChange={() => handleArrayToggle('certificationRequirements', cert)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{cert}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {customer.certificationRequirements.length > 0 ? (
                customer.certificationRequirements.map(cert => (
                  <span key={cert} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {cert}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No certification requirements specified</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
