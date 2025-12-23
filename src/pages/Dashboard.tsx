import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import {
  Crosshair,
  Trophy,
  Target,
  Skull,
  TrendingUp,
  Calendar,
  Users,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { mockGames, mockNotifications } from '@/mocks/data';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { RankBadge } from '@/components/ui/RankBadge';
import { StatDisplay } from '@/components/ui/StatDisplay';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const upcomingGames = mockGames.filter(g => g.status === 'upcoming').slice(0, 3);
  const liveGames = mockGames.filter(g => g.status === 'live');

  if (!user) return null;

  const kdRatio = (user.stats.kills / Math.max(user.stats.deaths, 1)).toFixed(2);
  const winRate = ((user.stats.wins / Math.max(user.stats.gamesPlayed, 1)) * 100).toFixed(0);

  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-glow-primary">
            Benvenuto, {user.callsign}
          </h1>
          <p className="text-muted-foreground mt-1">
            Pronto per la prossima missione?
          </p>
        </div>
        <RankBadge rank={user.rank} size="lg" showLevel />
      </div>

      {/* Live Games Alert */}
      {liveGames.length > 0 && (
        <TacticalCard glow="secondary" className="border-secondary animate-pulse-glow">
          <TacticalCardContent className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-secondary rounded-full animate-pulse" />
                  <span className="font-display uppercase text-secondary">Live Now</span>
                </div>
                <p className="text-foreground font-medium">{liveGames[0].name}</p>
              </div>
            </div>
            <GlowButton variant="secondary" size="sm">
              Segui
            </GlowButton>
          </TacticalCardContent>
        </TacticalCard>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TacticalCard glow="primary" interactive>
          <TacticalCardContent>
            <StatDisplay
              icon={Crosshair}
              label="Partite"
              value={user.stats.gamesPlayed}
              trend="up"
              trendValue="+3"
            />
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard glow="primary" interactive>
          <TacticalCardContent>
            <StatDisplay
              icon={Trophy}
              label="Vittorie"
              value={`${winRate}%`}
              trend="up"
              trendValue="+5%"
            />
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard glow="primary" interactive>
          <TacticalCardContent>
            <StatDisplay
              icon={Target}
              label="K/D Ratio"
              value={kdRatio}
              trend="up"
              trendValue="+0.15"
            />
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard glow="primary" interactive>
          <TacticalCardContent>
            <StatDisplay
              icon={TrendingUp}
              label="XP Totale"
              value={user.stats.xp.toLocaleString()}
            />
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Games */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Prossime Partite</h2>
            <GlowButton variant="ghost" size="sm">
              Vedi Tutte <ChevronRight className="h-4 w-4 ml-1" />
            </GlowButton>
          </div>

          <div className="space-y-3">
            {upcomingGames.map((game, index) => (
              <TacticalCard
                key={game.id}
                glow="primary"
                interactive
                className="animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TacticalCardContent className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 bg-primary/10 clip-tactical-sm flex items-center justify-center border border-primary/30">
                      <span className="text-2xl">{game.gameMode.icon}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg uppercase text-foreground truncate">
                      {game.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(game.date, "d MMM, HH:mm", { locale: it })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {game.registeredPlayers.length}/{game.maxPlayers}
                      </span>
                    </div>
                  </div>

                  <GlowButton variant="outline" size="sm" className="flex-shrink-0">
                    Iscriviti
                  </GlowButton>
                </TacticalCardContent>
              </TacticalCard>
            ))}
          </div>
        </div>

        {/* Quick Stats & Activity */}
        <div className="space-y-4">
          <h2 className="text-xl">Attività Recente</h2>
          
          <TacticalCard>
            <TacticalCardContent className="space-y-4">
              {mockNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-sm border-l-2 transition-colors",
                    notif.read ? "bg-transparent border-muted" : "bg-muted/30 border-primary"
                  )}
                >
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                    notif.type === 'game' && "bg-primary/20 text-primary",
                    notif.type === 'success' && "bg-secondary/20 text-secondary",
                    notif.type === 'team' && "bg-team-alpha/20 text-team-alpha"
                  )}>
                    {notif.type === 'game' && <Crosshair className="h-4 w-4" />}
                    {notif.type === 'success' && <Trophy className="h-4 w-4" />}
                    {notif.type === 'team' && <Users className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm uppercase text-foreground">
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))}
            </TacticalCardContent>
          </TacticalCard>

          {/* XP Progress */}
          <TacticalCard>
            <TacticalCardHeader>
              <TacticalCardTitle>Progressione</TacticalCardTitle>
            </TacticalCardHeader>
            <TacticalCardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Prossimo Grado</span>
                  <span className="font-mono text-primary">
                    {user.stats.xp} / 6000 XP
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${(user.stats.xp / 6000) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {6000 - user.stats.xp} XP per diventare <span className="text-accent">Tenente</span>
                </p>
              </div>
            </TacticalCardContent>
          </TacticalCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
