// Freshness badge for produce listings

import Badge from './Badge';

interface FreshnessBadgeProps {
  harvestTs: string;
}

export default function FreshnessBadge({ harvestTs }: FreshnessBadgeProps) {
  const harvestDate = new Date(harvestTs);
  const today = new Date();
  
  // Check if harvest date is today
  const isToday = harvestDate.toDateString() === today.toDateString();
  
  if (isToday) {
    return (
      <Badge variant="success" size="sm">
        Fresh Today
      </Badge>
    );
  }

  // Calculate days ago
  const diffTime = today.getTime() - harvestDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return (
      <Badge variant="warning" size="sm">
        1 day ago
      </Badge>
    );
  }
  
  if (diffDays <= 3) {
    return (
      <Badge variant="default" size="sm">
        {diffDays} days ago
      </Badge>
    );
  }

  return (
    <Badge variant="danger" size="sm">
      {diffDays} days ago
    </Badge>
  );
}
