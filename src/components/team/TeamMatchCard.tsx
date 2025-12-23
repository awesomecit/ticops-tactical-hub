import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { MapPin, Check, X, HelpCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';

interface TeamMemberStatus {
  id: string;
  username: string;
  status: 'confirmed' | 'pending' | 'declined';
}

interface TeamMatchCardProps {
  id: string;
  name: string;
  date: Date;
  fieldName: string;
  opponent?: string;
  memberStatuses: TeamMemberStatus[];
  isUserConfirmed?: boolean;
  onConfirm?: () => void;
  onDecline?: () => void;
  className?: string;
}

export const TeamMatchCard: React.FC<TeamMatchCardProps> = ({
  name,
  date,
  fieldName,
  opponent,
  memberStatuses,
  isUserConfirmed,
  onConfirm,
  onDecline,
  className,
}) => {
  const confirmedCount = memberStatuses.filter(m => m.status === 'confirmed').length;
  const pendingCount = memberStatuses.filter(m => m.status === 'pending').length;
  const declinedCount = memberStatuses.filter(m => m.status === 'declined').length;

  return (
    <TacticalCard glow="primary" className={className}>
      <TacticalCardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-display text-sm uppercase text-foreground">
              {name}
            </h4>
            {opponent && (
              <p className="text-xs text-muted-foreground mt-0.5">
                vs <span className="text-team-bravo">{opponent}</span>
              </p>
            )}
          </div>
          
          <div className="text-right">
            <span className="font-mono text-sm text-primary">
              {format(date, 'd MMM', { locale: it })}
            </span>
            <p className="text-xs text-muted-foreground">
              {format(date, 'HH:mm')}
            </p>
          </div>
        </div>

        {/* Field */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
          <MapPin className="h-3 w-3" />
          <span>{fieldName}</span>
        </div>

        {/* Member Status List */}
        <div className="flex flex-wrap gap-2 mt-4">
          {memberStatuses.map((member) => (
            <div
              key={member.id}
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs',
                member.status === 'confirmed' && 'bg-secondary/20 text-secondary',
                member.status === 'pending' && 'bg-accent/20 text-accent',
                member.status === 'declined' && 'bg-destructive/20 text-destructive'
              )}
            >
              {member.status === 'confirmed' && <Check className="h-3 w-3" />}
              {member.status === 'pending' && <HelpCircle className="h-3 w-3" />}
              {member.status === 'declined' && <X className="h-3 w-3" />}
              <span className="font-display uppercase">{member.username}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50 text-xs">
          <span className="text-secondary">✓ {confirmedCount}</span>
          <span className="text-accent">? {pendingCount}</span>
          <span className="text-destructive">✗ {declinedCount}</span>
        </div>

        {/* User Actions */}
        {isUserConfirmed === undefined && (
          <div className="flex gap-2 mt-4">
            <GlowButton variant="secondary" size="sm" onClick={onConfirm} className="flex-1">
              <Check className="h-4 w-4 mr-1" />
              Conferma
            </GlowButton>
            <GlowButton variant="danger" size="sm" onClick={onDecline} className="flex-1">
              <X className="h-4 w-4 mr-1" />
              Non posso
            </GlowButton>
          </div>
        )}

        {isUserConfirmed === true && (
          <div className="mt-4 p-2 bg-secondary/10 rounded-sm text-center text-xs text-secondary font-display uppercase">
            ✓ Hai confermato la partecipazione
          </div>
        )}

        {isUserConfirmed === false && (
          <div className="mt-4 p-2 bg-destructive/10 rounded-sm text-center text-xs text-destructive font-display uppercase">
            ✗ Non partecipi
          </div>
        )}
      </TacticalCardContent>
    </TacticalCard>
  );
};
