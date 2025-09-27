// Metrics calculation utilities for HarvestLink

import type { Metrics, Order } from './types';

/**
 * Calculate metrics impact when an order is delivered
 * @param order The delivered order
 * @param currentMetrics Current metrics state
 * @returns Updated metrics
 */
export function calculateDeliveryImpact(order: Order, currentMetrics: Metrics): Metrics {
  // Calculate km saved: max(20 - order.distanceKm, 0)
  // This represents the savings vs typical supply chain distance
  const addedKmSaved = Math.max(20 - order.distanceKm, 0);
  
  // CO2 avoided calculation: 0.21 kg CO2 per km saved (estimate)
  const addedCo2KgAvoided = addedKmSaved * 0.21;

  return {
    orders: currentMetrics.orders + 1,
    kgMoved: currentMetrics.kgMoved + order.qtyKg,
    kmSaved: currentMetrics.kmSaved + addedKmSaved,
    co2KgAvoided: currentMetrics.co2KgAvoided + addedCo2KgAvoided,
  };
}

/**
 * Initialize empty metrics
 */
export function createEmptyMetrics(): Metrics {
  return {
    orders: 0,
    kgMoved: 0,
    kmSaved: 0,
    co2KgAvoided: 0,
  };
}

/**
 * Format metrics for display
 */
export function formatMetrics(metrics: Metrics) {
  return {
    orders: metrics.orders.toLocaleString(),
    kgMoved: metrics.kgMoved.toLocaleString(),
    kmSaved: Math.round(metrics.kmSaved).toLocaleString(),
    co2KgAvoided: Math.round(metrics.co2KgAvoided).toLocaleString(),
  };
}
