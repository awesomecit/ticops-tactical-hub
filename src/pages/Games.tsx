import React from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { it, enUS } from 'date-fns/locale';
import { Calendar, MapPin, Users } from 'lucide-react';
import { mockGames } from '@/mocks/data';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { cn } from '@/lib/utils';

const Games: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = React.useState<'all' | 'upcoming' | 'live' | 'completed'>('all');
  
  const dateLocale = i18n.language.startsWith('it') ? it : enUS;
  
  const filteredGames = mockGames.filter(game => {
    if (filter === 'all') return true;
    return game.status === filter;
  });

  const statusStyles = {
    upcoming: 'bg-primary/20 text-primary border-primary/50',
    live: 'bg-secondary/20 text-secondary border-secondary/50 animate-pulse',
    completed: 'bg-muted text-muted-foreground border-muted',
    cancelled: 'bg-destructive/20 text-destructive border-destructive/50',
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'upcoming': return t('common.upcoming');
      case 'live': return t('common.live');
      case 'completed': return t('common.completed');
      default: return status;
    }
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-glow-primary">{t('games.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('games.subtitle')}</p>
        </div>
        <GlowButton variant="primary">
          <Calendar className="h-4 w-4 mr-2" />
          {t('games.newGame')}
        </GlowButton>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'upcoming', 'live', 'completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "px-4 py-2 font-display uppercase text-sm tracking-wider clip-tactical-sm transition-all",
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            {status === 'all' ? t('games.filterAll') : getStatusLabel(status)}
          </button>
        ))}
      </div>

      {/* Games List */}
      <div className="grid gap-4">
        {filteredGames.map((game, index) => (
          <TacticalCard
            key={game.id}
            variant="large"
            glow={game.status === 'live' ? 'secondary' : 'primary'}
            interactive
            className="animate-slide-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <TacticalCardContent>
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 bg-gradient-tactical clip-tactical flex items-center justify-center border border-border">
                    <span className="text-4xl">{game.gameMode.icon}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl uppercase text-foreground">
                      {game.name}
                    </h3>
                    <span className={cn(
                      "px-2 py-0.5 text-xs font-display uppercase border clip-tactical-sm",
                      statusStyles[game.status]
                    )}>
                      {getStatusLabel(game.status)}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {game.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      {format(game.date, "EEEE d MMMM, HH:mm", { locale: dateLocale })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" />
                      {game.location.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-primary" />
                      {t('games.maxPlayers', { current: game.registeredPlayers.length, max: game.maxPlayers })}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {game.gameMode.rules.map((rule, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs font-mono rounded-sm"
                      >
                        {rule}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:items-end">
                  {game.status === 'upcoming' && (
                    <GlowButton variant="primary" className="w-full lg:w-auto">
                      {t('games.joinGame')}
                    </GlowButton>
                  )}
                  {game.status === 'live' && (
                    <GlowButton variant="secondary" className="w-full lg:w-auto">
                      {t('games.watchLive')}
                    </GlowButton>
                  )}
                  <GlowButton variant="ghost" size="sm" className="w-full lg:w-auto">
                    {t('games.details')}
                  </GlowButton>
                </div>
              </div>
            </TacticalCardContent>
          </TacticalCard>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <TacticalCard>
          <TacticalCardContent className="py-12 text-center">
            <p className="text-muted-foreground">{t('games.noGames')}</p>
          </TacticalCardContent>
        </TacticalCard>
      )}
    </div>
  );
};

export default Games;
