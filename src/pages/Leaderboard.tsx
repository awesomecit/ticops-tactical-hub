import React, { useState } from 'react';
import { Globe, MapPin, Users, UsersRound, TrendingUp } from 'lucide-react';
import {
  TacticalCard,
  TacticalCardHeader,
  TacticalCardTitle,
  TacticalCardContent,
} from '@/components/ui/TacticalCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  TierBadge,
  RankPosition,
  LeaderboardRow,
  TierProgressBar,
  TierDistributionChart,
  TierType,
} from '@/components/ranking';
import {
  getCurrentUser,
  MOCK_GLOBAL_TOP_5,
  MOCK_GLOBAL_AROUND_USER,
  MOCK_REGIONAL_LOMBARDIA_TOP_3,
  MOCK_TEAM_RANKINGS,
  getRankChange,
} from '@/mocks';
import { cn } from '@/lib/utils';

// Mock friends data (subset of users marked as friends)
const MOCK_FRIENDS_RANKINGS = [
  {
    rank: 45,
    previousRank: 48,
    userId: 'friend_001',
    username: 'TacticalMike',
    tier: 'gold' as TierType,
    tierLevel: 2,
    elo: 1520,
    eloChange: 22,
    stats: { matches: 89, wins: 51, winRate: 57.3, kdRatio: 1.58 },
  },
  {
    rank: 127,
    previousRank: 130,
    userId: 'user_003',
    username: 'GhostSniper92',
    tier: 'gold' as TierType,
    tierLevel: 4,
    elo: 1680,
    eloChange: 35,
    stats: { matches: 156, wins: 98, winRate: 62.8, kdRatio: 1.81 },
    isCurrentUser: true,
  },
  {
    rank: 234,
    previousRank: 230,
    userId: 'friend_002',
    username: 'WannaBeRef',
    tier: 'silver' as TierType,
    tierLevel: 5,
    elo: 1280,
    eloChange: -8,
    stats: { matches: 45, wins: 22, winRate: 48.9, kdRatio: 1.14 },
  },
];

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('global');
  const currentUser = getCurrentUser();

  // Find current user's ranking
  const userRanking = MOCK_GLOBAL_AROUND_USER.find(r => r.isCurrentUser);
  const userTeamRanking = MOCK_TEAM_RANKINGS.find(r => r.isUserTeam);

  // Combine top 5 with around user for global view
  const globalRankings = [
    ...MOCK_GLOBAL_TOP_5,
    { divider: true, label: '...' },
    ...MOCK_GLOBAL_AROUND_USER,
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display uppercase text-glow-primary">
          Classifiche
        </h1>
        <p className="text-muted-foreground mt-1">
          I migliori operatori sul campo di battaglia
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Your Rank Card */}
          <TacticalCard glow="primary">
            <TacticalCardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {/* Tier Badge */}
                <div className="flex-shrink-0 flex items-center gap-4">
                  <TierBadge
                    tier={currentUser.tier as TierType}
                    level={currentUser.tierLevel}
                    size="lg"
                  />
                  
                  <div className="sm:hidden">
                    <h3 className="font-display text-lg uppercase text-foreground">
                      Il Tuo Rank
                    </h3>
                    <p className="font-display text-sm text-muted-foreground capitalize">
                      {currentUser.tier} {currentUser.tierLevel}
                    </p>
                  </div>
                </div>

                {/* Rank Info */}
                <div className="flex-1 space-y-3">
                  <div className="hidden sm:block">
                    <h3 className="font-display text-lg uppercase text-foreground">
                      Il Tuo Rank
                    </h3>
                    <p className="font-display text-sm text-muted-foreground capitalize">
                      {currentUser.tier} {currentUser.tierLevel}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    {/* National Position */}
                    <div>
                      <span className="text-xs text-muted-foreground font-display uppercase block mb-1">
                        Posizione Nazionale
                      </span>
                      {userRanking && (
                        <RankPosition
                          rank={userRanking.rank}
                          previousRank={userRanking.previousRank}
                          size="md"
                          showMedal={false}
                        />
                      )}
                    </div>

                    {/* ELO */}
                    <div>
                      <span className="text-xs text-muted-foreground font-display uppercase block mb-1">
                        ELO Rating
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-2xl font-bold text-primary">
                          {currentUser.elo}
                        </span>
                        {userRanking && userRanking.eloChange !== 0 && (
                          <span className={cn(
                            'text-xs font-mono',
                            userRanking.eloChange > 0 ? 'text-secondary' : 'text-destructive'
                          )}>
                            {userRanking.eloChange > 0 ? '+' : ''}{userRanking.eloChange}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier Progress */}
              <div className="mt-6 pt-4 border-t border-border/50">
                <TierProgressBar
                  currentElo={currentUser.elo}
                  currentTier={currentUser.tier as TierType}
                />
              </div>
            </TacticalCardContent>
          </TacticalCard>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4 bg-card border border-border">
              <TabsTrigger
                value="global"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Globale</span>
              </TabsTrigger>
              <TabsTrigger
                value="regional"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Regionale</span>
              </TabsTrigger>
              <TabsTrigger
                value="friends"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Amici</span>
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <UsersRound className="h-4 w-4" />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
            </TabsList>

            {/* Global Leaderboard */}
            <TabsContent value="global" className="mt-4">
              <TacticalCard>
                <TacticalCardHeader>
                  <TacticalCardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Classifica Globale
                  </TacticalCardTitle>
                </TacticalCardHeader>
                <TacticalCardContent className="p-0">
                  {/* Header */}
                  <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 bg-muted/30 border-b border-border text-xs font-display uppercase text-muted-foreground">
                    <div className="w-16 sm:w-20">#</div>
                    <div className="flex-1">Player</div>
                    <div className="hidden xs:block sm:w-16 text-right">ELO</div>
                    <div className="hidden sm:block sm:w-14 text-right">Win%</div>
                    <div className="w-12 sm:w-14 text-right">K/D</div>
                  </div>

                  {/* Rows */}
                  <div className="divide-y divide-border/50">
                    {globalRankings.map((entry, index) => {
                      if ('divider' in entry) {
                        return (
                          <div
                            key="divider"
                            className="py-3 text-center text-muted-foreground font-mono text-sm"
                          >
                            • • •
                          </div>
                        );
                      }

                      return (
                        <LeaderboardRow
                          key={entry.userId}
                          rank={entry.rank}
                          previousRank={entry.previousRank}
                          username={entry.username}
                          tier={entry.tier as TierType}
                          tierLevel={entry.tierLevel}
                          elo={entry.elo}
                          winRate={entry.stats.winRate}
                          kdRatio={entry.stats.kdRatio}
                          isCurrentUser={entry.isCurrentUser}
                        />
                      );
                    })}
                  </div>
                </TacticalCardContent>
              </TacticalCard>
            </TabsContent>

            {/* Regional Leaderboard */}
            <TabsContent value="regional" className="mt-4">
              <TacticalCard>
                <TacticalCardHeader>
                  <TacticalCardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Classifica Lombardia
                  </TacticalCardTitle>
                </TacticalCardHeader>
                <TacticalCardContent className="p-0">
                  <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 bg-muted/30 border-b border-border text-xs font-display uppercase text-muted-foreground">
                    <div className="w-16 sm:w-20">#</div>
                    <div className="flex-1">Player</div>
                    <div className="hidden xs:block sm:w-16 text-right">ELO</div>
                    <div className="hidden sm:block sm:w-14 text-right">Win%</div>
                    <div className="w-12 sm:w-14 text-right">K/D</div>
                  </div>

                  <div className="divide-y divide-border/50">
                    {MOCK_REGIONAL_LOMBARDIA_TOP_3.map((entry) => (
                      <LeaderboardRow
                        key={entry.userId}
                        rank={entry.rank}
                        previousRank={entry.previousRank}
                        username={entry.username}
                        tier={entry.tier as TierType}
                        tierLevel={entry.tierLevel}
                        elo={entry.elo}
                        winRate={entry.stats.winRate}
                        kdRatio={entry.stats.kdRatio}
                      />
                    ))}
                  </div>
                </TacticalCardContent>
              </TacticalCard>
            </TabsContent>

            {/* Friends Leaderboard */}
            <TabsContent value="friends" className="mt-4">
              <TacticalCard>
                <TacticalCardHeader>
                  <TacticalCardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Classifica Amici
                  </TacticalCardTitle>
                </TacticalCardHeader>
                <TacticalCardContent className="p-0">
                  <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 bg-muted/30 border-b border-border text-xs font-display uppercase text-muted-foreground">
                    <div className="w-16 sm:w-20">#</div>
                    <div className="flex-1">Player</div>
                    <div className="hidden xs:block sm:w-16 text-right">ELO</div>
                    <div className="hidden sm:block sm:w-14 text-right">Win%</div>
                    <div className="w-12 sm:w-14 text-right">K/D</div>
                  </div>

                  <div className="divide-y divide-border/50">
                    {MOCK_FRIENDS_RANKINGS.map((entry) => (
                      <LeaderboardRow
                        key={entry.userId}
                        rank={entry.rank}
                        previousRank={entry.previousRank}
                        username={entry.username}
                        tier={entry.tier}
                        tierLevel={entry.tierLevel}
                        elo={entry.elo}
                        winRate={entry.stats.winRate}
                        kdRatio={entry.stats.kdRatio}
                        isCurrentUser={entry.isCurrentUser}
                      />
                    ))}
                  </div>
                </TacticalCardContent>
              </TacticalCard>
            </TabsContent>

            {/* Team Leaderboard */}
            <TabsContent value="teams" className="mt-4">
              <TacticalCard>
                <TacticalCardHeader>
                  <TacticalCardTitle className="flex items-center gap-2">
                    <UsersRound className="h-5 w-5" />
                    Classifica Team
                  </TacticalCardTitle>
                </TacticalCardHeader>
                <TacticalCardContent className="p-0">
                  <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 bg-muted/30 border-b border-border text-xs font-display uppercase text-muted-foreground">
                    <div className="w-16 sm:w-20">#</div>
                    <div className="flex-1">Team</div>
                    <div className="hidden xs:block sm:w-16 text-right">ELO</div>
                    <div className="hidden sm:block sm:w-14 text-right">Win%</div>
                    <div className="w-12 sm:w-14 text-right">Members</div>
                  </div>

                  <div className="divide-y divide-border/50">
                    {MOCK_TEAM_RANKINGS.map((entry) => (
                      <div
                        key={entry.teamId}
                        className={cn(
                          'flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 transition-all duration-200',
                          'hover:bg-muted/30 cursor-pointer group',
                          entry.isUserTeam && [
                            'bg-primary/10 border-l-2 border-primary',
                            'shadow-[inset_0_0_20px_rgba(255,107,0,0.1)]',
                          ]
                        )}
                      >
                        <div className="w-16 sm:w-20 flex-shrink-0">
                          <RankPosition
                            rank={entry.rank}
                            previousRank={entry.previousRank}
                            size="sm"
                          />
                        </div>

                        <div className="h-10 w-10 rounded bg-card border border-border flex items-center justify-center font-display font-bold text-primary flex-shrink-0">
                          {entry.tag}
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className={cn(
                            'font-display uppercase text-sm truncate block',
                            entry.isUserTeam ? 'text-primary' : 'text-foreground'
                          )}>
                            {entry.teamName}
                          </span>
                          {entry.isUserTeam && (
                            <span className="text-[10px] font-mono text-muted-foreground">
                              Il tuo team
                            </span>
                          )}
                        </div>

                        <div className="hidden xs:block sm:w-16 text-right">
                          <span className="font-mono text-sm font-bold text-primary">
                            {entry.elo}
                          </span>
                          <p className="text-[10px] text-muted-foreground uppercase">ELO</p>
                        </div>

                        <div className="hidden sm:block sm:w-14 text-right">
                          <span className="font-mono text-sm text-foreground">
                            {entry.stats.winRate.toFixed(1)}%
                          </span>
                          <p className="text-[10px] text-muted-foreground uppercase">Win</p>
                        </div>

                        <div className="w-12 sm:w-14 text-right">
                          <span className="font-mono text-sm text-foreground">
                            {entry.memberCount}
                          </span>
                          <p className="text-[10px] text-muted-foreground uppercase">👥</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TacticalCardContent>
              </TacticalCard>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block space-y-6">
          <TacticalCard>
            <TacticalCardContent className="p-4">
              <TierDistributionChart />
            </TacticalCardContent>
          </TacticalCard>

          {/* Quick Stats */}
          <TacticalCard>
            <TacticalCardContent className="p-4 space-y-4">
              <h3 className="font-display text-sm uppercase text-muted-foreground tracking-wider">
                Le Tue Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Partite Giocate</span>
                  <span className="font-mono text-foreground">{currentUser.stats.matches}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Vittorie</span>
                  <span className="font-mono text-secondary">{currentUser.stats.wins}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <span className="font-mono text-foreground">{currentUser.stats.winRate.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">K/D Ratio</span>
                  <span className="font-mono text-primary">{currentUser.stats.kdRatio.toFixed(2)}</span>
                </div>
              </div>
            </TacticalCardContent>
          </TacticalCard>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
