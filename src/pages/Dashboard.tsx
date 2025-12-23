import React from 'react';
import {
  Crosshair,
  Skull,
  Swords,
  MapPin,
  ChevronRight,
  Trophy,
  Users,
  TrendingUp,
  Award,
  UserPlus,
} from 'lucide-react';
import { useMockData } from '@/hooks/useMockData';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { RankBadge } from '@/components/ui/RankBadge';
import {
  StatCard,
  LiveMatchCard,
  UpcomingMatchCard,
  ActivityItem,
  EloProgressBar,
} from '@/components/dashboard';
import type { ActivityType } from '@/components/dashboard';

const activityIcons = {
  game: Crosshair,
  achievement: Award,
  team: Users,
  rank: TrendingUp,
  social: UserPlus,
};

const Dashboard: React.FC = () => {
  const {
    currentUser,
    liveMatches,
    upcomingMatches,
    recentActivities,
    currentTierBounds,
  } = useMockData();

  // Calculate km traveled (mock: based on matches played)
  const kmTraveled = (currentUser.stats.matches * 2.3).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-display uppercase text-glow-primary">
            Benvenuto, <span className="text-primary">{currentUser.username}</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Pronto per la prossima missione, Operatore?
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <RankBadge 
            rank={{
              id: currentUser.tier,
              name: `${currentUser.tier.charAt(0).toUpperCase() + currentUser.tier.slice(1)} ${currentUser.tierLevel}`,
              level: currentUser.tierLevel,
              icon: '🎖️',
              minXP: 0,
            }}
            size="lg"
            showLevel
          />
        </div>
      </div>

      {/* ELO Progress Bar */}
      <TacticalCard>
        <TacticalCardContent className="py-4">
          <EloProgressBar
            currentElo={currentUser.elo}
            tierName={currentUser.tier}
            prevTierElo={currentTierBounds.min}
            nextTierElo={currentTierBounds.max}
          />
        </TacticalCardContent>
      </TacticalCard>

      {/* Stats Grid - 4 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          icon={Crosshair}
          label="Kills"
          value={currentUser.stats.kills}
          trend="up"
          trendValue="+12"
        />
        <StatCard
          icon={Skull}
          label="Deaths"
          value={currentUser.stats.deaths}
          trend="down"
          trendValue="-3"
        />
        <StatCard
          icon={Swords}
          label="K/D Ratio"
          value={currentUser.stats.kdRatio.toFixed(2)}
          trend="up"
          trendValue="+0.15"
        />
        <StatCard
          icon={MapPin}
          label="Km Percorsi"
          value={kmTraveled}
          trend="neutral"
          trendValue=""
        />
      </div>

      {/* Two Columns: Live Matches & Upcoming Matches */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column: Live Matches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display uppercase flex items-center gap-2">
              <span className="h-2 w-2 bg-secondary rounded-full animate-pulse" />
              Partite Live
            </h2>
            <GlowButton variant="ghost" size="sm">
              Vedi Tutte <ChevronRight className="h-4 w-4 ml-1" />
            </GlowButton>
          </div>

          <div className="space-y-3">
            {liveMatches.map((match, index) => (
              <div
                key={match.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <LiveMatchCard {...match} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Matches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display uppercase">
              Prossime Partite
            </h2>
            <GlowButton variant="ghost" size="sm">
              Vedi Tutte <ChevronRight className="h-4 w-4 ml-1" />
            </GlowButton>
          </div>

          <div className="space-y-2">
            {upcomingMatches.map((match, index) => (
              <div
                key={match.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <UpcomingMatchCard {...match} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display uppercase">
            Attività Recenti
          </h2>
          <GlowButton variant="ghost" size="sm">
            Vedi Tutte <ChevronRight className="h-4 w-4 ml-1" />
          </GlowButton>
        </div>

        <TacticalCard>
          <TacticalCardContent className="p-2 sm:p-4 divide-y divide-border/30">
            {recentActivities.slice(0, 5).map((activity, index) => (
              <ActivityItem
                key={activity.id}
                icon={activityIcons[activity.type as ActivityType]}
                type={activity.type as ActivityType}
                text={activity.text}
                timestamp={activity.timestamp}
                isNew={activity.isNew}
                className={index === 0 ? '' : 'mt-1'}
              />
            ))}
          </TacticalCardContent>
        </TacticalCard>
      </div>
    </div>
  );
};

export default Dashboard;
