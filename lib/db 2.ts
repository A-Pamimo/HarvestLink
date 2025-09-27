// Simple in-memory database for HarvestLink MVP

import type { Farm, Store, Listing, Need, Order } from './types';

// Simple data store
let farms: Farm[] = [];
let stores: Store[] = [];
let listings: Listing[] = [];
let needs: Need[] = [];
let orders: Order[] = [];

// Generate simple ID
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Database functions
export const db = {
  // Farms
  getFarms: () => farms,
  addFarm: (farm: Omit<Farm, 'id'>) => {
    const newFarm = { ...farm, id: generateId() };
    farms.push(newFarm);
    return newFarm;
  },

  // Stores
  getStores: () => stores,
  addStore: (store: Omit<Store, 'id'>) => {
    const newStore = { ...store, id: generateId() };
    stores.push(newStore);
    return newStore;
  },

  // Listings
  getListings: () => listings,
  getListingsByFarm: (farmId: string) => listings.filter(l => l.farmId === farmId),
  addListing: (listing: Omit<Listing, 'id'>) => {
    const newListing = { ...listing, id: generateId() };
    listings.push(newListing);
    return newListing;
  },

  // Needs
  getNeeds: () => needs,
  getNeedsByStore: (storeId: string) => needs.filter(n => n.storeId === storeId),
  addNeed: (need: Omit<Need, 'id'>) => {
    const newNeed = { ...need, id: generateId() };
    needs.push(newNeed);
    return newNeed;
  },

  // Orders
  getOrders: () => orders,
  addOrder: (order: Omit<Order, 'id'>) => {
    const newOrder = { ...order, id: generateId() };
    orders.push(newOrder);
    return newOrder;
  },

  // Reset all data
  reset: () => {
    farms = [];
    stores = [];
    listings = [];
    needs = [];
    orders = [];
  },

  // Seed sample data
  seed: () => {
    db.reset();
    
    // Add sample farms
    const farm1 = db.addFarm({ name: 'Sunny Acres Farm' });
    const farm2 = db.addFarm({ name: 'Green Valley Organic' });
    
    // Add sample stores
    const store1 = db.addStore({ name: 'Fresh Market Downtown' });
    const store2 = db.addStore({ name: 'Organic Corner Store' });
    
    // Add sample listings
    db.addListing({ farmId: farm1.id, item: 'Tomatoes', quantity: 50, price: 3.50 });
    db.addListing({ farmId: farm2.id, item: 'Carrots', quantity: 30, price: 2.00 });
    
    // Add sample needs
    db.addNeed({ storeId: store1.id, item: 'Tomatoes', quantity: 25 });
    db.addNeed({ storeId: store2.id, item: 'Carrots', quantity: 20 });
  }
};
