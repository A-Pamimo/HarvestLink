import { Farm, StoreEnt, Listing, Need, Order, Metrics } from './types';

// In-memory database singleton
class InMemoryDB {
  private static instance: InMemoryDB;
  
  public farms: Farm[] = [];
  public stores: StoreEnt[] = [];
  public listings: Listing[] = [];
  public needs: Need[] = [];
  public orders: Order[] = [];

  private constructor() {
    this.seedData();
  }

  public static getInstance(): InMemoryDB {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = new InMemoryDB();
    }
    return InMemoryDB.instance;
  }

  public reset(): void {
    this.farms = [];
    this.stores = [];
    this.listings = [];
    this.needs = [];
    this.orders = [];
    this.seedData();
  }

  private seedData(): void {
    // Sample farms
    this.farms = [
      { id: 'farm1', name: 'Green Valley Farm', loc: { lat: 37.7749, lon: -122.4194 } },
      { id: 'farm2', name: 'Sunny Acres', loc: { lat: 37.7849, lon: -122.4094 } },
      { id: 'farm3', name: 'Organic Hills', loc: { lat: 37.7649, lon: -122.4294 } },
    ];

    // Sample stores (customers)
    this.stores = [
      { id: 'store1', name: 'Fresh Market Store', loc: { lat: 37.7799, lon: -122.4144 } },
      { id: 'store2', name: 'Local Grocer', loc: { lat: 37.7699, lon: -122.4244 } },
      { id: 'store3', name: 'Organic Plus', loc: { lat: 37.7899, lon: -122.4044 } },
    ];

    // Sample listings
    const now = new Date().toISOString();
    this.listings = [
      {
        id: 'listing1',
        farmId: 'farm1',
        item: 'Tomatoes',
        qtyKg: 50,
        harvestTs: now,
        createdTs: now,
      },
      {
        id: 'listing2',
        farmId: 'farm2',
        item: 'Carrots',
        qtyKg: 30,
        harvestTs: now,
        createdTs: now,
      },
    ];
  }

  public getMetrics(): Metrics {
    const deliveredOrders = this.orders.filter(o => o.status === 'DELIVERED');
    
    return {
      totalOrders: deliveredOrders.length,
      totalKgMoved: deliveredOrders.reduce((sum, o) => sum + o.qtyKg, 0),
      totalKmSaved: deliveredOrders.reduce((sum, o) => sum + o.distanceKm, 0),
      co2Avoided: deliveredOrders.reduce((sum, o) => sum + (o.distanceKm * 0.4), 0), // ~0.4kg CO2 per km
    };
  }

  // Helper function to calculate distance between two coordinates (Haversine formula)
  public calculateDistance(coord1: { lat: number; lon: number }, coord2: { lat: number; lon: number }): number {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLon = (coord2.lon - coord1.lon) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}

export const db = InMemoryDB.getInstance();
