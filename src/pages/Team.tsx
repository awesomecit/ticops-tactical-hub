import React, { useState } from 'react';
import {
  Plus,
  Calendar,
  UserPlus,
  Swords,
  ChevronRight,
  Filter,
  Search,
  Crosshair,
  Trophy,
  Users,
  Settings,
  Award,
  Shield,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  TacticalCard,
  TacticalCardHeader,
  TacticalCardTitle,
  TacticalCardContent,
} from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Input } from '@/components/ui/input';
import {
  TeamHeader,
  TeamMatchCard,
  MemberRow,
  TopPerformerCard,
  TeamStatsOverview,
  GameModeStats,
} from '@/components/team';
import { ActivityItem, ActivityType } from '@/components/dashboard';
import { TierType } from '@/components/ranking';
import {
  getCurrentUser,
  getTeamById,
  getTeamMembers,
  getTeamJoinRequests,
  MOCK_USERS,
} from '@/mocks';
import { cn } from '@/lib/utils';

// Mock team matches
const MOCK_TEAM_MATCHES = [
  {
    id: 'tm_001',
    name: 'Torneo Regionale - Round 2',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    fieldName: 'Campo Alpha',
    opponent: 'Alpha Squad',
    memberStatuses: [
      { id: 'user_003', username: 'Ghost', status: 'confirmed' as const },
      { id: 'user_004', username: 'Mike', status: 'pending' as const },
      { id: 'user_m1', username: 'Viper', status: 'confirmed' as const },
      { id: 'user_m2', username: 'Shadow', status: 'declined' as const },
    ],
  },
  {
    id: 'tm_002',
    name: 'Friendly Match',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    fieldName: 'Arena Tactix',
    opponent: 'Night Raiders',
    memberStatuses: [
      { id: 'user_003', username: 'Ghost', status: 'pending' as const },
      { id: 'user_004', username: 'Mike', status: 'pending' as const },
      { id: 'user_m1', username: 'Viper', status: 'pending' as const },
    ],
  },
];

// Mock team activities
const MOCK_TEAM_ACTIVITIES = [
  {
    id: 'ta_001',
    type: 'game' as ActivityType,
    text: 'Vittoria vs Red Legion (3-1) - Torneo Regionale',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isNew: true,
  },
  {
    id: 'ta_002',
    type: 'team' as ActivityType,
    text: 'LoneWolf99 ha richiesto di unirsi al team',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    isNew: true,
  },
  {
    id: 'ta_003',
    type: 'achievement' as ActivityType,
    text: 'Team raggiunto rank #23 nazionale',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    isNew: false,
  },
  {
    id: 'ta_004',
    type: 'rank' as ActivityType,
    text: 'TacticalMike promosso a Officer',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    isNew: false,
  },
  {
    id: 'ta_005',
    type: 'game' as ActivityType,
    text: 'Sconfitta vs Phantom Brigade (2-3)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    isNew: false,
  },
];

// Mock game mode stats
const MOCK_GAME_MODES = [
  { mode: 'Team Deathmatch', icon: '⚔️', matches: 34, wins: 24, winRate: 70.6 },
  { mode: 'Domination', icon: '🎯', matches: 28, wins: 18, winRate: 64.3 },
  { mode: 'Search & Destroy', icon: '💣', matches: 15, wins: 10, winRate: 66.7 },
  { mode: 'Capture the Flag', icon: '🚩', matches: 12, wins: 6, winRate: 50.0 },
];

const activityIcons = {
  game: Crosshair,
  achievement: Award,
  team: Users,
  rank: Trophy,
  social: UserPlus,
};

