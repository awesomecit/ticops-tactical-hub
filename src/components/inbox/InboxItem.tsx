import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { it } from 'date-fns/locale';
import {
  UserPlus,
  Swords,
  Trophy,
  Award,
  Megaphone,
  Settings,
  Check,
  X,
  User,
  Calendar,
  MapPin,
  TrendingUp,
  TrendingDown,
  Share2,
  Eye,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowButton } from '@/components/ui/GlowButton';
import { TierBadge, TierType } from '@/components/ranking';
import { InboxItemType, IMockInboxItem } from '@/mocks/inbox';

interface InboxItemProps {
  item: IMockInboxItem;
  onAccept?: () => void;
  onReject?: () => void;
  onViewProfile?: () => void;
  onViewStats?: () => void;
  onShare?: () => void;
  onCounterProposal?: () => void;
  onAddToCalendar?: () => void;
}

const typeConfig: Record<InboxItemType, { icon: React.ElementType; color: string; emoji: string }> = {
  team_join_request: { icon: UserPlus, color: 'text-blue-400', emoji: '👤' },
  team_challenge: { icon: Swords, color: 'text-primary', emoji: '⚔️' },
  match_result: { icon: Trophy, color: 'text-accent', emoji: '🏆' },
  achievement: { icon: Award, color: 'text-secondary', emoji: '🎖️' },
  announcement: { icon: Megaphone, color: 'text-purple-400', emoji: '📢' },
  system: { icon: Settings, color: 'text-muted-foreground', emoji: '⚙️' },
};

export const InboxItem: React.FC<InboxItemProps> = ({
  item,
  onAccept,
  onReject,
  onViewProfile,
  onViewStats,
  onShare,
  onCounterProposal,
  onAddToCalendar,
}) => {
  const config = typeConfig[item.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'p-4 rounded-sm border transition-all',
        item.isRead
          ? 'bg-card border-border'
          : 'bg-primary/5 border-primary/30 shadow-[inset_0_0_20px_rgba(255,107,0,0.05)]'
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn(
          'h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0',
          'bg-card border border-border'
        )}>
          <span className="text-lg">{config.emoji}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className={cn(
              'font-display text-sm uppercase truncate',
              item.isRead ? 'text-foreground' : 'text-foreground font-bold'
            )}>
              {item.title}
            </h4>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatDistanceToNow(item.timestamp, { addSuffix: true, locale: it })}
            </span>
          </div>

          {/* Type-specific content */}
          {item.type === 'team_join_request' && (
            <JoinRequestContent item={item} onAccept={onAccept} onReject={onReject} onViewProfile={onViewProfile} />
          )}

          {item.type === 'team_challenge' && (
            <ChallengeContent item={item} onAccept={onAccept} onReject={onReject} onCounterProposal={onCounterProposal} />
          )}

          {item.type === 'match_result' && (
            <MatchResultContent item={item} onViewStats={onViewStats} onShare={onShare} />
          )}

          {item.type === 'achievement' && (
            <AchievementContent item={item} />
          )}

          {item.type === 'announcement' && (
            <AnnouncementContent item={item} onAddToCalendar={onAddToCalendar} />
          )}

          {item.type === 'system' && (
            <SystemContent item={item} />
          )}
        </div>

        {/* Unread indicator */}
        {!item.isRead && (
          <span className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-2" />
        )}
      </div>
    </div>
  );
};

// Join Request Content
const JoinRequestContent: React.FC<{
  item: IMockInboxItem;
  onAccept?: () => void;
  onReject?: () => void;
  onViewProfile?: () => void;
}> = ({ item, onAccept, onReject, onViewProfile }) => {
  const { data } = item;

  return (
    <div className="mt-3 space-y-3">
      {/* Message */}
      {data.message && (
        <p className="text-sm text-muted-foreground italic">"{data.message}"</p>
      )}

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-3">
        <TierBadge tier={data.tier as TierType} level={data.tierLevel} size="sm" />
        
        <div className="flex items-center gap-4 text-xs">
          <span className="font-mono">
            <span className="text-muted-foreground">ELO:</span>{' '}
            <span className="text-primary font-bold">{data.elo}</span>
          </span>
          <span className="font-mono">
            <span className="text-muted-foreground">K/D:</span>{' '}
            <span className="text-foreground">{data.kdRatio.toFixed(2)}</span>
          </span>
          <span className="font-mono">
            <span className="text-muted-foreground">Partite:</span>{' '}
            <span className="text-foreground">{data.matches}</span>
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <GlowButton variant="secondary" size="sm" onClick={onAccept}>
          <Check className="h-4 w-4 mr-1" />
          Accetta
        </GlowButton>
        <GlowButton variant="danger" size="sm" onClick={onReject}>
          <X className="h-4 w-4 mr-1" />
          Rifiuta
        </GlowButton>
        <GlowButton variant="outline" size="sm" onClick={onViewProfile}>
          <User className="h-4 w-4 mr-1" />
          Profilo
        </GlowButton>
      </div>
    </div>
  );
};

