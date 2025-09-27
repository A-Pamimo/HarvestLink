🌱 HarvestLink — Hackathon MVP (QR-Free)

HarvestLink is a farm-to-store connector that makes sourcing local produce seamless. 
Farmers list available crops in seconds, stores request inventory instantly, and matches are made by distance and freshness. 
Orders are tracked on a map, deliveries confirmed manually, and an Impact Ticker shows food moved and kilometers saved.  

------------------------------------------------------------
🚀 Features (Hackathon MVP)

- Farmer can create listings (item, qty, harvest date, location).
- Store can post needs and get best match instantly.
- Order detail page shows farm → store map, summary, and status toggle.
- Delivery is confirmed manually (button), updating impact metrics.
- Landing page shows live Impact Ticker with orders, kg, and km saved.
- Admin page allows resetting data and monitoring metrics.

------------------------------------------------------------
📂 File Structure

app/
  layout.tsx
  page.tsx                   # Landing
  farmer/page.tsx
  store/page.tsx
  orders/[id]/page.tsx
  admin/page.tsx
  api/
    seed/route.ts
    metrics/route.ts
    listings/route.ts
    needs/route.ts
    match/route.ts
    orders/[id]/route.ts
    orders/[id]/deliver/route.ts
    orders/[id]/flag/route.ts

components/
  landing/ImpactTicker.tsx
  landing/RoleSwitcher.tsx
  farmer/ListingForm.tsx
  farmer/ListingsTable.tsx
  store/NeedForm.tsx
  store/MatchCard.tsx
  order/OrderSummary.tsx
  order/OrderMap.tsx
  ui/Badge.tsx
  ui/StatusChip.tsx
  ui/Toast.tsx

lib/
  types.ts
  geo.ts
  metrics.ts
  db.ts           # in-memory store singleton
  seeds.ts

styles/
  globals.css

------------------------------------------------------------
🛠️ Data Model

type Coord = { lat: number; lon: number };

type Farm = { id: string; name: string; loc: Coord };
type StoreEnt = { id: string; name: string; loc: Coord };

type Listing = {
  id: string;
  farmId: string;
  item: string;
  qtyKg: number;
  harvestTs: string;
  pricePerKg?: number;
  createdTs: string;
};

type Need = {
  id: string;
  storeId: string;
  item: string;
  qtyKg: number;
  needByTs: string;
  createdTs: string;
};

type Order = {
  id: string;
  listingId: string;
  needId: string;
  item: string;
  qtyKg: number;
  distanceKm: number;
  etaMin: number;
  status: 'CREATED' | 'DELIVERED' | 'FLAGGED';
  createdTs: string;
  deliveredTs?: string;
};

type Metrics = {
  orders: number;
  kgMoved: number;
  kmSaved: number;
  co2KgAvoided: number;
};

------------------------------------------------------------
🔌 API Contracts

- POST /api/listings → create listing  
- GET /api/listings?farmId=… → fetch farmer listings  
- POST /api/needs → create store need  
- POST /api/match { needId } → create order with best match  
- GET /api/orders/:id → get order details  
- POST /api/orders/:id/deliver → mark order delivered + update metrics  
- POST /api/orders/:id/flag → mark order flagged  
- GET /api/metrics → fetch metrics  
- POST /api/seed → reset DB with sample data  

------------------------------------------------------------
🌍 Pages & Purposes

Landing `/`
- Purpose: Orient & route users, show impact.
- Sections: Hero + CTA (Farmer/Store), Impact Ticker, “How it works”.

Farmer `/farmer`
- Purpose: Farmers create and view listings.
- Sections: ListingForm, ListingsTable.

Store `/store`
- Purpose: Stores post needs and see matches.
- Sections: NeedForm, MatchCard → “Create Order”.

Order `/orders/[id]`
- Purpose: Track details, confirm delivery.
- Sections: OrderSummary, OrderMap, status toggle buttons.

Admin `/admin`
- Purpose: Reset data, monitor metrics.
- Sections: SeedControls, MetricsPanel.

------------------------------------------------------------
✅ Acceptance Criteria

Landing:
- Metrics show and refresh live.
- Role buttons route correctly.

Farmer:
- Listings can be created and appear in table.

Store:
- Needs can be created; match returns with distance/ETA.

Order:
- Map shows farm → store.
- “Mark Delivered” updates status + metrics.
- “Flag Issue” disables delivery and marks order flagged.

Admin:
- Seed/reset clears DB and resets metrics.

------------------------------------------------------------
👩‍💻 Work Split (3 Devs)

Dev A — Landing & Farmer
- Pages: `/`, `/farmer`
- Components: RoleSwitcher, ImpactTicker, ListingForm, ListingsTable
- Depends on: /api/listings, /api/metrics

Dev B — Store & Matching
- Page: `/store`
- Components: NeedForm, MatchCard
- Depends on: /api/needs, /api/match

Dev C — Orders, Map & Admin
- Pages: `/orders/[id]`, `/admin`
- Components: OrderSummary, OrderMap, StatusChip, MetricsPanel
- Depends on: /api/orders/:id, /api/orders/:id/deliver, /api/metrics, /api/seed

------------------------------------------------------------
⏱️ Build Phases (Hackathon Timeline)

Phase 1 (Core APIs + Forms): Listings + Needs endpoints, Farmer/Store forms.
Phase 2 (Matching + Orders): Match logic, order creation, order detail page.
Phase 3 (Map + Deliver): Route visualization, deliver/flag buttons, metrics update.
Phase 4 (Impact + Admin): Landing ticker wired to metrics, admin seed/reset.
Phase 5 (Polish): Toasts, badges, animations, mobile styles.

------------------------------------------------------------
📊 Metrics Logic

- Distance (km): Haversine formula.
- ETA (minutes): distance / 40 * 60 (assuming 40 km/h).
- Km Saved: max(20 - distance, 0) (baseline 20 km).
- CO₂ Avoided: kmSaved * 0.21 (avg car emissions, kg/km).
- Kg Moved: order.qtyKg.

------------------------------------------------------------
🧭 Future Hooks

- QR escrow verification.
- SMS/WhatsApp listing input for low-tech farmers.
- AI assist: photo-to-SKU, smart pricing, surplus rescue alerts.
- Agentic AI roadmap: autonomous farmer/store/logistics agents.

------------------------------------------------------------
📝 TODO Checklist

[ ] Scaffold Next.js app, Tailwind, React Query  
[ ] Implement /api/seed with sample farms/stores/listings  
[ ] Build Landing page with ImpactTicker + RoleSwitcher  
[ ] Build Farmer page with ListingForm + ListingsTable  
[ ] Build Store page with NeedForm + MatchCard  
[ ] Implement /api/match with haversine scoring  
[ ] Build Order page with OrderSummary + OrderMap + Deliver/Flag  
[ ] Build Admin page with SeedControls + MetricsPanel  
[ ] Wire ImpactTicker to /api/metrics (poll every 5–10s)  
[ ] Add badges, toasts, and polish  
[ ] Rehearse demo flow (Farmer → Store → Order → Deliver → Metrics)  

------------------------------------------------------------
👩‍⚖️ Demo Flow (for judges)

1. Farmer lists cucumbers.  
2. Store requests cucumbers.  
3. Match appears with distance + ETA.  
4. Store creates order → Order page with map.  
5. Click “Mark Delivered” → status updates; landing ticker increments.  
6. Show admin metrics + seed reset.  
