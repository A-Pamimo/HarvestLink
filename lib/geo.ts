// Geographic utilities for HarvestLink

import type { Coord } from './types';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param a First coordinate
 * @param b Second coordinate
 * @returns Distance in kilometers
 */
export function haversine(a: Coord, b: Coord): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const a1 = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1-a1));
  
  return R * c;
}

/**
 * Calculate estimated travel time based on distance
 * Assumes 40 km/h average speed
 * @param distanceKm Distance in kilometers
 * @returns ETA in minutes
 */
export function calculateETA(distanceKm: number): number {
  return Math.ceil((distanceKm / 40) * 60);
}

/**
 * Convert degrees to radians
 */
function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Generate a random coordinate within a reasonable range
 * (for demo purposes - roughly San Francisco Bay Area)
 */
export function generateRandomCoord(): Coord {
  return {
    lat: 37.7749 + (Math.random() - 0.5) * 0.5, // ±0.25 degrees
    lon: -122.4194 + (Math.random() - 0.5) * 0.5
  };
}