const Team: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [memberFilter, setMemberFilter] = useState<'all' | 'online' | 'leader' | 'officer'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentUser = getCurrentUser();
  const team = getTeamById(currentUser.teamId || 'team_001');
  const teamMembers = getTeamMembers(currentUser.teamId || 'team_001');
  const joinRequests = getTeamJoinRequests(currentUser.teamId || 'team_001');

  if (!team) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <TacticalCard className="max-w-md">
          <TacticalCardContent className="text-center p-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-display uppercase mb-2">Nessun Team</h2>
            <p className="text-muted-foreground mb-4">
              Non fai ancora parte di un team.
            </p>
            <GlowButton variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              Crea Team
            </GlowButton>
          </TacticalCardContent>
        </TacticalCard>
      </div>
    );
  }

  // Sort members for top performers
  const topPerformers = [...teamMembers]
    .sort((a, b) => b.stats.kdRatio - a.stats.kdRatio)
    .slice(0, 3);

  // Filter members
  const filteredMembers = teamMembers.filter(member => {
    if (searchQuery && !member.username.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (memberFilter === 'online' && !member.isOnline) return false;
    if (memberFilter === 'leader' && member.teamRole !== 'leader') return false;
    if (memberFilter === 'officer' && member.teamRole !== 'officer') return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <TeamHeader
        team={team}
        pendingRequestsCount={joinRequests.length}
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-5 bg-card border border-border">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <span className="hidden sm:inline">Overview</span>
            <span className="sm:hidden">📊</span>
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <span className="hidden sm:inline">Membri</span>
            <span className="sm:hidden">👥</span>
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <span className="hidden sm:inline">Stats</span>
            <span className="sm:hidden">📈</span>
          </TabsTrigger>
          <TabsTrigger
            value="matches"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <span className="hidden sm:inline">Partite</span>
            <span className="sm:hidden">🎮</span>
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <span className="hidden sm:inline">Settings</span>
            <span className="sm:hidden">⚙️</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB: Overview */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Upcoming Team Matches */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-display uppercase">Prossime Partite Team</h2>
                  <GlowButton variant="ghost" size="sm">
                    Vedi Tutte <ChevronRight className="h-4 w-4 ml-1" />
                  </GlowButton>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {MOCK_TEAM_MATCHES.map((match) => (
                    <TeamMatchCard
                      key={match.id}
                      {...match}
                      isUserConfirmed={match.id === 'tm_001' ? true : undefined}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <TacticalCard>
                <TacticalCardHeader>
                  <TacticalCardTitle>Attività Recenti</TacticalCardTitle>
                </TacticalCardHeader>
                <TacticalCardContent className="p-2 divide-y divide-border/30">
                  {MOCK_TEAM_ACTIVITIES.slice(0, 5).map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      icon={activityIcons[activity.type]}
                      type={activity.type}
                      text={activity.text}
                      timestamp={activity.timestamp}
                      isNew={activity.isNew}
                    />
                  ))}
                </TacticalCardContent>
              </TacticalCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Top Performers */}
              <div className="space-y-3">
                <h3 className="text-sm font-display uppercase text-muted-foreground">
                  Top Performers
                </h3>
                {topPerformers.map((member, index) => (
                  <TopPerformerCard
                    key={member.id}
                    rank={(index + 1) as 1 | 2 | 3}
                    username={member.username}
                    tier={member.tier as TierType}
                    tierLevel={member.tierLevel}
                    kdRatio={member.stats.kdRatio}
                    kills={member.stats.kills}
                    trend={index === 0 ? 'up' : index === 1 ? 'same' : 'down'}
                  />
                ))}
              </div>

              {/* Quick Actions */}
              <TacticalCard>
                <TacticalCardHeader>
                  <TacticalCardTitle>Quick Actions</TacticalCardTitle>
                </TacticalCardHeader>
                <TacticalCardContent className="space-y-2">
                  <GlowButton variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Crea Evento
                  </GlowButton>
                  <GlowButton variant="outline" className="w-full justify-start">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invita Membro
                  </GlowButton>
                  <GlowButton variant="outline" className="w-full justify-start">
                    <Swords className="h-4 w-4 mr-2" />
                    Sfida Team
                  </GlowButton>
                </TacticalCardContent>
              </TacticalCard>
            </div>
          </div>
        </TabsContent>

        {/* TAB: Members */}
        <TabsContent value="members" className="mt-6 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca membro..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              {(['all', 'online', 'leader', 'officer'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setMemberFilter(filter)}
                  className={cn(
                    'px-3 py-2 text-xs font-display uppercase rounded-sm border transition-colors',
                    memberFilter === filter
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border text-muted-foreground hover:border-primary/50'
                  )}
                >
                  {filter === 'all' && 'Tutti'}
                  {filter === 'online' && '🟢 Online'}
                  {filter === 'leader' && '👑 Leader'}
                  {filter === 'officer' && '⭐ Officer'}
                </button>
              ))}
            </div>

            <GlowButton variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              Invita
            </GlowButton>
          </div>

          {/* Members Table */}
          <TacticalCard>
            <TacticalCardHeader className="flex flex-row items-center justify-between">
              <TacticalCardTitle>Membri del Team</TacticalCardTitle>
              <span className="text-sm text-muted-foreground font-mono">
                {filteredMembers.length}/{team.maxMembers}
              </span>
            </TacticalCardHeader>
            <TacticalCardContent className="p-0">
              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 bg-muted/30 border-b border-border text-xs font-display uppercase text-muted-foreground">
                <div className="w-10" /> {/* Avatar */}
                <div className="flex-1">Nome</div>
                <div className="hidden sm:block w-14">Tier</div>
                <div className="w-14 text-right">K/D</div>
                <div className="hidden xs:block w-14 text-right">Partite</div>
                <div className="w-8" /> {/* Actions */}
              </div>

              <div className="divide-y divide-border/50">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <MemberRow
                      key={member.id}
                      id={member.id}
                      username={member.username}
                      role={member.teamRole}
                      tier={member.tier as TierType}
                      tierLevel={member.tierLevel}
                      kdRatio={member.stats.kdRatio}
                      matches={member.stats.matches}
                      isOnline={member.isOnline}
                      isCurrentUser={member.id === currentUser.id}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Nessun membro trovato
                  </div>
                )}
              </div>
            </TacticalCardContent>
          </TacticalCard>
        </TabsContent>

        {/* TAB: Stats */}
        <TabsContent value="stats" className="mt-6 space-y-6">
          <TeamStatsOverview
            matches={team.stats.matches}
            wins={team.stats.wins}
            losses={team.stats.losses}
            winRate={team.stats.winRate}
          />

          {/* Performance Chart Placeholder */}
          <TacticalCard>
            <TacticalCardHeader>
              <TacticalCardTitle>Andamento Prestazioni</TacticalCardTitle>
            </TacticalCardHeader>
            <TacticalCardContent>
              <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-sm">
                <p className="text-muted-foreground text-sm">
                  📊 Grafico andamento - Coming Soon
                </p>
              </div>
            </TacticalCardContent>
          </TacticalCard>

          {/* Performance by Game Mode */}
          <TacticalCard>
            <TacticalCardHeader>
              <TacticalCardTitle>Performance per Modalità</TacticalCardTitle>
            </TacticalCardHeader>
            <TacticalCardContent>
              <GameModeStats modes={MOCK_GAME_MODES} />
            </TacticalCardContent>
          </TacticalCard>
        </TabsContent>

        {/* TAB: Matches */}
        <TabsContent value="matches" className="mt-6">
          <TacticalCard>
            <TacticalCardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-display uppercase mb-2">Storico Partite</h3>
              <p className="text-muted-foreground text-sm">
                Coming Soon - Visualizza tutte le partite del team
              </p>
            </TacticalCardContent>
          </TacticalCard>
        </TabsContent>

        {/* TAB: Settings */}
        <TabsContent value="settings" className="mt-6">
          <TacticalCard>
            <TacticalCardContent className="p-8 text-center">
              <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-display uppercase mb-2">Impostazioni Team</h3>
              <p className="text-muted-foreground text-sm">
                Coming Soon - Gestisci le impostazioni del team
              </p>
            </TacticalCardContent>
          </TacticalCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Team;
