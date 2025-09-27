// Basic types for HarvestLink MVP

export type Farm = { 
  id: string; 
  name: string; 
};

export type Store = { 
  id: string; 
  name: string; 
};

export type Listing = { 
  id: string; 
  farmId: string; 
  item: string; 
  quantity: number; 
  price?: number; 
};

export type Need = { 
  id: string; 
  storeId: string; 
  item: string; 
  quantity: number; 
};

export type Order = { 
  id: string; 
  listingId: string; 
  needId: string; 
  item: string; 
  quantity: number; 
  status: 'PENDING' | 'COMPLETED'; 
};
