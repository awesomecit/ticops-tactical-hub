import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RankPositionProps {
  rank: number;
  previousRank: number;
  size?: 'sm' | 'md' | 'lg';
  showMedal?: boolean;
  className?: string;
}

const medals = ['🥇', '🥈', '🥉'];

export const RankPosition: React.FC<RankPositionProps> = ({
  rank,
  previousRank,
  size = 'md',
  showMedal = true,
  className,
}) => {
  const change = previousRank === 0 ? rank : previousRank - rank;
  const trend: 'up' | 'down' | 'same' = change > 0 ? 'up' : change < 0 ? 'down' : 'same';

  const sizeClasses = {
    sm: { rank: 'text-lg', trend: 'text-[10px]', icon: 'h-3 w-3' },
    md: { rank: 'text-2xl', trend: 'text-xs', icon: 'h-3.5 w-3.5' },
    lg: { rank: 'text-4xl', trend: 'text-sm', icon: 'h-4 w-4' },
  };

  const trendColors = {
    up: 'text-secondary',
    down: 'text-destructive',
    same: 'text-muted-foreground',
  };

  const isTopThree = rank <= 3 && showMedal;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Rank number or medal */}
      <div className="flex items-center">
        {isTopThree ? (
          <span className={cn('leading-none', sizeClasses[size].rank)}>
            {medals[rank - 1]}
          </span>
        ) : (
          <span className={cn(
            'font-mono font-bold text-foreground leading-none',
            sizeClasses[size].rank
          )}>
            #{rank}
          </span>
        )}
      </div>

      {/* Trend indicator */}
      <div className={cn(
        'flex items-center gap-0.5 font-mono',
        trendColors[trend],
        sizeClasses[size].trend
      )}>
        {trend === 'up' && (
          <>
            <TrendingUp className={sizeClasses[size].icon} />
            <span>+{Math.abs(change)}</span>
          </>
        )}
        {trend === 'down' && (
          <>
            <TrendingDown className={sizeClasses[size].icon} />
            <span>-{Math.abs(change)}</span>
          </>
        )}
        {trend === 'same' && previousRank > 0 && (
          <Minus className={sizeClasses[size].icon} />
        )}
        {previousRank === 0 && (
          <span className="text-accent uppercase">New</span>
        )}
      </div>
    </div>
  );
};
