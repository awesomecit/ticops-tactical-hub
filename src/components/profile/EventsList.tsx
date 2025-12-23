import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Dumbbell, 
  PartyPopper,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserEvent } from '@/types';
import { cn } from '@/lib/utils';

interface EventsListProps {
  events: UserEvent[];
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
  onViewAll?: () => void;
  className?: string;
}

const eventTypeConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  match: { icon: Trophy, color: 'text-primary', label: 'Partita' },
  tournament: { icon: Trophy, color: 'text-amber-500', label: 'Torneo' },
  training: { icon: Dumbbell, color: 'text-green-500', label: 'Allenamento' },
  meeting: { icon: Users, color: 'text-blue-500', label: 'Riunione' },
  social: { icon: PartyPopper, color: 'text-purple-500', label: 'Sociale' },
};

const statusConfig: Record<string, { color: string; label: string }> = {
  upcoming: { color: 'bg-blue-500/20 text-blue-400', label: 'In programma' },
  ongoing: { color: 'bg-green-500/20 text-green-400', label: 'In corso' },
  completed: { color: 'bg-muted text-muted-foreground', label: 'Completato' },
  cancelled: { color: 'bg-red-500/20 text-red-400', label: 'Annullato' },
};

export const EventsList: React.FC<EventsListProps> = ({
  events,
  title = 'Eventi',
  showViewAll = false,
  maxItems,
  onViewAll,
  className,
}) => {
  const displayEvents = maxItems ? events.slice(0, maxItems) : events;

  if (events.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nessun evento</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          {showViewAll && events.length > (maxItems || 0) && (
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              Vedi tutti
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-1 p-4 pt-0">
            {displayEvents.map((event) => {
              const config = eventTypeConfig[event.type] || eventTypeConfig.match;
              const status = statusConfig[event.status];
              const IconComponent = config.icon;
              const isUpcoming = event.status === 'upcoming' || event.status === 'ongoing';

              return (
                <div
                  key={event.id}
                  className={cn(
                    'flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer',
                    'hover:bg-muted/50',
                    isUpcoming && 'bg-primary/5'
                  )}
                >
                  {/* Icon */}
                  <div className={cn(
                    'h-10 w-10 rounded-lg flex items-center justify-center shrink-0',
                    'bg-muted'
                  )}>
                    <IconComponent className={cn('h-5 w-5', config.color)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm truncate">{event.title}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {config.label}
                          </Badge>
                          {event.teamName && (
                            <span className="text-xs text-muted-foreground">
                              {event.teamName}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge className={cn('text-[10px] shrink-0', status.color)}>
                        {status.label}
                      </Badge>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {isUpcoming 
                          ? formatDistanceToNow(event.date, { addSuffix: true, locale: it })
                          : format(event.date, 'dd MMM yyyy', { locale: it })
                        }
                      </span>
                      
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location.name}
                        </span>
                      )}
                      
                      {event.participants && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.participants}
                        </span>
                      )}
                    </div>

                    {/* Result for completed events */}
                    {event.result && (
                      <div className={cn(
                        'flex items-center gap-2 mt-2 text-xs font-medium',
                        event.result.won ? 'text-green-500' : 'text-red-500'
                      )}>
                        {event.result.won ? (
                          <CheckCircle className="h-3.5 w-3.5" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5" />
                        )}
                        <span>{event.result.won ? 'Vittoria' : 'Sconfitta'}</span>
                        {event.result.score && (
                          <span className="text-muted-foreground">({event.result.score})</span>
                        )}
                        {event.result.kills !== undefined && (
                          <span className="text-muted-foreground">
                            • K/D: {event.result.kills}/{event.result.deaths}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
