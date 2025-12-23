import React from 'react';
import { Trophy, Target, Flame, Clock, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserSummary } from '@/types';
import { cn } from '@/lib/utils';

interface UserSummaryCardProps {
  summary: UserSummary;
  className?: string;
}

const rarityColors = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  rare: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export const UserSummaryCard: React.FC<UserSummaryCardProps> = ({
  summary,
  className,
}) => {
  const kdRatio = summary.totalDeaths > 0 
    ? (summary.totalKills / summary.totalDeaths).toFixed(2) 
    : summary.totalKills.toString();

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Statistiche Generali
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Trophy className="h-6 w-6 mx-auto mb-1 text-yellow-500" />
            <p className="text-2xl font-bold text-foreground">{summary.winRate}%</p>
            <p className="text-xs text-muted-foreground">Win Rate</p>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Target className="h-6 w-6 mx-auto mb-1 text-red-500" />
            <p className="text-2xl font-bold text-foreground">{kdRatio}</p>
            <p className="text-xs text-muted-foreground">K/D Ratio</p>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Flame className="h-6 w-6 mx-auto mb-1 text-orange-500" />
            <p className="text-2xl font-bold text-foreground">{summary.currentStreak}</p>
            <p className="text-xs text-muted-foreground">Streak Attuale</p>
          </div>
          
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <Clock className="h-6 w-6 mx-auto mb-1 text-blue-500" />
            <p className="text-2xl font-bold text-foreground">{summary.hoursPlayed}h</p>
            <p className="text-xs text-muted-foreground">Ore Giocate</p>
          </div>
        </div>

        {/* Kill/Death Stats */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Eliminazioni Totali</span>
            <span className="font-medium text-green-500">{summary.totalKills}</span>
          </div>
          <Progress value={(summary.totalKills / (summary.totalKills + summary.totalDeaths)) * 100} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Morti Totali</span>
            <span className="font-medium text-red-500">{summary.totalDeaths}</span>
          </div>
        </div>

        {/* Events Summary */}
        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Eventi</p>
            <p className="text-lg font-bold">{summary.totalEvents} totali</p>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="mb-1">
              {summary.upcomingEvents} in arrivo
            </Badge>
            <p className="text-xs text-muted-foreground">
              {summary.completedEvents} completati
            </p>
          </div>
        </div>

        {/* Recent Achievements */}
        {summary.achievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Achievement Recenti
            </h4>
            <div className="flex flex-wrap gap-2">
              {summary.achievements.slice(0, 4).map((achievement) => (
                <Badge
                  key={achievement.id}
                  variant="outline"
                  className={cn('gap-1', rarityColors[achievement.rarity])}
                >
                  <span>{achievement.icon}</span>
                  {achievement.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Favorite Location */}
        {summary.favoriteLocation && (
          <div className="text-sm text-muted-foreground">
            📍 Campo preferito: <span className="text-foreground font-medium">{summary.favoriteLocation}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
