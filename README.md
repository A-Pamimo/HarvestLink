# HarvestLink 🌱

A hackathon MVP that connects local farmers with stores for fresh produce delivery. Built with Next.js, TypeScript, and TailwindCSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📋 Features

### Core Functionality
- **Farmer Dashboard**: List fresh produce with harvest dates and quantities
- **Store Dashboard**: Request produce and get matched with local farms
- **Smart Matching**: Algorithm matches by distance, freshness, and quantity
- **Order Tracking**: Real-time order status with delivery management
- **Live Metrics**: Impact tracking (orders, kg moved, km saved, CO₂ avoided)
- **Interactive Maps**: Visual delivery routes using react-leaflet

### Pages & Flow
1. **Landing Page** (`/`) - Role switcher and live impact metrics
2. **Farmer Page** (`/farmer`) - Add listings and view inventory
3. **Store Page** (`/store`) - Request produce and find matches
4. **Order Details** (`/orders/[id]`) - Track delivery with map visualization
5. **Admin Panel** (`/admin`) - Database management and system metrics

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Data Fetching**: React Query (@tanstack/react-query)
- **Maps**: react-leaflet + OpenStreetMap
- **Database**: In-memory singleton (lib/db.ts)
- **Styling**: TailwindCSS with custom green theme

## 📁 Project Structure

```
HarvestLink/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── listings/      # Farmer produce listings
│   │   ├── needs/         # Store produce requests
│   │   ├── match/         # Smart matching algorithm
│   │   ├── orders/        # Order management
│   │   ├── metrics/       # Impact metrics
│   │   └── seed/          # Database reset
│   ├── farmer/            # Farmer dashboard
│   ├── store/             # Store dashboard
│   ├── orders/[id]/       # Order details page
│   ├── admin/             # Admin panel
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
├── lib/                   # Utilities and database
│   ├── types.ts           # TypeScript interfaces
│   └── db.ts              # In-memory database
└── public/               # Static assets
```

## 🔄 Complete User Flow

### Test the Full Flow:

1. **Start as Farmer** (`/farmer`):
   - Select "Green Valley Farm"
   - Add listing: "Tomatoes", 50kg, today's date
   - View listing in table

2. **Switch to Store** (`/store`):
   - Select "Fresh Market"
   - Request: "Tomatoes", 25kg, needed by tomorrow
   - Click "Find Match" → Creates order automatically

3. **View Order** (`/orders/[id]`):
   - See order summary with farm/store details
   - View delivery route on interactive map
   - Click "Mark as Delivered" → Updates metrics

4. **Check Impact** (`/`):
   - See live metrics update (orders, kg moved, CO₂ saved)
   - Metrics refresh every 5 seconds

5. **Admin Panel** (`/admin`):
   - View system metrics and data overview
   - Reset database to restore sample data

## 🎯 Key Features Explained

### Smart Matching Algorithm
- **Distance Priority**: Closest farms get higher match scores
- **Freshness Factor**: Recently harvested produce prioritized
- **Quantity Matching**: Ensures sufficient inventory
- **Real-time ETA**: Calculates delivery time (~3 min/km)

### Impact Metrics
- **Orders Completed**: Total delivered orders
- **Kg Fresh Produce**: Total weight of delivered goods
- **Km Saved**: Direct farm-to-store distance
- **CO₂ Avoided**: Environmental impact (~0.4kg CO₂/km)

### Database Design
- **In-Memory Storage**: Simple singleton for hackathon MVP
- **Sample Data**: Pre-loaded farms, stores, and listings
- **Auto-Reset**: Admin can restore sample data anytime

## 🧪 Testing & Development

### Manual Testing Checklist:
- [ ] Farmer can add listings
- [ ] Store can request produce
- [ ] Matching creates orders
- [ ] Order page shows details + map
- [ ] Delivery updates metrics
- [ ] Admin panel works
- [ ] Metrics update live

### Development Commands:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌟 Highlights for Demo

1. **Real-time Updates**: Metrics update every 5 seconds
2. **Interactive Maps**: Visual delivery routes with farm/store pins
3. **Smart UI**: Responsive design with loading states
4. **Complete Flow**: End-to-end from listing to delivery
5. **Environmental Focus**: CO₂ savings and local sourcing impact

## 🚧 Future Enhancements

- User authentication and roles
- Payment processing integration
- QR code scanning for deliveries
- Push notifications
- Persistent database (PostgreSQL/MongoDB)
- Mobile app with React Native

## 📝 API Endpoints

- `POST /api/listings` - Create farmer listing
- `GET /api/listings?farmId=ID` - Get farm listings
- `POST /api/needs` - Create store need
- `POST /api/match` - Find and create order
- `GET /api/orders/:id` - Get order details
- `POST /api/orders/:id/deliver` - Mark delivered
- `POST /api/orders/:id/flag` - Flag issue
- `GET /api/metrics` - Get impact metrics
- `POST /api/seed` - Reset database

---

**Built for hackathon MVP** - Simple, functional, and ready to demo! 🎉