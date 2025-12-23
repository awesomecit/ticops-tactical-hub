import React from 'react';
import { Calendar, MapPin, Users, Gamepad2 } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface UpcomingMatchCardProps {
  id: string;
  name: string;
  date: Date;
  fieldName: string;
  gameMode: string;
  gameModeIcon: string;
  registeredCount: number;
  maxPlayers: number;
  className?: string;
}

export const UpcomingMatchCard: React.FC<UpcomingMatchCardProps> = ({
  name,
  date,
  fieldName,
  gameMode,
  gameModeIcon,
  registeredCount,
  maxPlayers,
  className,
}) => {
  const isFull = registeredCount >= maxPlayers;
  const isAlmostFull = registeredCount >= maxPlayers * 0.8;

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-3 rounded-sm border border-border/50 bg-card/50',
        'hover:border-primary/50 hover:bg-card transition-all duration-200',
        'group cursor-pointer',
        className
      )}
    >
      {/* Date block */}
      <div className="flex-shrink-0 w-14 h-14 bg-primary/10 clip-tactical-sm border border-primary/30 flex flex-col items-center justify-center">
        <span className="font-mono text-lg font-bold text-primary leading-none">
          {format(date, 'd')}
        </span>
        <span className="font-display text-[10px] uppercase text-muted-foreground">
          {format(date, 'MMM', { locale: it })}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-display text-sm uppercase text-foreground truncate group-hover:text-primary transition-colors">
          {name}
        </h4>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(date, 'HH:mm')}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {fieldName}
          </span>
          <span className="flex items-center gap-1">
            <Gamepad2 className="h-3 w-3" />
            {gameMode}
          </span>
        </div>
      </div>

      {/* Players count */}
      <div className="flex-shrink-0 text-right">
        <div className={cn(
          'flex items-center gap-1 font-mono text-sm',
          isFull ? 'text-destructive' : isAlmostFull ? 'text-accent' : 'text-secondary'
        )}>
          <Users className="h-3.5 w-3.5" />
          {registeredCount}/{maxPlayers}
        </div>
        <span className={cn(
          'text-[10px] uppercase font-display',
          isFull ? 'text-destructive' : 'text-muted-foreground'
        )}>
          {isFull ? 'Completo' : 'Iscritti'}
        </span>
      </div>
    </div>
  );
};
