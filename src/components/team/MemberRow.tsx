import React from 'react';
import { Crown, Star, Shield, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TierBadge, TierType } from '@/components/ranking';
import { TeamRole } from '@/mocks/users';

interface MemberRowProps {
  id: string;
  username: string;
  avatar?: string;
  role: TeamRole;
  tier: TierType;
  tierLevel: number;
  kdRatio: number;
  matches: number;
  isOnline: boolean;
  isCurrentUser?: boolean;
  className?: string;
}

const roleConfig = {
  leader: { icon: Crown, label: 'Leader', color: 'text-accent' },
  officer: { icon: Star, label: 'Officer', color: 'text-primary' },
  member: { icon: Shield, label: 'Member', color: 'text-muted-foreground' },
};

export const MemberRow: React.FC<MemberRowProps> = ({
  username,
  avatar,
  role,
  tier,
  tierLevel,
  kdRatio,
  matches,
  isOnline,
  isCurrentUser,
  className,
}) => {
  const roleData = role ? roleConfig[role] : roleConfig.member;
  const RoleIcon = roleData.icon;

  return (
    <div
      className={cn(
        'flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 transition-all duration-200',
        'hover:bg-muted/30 group',
        isCurrentUser && 'bg-primary/5 border-l-2 border-primary',
        className
      )}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={username}
            className="h-10 w-10 rounded-full border-2 border-border"
          />
        ) : (
          <div className={cn(
            'h-10 w-10 rounded-full flex items-center justify-center font-display font-bold text-lg',
            'bg-card border-2 border-border',
            isCurrentUser && 'border-primary bg-primary/20 text-primary'
          )}>
            {username.charAt(0).toUpperCase()}
          </div>
        )}
        
        {/* Online indicator */}
        <span
          className={cn(
            'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background',
            isOnline ? 'bg-secondary' : 'bg-muted'
          )}
        />
      </div>

      {/* Name & Role */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-display uppercase text-sm truncate',
            isCurrentUser ? 'text-primary' : 'text-foreground'
          )}>
            {username}
          </span>
          <RoleIcon className={cn('h-4 w-4 flex-shrink-0', roleData.color)} />
        </div>
        <span className={cn('text-xs', roleData.color)}>
          {roleData.label}
        </span>
      </div>

      {/* Tier */}
      <div className="hidden sm:block">
        <TierBadge tier={tier} level={tierLevel} size="sm" />
      </div>

      {/* K/D */}
      <div className="text-right w-14">
        <span className="font-mono text-sm text-foreground">
          {kdRatio.toFixed(2)}
        </span>
        <p className="text-[10px] text-muted-foreground uppercase">K/D</p>
      </div>

      {/* Matches */}
      <div className="text-right w-14 hidden xs:block">
        <span className="font-mono text-sm text-foreground">
          {matches}
        </span>
        <p className="text-[10px] text-muted-foreground uppercase">Partite</p>
      </div>

      {/* Actions */}
      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
};
