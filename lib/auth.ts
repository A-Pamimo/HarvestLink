// Simple authentication utilities using localStorage

export interface FarmerProfile {
  id: string
  email: string
  name: string
  farmName: string
  phone?: string
  address?: string
  practices: string[]
  certifications: string[]
  description?: string
  experience?: string
  specialties: string[]
  avatar?: string
  joinedDate: string
}

export interface FarmerAuth {
  farmer: FarmerProfile | null
  isAuthenticated: boolean
}

const FARMER_AUTH_KEY = 'harvestlink_farmer_auth'
const FARMERS_DB_KEY = 'harvestlink_farmers_db'

// Get current authenticated farmer
export function getCurrentFarmer(): FarmerAuth {
  if (typeof window === 'undefined') {
    return { farmer: null, isAuthenticated: false }
  }

  const authData = localStorage.getItem(FARMER_AUTH_KEY)
  if (!authData) {
    return { farmer: null, isAuthenticated: false }
  }

  try {
    const farmer = JSON.parse(authData)
    return { farmer, isAuthenticated: true }
  } catch {
    return { farmer: null, isAuthenticated: false }
  }
}

// Get all registered farmers
export function getAllFarmers(): FarmerProfile[] {
  if (typeof window === 'undefined') return []

  const farmersData = localStorage.getItem(FARMERS_DB_KEY)
  if (!farmersData) return []

  try {
    return JSON.parse(farmersData)
  } catch {
    return []
  }
}

// Save farmer to database
function saveFarmerToDb(farmer: FarmerProfile): void {
  const farmers = getAllFarmers()
  const existingIndex = farmers.findIndex(f => f.id === farmer.id)
  
  if (existingIndex >= 0) {
    farmers[existingIndex] = farmer
  } else {
    farmers.push(farmer)
  }

  localStorage.setItem(FARMERS_DB_KEY, JSON.stringify(farmers))
}

// Register new farmer
export function registerFarmer(data: {
  email: string
  password: string
  name: string
  farmName: string
}): { success: boolean; error?: string; farmer?: FarmerProfile } {
  const farmers = getAllFarmers()
  
  // Check if email already exists
  if (farmers.some(f => f.email === data.email)) {
    return { success: false, error: 'Email already registered' }
  }

  // Create new farmer profile
  const newFarmer: FarmerProfile = {
    id: `farmer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: data.email,
    name: data.name,
    farmName: data.farmName,
    practices: [],
    certifications: [],
    specialties: [],
    joinedDate: new Date().toISOString(),
  }

  // Save to database
  saveFarmerToDb(newFarmer)
  
  // Auto-login after registration
  localStorage.setItem(FARMER_AUTH_KEY, JSON.stringify(newFarmer))

  return { success: true, farmer: newFarmer }
}

// Login farmer
export function loginFarmer(email: string, password: string): { success: boolean; error?: string; farmer?: FarmerProfile } {
  const farmers = getAllFarmers()
  let farmer = farmers.find(f => f.email === email)

  // Create demo farmer if using demo credentials
  if (!farmer && email === 'demo@farmer.com') {
    const demoFarmer: FarmerProfile = {
      id: 'demo_farmer',
      email: 'demo@farmer.com',
      name: 'John Smith',
      farmName: 'Green Valley Farm',
      phone: '(555) 123-4567',
      address: '123 Farm Road, Valley, CA 95123',
      practices: ['Organic', 'Sustainable', 'Water conservation'],
      certifications: ['USDA Organic', 'Certified Naturally Grown'],
      specialties: ['Vegetables', 'Herbs', 'Leafy greens'],
      description: 'We are a family-owned organic farm that has been serving the local community for over 20 years. Our commitment to sustainable farming practices ensures the highest quality produce while protecting the environment.',
      experience: 'Started farming in 2003 with just 5 acres. Now we manage 50 acres of certified organic farmland specializing in seasonal vegetables and herbs.',
      joinedDate: new Date('2023-01-15').toISOString(),
    }
    
    saveFarmerToDb(demoFarmer)
    farmer = demoFarmer
  }

  if (!farmer) {
    return { success: false, error: 'Email not found' }
  }

  // For demo purposes, we're not actually storing passwords
  // In a real app, you'd verify the password hash here
  localStorage.setItem(FARMER_AUTH_KEY, JSON.stringify(farmer))
  
  return { success: true, farmer }
}

// Logout farmer
export function logoutFarmer(): void {
  localStorage.removeItem(FARMER_AUTH_KEY)
}

// Update farmer profile
export function updateFarmerProfile(updates: Partial<FarmerProfile>): { success: boolean; farmer?: FarmerProfile } {
  const currentAuth = getCurrentFarmer()
  if (!currentAuth.isAuthenticated || !currentAuth.farmer) {
    return { success: false }
  }

  const updatedFarmer = { ...currentAuth.farmer, ...updates }
  
  // Save to database
  saveFarmerToDb(updatedFarmer)
  
  // Update current session
  localStorage.setItem(FARMER_AUTH_KEY, JSON.stringify(updatedFarmer))

  return { success: true, farmer: updatedFarmer }
}
