import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Shield, 
  Calendar, 
  MapPin, 
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Star,
  Trophy,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/authStore';
import { getRoleLabel } from '@/lib/auth';

// Mock data for referee assignments
const mockAssignments = [
  {
    id: 'match-001',
    title: 'Alpha vs Bravo - Domination',
    field: 'Zona Alpha',
    date: '2025-12-26',
    time: '10:00',
    teams: ['Alpha Strike', 'Shadow Ops'],
    players: 32,
    status: 'upcoming',
  },
  {
    id: 'match-002',
    title: 'Team Deathmatch Championship',
    field: 'Arena Bravo',
    date: '2025-12-27',
    time: '14:00',
    teams: ['Delta Force', 'Echo Team'],
    players: 24,
    status: 'upcoming',
  },
  {
    id: 'match-003',
    title: 'Capture the Flag',
    field: 'Zona Alpha',
    date: '2025-12-20',
    time: '10:00',
    teams: ['Phantom Squad', 'Night Hawks'],
    players: 28,
    status: 'completed',
    rating: 4.9,
  },
];

const mockStats = {
  totalMatches: 45,
  thisMonth: 8,
  avgRating: 4.8,
  totalPlayers: 1240,
  disputes: 3,
  accuracy: 98,
};

const RefereeAssignments: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const upcomingAssignments = mockAssignments.filter(a => a.status === 'upcoming');
  const completedAssignments = mockAssignments.filter(a => a.status === 'completed');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">In Programma</Badge>;
      case 'live':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">LIVE</Badge>;
      case 'completed':
        return <Badge className="bg-muted text-muted-foreground">Completata</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display uppercase tracking-wider text-foreground">
            I Miei Incarichi
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Bentornato, {user?.username} • {getRoleLabel(user?.role || 'player')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 py-1 px-3">
            <Shield className="h-4 w-4 mr-1" />
            Arbitro Certificato
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.totalMatches}</p>
                <p className="text-xs text-muted-foreground">Partite Totali</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Star className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.avgRating}</p>
                <p className="text-xs text-muted-foreground">Rating Medio</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStats.accuracy}%</p>
                <p className="text-xs text-muted-foreground">Precisione</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingAssignments.length}</p>
                <p className="text-xs text-muted-foreground">Prossimi</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">In Programma</TabsTrigger>
          <TabsTrigger value="completed">Completate</TabsTrigger>
          <TabsTrigger value="stats">Statistiche</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4 space-y-4">
          {upcomingAssignments.length === 0 ? (
            <TacticalCard>
              <TacticalCardContent className="py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nessun incarico in programma</p>
              </TacticalCardContent>
            </TacticalCard>
          ) : (
            upcomingAssignments.map((assignment) => (
              <TacticalCard key={assignment.id}>
                <TacticalCardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display uppercase tracking-wider">{assignment.title}</h3>
                        {getStatusBadge(assignment.status)}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {assignment.field}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {assignment.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {assignment.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {assignment.players} giocatori
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {assignment.teams.map((team, idx) => (
                          <Badge key={team} variant="outline" className="text-xs">
                            {team}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <GlowButton 
                      variant="primary" 
                      size="sm" 
                      className="flex-1 gap-2"
                      onClick={() => navigate(`/referee/${assignment.id}`)}
                    >
                      <Play className="h-4 w-4" />
                      Avvia Partita
                    </GlowButton>
                    <GlowButton variant="secondary" size="sm" className="gap-2">
                      <XCircle className="h-4 w-4" />
                      Rifiuta
                    </GlowButton>
                  </div>
                </TacticalCardContent>
              </TacticalCard>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 space-y-4">
          {completedAssignments.map((assignment) => (
            <TacticalCard key={assignment.id}>
              <TacticalCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display uppercase tracking-wider">{assignment.title}</h3>
                      {getStatusBadge(assignment.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {assignment.field} • {assignment.date}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {assignment.teams.map((team) => (
                        <Badge key={team} variant="outline" className="text-xs">
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= Math.floor(assignment.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{assignment.rating} / 5</p>
                  </div>
                </div>
              </TacticalCardContent>
            </TacticalCard>
          ))}
        </TabsContent>

        <TabsContent value="stats" className="mt-4 space-y-4">
          <TacticalCard>
            <TacticalCardHeader>
              <TacticalCardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Le Tue Statistiche
              </TacticalCardTitle>
            </TacticalCardHeader>
            <TacticalCardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Precisione Decisioni</span>
                  <span className="font-bold">{mockStats.accuracy}%</span>
                </div>
                <Progress value={mockStats.accuracy} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Soddisfazione Giocatori</span>
                  <span className="font-bold">96%</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Partite Questo Mese</span>
                  <span className="font-bold">{mockStats.thisMonth}/10</span>
                </div>
                <Progress value={(mockStats.thisMonth / 10) * 100} className="h-2" />
              </div>
              
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Giocatori Arbitrati</span>
                  <span className="font-bold">{mockStats.totalPlayers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Dispute Risolte</span>
                  <span className="font-bold">{mockStats.disputes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating Medio</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="font-bold">{mockStats.avgRating}</span>
                  </div>
                </div>
              </div>
            </TacticalCardContent>
          </TacticalCard>

          {mockStats.disputes > 0 && (
            <TacticalCard className="border-amber-500/30">
              <TacticalCardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="font-medium">Dispute in Sospeso</p>
                    <p className="text-sm text-muted-foreground">
                      Hai {mockStats.disputes} dispute da rivedere
                    </p>
                  </div>
                </div>
              </TacticalCardContent>
            </TacticalCard>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RefereeAssignments;
