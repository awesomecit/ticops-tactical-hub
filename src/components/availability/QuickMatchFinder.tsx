import React from 'react';
import { Zap, Users, MapPin, Clock, Calendar, ChevronRight, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MatchRequest } from '@/types/availability';
import { format, isToday, isSameDay, addDays } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface QuickMatchFinderProps {
  matchRequests: MatchRequest[];
  currentUserId?: string;
  onJoinMatch?: (matchId: string) => void;
  onViewDetails?: (matchId: string) => void;
}

export const QuickMatchFinder: React.FC<QuickMatchFinderProps> = ({
  matchRequests,
  currentUserId = 'current_user',
  onJoinMatch,
  onViewDetails,
}) => {
  const openMatches = matchRequests.filter(
    (m) => m.status === 'open' && m.creatorId !== currentUserId
  );

  const getRelativeDay = (date: Date): string => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    
    if (isToday(date)) return 'Oggi';
    if (isSameDay(date, tomorrow)) return 'Domani';
    return format(date, 'EEEE', { locale: it });
  };

  const getSkillBadgeColor = (skill?: string) => {
    switch (skill) {
      case 'beginner':
        return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-600 border-red-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSkillLabel = (skill?: string) => {
    switch (skill) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzato';
      default:
        return 'Tutti i livelli';
    }
  };

  const isAlreadyJoined = (match: MatchRequest) => {
    return match.interestedPlayers.some((p) => p.id === currentUserId);
  };

  if (openMatches.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Zap className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">Nessuna partita aperta</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Sii il primo a creare una partita!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5 text-yellow-500" />
          Partite Aperte
          <Badge variant="secondary" className="ml-2">
            {openMatches.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {openMatches.map((match) => {
          const spotsLeft = match.maxPlayers - match.interestedPlayers.length;
          const progress = (match.interestedPlayers.length / match.minPlayers) * 100;
          const joined = isAlreadyJoined(match);

          return (
            <div
              key={match.id}
              className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1 truncate">{match.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {match.description}
                  </p>
                </div>
                <Badge variant="outline" className={cn(getSkillBadgeColor(match.skillLevel))}>
                  {getSkillLabel(match.skillLevel)}
                </Badge>
              </div>

              {/* Info */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {match.preferredDates.map((d) => getRelativeDay(d)).join(', ')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {match.preferredTimeSlots.map((s) => s.startTime).join(', ')}
                </span>
                {match.gameMode && (
                  <Badge variant="outline" className="text-xs">
                    {match.gameMode}
                  </Badge>
                )}
              </div>

              {/* Players Progress */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {match.interestedPlayers.slice(0, 4).map((player) => (
                    <Avatar key={player.id} className="h-7 w-7 border-2 border-background">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback className="text-xs">
                        {player.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {match.interestedPlayers.length > 4 && (
                    <div className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        +{match.interestedPlayers.length - 4}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">
                      {match.interestedPlayers.length}/{match.minPlayers} min
                    </span>
                    <span className="text-muted-foreground">
                      {spotsLeft} posti rimasti
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all',
                        progress >= 100 ? 'bg-green-500' : 'bg-primary'
                      )}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {joined ? (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Già iscritto
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => onJoinMatch?.(match.id)}
                    disabled={spotsLeft <= 0}
                    className="flex items-center gap-1"
                  >
                    <UserPlus className="h-4 w-4" />
                    Partecipa
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails?.(match.id)}
                  className="ml-auto"
                >
                  Dettagli
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickMatchFinder;
