import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { it, enUS } from 'date-fns/locale';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Shield, Eye } from 'lucide-react';
import { mockGames } from '@/mocks/data';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { cn } from '@/lib/utils';
import { JoinGameDialog } from '@/components/games/JoinGameDialog';

const GameDetail: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [joinDialogOpen, setJoinDialogOpen] = React.useState(false);
  
  const dateLocale = i18n.language.startsWith('it') ? it : enUS;
  
  const game = mockGames.find(g => g.id === gameId);
  
  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <p className="text-muted-foreground">{t('games.notFound')}</p>
        <GlowButton variant="ghost" onClick={() => navigate('/games')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </GlowButton>
      </div>
    );
  }

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
      {/* Header */}
      <div className="flex items-center gap-4">
        <GlowButton variant="ghost" size="sm" onClick={() => navigate('/games')}>
          <ArrowLeft className="h-4 w-4" />
        </GlowButton>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl text-glow-primary">{game.name}</h1>
            <span className={cn(
              "px-2 py-0.5 text-xs font-display uppercase border clip-tactical-sm",
              statusStyles[game.status]
            )}>
              {getStatusLabel(game.status)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <TacticalCard>
            <TacticalCardContent className="space-y-6">
              {/* Game Mode */}
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 bg-gradient-tactical clip-tactical flex items-center justify-center border border-border flex-shrink-0">
                  <span className="text-3xl">{game.gameMode.icon}</span>
                </div>
                <div>
                  <h2 className="font-display text-xl uppercase text-foreground">{game.gameMode.name}</h2>
                  <p className="text-muted-foreground text-sm mt-1">{game.gameMode.description}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-display text-sm uppercase text-primary mb-2">{t('games.description')}</h3>
                <p className="text-foreground">{game.description}</p>
              </div>

              {/* Rules */}
              <div>
                <h3 className="font-display text-sm uppercase text-primary mb-2">{t('games.rules')}</h3>
                <div className="flex flex-wrap gap-2">
                  {game.gameMode.rules.map((rule, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-mono rounded-sm border border-border"
                    >
                      {rule}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase">
                    <Calendar className="h-4 w-4 text-primary" />
                    {t('games.date')}
                  </div>
                  <p className="font-display text-foreground">
                    {format(game.date, "d MMM yyyy", { locale: dateLocale })}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase">
                    <Clock className="h-4 w-4 text-primary" />
                    {t('games.time')}
                  </div>
                  <p className="font-display text-foreground">
                    {format(game.date, "HH:mm", { locale: dateLocale })}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase">
                    <Users className="h-4 w-4 text-primary" />
                    {t('games.players')}
                  </div>
                  <p className="font-display text-foreground">
                    {game.registeredPlayers.length}/{game.maxPlayers}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase">
                    <MapPin className="h-4 w-4 text-primary" />
                    {t('games.location')}
                  </div>
                  <p className="font-display text-foreground text-sm">
                    {game.location.name}
                  </p>
                </div>
              </div>
            </TacticalCardContent>
          </TacticalCard>

          {/* Registered Players Preview */}
          <TacticalCard>
            <TacticalCardContent>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm uppercase text-primary flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  {t('games.registeredPlayers')}
                </h3>
                <span className="text-muted-foreground text-sm">
                  {game.registeredPlayers.length} / {game.maxPlayers}
                </span>
              </div>
              {game.registeredPlayers.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {game.registeredPlayers.slice(0, 8).map((player) => (
                    <div key={player.userId} className="p-2 bg-muted/50 rounded-sm text-center">
                      <p className="text-sm font-display truncate">{player.user.callsign}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm text-center py-4">
                  {t('games.noPlayersYet')}
                </p>
              )}
            </TacticalCardContent>
          </TacticalCard>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4">
          <TacticalCard glow={game.status === 'live' ? 'secondary' : 'primary'}>
            <TacticalCardContent className="space-y-4">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">{t('games.spotsLeft')}</p>
                <p className="text-3xl font-display text-primary">
                  {game.maxPlayers - game.registeredPlayers.length}
                </p>
              </div>

              {game.status === 'upcoming' && (
                <GlowButton 
                  variant="primary" 
                  className="w-full"
                  onClick={() => setJoinDialogOpen(true)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {t('games.joinGame')}
                </GlowButton>
              )}

              {game.status === 'live' && (
                <GlowButton 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => navigate(`/spectator/${game.id}`)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {t('games.watchLive')}
                </GlowButton>
              )}

              {game.status === 'completed' && (
                <GlowButton variant="ghost" className="w-full">
                  {t('games.viewResults')}
                </GlowButton>
              )}
            </TacticalCardContent>
          </TacticalCard>

          {/* Location Card */}
          <TacticalCard>
            <TacticalCardContent className="space-y-3">
              <h3 className="font-display text-sm uppercase text-primary flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {t('games.location')}
              </h3>
              <div>
                <p className="font-display text-foreground">{game.location.name}</p>
                <p className="text-muted-foreground text-sm">{game.location.address}</p>
              </div>
              <GlowButton 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => navigate(`/locations/${game.location.id}`)}
              >
                {t('games.viewField')}
              </GlowButton>
            </TacticalCardContent>
          </TacticalCard>
        </div>
      </div>

      <JoinGameDialog 
        open={joinDialogOpen} 
        onOpenChange={setJoinDialogOpen}
        game={game}
      />
    </div>
  );
};

export default GameDetail;
