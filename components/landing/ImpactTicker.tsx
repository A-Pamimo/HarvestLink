'use client';

// Impact ticker component with live metrics

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Metrics, ApiResponse } from '@/lib/types';

async function fetchMetrics(): Promise<Metrics> {
  const response = await fetch('/api/metrics');
  const data: ApiResponse<Metrics> = await response.json();
  
  if (!data.ok || !data.data) {
    throw new Error(data.error || 'Failed to fetch metrics');
  }
  
  return data.data;
}

export default function ImpactTicker() {
  const [animatedMetrics, setAnimatedMetrics] = useState<Metrics>({
    orders: 0,
    kgMoved: 0,
    kmSaved: 0,
    co2KgAvoided: 0,
  });

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 7000, // Refetch every 7 seconds
  });

  // Animate numbers when metrics change
  useEffect(() => {
    if (!metrics) return;

    const duration = 1000; // 1 second animation
    const steps = 30;
    const stepDuration = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedMetrics(prev => ({
        orders: Math.round(prev.orders + (metrics.orders - prev.orders) * progress * 0.1),
        kgMoved: Math.round(prev.kgMoved + (metrics.kgMoved - prev.kgMoved) * progress * 0.1),
        kmSaved: Math.round(prev.kmSaved + (metrics.kmSaved - prev.kmSaved) * progress * 0.1),
        co2KgAvoided: Math.round(prev.co2KgAvoided + (metrics.co2KgAvoided - prev.co2KgAvoided) * progress * 0.1),
      }));

      if (step >= steps) {
        clearInterval(interval);
        setAnimatedMetrics(metrics);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [metrics]);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          🌱 Live Impact Dashboard
        </h2>
        <div className="animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        🌱 Live Impact Dashboard
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-green-600">
            {animatedMetrics.orders.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Orders Completed</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">
            {animatedMetrics.kgMoved.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">kg Fresh Produce</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-purple-600">
            {animatedMetrics.kmSaved.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">km Supply Chain Saved</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-orange-600">
            {animatedMetrics.co2KgAvoided.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">kg CO₂ Avoided*</div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        *CO₂ estimates based on reduced transport distance
      </p>
    </div>
  );
}
