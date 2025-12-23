import React from 'react';
import { User, MapPin, Crosshair, Shield, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { ActivityLog } from '@/mocks/admin';

interface ActivityLogItemProps {
  log: ActivityLog;
  index?: number;
}

const targetTypeConfig = {
  user: { icon: User, color: 'text-primary' },
  field: { icon: MapPin, color: 'text-secondary' },
  match: { icon: Crosshair, color: 'text-accent' },
  referee: { icon: Shield, color: 'text-primary' },
  system: { icon: Settings, color: 'text-muted-foreground' },
};

export const ActivityLogItem: React.FC<ActivityLogItemProps> = ({ log, index = 0 }) => {
  const targetConfig = targetTypeConfig[log.targetType];
  const TargetIcon = targetConfig.icon;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Adesso';
    if (diffHours < 24) return `${diffHours}h fa`;
    return date.toLocaleDateString('it-IT', { 
      day: '2-digit', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-sm",
        "hover:bg-muted/30 transition-colors",
        "animate-slide-in-up"
      )}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <Avatar className="h-8 w-8 border border-border/50">
        <AvatarImage src={log.adminAvatar} alt={log.adminName} />
        <AvatarFallback className="bg-primary/20 text-primary text-xs">
          {log.adminName.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium text-primary">{log.adminName}</span>
          <span className="text-muted-foreground"> {log.action} </span>
          <span className={cn("font-medium", targetConfig.color)}>
            {log.target}
          </span>
        </p>
      </div>
      
      <div className="flex items-center gap-2 shrink-0">
        <TargetIcon className={cn("h-4 w-4", targetConfig.color)} />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formatTimestamp(log.timestamp)}
        </span>
      </div>
    </div>
  );
};
