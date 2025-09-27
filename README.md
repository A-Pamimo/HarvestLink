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

## 🧪 Demo Accounts

**Farmer Login:**
- Email: `demo@farmer.com`
- Password: any password (for demo)

**Customer Login:**
- Email: `demo@customer.com`
- Password: any password (for demo)

## 📋 Features

### 🚜 Farmer Features
- **Authentication**: Simple login/registration system using localStorage
- **Dashboard**: Comprehensive farmer dashboard with listings, orders, and messages
- **Profile Management**: Detailed profiles with farming practices, certifications, and specialties
- **Customer Chat**: Direct messaging system with customers
- **Listing Management**: Add and manage produce listings with harvest dates

### 🏪 Customer Features  
- **Authentication**: Complete login/registration system using localStorage
- **Customer Dashboard**: Request produce and get matched with local farms
- **Profile Management**: Detailed business profiles with supplier preferences and certification requirements
- **Farmer Messaging**: Direct chat system with farmers
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
5. **Customer Auth** (`/customer/auth`) - Login/registration for customers
6. **Customer Dashboard** (`/customer/dashboard`) - Request produce and manage orders
7. **Customer Profile** (`/customer/profile`) - Business profile management
8. **Order Details** (`/orders/[id]`) - Track delivery with map visualization
9. **Admin Panel** (`/admin`) - Database management and system metrics

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

### Test the Customer Experience:

4. **Customer Registration/Login** (`/customer`):
   - Click "I'm a Customer" from landing page
   - Use demo account: `demo@customer.com` + any password
   - Or register a new customer account

5. **Customer Dashboard** (`/customer/dashboard`):
   - View comprehensive dashboard with tabs
   - Request produce from local farmers
   - Check farmer messages and respond
   - View order status and history

6. **Customer Profile** (`/customer/profile`):
   - Complete detailed business profile
   - Set supplier preferences and certification requirements
   - Specify business type and description

### Test the Order Flow:

7. **Order Creation**:
   - Customer requests produce → Gets matched with farmers
   - Automatic order creation with smart algorithm

8. **Order Management** (`/orders/[id]`):
   - View order details with interactive map
   - Mark orders as delivered
   - Handle any issues or flags

9. **Impact Tracking** (`/`):
   - See live metrics update in real-time
   - Track environmental impact

10. **Admin Panel** (`/admin`):
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
- [ ] Customer registration/login works
- [ ] Customer can complete business profile with preferences
- [ ] Customer can request produce from dashboard
- [ ] Customer can view and respond to farmer messages
- [ ] Smart matching creates orders automatically
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

1. **Dual Authentication**: Complete login/registration for both farmers and customers
2. **Rich Profiles**: Detailed profiles for farmers (practices, certifications) and customers (business info, preferences)
3. **Bi-directional Messaging**: Direct chat system between farmers and customers
4. **Smart Matching**: Advanced algorithm matching by distance, freshness, and quantity
5. **Real-time Updates**: Live metrics updating every 5 seconds
6. **Interactive Maps**: Visual delivery routes with farm/customer location pins
7. **Professional UI**: Responsive design with role-specific dashboards
8. **Complete Flow**: End-to-end from registration to delivery for both user types
9. **Environmental Focus**: CO₂ savings and local sourcing impact tracking

## 🚧 Future Enhancements

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