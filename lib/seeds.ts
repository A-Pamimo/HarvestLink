// Seed data for HarvestLink MVP

import type { Farm, StoreEnt, Listing, Need } from './types';
import { generateRandomCoord } from './geo';
import db from './db';

/**
 * Generate unique ID
 */
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Get random item from array
 */
function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Seed farms with sample data
 */
export function seedFarms(): Farm[] {
  const farmNames = [
    'Sunny Acres Farm',
    'Green Valley Organic',
    'Mountain View Ranch',
    'Coastal Harvest Co',
    'Heritage Family Farm',
    'Fresh Fields Farm',
    'Golden Gate Growers',
    'Bay Area Organics',
  ];

  const farms: Farm[] = farmNames.map(name => ({
    id: generateId(),
    name,
    loc: generateRandomCoord(),
  }));

  farms.forEach(farm => db.addFarm(farm));
  return farms;
}

/**
 * Seed stores with sample data
 */
export function seedStores(): StoreEnt[] {
  const storeNames = [
    'Fresh Market Downtown',
    'Organic Corner Store',
    'Neighborhood Grocers',
    'Farm to Table Market',
    'Green Leaf Grocery',
    'Local Harvest Store',
    'Sustainable Foods Co',
    'Community Market',
  ];

  const stores: StoreEnt[] = storeNames.map(name => ({
    id: generateId(),
    name,
    loc: generateRandomCoord(),
  }));

  stores.forEach(store => db.addStore(store));
  return stores;
}

/**
 * Seed listings with sample data
 */
export function seedListings(farms: Farm[]): Listing[] {
  const produce = [
    'Tomatoes', 'Carrots', 'Lettuce', 'Spinach', 'Potatoes', 
    'Onions', 'Peppers', 'Cucumbers', 'Broccoli', 'Apples',
    'Oranges', 'Strawberries', 'Corn', 'Squash', 'Zucchini'
  ];

  const listings: Listing[] = [];

  // Create 15-20 listings across different farms
  for (let i = 0; i < 18; i++) {
    const farm = randomItem(farms);
    const item = randomItem(produce);
    const qtyKg = Math.floor(Math.random() * 100) + 10; // 10-110 kg
    const pricePerKg = Math.round((Math.random() * 5 + 2) * 100) / 100; // $2-7 per kg
    
    // Random harvest time (today or yesterday)
    const harvestDate = new Date();
    if (Math.random() > 0.6) {
      harvestDate.setDate(harvestDate.getDate() - 1);
    }

    const listing: Listing = {
      id: generateId(),
      farmId: farm.id,
      item,
      qtyKg,
      harvestTs: harvestDate.toISOString(),
      pricePerKg,
      createdTs: new Date().toISOString(),
    };

    listings.push(listing);
    db.addListing(listing);
  }

  return listings;
}

/**
 * Seed needs with sample data
 */
export function seedNeeds(stores: StoreEnt[]): Need[] {
  const produce = [
    'Tomatoes', 'Carrots', 'Lettuce', 'Spinach', 'Potatoes', 
    'Onions', 'Peppers', 'Cucumbers', 'Broccoli', 'Apples',
  ];

  const needs: Need[] = [];

  // Create 8-12 needs across different stores
  for (let i = 0; i < 10; i++) {
    const store = randomItem(stores);
    const item = randomItem(produce);
    const qtyKg = Math.floor(Math.random() * 50) + 5; // 5-55 kg
    
    // Need by date (tomorrow or day after)
    const needByDate = new Date();
    needByDate.setDate(needByDate.getDate() + Math.floor(Math.random() * 2) + 1);

    const need: Need = {
      id: generateId(),
      storeId: store.id,
      item,
      qtyKg,
      needByTs: needByDate.toISOString(),
      createdTs: new Date().toISOString(),
    };

    needs.push(need);
    db.addNeed(need);
  }

  return needs;
}

/**
 * Seed all data
 */
export function seedAll() {
  // Reset existing data
  db.reset();

  // Seed in order
  const farms = seedFarms();
  const stores = seedStores();
  const listings = seedListings(farms);
  const needs = seedNeeds(stores);

  return {
    farms,
    stores,
    listings,
    needs,
    stats: db.getStats(),
  };
}
