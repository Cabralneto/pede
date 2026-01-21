import { cn } from '@/lib/utils';
import { OrderStatus, ORDER_STATUS_LABELS } from '@/types';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusStyles: Record<OrderStatus, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  accepted: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  preparing: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  ready: 'bg-success/10 text-success border-success/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
        statusStyles[status],
        className
      )}
    >
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
