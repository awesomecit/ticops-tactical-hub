import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, AlertTriangle, Info, CheckCircle, ChevronRight, User, MapPin, Crosshair, Shield, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PendingAction } from '@/mocks/admin';

interface PendingActionItemProps {
  action: PendingAction;
  index?: number;
}

const priorityConfig = {
  critical: {
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    border: 'border-destructive/50',
    icon: AlertCircle,
    label: '🔴',
  },
  high: {
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/50',
    icon: AlertTriangle,
    label: '🟠',
  },
  medium: {
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/50',
    icon: Info,
    label: '🟡',
  },
  low: {
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/50',
    icon: CheckCircle,
    label: '🟢',
  },
};

const typeIcons = {
  user: User,
  field: MapPin,
  match: Crosshair,
  referee: Shield,
  report: Flag,
};

export const PendingActionItem: React.FC<PendingActionItemProps> = ({ action, index = 0 }) => {
  const priority = priorityConfig[action.priority];
  const TypeIcon = typeIcons[action.type];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Adesso';
    if (diffHours < 24) return `${diffHours}h fa`;
    return date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
  };

  return (
    <Link
      to={action.link}
      className={cn(
        "block p-3 rounded-sm border-l-2 transition-all duration-200",
        "hover:bg-muted/50 hover:translate-x-1",
        "animate-slide-in-up",
        priority.border,
        priority.bg
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "h-8 w-8 rounded-sm flex items-center justify-center shrink-0",
          priority.bg,
          priority.color
        )}>
          <TypeIcon className="h-4 w-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{priority.label}</span>
            <span className="text-sm font-medium text-foreground truncate">
              {action.title}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {action.description}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            {formatTimestamp(action.timestamp)}
          </p>
        </div>
        
        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>
    </Link>
  );
};
