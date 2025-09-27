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

## 🧪 Demo Account

**Farmer Login:**
- Email: `demo@farmer.com`
- Password: any password (for demo)

## 📋 Features

### 🚜 Farmer Features
- **Authentication**: Simple login/registration system using localStorage
- **Dashboard**: Comprehensive farmer dashboard with listings, orders, and messages
- **Profile Management**: Detailed profiles with farming practices, certifications, and specialties
- **Customer Chat**: Direct messaging system with customers
- **Listing Management**: Add and manage produce listings with harvest dates

### 🏪 Store Features  
- **Store Dashboard**: Request produce and get matched with local farms
- **Smart Matching**: Algorithm matches by distance, freshness, and quantity
- **Order Tracking**: Real-time order status with delivery management

### 🌍 General Features
- **Live Metrics**: Impact tracking (orders, kg moved, km saved, CO₂ avoided)
- **Interactive Maps**: Visual delivery routes using react-leaflet
- **Admin Panel**: Database management and system metrics

### Pages & Flow
1. **Landing Page** (`/`) - Role switcher and live impact metrics
2. **Farmer Auth** (`/farmer/auth`) - Login/registration for farmers
3. **Farmer Dashboard** (`/farmer/dashboard`) - Manage listings, orders, and messages
4. **Farmer Profile** (`/farmer/profile`) - Comprehensive profile management
5. **Store Page** (`/store`) - Request produce and find matches
6. **Order Details** (`/orders/[id]`) - Track delivery with map visualization
7. **Admin Panel** (`/admin`) - Database management and system metrics

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

### Test the Farmer Experience:

1. **Farmer Registration/Login** (`/farmer`):
   - Click "I'm a Farmer" from landing page
   - Use demo account: `demo@farmer.com` + any password
   - Or register a new farmer account

2. **Farmer Dashboard** (`/farmer/dashboard`):
   - View comprehensive dashboard with tabs
   - Add produce listings with harvest dates
   - Check customer messages and respond
   - View order status and history

3. **Farmer Profile** (`/farmer/profile`):
   - Complete detailed profile information
   - Add farming practices and certifications
   - Specify crop specialties
   - Share farm story and experience

### Test the Store Flow:

4. **Store Dashboard** (`/store`):
   - Select a store and request produce
   - Get matched with farmers automatically
   - Create orders and track deliveries

5. **Order Management** (`/orders/[id]`):
   - View order details with interactive map
   - Mark orders as delivered
   - Handle any issues or flags

6. **Impact Tracking** (`/`):
   - See live metrics update in real-time
   - Track environmental impact

7. **Admin Panel** (`/admin`):
   - Monitor system performance
   - Reset database when needed

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
- [ ] Farmer registration/login works
- [ ] Farmer can complete profile with practices/certifications
- [ ] Farmer can add listings from dashboard
- [ ] Farmer can view and respond to customer messages
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

1. **Farmer Authentication**: Complete login/registration system
2. **Rich Farmer Profiles**: Practices, certifications, and farm stories
3. **Customer Messaging**: Direct chat between farmers and customers
4. **Real-time Updates**: Metrics update every 5 seconds
5. **Interactive Maps**: Visual delivery routes with farm/store pins
6. **Smart UI**: Responsive design with loading states
7. **Complete Flow**: End-to-end from registration to delivery
8. **Environmental Focus**: CO₂ savings and local sourcing impact

## 🚧 Future Enhancements

- **Customer Authentication**: Login system for store customers
- **Payment Processing**: Stripe/PayPal integration
- **Real-time Notifications**: Push notifications for new messages/orders
- **Mobile App**: React Native version for farmers on-the-go
- **Advanced Analytics**: Detailed reporting and insights
- **Multi-language Support**: Internationalization
- **Persistent Database**: PostgreSQL/MongoDB with user sessions
- **QR Code Scanning**: For delivery verification
- **Inventory Management**: Stock tracking and alerts
- **Review System**: Customer ratings and feedback

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