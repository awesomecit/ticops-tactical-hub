import React from 'react';
import { cn } from '@/lib/utils';
import { TierType } from './TierBadge';

interface TierProgressBarProps {
  currentElo: number;
  currentTier: TierType;
  className?: string;
}

const tierThresholds: Record<TierType, { min: number; max: number; color: string }> = {
  bronze: { min: 0, max: 1000, color: '#CD7F32' },
  silver: { min: 1000, max: 1400, color: '#C0C0C0' },
  gold: { min: 1400, max: 1800, color: '#FFD700' },
  platinum: { min: 1800, max: 2200, color: '#00CED1' },
  diamond: { min: 2200, max: 3000, color: '#B9F2FF' },
};

const tierOrder: TierType[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

export const TierProgressBar: React.FC<TierProgressBarProps> = ({
  currentElo,
  currentTier,
  className,
}) => {
  const currentTierData = tierThresholds[currentTier];
  const currentTierIndex = tierOrder.indexOf(currentTier);
  const nextTier = tierOrder[currentTierIndex + 1];
  const nextTierData = nextTier ? tierThresholds[nextTier] : null;

  const progressInCurrentTier = 
    ((currentElo - currentTierData.min) / (currentTierData.max - currentTierData.min)) * 100;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Tier segments */}
      <div className="flex gap-1">
        {tierOrder.map((tier, index) => {
          const tierData = tierThresholds[tier];
          const isActive = index <= currentTierIndex;
          const isCurrent = tier === currentTier;
          
          return (
            <div
              key={tier}
              className="flex-1 relative"
            >
              {/* Segment bar */}
              <div
                className={cn(
                  'h-2 rounded-sm overflow-hidden',
                  isActive ? 'opacity-100' : 'opacity-30'
                )}
                style={{ backgroundColor: `${tierData.color}40` }}
              >
                {isCurrent ? (
                  <div
                    className="h-full rounded-sm transition-all duration-500"
                    style={{
                      width: `${Math.min(progressInCurrentTier, 100)}%`,
                      backgroundColor: tierData.color,
                      boxShadow: `0 0 10px ${tierData.color}`,
                    }}
                  />
                ) : isActive ? (
                  <div
                    className="h-full w-full rounded-sm"
                    style={{
                      backgroundColor: tierData.color,
                    }}
                  />
                ) : null}
              </div>

              {/* Tier label */}
              <span
                className={cn(
                  'block text-center text-[10px] font-display uppercase mt-1',
                  isCurrent ? 'text-foreground' : 'text-muted-foreground'
                )}
                style={{ color: isCurrent ? tierData.color : undefined }}
              >
                {tier}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress text */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-mono">
          {currentTierData.min} ELO
        </span>
        <span className="font-display uppercase" style={{ color: currentTierData.color }}>
          {currentTier} → {nextTier || 'MAX'}
        </span>
        <span className="text-muted-foreground font-mono">
          {nextTierData?.min || currentTierData.max} ELO
        </span>
      </div>
    </div>
  );
};
