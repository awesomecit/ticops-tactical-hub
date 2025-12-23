import React from 'react';
import { cn } from '@/lib/utils';
import { TierBadge, TierType } from './TierBadge';
import { RankPosition } from './RankPosition';

interface LeaderboardRowProps {
  rank: number;
  previousRank: number;
  username: string;
  avatar?: string;
  tier: TierType;
  tierLevel: number;
  elo: number;
  winRate: number;
  kdRatio: number;
  isCurrentUser?: boolean;
  className?: string;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  rank,
  previousRank,
  username,
  avatar,
  tier,
  tierLevel,
  elo,
  winRate,
  kdRatio,
  isCurrentUser = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 transition-all duration-200',
        'hover:bg-muted/30 cursor-pointer group',
        isCurrentUser && [
          'bg-primary/10 border-l-2 border-primary',
          'shadow-[inset_0_0_20px_rgba(255,107,0,0.1)]',
        ],
        className
      )}
    >
      {/* Rank Position */}
      <div className="w-16 sm:w-20 flex-shrink-0">
        <RankPosition
          rank={rank}
          previousRank={previousRank}
          size="sm"
        />
      </div>

      {/* Avatar */}
      <div className="flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={username}
            className="h-10 w-10 rounded-full border-2 border-border"
          />
        ) : (
          <div className={cn(
            'h-10 w-10 rounded-full flex items-center justify-center font-display font-bold text-lg',
            'bg-card border-2 border-border',
            isCurrentUser && 'border-primary bg-primary/20 text-primary'
          )}>
            {username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Player Info */}
      <div className="flex-1 min-w-0 flex items-center gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn(
              'font-display uppercase text-sm truncate',
              isCurrentUser ? 'text-primary' : 'text-foreground'
            )}>
              {username}
            </span>
            {isCurrentUser && (
              <span className="text-[10px] font-mono bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                TU
              </span>
            )}
          </div>
        </div>
        
        {/* Tier Badge - visible on larger screens in this column */}
        <div className="hidden sm:block">
          <TierBadge tier={tier} level={tierLevel} size="sm" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="flex items-center gap-4 sm:gap-6 text-right">
        {/* Tier - Mobile only */}
        <div className="sm:hidden">
          <TierBadge tier={tier} level={tierLevel} size="sm" showLevel={false} />
        </div>

        {/* ELO */}
        <div className="hidden xs:block sm:w-16">
          <span className="font-mono text-sm font-bold text-primary">
            {elo.toLocaleString()}
          </span>
          <p className="text-[10px] text-muted-foreground uppercase">ELO</p>
        </div>

        {/* Win Rate */}
        <div className="hidden sm:block sm:w-14">
          <span className="font-mono text-sm text-foreground">
            {winRate.toFixed(1)}%
          </span>
          <p className="text-[10px] text-muted-foreground uppercase">Win</p>
        </div>

        {/* K/D */}
        <div className="w-12 sm:w-14">
          <span className="font-mono text-sm text-foreground">
            {kdRatio.toFixed(2)}
          </span>
          <p className="text-[10px] text-muted-foreground uppercase">K/D</p>
        </div>
      </div>
    </div>
  );
};
