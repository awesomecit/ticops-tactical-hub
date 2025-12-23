import React from 'react';
import { Users, MapPin, Crosshair, Shield, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { cn } from '@/lib/utils';

interface AdminStatCardProps {
  label: string;
  value: number;
  todayValue?: number;
  growth?: number;
  pending?: number;
  icon: string;
  index?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  'map-pin': MapPin,
  crosshair: Crosshair,
  shield: Shield,
};

export const AdminStatCard: React.FC<AdminStatCardProps> = ({
  label,
  value,
  todayValue,
  growth,
  pending,
  icon,
  index = 0,
}) => {
  const IconComponent = iconMap[icon] || Users;

  return (
    <TacticalCard
      glow="primary"
      interactive
      className="animate-slide-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <TacticalCardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              {label}
            </p>
            <p className="text-2xl font-bold text-foreground">{value.toLocaleString()}</p>
            
            <div className="flex items-center gap-3 mt-2">
              {todayValue !== undefined && (
                <span className="flex items-center gap-1 text-xs text-secondary">
                  <Clock className="h-3 w-3" />
                  +{todayValue} oggi
                </span>
              )}
              
              {growth !== undefined && (
                <span className={cn(
                  "flex items-center gap-1 text-xs",
                  growth >= 0 ? "text-secondary" : "text-destructive"
                )}>
                  {growth >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {growth >= 0 ? '+' : ''}{growth}%
                </span>
              )}
              
              {pending !== undefined && pending > 0 && (
                <span className="flex items-center gap-1 text-xs text-accent">
                  <span className="h-2 w-2 bg-accent rounded-full animate-pulse" />
                  {pending} pending
                </span>
              )}
            </div>
          </div>
          
          <div className="h-12 w-12 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/30">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
        </div>
      </TacticalCardContent>
    </TacticalCard>
  );
};
