import React from 'react';
import { Users, MessageSquare, Inbox, Trophy, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IMockTeam } from '@/mocks/teams';

interface TeamHeaderProps {
  team: IMockTeam;
  pendingRequestsCount: number;
  onChatClick?: () => void;
  onInboxClick?: () => void;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({
  team,
  pendingRequestsCount,
  onChatClick,
  onInboxClick,
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
      {/* Team Logo & Info */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div
          className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 clip-tactical flex items-center justify-center border-2"
          style={{
            backgroundColor: `${team.color}20`,
            borderColor: team.color,
          }}
        >
          <span
            className="font-display text-2xl sm:text-3xl font-bold"
            style={{ color: team.color }}
          >
            {team.tag}
          </span>
        </div>

        {/* Name & Tag */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display uppercase text-foreground">
              {team.name}
            </h1>
            <span
              className="px-2 py-0.5 text-xs font-mono rounded"
              style={{
                backgroundColor: `${team.color}30`,
                color: team.color,
              }}
            >
              [{team.tag}]
            </span>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {team.memberCount}/{team.maxMembers}
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              #{team.rank}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {team.stats.winRate.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 lg:ml-auto">
        <button
          onClick={onChatClick}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-sm',
            'bg-card border border-border hover:border-primary/50 hover:bg-card/80',
            'text-sm font-display uppercase transition-colors'
          )}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Chat</span>
        </button>

        <button
          onClick={onInboxClick}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-sm relative',
            'bg-card border border-border hover:border-primary/50 hover:bg-card/80',
            'text-sm font-display uppercase transition-colors'
          )}
        >
          <Inbox className="h-4 w-4" />
          <span className="hidden sm:inline">Inbox</span>
          {pendingRequestsCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
              {pendingRequestsCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
