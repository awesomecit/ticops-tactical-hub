import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Clock, Pause, Play } from 'lucide-react';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { LiveMatch } from '@/mocks/admin';

interface LiveMatchCardProps {
  match: LiveMatch;
  index?: number;
}

export const LiveMatchCard: React.FC<LiveMatchCardProps> = ({ match, index = 0 }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  };

  const getDuration = (startedAt: string) => {
    const start = new Date(startedAt);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <Link to={`/admin/matches/${match.id}`}>
      <TacticalCard
        glow={match.status === 'live' ? 'primary' : 'secondary'}
        interactive
        className="animate-slide-in-up h-full"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <TacticalCardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                match.status === 'live' 
                  ? "border-secondary text-secondary" 
                  : "border-accent text-accent"
              )}
            >
              {match.status === 'live' ? (
                <>
                  <span className="h-2 w-2 bg-secondary rounded-full animate-pulse mr-1" />
                  LIVE
                </>
              ) : (
                <>
                  <Pause className="h-3 w-3 mr-1" />
                  PAUSED
                </>
              )}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {match.mode}
            </span>
          </div>

          <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
            {match.name}
          </h3>

          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{match.field}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                <span>{match.players}/{match.maxPlayers}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{getDuration(match.startedAt)}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                match.status === 'live' ? "bg-secondary" : "bg-accent"
              )}
              style={{ width: `${(match.players / match.maxPlayers) * 100}%` }}
            />
          </div>
        </TacticalCardContent>
      </TacticalCard>
    </Link>
  );
};
