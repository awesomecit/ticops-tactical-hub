import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export type ActivityType = 'game' | 'achievement' | 'team' | 'rank' | 'social';

interface ActivityItemProps {
  icon: LucideIcon;
  type: ActivityType;
  text: string;
  timestamp: Date;
  isNew?: boolean;
  className?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon: Icon,
  type,
  text,
  timestamp,
  isNew = false,
  className,
}) => {
  const typeColors: Record<ActivityType, string> = {
    game: 'bg-primary/20 text-primary border-primary/30',
    achievement: 'bg-accent/20 text-accent border-accent/30',
    team: 'bg-team-alpha/20 text-team-alpha border-team-alpha/30',
    rank: 'bg-secondary/20 text-secondary border-secondary/30',
    social: 'bg-muted/50 text-muted-foreground border-muted',
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 rounded-sm transition-colors',
        isNew ? 'bg-muted/30 border-l-2 border-primary' : 'border-l-2 border-transparent',
        'hover:bg-muted/20',
        className
      )}
    >
      <div
        className={cn(
          'h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 border',
          typeColors[type]
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-snug">{text}</p>
        <span className="text-xs text-muted-foreground mt-1 block">
          {formatDistanceToNow(timestamp, { addSuffix: true, locale: it })}
        </span>
      </div>

      {isNew && (
        <span className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
      )}
    </div>
  );
};
