export type Coord = { lat: number; lon: number };

export type Farm = { 
  id: string; 
  name: string; 
  loc: Coord 
};

export type StoreEnt = { 
  id: string; 
  name: string; 
  loc: Coord 
};

export type Listing = { 
  id: string; 
  farmId: string; 
  item: string; 
  qtyKg: number; 
  harvestTs: string; 
  createdTs: string 
};

export type Need = { 
  id: string; 
  storeId: string; 
  item: string; 
  qtyKg: number; 
  needByTs: string; 
  createdTs: string 
};

export type Order = { 
  id: string; 
  listingId: string; 
  needId: string; 
  item: string; 
  qtyKg: number; 
  distanceKm: number; 
  etaMin: number; 
  status: 'CREATED' | 'DELIVERED' | 'FLAGGED'; 
  createdTs: string; 
  deliveredTs?: string 
};

export type Metrics = {
  totalOrders: number;
  totalKgMoved: number;
  totalKmSaved: number;
  co2Avoided: number;
};

export type MatchResult = {
  order: Order;
  farm: Farm;
  store: StoreEnt;
  matchScore: number;
};
