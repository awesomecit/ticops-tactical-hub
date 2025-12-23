import React from 'react';
import { Crosshair, Trophy, Swords, Target, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TierBadge, TierType } from '@/components/ranking';

interface TopPerformerCardProps {
  rank: 1 | 2 | 3;
  username: string;
  avatar?: string;
  tier: TierType;
  tierLevel: number;
  kdRatio: number;
  kills: number;
  trend?: 'up' | 'down' | 'same';
  className?: string;
}

const rankConfig = {
  1: { medal: '🥇', glow: 'shadow-[0_0_20px_rgba(255,215,0,0.3)]', border: 'border-accent' },
  2: { medal: '🥈', glow: 'shadow-[0_0_15px_rgba(192,192,192,0.3)]', border: 'border-slate-400' },
  3: { medal: '🥉', glow: 'shadow-[0_0_15px_rgba(205,127,50,0.3)]', border: 'border-amber-700' },
};

export const TopPerformerCard: React.FC<TopPerformerCardProps> = ({
  rank,
  username,
  avatar,
  tier,
  tierLevel,
  kdRatio,
  kills,
  trend = 'same',
  className,
}) => {
  const config = rankConfig[rank];

  return (
    <div
      className={cn(
        'relative p-4 bg-card rounded-sm border',
        config.border,
        config.glow,
        'transition-all duration-300 hover:scale-[1.02]',
        className
      )}
    >
      {/* Medal */}
      <span className="absolute -top-2 -left-2 text-2xl">{config.medal}</span>

      {/* Content */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={username}
            className="h-12 w-12 rounded-full border-2 border-border"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center font-display font-bold text-lg text-primary border-2 border-border">
            {username.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="font-display uppercase text-sm text-foreground truncate">
            {username}
          </p>
          <TierBadge tier={tier} level={tierLevel} size="sm" showLevel={false} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center gap-1">
          <Swords className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-sm font-bold text-primary">
            {kdRatio.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">K/D</span>
        </div>

        <div className="flex items-center gap-1">
          <Crosshair className="h-3.5 w-3.5 text-secondary" />
          <span className="font-mono text-xs text-muted-foreground">
            {kills} kills
          </span>
        </div>

        {/* Trend */}
        <div className={cn(
          'flex items-center',
          trend === 'up' && 'text-secondary',
          trend === 'down' && 'text-destructive',
          trend === 'same' && 'text-muted-foreground'
        )}>
          {trend === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
          {trend === 'down' && <TrendingDown className="h-3.5 w-3.5" />}
          {trend === 'same' && <Minus className="h-3.5 w-3.5" />}
        </div>
      </div>
    </div>
  );
};
