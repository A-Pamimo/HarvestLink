import './globals.css'
import { QueryProvider } from '@/components/QueryProvider'
import { FarmerAuthProvider } from '@/components/FarmerAuthProvider'
import { Toaster } from 'react-hot-toast'

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
      <body className="min-h-screen bg-brand-background text-brand-text">
        <QueryProvider>
          <FarmerAuthProvider>
            <main className="min-h-screen">{children}</main>
          </FarmerAuthProvider>
        </QueryProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />
      </body>
    </html>
  )
}
