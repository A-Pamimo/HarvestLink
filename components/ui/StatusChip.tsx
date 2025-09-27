// Status chip component for order status

import Badge from './Badge';

interface StatusChipProps {
  status: 'CREATED' | 'DELIVERED' | 'FLAGGED';
}

export default function StatusChip({ status }: StatusChipProps) {
  const statusConfig = {
    CREATED: {
      label: 'Created',
      variant: 'default' as const,
    },
    DELIVERED: {
      label: 'Delivered',
      variant: 'success' as const,
    },
    FLAGGED: {
      label: 'Flagged',
      variant: 'danger' as const,
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}
