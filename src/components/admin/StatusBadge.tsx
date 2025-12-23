import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusType = 'active' | 'pending' | 'suspended' | 'banned' | 'warned' | 'exam';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  active: {
    label: 'Attivo',
    className: 'bg-secondary/20 text-secondary border-secondary/50',
  },
  pending: {
    label: 'In Attesa',
    className: 'bg-accent/20 text-accent border-accent/50',
  },
  suspended: {
    label: 'Sospeso',
    className: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50',
  },
  banned: {
    label: 'Bannato',
    className: 'bg-destructive/20 text-destructive border-destructive/50',
  },
  warned: {
    label: 'Avvertito',
    className: 'bg-accent/20 text-accent border-accent/50',
  },
  exam: {
    label: 'Esame',
    className: 'bg-primary/20 text-primary border-primary/50',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={cn('text-xs font-medium', config.className, className)}
    >
      {config.label}
    </Badge>
  );
};
