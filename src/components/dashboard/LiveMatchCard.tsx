import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Eye } from 'lucide-react';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { cn } from '@/lib/utils';

interface LiveMatchCardProps {
  id: string;
  teamAlpha: {
    name: string;
    score: number;
  };
  teamBravo: {
    name: string;
    score: number;
  };
  fieldName: string;
  gameMode: string;
  timeElapsed: string;
  className?: string;
}

export const LiveMatchCard: React.FC<LiveMatchCardProps> = ({
  id,
  teamAlpha,
  teamBravo,
  fieldName,
  gameMode,
  timeElapsed,
  className,
}) => {
  const navigate = useNavigate();

  return (
    <TacticalCard glow="secondary" className={cn('animate-pulse-glow', className)}>
      <TacticalCardContent className="p-4">
        {/* Live indicator */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-secondary rounded-full animate-pulse" />
            <span className="font-display text-xs uppercase text-secondary tracking-wider">
              Live • {timeElapsed}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">{gameMode}</span>
        </div>

        {/* Score display */}
        <div className="flex items-center justify-between py-3">
          {/* Team Alpha */}
          <div className="flex-1 text-left">
            <p className="font-display text-sm uppercase text-team-alpha truncate">
              {teamAlpha.name}
            </p>
          </div>

          {/* Score */}
          <div className="flex items-center gap-3 px-4">
            <span className="font-mono text-3xl font-bold text-team-alpha">
              {teamAlpha.score}
            </span>
            <span className="text-muted-foreground font-display">VS</span>
            <span className="font-mono text-3xl font-bold text-team-bravo">
              {teamBravo.score}
            </span>
          </div>

          {/* Team Bravo */}
          <div className="flex-1 text-right">
            <p className="font-display text-sm uppercase text-team-bravo truncate">
              {teamBravo.name}
            </p>
          </div>
        </div>

        {/* Field & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs">{fieldName}</span>
          </div>
          <GlowButton 
            variant="secondary" 
            size="sm" 
            className="gap-1.5"
            onClick={() => navigate(`/spectator/${id}`)}
          >
            <Eye className="h-3.5 w-3.5" />
            Spettatore
          </GlowButton>
        </div>
      </TacticalCardContent>
    </TacticalCard>
  );
};
