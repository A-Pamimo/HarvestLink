import './globals.css'
import { Inter } from 'next/font/google'
import { QueryProvider } from '@/components/QueryProvider'
import { FarmerAuthProvider } from '@/components/FarmerAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HarvestLink - Connect Farmers & Stores',
  description: 'Connecting local farmers with stores for fresh produce delivery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <FarmerAuthProvider>
            <div className="min-h-screen bg-gray-50">
              <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                    <div className="flex items-center">
                      <a href="/" className="text-2xl font-bold text-primary-600">
                        🌱 HarvestLink
                      </a>
                    </div>
                    <div className="flex items-center space-x-4">
                      <a href="/farmer" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                        Farmer
                      </a>
                      <a href="/store" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                        Store
                      </a>
                      <a href="/admin" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                        Admin
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
              <main>{children}</main>
            </div>
          </FarmerAuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
