import React, { useState } from 'react';
import { Trophy, Medal, Target, Crosshair, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react';
import { mockUser, mockRanks } from '@/mocks/data';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { RankBadge } from '@/components/ui/RankBadge';
import { cn } from '@/lib/utils';

const mockLeaderboard = [
  { ...mockUser, id: '1', callsign: 'APEX', stats: { ...mockUser.stats, xp: 12500, wins: 48 }, rank: mockRanks[5] },
  { ...mockUser, id: '2', callsign: 'VENOM', stats: { ...mockUser.stats, xp: 11200, wins: 45 }, rank: mockRanks[5] },
  { ...mockUser, id: '3', callsign: 'GHOST', stats: { ...mockUser.stats, xp: 9800, wins: 42 }, rank: mockRanks[4] },
  { ...mockUser, id: '4', callsign: 'SHADOW', stats: { ...mockUser.stats, xp: 8500, wins: 38 }, rank: mockRanks[4] },
  { ...mockUser, id: '5', callsign: 'PHOENIX', stats: { ...mockUser.stats, xp: 7200, wins: 35 }, rank: mockRanks[3] },
  { ...mockUser, id: '6', callsign: 'VIPER', stats: { ...mockUser.stats, xp: 6800, wins: 32 }, rank: mockRanks[3] },
  { ...mockUser, id: '7', callsign: 'STORM', stats: { ...mockUser.stats, xp: 5500, wins: 28 }, rank: mockRanks[3] },
  { ...mockUser, id: '8', callsign: 'BLADE', stats: { ...mockUser.stats, xp: 4200, wins: 24 }, rank: mockRanks[2] },
];

const Leaderboard: React.FC = () => {
  const [sortBy, setSortBy] = useState<'xp' | 'wins' | 'kd'>('xp');

  const sortedLeaderboard = [...mockLeaderboard].sort((a, b) => {
    if (sortBy === 'xp') return b.stats.xp - a.stats.xp;
    if (sortBy === 'wins') return b.stats.wins - a.stats.wins;
    const aKd = a.stats.kills / Math.max(a.stats.deaths, 1);
    const bKd = b.stats.kills / Math.max(b.stats.deaths, 1);
    return bKd - aKd;
  });

  const getMedalColor = (position: number) => {
    if (position === 0) return 'text-accent';
    if (position === 1) return 'text-slate-300';
    if (position === 2) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-glow-primary">Classifiche</h1>
          <p className="text-muted-foreground mt-1">
            I migliori operatori sul campo
          </p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {/* 2nd Place */}
        <TacticalCard glow="primary" className="order-1 mt-8">
          <TacticalCardContent className="text-center py-6">
            <div className="h-16 w-16 mx-auto bg-slate-600/20 clip-tactical flex items-center justify-center border border-slate-500/50 mb-3">
              <Medal className="h-8 w-8 text-slate-300" />
            </div>
            <span className="text-2xl font-mono font-bold text-slate-300">#2</span>
            <h3 className="font-display text-lg uppercase text-foreground mt-2">
              {sortedLeaderboard[1]?.callsign}
            </h3>
            <RankBadge rank={sortedLeaderboard[1]?.rank} size="sm" className="mt-2" />
            <p className="font-mono text-sm text-muted-foreground mt-2">
              {sortedLeaderboard[1]?.stats.xp.toLocaleString()} XP
            </p>
          </TacticalCardContent>
        </TacticalCard>

        {/* 1st Place */}
        <TacticalCard glow="accent" variant="large" className="order-0 sm:order-1 col-span-3 sm:col-span-1">
          <TacticalCardContent className="text-center py-8">
            <div className="h-20 w-20 mx-auto bg-accent/20 clip-tactical flex items-center justify-center border-2 border-accent mb-3">
              <Trophy className="h-10 w-10 text-accent" />
            </div>
            <span className="text-3xl font-mono font-bold text-accent">#1</span>
            <h3 className="font-display text-xl uppercase text-foreground mt-2">
              {sortedLeaderboard[0]?.callsign}
            </h3>
            <RankBadge rank={sortedLeaderboard[0]?.rank} size="md" className="mt-2" />
            <p className="font-mono text-lg text-accent mt-2">
              {sortedLeaderboard[0]?.stats.xp.toLocaleString()} XP
            </p>
          </TacticalCardContent>
        </TacticalCard>

        {/* 3rd Place */}
        <TacticalCard glow="primary" className="order-2 mt-12">
          <TacticalCardContent className="text-center py-6">
            <div className="h-16 w-16 mx-auto bg-amber-900/20 clip-tactical flex items-center justify-center border border-amber-700/50 mb-3">
              <Medal className="h-8 w-8 text-amber-600" />
            </div>
            <span className="text-2xl font-mono font-bold text-amber-600">#3</span>
            <h3 className="font-display text-lg uppercase text-foreground mt-2">
              {sortedLeaderboard[2]?.callsign}
            </h3>
            <RankBadge rank={sortedLeaderboard[2]?.rank} size="sm" className="mt-2" />
            <p className="font-mono text-sm text-muted-foreground mt-2">
              {sortedLeaderboard[2]?.stats.xp.toLocaleString()} XP
            </p>
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Sort Tabs */}
      <div className="flex gap-2">
        {([
          { key: 'xp', label: 'XP Totale', icon: TrendingUp },
          { key: 'wins', label: 'Vittorie', icon: Trophy },
          { key: 'kd', label: 'K/D Ratio', icon: Target },
        ] as const).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 font-display uppercase text-sm tracking-wider clip-tactical-sm transition-all",
              sortBy === key
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Full Leaderboard */}
      <TacticalCard>
        <TacticalCardHeader>
          <TacticalCardTitle>Classifica Completa</TacticalCardTitle>
        </TacticalCardHeader>
        <TacticalCardContent className="p-0">
          <div className="divide-y divide-border">
            {sortedLeaderboard.map((player, index) => (
              <div
                key={player.id}
                className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors animate-slide-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className={cn(
                  "w-8 font-mono text-xl font-bold text-center",
                  getMedalColor(index)
                )}>
                  {index + 1}
                </span>

                <div className="h-12 w-12 bg-card clip-tactical-sm border border-border flex items-center justify-center">
                  <span className="font-display font-bold text-lg text-primary">
                    {player.callsign.charAt(0)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display uppercase text-foreground">
                      {player.callsign}
                    </span>
                    {index < 3 && (
                      <ChevronUp className="h-4 w-4 text-secondary" />
                    )}
                  </div>
                  <RankBadge rank={player.rank} size="sm" />
                </div>

                <div className="text-right hidden sm:block">
                  <span className="font-mono text-sm text-foreground">
                    {player.stats.xp.toLocaleString()}
                  </span>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="font-mono text-sm text-foreground">
                    {player.stats.wins}
                  </span>
                  <p className="text-xs text-muted-foreground">Vittorie</p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-sm text-foreground">
                    {(player.stats.kills / Math.max(player.stats.deaths, 1)).toFixed(2)}
                  </span>
                  <p className="text-xs text-muted-foreground">K/D</p>
                </div>
              </div>
            ))}
          </div>
        </TacticalCardContent>
      </TacticalCard>
    </div>
  );
};

export default Leaderboard;
