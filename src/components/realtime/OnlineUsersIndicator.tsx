import React from 'react';
import { usePresence, OnlineUser } from '@/hooks/usePresence';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

interface OnlineUsersIndicatorProps {
  compact?: boolean;
  maxDisplay?: number;
  className?: string;
}

const statusColors: Record<OnlineUser['status'], string> = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

export const OnlineUsersIndicator: React.FC<OnlineUsersIndicatorProps> = ({
  compact = false,
  maxDisplay = 5,
  className,
}) => {
  const { onlineUsers, onlineCount } = usePresence();

  if (compact) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs",
            className
          )}>
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <Users className="h-3 w-3" />
            <span className="font-medium">{onlineCount}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="font-medium">{onlineCount} utenti online</p>
          <div className="mt-1 space-y-1 text-xs">
            {onlineUsers.slice(0, 5).map(user => (
              <div key={user.id} className="flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full", statusColors[user.status])} />
                <span>{user.username}</span>
              </div>
            ))}
            {onlineCount > 5 && (
              <p className="text-muted-foreground">+{onlineCount - 5} altri</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  const displayUsers = onlineUsers.slice(0, maxDisplay);
  const remainingCount = onlineCount - maxDisplay;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex -space-x-2">
        {displayUsers.map((user) => (
          <Tooltip key={user.id}>
            <TooltipTrigger asChild>
              <div className="relative">
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xs bg-primary/20 text-primary">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span 
                  className={cn(
                    "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background",
                    statusColors[user.status]
                  )} 
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{user.username}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                +{remainingCount}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{remainingCount} altri utenti online</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      
      <span className="text-xs text-muted-foreground">
        {onlineCount} online
      </span>
    </div>
  );
};
