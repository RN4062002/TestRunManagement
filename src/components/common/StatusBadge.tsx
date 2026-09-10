import React from 'react';
import { TaskStatus, PaymentStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Clock, PlayCircle, CheckCircle2, XCircle, FileEdit, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: TaskStatus | PaymentStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'DRAFT':
      return (
        <Badge variant="secondary" className="gap-1 bg-slate-100 text-slate-700 border-slate-200">
          <FileEdit className="w-3 h-3" /> Draft
        </Badge>
      );
    case 'OPEN':
      return (
        <Badge variant="info" className="gap-1 bg-sky-50 text-sky-700 border-sky-200">
          <Clock className="w-3 h-3 text-sky-600" /> Open for Bids
        </Badge>
      );
    case 'IN_PROGRESS':
      return (
        <Badge variant="warning" className="gap-1 bg-amber-50 text-amber-700 border-amber-200">
          <PlayCircle className="w-3 h-3 text-amber-600" /> In Progress
        </Badge>
      );
    case 'COMPLETED':
    case 'RELEASED':
      return (
        <Badge variant="success" className="gap-1 bg-emerald-50 text-emerald-700 border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed
        </Badge>
      );
    case 'CANCELLED':
    case 'FAILED':
      return (
        <Badge variant="destructive" className="gap-1 bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 text-red-600" /> Cancelled
        </Badge>
      );
    case 'HELD_IN_ESCROW':
      return (
        <Badge variant="warning" className="gap-1 bg-purple-50 text-purple-700 border-purple-200">
          <AlertCircle className="w-3 h-3 text-purple-600" /> In Escrow
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};
