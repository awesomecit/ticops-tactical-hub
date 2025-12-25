import React, { useState } from 'react';
import { Search, UserPlus, X, Copy, Link2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { GlowButton } from '@/components/ui/GlowButton';
import { TierBadge, TierType } from '@/components/ranking';
import { MOCK_USERS } from '@/mocks/users';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  teamName: string;
  currentMemberIds: string[];
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  isOpen,
  onClose,
  teamId,
  teamName,
  currentMemberIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [inviteLink] = useState(`https://ticops.app/join/${teamId}`);

  // Filter available users (not already in team)
  const availableUsers = MOCK_USERS.filter(
    (user) =>
      !currentMemberIds.includes(user.id) &&
      !user.teamId &&
      (searchQuery === '' ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSendInvites = () => {
    if (selectedUsers.length === 0) {
      toast.error('Seleziona almeno un giocatore');
      return;
    }

    const usernames = selectedUsers
      .map((id) => MOCK_USERS.find((u) => u.id === id)?.username)
      .filter(Boolean);

    toast.success(`Inviti inviati a ${usernames.join(', ')}`);
    setSelectedUsers([]);
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success('Link copiato negli appunti!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Invita Membri
          </DialogTitle>
          <DialogDescription>
            Invita nuovi giocatori a unirsi a {teamName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Invite Link */}
          <div className="p-3 bg-muted/30 rounded-sm border border-border">
            <p className="text-xs font-display uppercase text-muted-foreground mb-2">
              <Link2 className="h-3 w-3 inline mr-1" />
              Link di Invito
            </p>
            <div className="flex gap-2">
              <Input
                value={inviteLink}
                readOnly
                className="bg-background text-xs font-mono"
              />
              <GlowButton variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </GlowButton>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca giocatore per username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Selected Users */}
          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((userId) => {
                const user = MOCK_USERS.find((u) => u.id === userId);
                if (!user) return null;
                return (
                  <span
                    key={userId}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded-sm"
                  >
                    {user.username}
                    <button
                      onClick={() => toggleUserSelection(userId)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {/* User List */}
          <div className="max-h-60 overflow-y-auto space-y-1 border border-border rounded-sm">
            {availableUsers.length > 0 ? (
              availableUsers.slice(0, 10).map((user) => (
                <button
                  key={user.id}
                  onClick={() => toggleUserSelection(user.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 transition-colors text-left',
                    selectedUsers.includes(user.id)
                      ? 'bg-primary/10 border-l-2 border-primary'
                      : 'hover:bg-muted/30'
                  )}
                >
                  <div className="h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center font-display text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm truncate">
                      {user.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.stats.matches} partite • K/D{' '}
                      {user.stats.kdRatio.toFixed(2)}
                    </p>
                  </div>
                  <TierBadge
                    tier={user.tier as TierType}
                    level={user.tierLevel}
                    size="sm"
                  />
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground text-sm">
                {searchQuery
                  ? 'Nessun giocatore trovato'
                  : 'Nessun giocatore disponibile'}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <GlowButton variant="ghost" className="flex-1" onClick={onClose}>
              Annulla
            </GlowButton>
            <GlowButton
              variant="primary"
              className="flex-1"
              onClick={handleSendInvites}
              disabled={selectedUsers.length === 0}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invia Inviti ({selectedUsers.length})
            </GlowButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
