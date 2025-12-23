import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface EloProgressBarProps {
  currentElo: number;
  tierName: string;
  nextTierElo: number;
  prevTierElo: number;
  className?: string;
}

export const EloProgressBar: React.FC<EloProgressBarProps> = ({
  currentElo,
  tierName,
  nextTierElo,
  prevTierElo,
  className,
}) => {
  const progress = ((currentElo - prevTierElo) / (nextTierElo - prevTierElo)) * 100;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground font-display uppercase text-xs">
            ELO Rating
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-bold text-primary">
            {currentElo}
          </span>
          <span className="text-xs text-muted-foreground">
            / {nextTierElo}
          </span>
        </div>
      </div>
      
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-accent transition-all duration-500 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
        <div 
          className="absolute inset-y-0 w-1 bg-accent/80 animate-pulse"
          style={{ left: `${clampedProgress}%`, transform: 'translateX(-50%)' }}
        />
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{prevTierElo}</span>
        <span className="text-accent font-display uppercase">
          {nextTierElo - currentElo} ELO per il prossimo tier
        </span>
        <span className="text-muted-foreground">{nextTierElo}</span>
      </div>
    </div>
  );
};
