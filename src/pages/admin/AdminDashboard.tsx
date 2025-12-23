import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { 
  AdminStatCard, 
  PendingActionItem, 
  ActivityLogItem, 
  LiveMatchCard,
  UsersChart 
} from '@/components/admin';
import { 
  MOCK_ADMIN_STATS, 
  MOCK_ADMIN_PENDING_ACTIONS, 
  MOCK_ADMIN_ACTIVITY_LOG,
  MOCK_LIVE_MATCHES 
} from '@/mocks/admin';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-glow-primary">Admin Overview</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Panoramica della piattaforma TicOps
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_ADMIN_STATS.map((stat, index) => (
          <AdminStatCard key={stat.label} {...stat} index={index} />
        ))}
      </div>

      {/* Live Matches */}
      <TacticalCard>
        <TacticalCardHeader className="flex flex-row items-center justify-between">
          <TacticalCardTitle className="flex items-center gap-2">
            <span className="h-2 w-2 bg-secondary rounded-full animate-pulse" />
            Partite Live
          </TacticalCardTitle>
          <Link to="/admin/matches">
            <GlowButton variant="ghost" size="sm">
              Vedi tutte
            </GlowButton>
          </Link>
        </TacticalCardHeader>
        <TacticalCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_LIVE_MATCHES.map((match, index) => (
              <LiveMatchCard key={match.id} match={match} index={index} />
            ))}
          </div>
        </TacticalCardContent>
      </TacticalCard>

      {/* Chart + Pending Actions Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Users Chart */}
        <UsersChart />

        {/* Pending Actions */}
        <TacticalCard>
          <TacticalCardHeader className="flex flex-row items-center justify-between">
            <TacticalCardTitle>Azioni Pendenti</TacticalCardTitle>
            <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-sm">
              {MOCK_ADMIN_PENDING_ACTIONS.length} in attesa
            </span>
          </TacticalCardHeader>
          <TacticalCardContent>
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin">
              {MOCK_ADMIN_PENDING_ACTIONS.map((action, index) => (
                <PendingActionItem key={action.id} action={action} index={index} />
              ))}
            </div>
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Activity Log */}
      <TacticalCard>
        <TacticalCardHeader className="flex flex-row items-center justify-between">
          <TacticalCardTitle>Activity Log</TacticalCardTitle>
          <span className="text-xs text-muted-foreground">
            Ultime 10 azioni
          </span>
        </TacticalCardHeader>
        <TacticalCardContent>
          <div className="divide-y divide-border/30">
            {MOCK_ADMIN_ACTIVITY_LOG.map((log, index) => (
              <ActivityLogItem key={log.id} log={log} index={index} />
            ))}
          </div>
        </TacticalCardContent>
      </TacticalCard>
    </div>
  );
};

export default AdminDashboard;
