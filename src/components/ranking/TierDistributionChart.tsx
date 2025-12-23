import React from 'react';
import { cn } from '@/lib/utils';
import { TierType } from './TierBadge';

interface TierDistribution {
  tier: TierType;
  percentage: number;
  count: number;
}

interface TierDistributionChartProps {
  className?: string;
}

const tierColors: Record<TierType, string> = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#00CED1',
  diamond: '#B9F2FF',
};

// Mock distribution data
const distribution: TierDistribution[] = [
  { tier: 'bronze', percentage: 35, count: 4280 },
  { tier: 'silver', percentage: 28, count: 3420 },
  { tier: 'gold', percentage: 22, count: 2690 },
  { tier: 'platinum', percentage: 11, count: 1340 },
  { tier: 'diamond', percentage: 4, count: 490 },
];

export const TierDistributionChart: React.FC<TierDistributionChartProps> = ({
  className,
}) => {
  const maxPercentage = Math.max(...distribution.map(d => d.percentage));

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="font-display text-sm uppercase text-muted-foreground tracking-wider">
        Distribuzione Tier
      </h3>
      
      <div className="space-y-2">
        {distribution.map(({ tier, percentage, count }) => (
          <div key={tier} className="group">
            <div className="flex items-center justify-between mb-1">
              <span
                className="text-xs font-display uppercase"
                style={{ color: tierColors[tier] }}
              >
                {tier}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {percentage}% ({count.toLocaleString()})
              </span>
            </div>
            
            <div className="h-4 bg-muted/30 rounded-sm overflow-hidden">
              <div
                className="h-full rounded-sm transition-all duration-500 group-hover:opacity-80"
                style={{
                  width: `${(percentage / maxPercentage) * 100}%`,
                  backgroundColor: tierColors[tier],
                  boxShadow: `0 0 8px ${tierColors[tier]}60`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total players */}
      <div className="pt-2 border-t border-border/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-display uppercase">
            Giocatori Totali
          </span>
          <span className="font-mono text-foreground">
            {distribution.reduce((sum, d) => sum + d.count, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
