import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, MapPin, Clock, Play, Pause, AlertTriangle, Settings } from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { MOCK_LIVE_MATCHES } from '@/mocks/admin';
import { cn } from '@/lib/utils';

const AdminMatchDetails: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  
  const match = MOCK_LIVE_MATCHES.find(m => m.id === matchId);

  if (!match) {
    return (
      <div className="space-y-6 animate-slide-in-up">
        <div className="flex items-center gap-2 mb-1">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-glow-primary">Partita non trovata</h1>
        </div>
        <TacticalCard>
          <TacticalCardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-muted-foreground">La partita richiesta non esiste o è terminata.</p>
            <GlowButton variant="primary" className="mt-4" onClick={() => navigate('/admin')}>
              Torna alla Dashboard
            </GlowButton>
          </TacticalCardContent>
        </TacticalCard>
      </div>
    );
  }

  const getDuration = (startedAt: string) => {
    const start = new Date(startedAt);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  // Mock teams for this match
  const teams = [
    { name: 'Alpha Team', score: 450, players: Math.floor(match.players / 2), color: '#22c55e' },
    { name: 'Bravo Team', score: 380, players: Math.ceil(match.players / 2), color: '#ef4444' },
  ];

  // Mock events
  const events = [
    { id: 1, time: '00:05', text: 'Partita iniziata', type: 'system' },
    { id: 2, time: '03:22', text: 'Alpha Team cattura Punto A', type: 'capture' },
    { id: 3, time: '07:15', text: 'Bravo Team cattura Punto B', type: 'capture' },
    { id: 4, time: '12:40', text: 'Alpha Team elimina 3 giocatori', type: 'kill' },
    { id: 5, time: '15:00', text: 'Pausa richiesta da Bravo Team', type: 'pause' },
  ];

  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-glow-primary">{match.name}</h1>
          </div>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {match.field}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "text-sm px-3 py-1",
              match.status === 'live' 
                ? "border-secondary text-secondary" 
                : "border-accent text-accent"
            )}
          >
            {match.status === 'live' ? (
              <>
                <span className="h-2 w-2 bg-secondary rounded-full animate-pulse mr-2" />
                LIVE
              </>
            ) : (
              <>
                <Pause className="h-3 w-3 mr-2" />
                PAUSED
              </>
            )}
          </Badge>
          <GlowButton variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-1" />
            Gestisci
          </GlowButton>
        </div>
      </div>

      {/* Match Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <TacticalCard>
          <TacticalCardContent className="p-4 text-center">
            <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{getDuration(match.startedAt)}</p>
            <p className="text-xs text-muted-foreground">Durata</p>
          </TacticalCardContent>
        </TacticalCard>
        
        <TacticalCard>
          <TacticalCardContent className="p-4 text-center">
            <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{match.players}/{match.maxPlayers}</p>
            <p className="text-xs text-muted-foreground">Giocatori</p>
          </TacticalCardContent>
        </TacticalCard>
        
        <TacticalCard>
          <TacticalCardContent className="p-4 text-center">
            <Play className="h-5 w-5 mx-auto mb-2 text-secondary" />
            <p className="text-2xl font-bold">{match.mode}</p>
            <p className="text-xs text-muted-foreground">Modalità</p>
          </TacticalCardContent>
        </TacticalCard>
        
        <TacticalCard>
          <TacticalCardContent className="p-4 text-center">
            <MapPin className="h-5 w-5 mx-auto mb-2 text-accent" />
            <p className="text-lg font-bold truncate">{match.field}</p>
            <p className="text-xs text-muted-foreground">Campo</p>
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Teams Score */}
      <TacticalCard>
        <TacticalCardHeader>
          <TacticalCardTitle>Punteggio</TacticalCardTitle>
        </TacticalCardHeader>
        <TacticalCardContent>
          <div className="grid grid-cols-2 gap-4">
            {teams.map((team, idx) => (
              <div 
                key={idx} 
                className="text-center p-4 rounded-sm border"
                style={{ borderColor: team.color, backgroundColor: `${team.color}10` }}
              >
                <h3 className="font-display uppercase text-lg" style={{ color: team.color }}>
                  {team.name}
                </h3>
                <p className="text-4xl font-bold mt-2">{team.score}</p>
                <p className="text-sm text-muted-foreground mt-1">{team.players} giocatori</p>
              </div>
            ))}
          </div>
        </TacticalCardContent>
      </TacticalCard>

      {/* Events Log */}
      <TacticalCard>
        <TacticalCardHeader>
          <TacticalCardTitle>Eventi Partita</TacticalCardTitle>
        </TacticalCardHeader>
        <TacticalCardContent>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {events.map((event) => (
              <div 
                key={event.id}
                className="flex items-center gap-3 p-2 bg-muted/30 rounded-sm"
              >
                <span className="font-mono text-xs text-muted-foreground w-12">{event.time}</span>
                <span className="text-sm">{event.text}</span>
              </div>
            ))}
          </div>
        </TacticalCardContent>
      </TacticalCard>

      {/* Actions */}
      <div className="flex gap-3">
        <GlowButton variant="primary" className="flex-1">
          {match.status === 'live' ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Metti in Pausa
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Riprendi
            </>
          )}
        </GlowButton>
        <GlowButton variant="danger">
          Termina Partita
        </GlowButton>
      </div>
    </div>
  );
};

export default AdminMatchDetails;
