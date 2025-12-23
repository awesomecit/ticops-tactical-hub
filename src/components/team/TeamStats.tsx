import React from 'react';
import { cn } from '@/lib/utils';

interface TeamStatsOverviewProps {
  matches: number;
  wins: number;
  losses: number;
  winRate: number;
  className?: string;
}

export const TeamStatsOverview: React.FC<TeamStatsOverviewProps> = ({
  matches,
  wins,
  losses,
  winRate,
  className,
}) => {
  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      <div className="p-4 bg-card rounded-sm border border-border text-center">
        <span className="font-mono text-3xl font-bold text-foreground">
          {matches}
        </span>
        <p className="text-xs text-muted-foreground uppercase mt-1 font-display">
          Partite
        </p>
      </div>

      <div className="p-4 bg-card rounded-sm border border-secondary/30 text-center">
        <span className="font-mono text-3xl font-bold text-secondary">
          {wins}
        </span>
        <p className="text-xs text-muted-foreground uppercase mt-1 font-display">
          Vittorie
        </p>
      </div>

      <div className="p-4 bg-card rounded-sm border border-destructive/30 text-center">
        <span className="font-mono text-3xl font-bold text-destructive">
          {losses}
        </span>
        <p className="text-xs text-muted-foreground uppercase mt-1 font-display">
          Sconfitte
        </p>
      </div>

      <div className="p-4 bg-card rounded-sm border border-accent/30 text-center">
        <span className="font-mono text-3xl font-bold text-accent">
          {winRate.toFixed(1)}%
        </span>
        <p className="text-xs text-muted-foreground uppercase mt-1 font-display">
          Win Rate
        </p>
      </div>
    </div>
  );
};

interface GameModeStatProps {
  mode: string;
  icon: string;
  matches: number;
  wins: number;
  winRate: number;
}

interface GameModeStatsProps {
  modes: GameModeStatProps[];
  className?: string;
}

export const GameModeStats: React.FC<GameModeStatsProps> = ({
  modes,
  className,
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {modes.map((mode) => (
        <div
          key={mode.mode}
          className="flex items-center gap-3 p-3 bg-card rounded-sm border border-border hover:border-primary/30 transition-colors"
        >
          <span className="text-xl">{mode.icon}</span>
          
          <div className="flex-1">
            <p className="font-display text-sm uppercase text-foreground">
              {mode.mode}
            </p>
            <p className="text-xs text-muted-foreground">
              {mode.matches} partite • {mode.wins} vittorie
            </p>
          </div>

          <div className="text-right">
            <span className={cn(
              'font-mono text-sm font-bold',
              mode.winRate >= 60 ? 'text-secondary' : 
              mode.winRate >= 40 ? 'text-accent' : 'text-destructive'
            )}>
              {mode.winRate.toFixed(1)}%
            </span>
            <p className="text-[10px] text-muted-foreground uppercase">Win</p>
          </div>

          {/* Progress bar */}
          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                mode.winRate >= 60 ? 'bg-secondary' :
                mode.winRate >= 40 ? 'bg-accent' : 'bg-destructive'
              )}
              style={{ width: `${mode.winRate}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
