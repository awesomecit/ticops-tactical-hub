import React from 'react';
import { 
  MoreHorizontal, 
  Crown, 
  Star, 
  Shield, 
  UserMinus, 
  MessageSquare,
  Ban 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RoleGate } from '@/components/auth/RoleGate';
import { TeamRole } from '@/mocks/users';
import { toast } from 'sonner';

interface MemberActionsDropdownProps {
  memberId: string;
  memberUsername: string;
  currentRole: TeamRole;
  isCurrentUser: boolean;
  onPromote?: (memberId: string, newRole: TeamRole) => void;
  onDemote?: (memberId: string, newRole: TeamRole) => void;
  onKick?: (memberId: string) => void;
  onMessage?: (memberId: string) => void;
}

export const MemberActionsDropdown: React.FC<MemberActionsDropdownProps> = ({
  memberId,
  memberUsername,
  currentRole,
  isCurrentUser,
  onPromote,
  onDemote,
  onKick,
  onMessage,
}) => {
  const handlePromoteToOfficer = () => {
    if (onPromote) {
      onPromote(memberId, 'officer');
    } else {
      toast.success(`${memberUsername} promosso a Officer`);
    }
  };

  const handlePromoteToLeader = () => {
    if (onPromote) {
      onPromote(memberId, 'leader');
    } else {
      toast.success(`${memberUsername} promosso a Leader`, {
        description: 'Hai ceduto la leadership del team',
      });
    }
  };

  const handleDemoteToMember = () => {
    if (onDemote) {
      onDemote(memberId, 'member');
    } else {
      toast.success(`${memberUsername} degradato a Membro`);
    }
  };

  const handleKick = () => {
    if (onKick) {
      onKick(memberId);
    } else {
      toast.success(`${memberUsername} espulso dal team`);
    }
  };

  const handleMessage = () => {
    if (onMessage) {
      onMessage(memberId);
    } else {
      toast.info(`Apri chat con ${memberUsername}`);
    }
  };

  // Don't show menu for current user or leader
  if (isCurrentUser) {
    return (
      <button className="p-2 text-muted-foreground opacity-30 cursor-not-allowed">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {/* Message - everyone can do */}
        <DropdownMenuItem onClick={handleMessage}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Invia Messaggio
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Promote/Demote actions - only team_leader */}
        <RoleGate roles={['team_leader', 'admin']}>
          {currentRole === 'member' && (
            <DropdownMenuItem onClick={handlePromoteToOfficer}>
              <Star className="h-4 w-4 mr-2 text-primary" />
              Promuovi a Officer
            </DropdownMenuItem>
          )}

          {currentRole === 'officer' && (
            <>
              <DropdownMenuItem onClick={handlePromoteToLeader}>
                <Crown className="h-4 w-4 mr-2 text-accent" />
                Cedi Leadership
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDemoteToMember}>
                <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                Degrada a Membro
              </DropdownMenuItem>
            </>
          )}

          {currentRole !== 'leader' && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleKick}
                className="text-destructive focus:text-destructive"
              >
                <UserMinus className="h-4 w-4 mr-2" />
                Espelli dal Team
              </DropdownMenuItem>
            </>
          )}
        </RoleGate>

        {/* Leader cannot be kicked */}
        {currentRole === 'leader' && (
          <div className="px-2 py-1.5 text-xs text-muted-foreground">
            <Ban className="h-3 w-3 inline mr-1" />
            Leader del team
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