// Challenge Content
const ChallengeContent: React.FC<{
  item: IMockInboxItem;
  onAccept?: () => void;
  onReject?: () => void;
  onCounterProposal?: () => void;
}> = ({ item, onAccept, onReject, onCounterProposal }) => {
  const { data } = item;

  return (
    <div className="mt-3 space-y-3">
      {/* Message */}
      {data.message && (
        <p className="text-sm text-muted-foreground italic">"{data.message}"</p>
      )}

      {/* Info */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {format(new Date(data.proposedDate), "d MMM, HH:mm", { locale: it })}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {data.fieldName}
        </span>
        <span className="font-display uppercase">{data.gameMode}</span>
      </div>

      {/* Challenger info */}
      <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-sm">
        <span className="font-display font-bold text-primary">[{data.challengerTeamTag}]</span>
        <span className="text-sm text-foreground">{data.challengerTeamName}</span>
        <span className="text-xs text-muted-foreground">Rank #{data.challengerTeamRank}</span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <GlowButton variant="secondary" size="sm" onClick={onAccept}>
          <Check className="h-4 w-4 mr-1" />
          Accetta
        </GlowButton>
        <GlowButton variant="danger" size="sm" onClick={onReject}>
          <X className="h-4 w-4 mr-1" />
          Rifiuta
        </GlowButton>
        <GlowButton variant="outline" size="sm" onClick={onCounterProposal}>
          <Calendar className="h-4 w-4 mr-1" />
          Controproposta
        </GlowButton>
      </div>
    </div>
  );
};

// Match Result Content
const MatchResultContent: React.FC<{
  item: IMockInboxItem;
  onViewStats?: () => void;
  onShare?: () => void;
}> = ({ item, onViewStats, onShare }) => {
  const { data } = item;
  const isVictory = data.result === 'victory';

  return (
    <div className="mt-3 space-y-3">
      {/* Match name */}
      <p className="text-sm text-muted-foreground">
        {data.matchName} vs <span className="text-foreground">{data.opponentTeam}</span>
      </p>

      {/* Score & ELO */}
      <div className="flex items-center gap-4">
        <div className={cn(
          'px-3 py-2 rounded-sm font-mono text-lg font-bold',
          isVictory ? 'bg-secondary/20 text-secondary' : 'bg-destructive/20 text-destructive'
        )}>
          {data.score.team} - {data.score.opponent}
        </div>

        <div className="flex items-center gap-1">
          {isVictory ? (
            <TrendingUp className="h-4 w-4 text-secondary" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
          <span className={cn(
            'font-mono text-sm font-bold',
            isVictory ? 'text-secondary' : 'text-destructive'
          )}>
            {data.eloChange > 0 ? '+' : ''}{data.eloChange} ELO
          </span>
        </div>
      </div>

      {/* MVP */}
      <div className="flex items-center gap-2 text-xs">
        <Trophy className="h-4 w-4 text-accent" />
        <span className="text-muted-foreground">MVP:</span>
        <span className="text-foreground font-display uppercase">{data.mvpUsername}</span>
        <span className="text-muted-foreground">({data.mvpKills} kills)</span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <GlowButton variant="outline" size="sm" onClick={onViewStats}>
          <Eye className="h-4 w-4 mr-1" />
          Vedi Stats
        </GlowButton>
        <GlowButton variant="outline" size="sm" onClick={onShare}>
          <Share2 className="h-4 w-4 mr-1" />
          Condividi
        </GlowButton>
      </div>
    </div>
  );
};

// Achievement Content
const AchievementContent: React.FC<{ item: IMockInboxItem }> = ({ item }) => {
  const { data } = item;

  return (
    <div className="mt-3">
      <div className="flex items-center gap-4 p-3 bg-accent/10 border border-accent/30 rounded-sm">
        <span className="text-4xl">{data.badgeIcon}</span>
        <div>
          <h5 className="font-display uppercase text-accent font-bold">
            {data.badgeName}
          </h5>
          <p className="text-xs text-muted-foreground mt-0.5">
            {data.badgeDescription}
          </p>
          <p className="text-xs text-secondary mt-1 font-mono">
            +{data.xpReward} XP
          </p>
        </div>
      </div>
    </div>
  );
};

// Announcement Content
const AnnouncementContent: React.FC<{
  item: IMockInboxItem;
  onAddToCalendar?: () => void;
}> = ({ item, onAddToCalendar }) => {
  const { data } = item;

  return (
    <div className="mt-3 space-y-3">
      <p className="text-sm text-muted-foreground">{data.message}</p>

      {data.eventDate && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {format(new Date(data.eventDate), "EEEE d MMMM, HH:mm", { locale: it })}
          </div>
          
          <GlowButton variant="outline" size="sm" onClick={onAddToCalendar}>
            <Calendar className="h-4 w-4 mr-1" />
            Aggiungi
          </GlowButton>
        </div>
      )}
    </div>
  );
};

// System Content
const SystemContent: React.FC<{ item: IMockInboxItem }> = ({ item }) => {
  const { data } = item;

  return (
    <div className="mt-3">
      <p className="text-sm text-muted-foreground">{data.message}</p>
      
      {data.link && (
        <button className="flex items-center gap-1 text-xs text-primary mt-2 hover:underline">
          Leggi di più <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};
