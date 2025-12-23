import React from 'react';
import { Users, Shield, Crown, Star, Plus, Settings } from 'lucide-react';
import { mockTeams, mockUser } from '@/mocks/data';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { RankBadge } from '@/components/ui/RankBadge';
import { cn } from '@/lib/utils';

const Team: React.FC = () => {
  // For demo, user is in Delta Force (alpha team)
  const userTeam = mockTeams[0];
  
  const mockMembers = [
    { ...mockUser, role: 'leader' as const },
    { ...mockUser, id: '2', username: 'viper_one', callsign: 'VIPER', role: 'officer' as const },
    { ...mockUser, id: '3', username: 'shadow_wolf', callsign: 'SHADOW', role: 'member' as const },
    { ...mockUser, id: '4', username: 'phoenix_red', callsign: 'PHOENIX', role: 'member' as const },
  ];

  const roleIcons = {
    leader: Crown,
    officer: Shield,
    member: Star,
  };

  const roleLabels = {
    leader: 'Leader',
    officer: 'Ufficiale',
    member: 'Membro',
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-glow-primary">Il Mio Team</h1>
          <p className="text-muted-foreground mt-1">
            Gestisci la tua squadra e i membri
          </p>
        </div>
        <div className="flex gap-2">
          <GlowButton variant="tactical">
            <Settings className="h-4 w-4 mr-2" />
            Impostazioni
          </GlowButton>
          <GlowButton variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Invita
          </GlowButton>
        </div>
      </div>

      {/* Team Header Card */}
      <TacticalCard variant="large" glow="primary" className="overflow-visible">
        <TacticalCardContent>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className={cn(
              "h-24 w-24 flex-shrink-0 clip-tactical flex items-center justify-center border-2",
              userTeam.color === 'alpha' ? "bg-team-alpha/10 border-team-alpha" : "bg-team-bravo/10 border-team-bravo"
            )}>
              <span className="font-display text-4xl font-bold text-foreground">
                {userTeam.tag}
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl text-foreground">{userTeam.name}</h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {mockMembers.length} membri
                </span>
                <span className={cn(
                  "px-2 py-0.5 text-xs font-display uppercase border clip-tactical-sm",
                  userTeam.color === 'alpha' 
                    ? "bg-team-alpha/20 text-team-alpha border-team-alpha/50"
                    : "bg-team-bravo/20 text-team-bravo border-team-bravo/50"
                )}>
                  Team {userTeam.color === 'alpha' ? 'Alpha' : 'Bravo'}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl font-mono font-bold text-primary">#3</span>
              <span className="text-xs text-muted-foreground uppercase">Classifica</span>
            </div>
          </div>
        </TacticalCardContent>
      </TacticalCard>

      {/* Team Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TacticalCard>
          <TacticalCardContent className="text-center py-4">
            <span className="text-3xl font-mono font-bold text-foreground">24</span>
            <p className="text-xs text-muted-foreground uppercase mt-1">Partite</p>
          </TacticalCardContent>
        </TacticalCard>
        <TacticalCard>
          <TacticalCardContent className="text-center py-4">
            <span className="text-3xl font-mono font-bold text-secondary">18</span>
            <p className="text-xs text-muted-foreground uppercase mt-1">Vittorie</p>
          </TacticalCardContent>
        </TacticalCard>
        <TacticalCard>
          <TacticalCardContent className="text-center py-4">
            <span className="text-3xl font-mono font-bold text-accent">75%</span>
            <p className="text-xs text-muted-foreground uppercase mt-1">Win Rate</p>
          </TacticalCardContent>
        </TacticalCard>
        <TacticalCard>
          <TacticalCardContent className="text-center py-4">
            <span className="text-3xl font-mono font-bold text-primary">12.5K</span>
            <p className="text-xs text-muted-foreground uppercase mt-1">XP Totale</p>
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Team Members */}
      <TacticalCard>
        <TacticalCardHeader className="flex flex-row items-center justify-between">
          <TacticalCardTitle>Membri del Team</TacticalCardTitle>
          <span className="text-sm text-muted-foreground font-mono">{mockMembers.length}/8</span>
        </TacticalCardHeader>
        <TacticalCardContent className="p-0">
          <div className="divide-y divide-border">
            {mockMembers.map((member, index) => {
              const RoleIcon = roleIcons[member.role];
              
              return (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors animate-slide-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="h-12 w-12 bg-card clip-tactical-sm border border-border flex items-center justify-center">
                    <span className="font-display font-bold text-lg text-primary">
                      {member.callsign.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display uppercase text-foreground">
                        {member.callsign}
                      </span>
                      <RoleIcon className={cn(
                        "h-4 w-4",
                        member.role === 'leader' && "text-accent",
                        member.role === 'officer' && "text-primary",
                        member.role === 'member' && "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <RankBadge rank={member.rank} size="sm" />
                      <span className="text-xs text-muted-foreground">
                        {roleLabels[member.role]}
                      </span>
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <span className="font-mono text-sm text-foreground">
                      {member.stats.kills}/{member.stats.deaths}
                    </span>
                    <p className="text-xs text-muted-foreground">K/D</p>
                  </div>

                  <div className="text-right hidden sm:block">
                    <span className="font-mono text-sm text-foreground">
                      {member.stats.gamesPlayed}
                    </span>
                    <p className="text-xs text-muted-foreground">Partite</p>
                  </div>
                </div>
              );
            })}
          </div>
        </TacticalCardContent>
      </TacticalCard>
    </div>
  );
};

export default Team;
