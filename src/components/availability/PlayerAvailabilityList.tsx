import React from 'react';
import { Users, MapPin, Clock, Star, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserAvailability } from '@/types/availability';
import { format, isSameDay, isToday, addDays } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface PlayerAvailabilityListProps {
  availabilities: UserAvailability[];
  selectedDate?: Date;
  onPlayerClick?: (userId: string) => void;
  compact?: boolean;
}

export const PlayerAvailabilityList: React.FC<PlayerAvailabilityListProps> = ({
  availabilities,
  selectedDate,
  onPlayerClick,
  compact = false,
}) => {
  // Filter by selected date if provided
  const filteredAvailabilities = selectedDate
    ? availabilities.filter((a) => isSameDay(a.date, selectedDate))
    : availabilities;

  // Group by date
  const groupedByDate = filteredAvailabilities.reduce((acc, avail) => {
    const dateKey = format(avail.date, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(avail);
    return acc;
  }, {} as Record<string, UserAvailability[]>);

  const sortedDates = Object.keys(groupedByDate).sort();

  const getRelativeDay = (date: Date): string => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    
    if (isToday(date)) return 'Oggi';
    if (isSameDay(date, tomorrow)) return 'Domani';
    return format(date, 'EEEE', { locale: it });
  };

  if (filteredAvailabilities.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">Nessun giocatore disponibile</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            {selectedDate
              ? 'Prova a selezionare un\'altra data'
              : 'I giocatori inizieranno a registrare le loro disponibilità'}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="space-y-2">
        {filteredAvailabilities.slice(0, 5).map((avail) => (
          <div
            key={avail.id}
            onClick={() => onPlayerClick?.(avail.userId)}
            className={cn(
              'flex items-center gap-3 p-2 rounded-lg transition-colors',
              onPlayerClick && 'cursor-pointer hover:bg-muted'
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={avail.userAvatar} />
              <AvatarFallback>{avail.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{avail.userName}</p>
              <p className="text-xs text-muted-foreground">
                {avail.timeSlots.map((s) => `${s.startTime}`).join(', ')}
              </p>
            </div>
          </div>
        ))}
        {filteredAvailabilities.length > 5 && (
          <p className="text-xs text-muted-foreground text-center py-2">
            +{filteredAvailabilities.length - 5} altri giocatori
          </p>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5" />
          Giocatori Disponibili
          <Badge variant="secondary" className="ml-2">
            {filteredAvailabilities.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedDates.map((dateKey) => {
          const date = new Date(dateKey);
          const players = groupedByDate[dateKey];

          return (
            <div key={dateKey} className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getRelativeDay(date)} - {format(date, 'd MMMM', { locale: it })}
                <Badge variant="outline" className="ml-auto">
                  {players.length} giocatori
                </Badge>
              </h4>
              <div className="grid gap-2">
                {players.map((avail) => (
                  <div
                    key={avail.id}
                    onClick={() => onPlayerClick?.(avail.userId)}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border bg-card transition-colors',
                      onPlayerClick && 'cursor-pointer hover:bg-muted'
                    )}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={avail.userAvatar} />
                      <AvatarFallback>{avail.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{avail.userName}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {avail.timeSlots.map((s) => `${s.startTime}-${s.endTime}`).join(', ')}
                        </span>
                        {avail.maxDistance && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            max {avail.maxDistance}km
                          </span>
                        )}
                      </div>
                    </div>
                    {onPlayerClick && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PlayerAvailabilityList;
