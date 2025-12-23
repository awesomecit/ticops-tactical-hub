import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  trend,
  trendValue,
  className,
}) => {
  const trendColors = {
    up: 'text-secondary',
    down: 'text-destructive',
    neutral: 'text-muted-foreground',
  };

  return (
    <TacticalCard glow="primary" interactive className={className}>
      <TacticalCardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/30">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {trend && trendValue && (
            <span className={cn('text-xs font-mono flex items-center gap-0.5', trendColors[trend])}>
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trendValue}
            </span>
          )}
        </div>
        
        <div className="mt-3">
          <span className="font-mono text-2xl font-bold text-foreground">
            {value}
          </span>
          <p className="font-display text-xs uppercase tracking-wider text-muted-foreground mt-1">
            {label}
          </p>
        </div>
      </TacticalCardContent>
    </TacticalCard>
  );
};
