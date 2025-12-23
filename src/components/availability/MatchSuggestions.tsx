import React from 'react';
import { Sparkles, Users, MapPin, Clock, TrendingUp, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MatchSuggestion } from '@/types/availability';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { getRelativeDay } from '@/lib/availabilityMatcher';

interface MatchSuggestionsProps {
  suggestions: MatchSuggestion[];
  onSuggestionSelect?: (suggestion: MatchSuggestion) => void;
  maxItems?: number;
  isLoading?: boolean;
}

export const MatchSuggestions: React.FC<MatchSuggestionsProps> = ({
  suggestions,
  onSuggestionSelect,
  maxItems = 5,
  isLoading = false,
}) => {
  const displayedSuggestions = suggestions.slice(0, maxItems);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="animate-pulse space-y-4">
            <Sparkles className="h-12 w-12 mx-auto text-primary animate-spin" />
            <p className="text-muted-foreground">Calcolo match ottimali...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">Nessun match suggerito</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Aggiungi le tue disponibilità per ricevere suggerimenti
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          Match Suggeriti
          <Badge variant="secondary" className="ml-2">
            {suggestions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayedSuggestions.map((suggestion, index) => (
          <div
            key={suggestion.id}
            onClick={() => onSuggestionSelect?.(suggestion)}
            className={cn(
              'p-4 rounded-lg border transition-colors',
              index === 0 
                ? 'bg-primary/5 border-primary/30 hover:bg-primary/10' 
                : 'bg-card hover:bg-muted',
              onSuggestionSelect && 'cursor-pointer'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  {index === 0 && (
                    <Badge className="bg-primary text-primary-foreground">
                      Migliore Match
                    </Badge>
                  )}
                  <span className="text-sm font-medium">
                    {getRelativeDay(suggestion.suggestedDate)}
                  </span>
                </div>

                {/* Field & Time */}
                <h4 className="font-medium mb-1">{suggestion.field.fieldName}</h4>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {suggestion.field.fieldCity}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {suggestion.suggestedTimeSlot.startTime}-{suggestion.suggestedTimeSlot.endTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {suggestion.estimatedPlayers} giocatori
                  </span>
                </div>

                {/* Reasons */}
                {suggestion.reasons.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {suggestion.reasons.map((reason, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {reason}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Score & Action */}
              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-bold text-primary">{suggestion.matchScore}%</span>
                  </div>
                  <Progress value={suggestion.matchScore} className="w-16 h-1.5 mt-1" />
                </div>
                {onSuggestionSelect && (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        ))}

        {suggestions.length > maxItems && (
          <Button variant="ghost" className="w-full text-muted-foreground">
            Mostra altri {suggestions.length - maxItems} suggerimenti
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchSuggestions;
