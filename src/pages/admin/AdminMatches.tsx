import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus } from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { LiveMatchCard } from '@/components/admin';
import { MOCK_LIVE_MATCHES } from '@/mocks/admin';

const AdminMatches: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold text-glow-primary">Gestione Partite</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Visualizza e gestisci tutte le partite attive
          </p>
        </div>
        
        <GlowButton variant="primary">
          <Plus className="h-4 w-4 mr-2" />
          Nuova Partita
        </GlowButton>
      </div>

      {/* Live Matches */}
      <TacticalCard>
        <TacticalCardHeader className="flex flex-row items-center justify-between">
          <TacticalCardTitle className="flex items-center gap-2">
            <span className="h-2 w-2 bg-secondary rounded-full animate-pulse" />
            Partite Live ({MOCK_LIVE_MATCHES.filter(m => m.status === 'live').length})
          </TacticalCardTitle>
        </TacticalCardHeader>
        <TacticalCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_LIVE_MATCHES.map((match, index) => (
              <LiveMatchCard key={match.id} match={match} index={index} />
            ))}
          </div>
        </TacticalCardContent>
      </TacticalCard>

      {/* Past Matches Placeholder */}
      <TacticalCard>
        <TacticalCardHeader>
          <TacticalCardTitle>Partite Recenti</TacticalCardTitle>
        </TacticalCardHeader>
        <TacticalCardContent className="p-8 text-center">
          <p className="text-muted-foreground">Storico partite - Coming Soon</p>
        </TacticalCardContent>
      </TacticalCard>
    </div>
  );
};

export default AdminMatches;
