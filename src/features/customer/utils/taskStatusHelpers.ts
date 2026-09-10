import { TaskStatus } from '@/types';

export function getStatusBadgeVariant(status: TaskStatus) {
  switch (status) {
    case 'OPEN':
      return 'info';
    case 'IN_PROGRESS':
      return 'warning';
    case 'COMPLETED':
      return 'success';
    case 'CANCELLED':
      return 'destructive';
    case 'DRAFT':
    default:
      return 'secondary';
  }
}

export function formatTaskStatusLabel(status: TaskStatus): string {
  switch (status) {
    case 'OPEN':
      return 'Open for Proposals';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'COMPLETED':
      return 'Completed';
    case 'CANCELLED':
      return 'Cancelled';
    case 'DRAFT':
      return 'Draft';
    case 'EXPIRED':
      return 'Expired';
    default:
      return status;
  }
}
