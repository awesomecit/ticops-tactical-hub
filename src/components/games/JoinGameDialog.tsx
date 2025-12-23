import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Shield, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GlowButton } from '@/components/ui/GlowButton';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { mockTeams } from '@/mocks/data';
import { Game } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface JoinGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game: Game;
}

export const JoinGameDialog: React.FC<JoinGameDialogProps> = ({
  open,
  onOpenChange,
  game,
}) => {
  const { t } = useTranslation();
  const [selectedTeam, setSelectedTeam] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleJoin = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('games.joinSuccess'), {
      description: game.name,
    });
    
    setIsSubmitting(false);
    onOpenChange(false);
    setSelectedTeam(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            {t('games.joinGame')}
          </DialogTitle>
          <DialogDescription>
            {t('games.joinDescription', { name: game.name })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Game Summary */}
          <TacticalCard variant="small">
            <TacticalCardContent className="py-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{game.gameMode.icon}</span>
                <div>
                  <p className="font-display text-foreground">{game.name}</p>
                  <p className="text-muted-foreground text-xs">{game.gameMode.name}</p>
                </div>
              </div>
            </TacticalCardContent>
          </TacticalCard>

          {/* Team Selection */}
          <div>
            <label className="text-sm font-display uppercase text-muted-foreground mb-2 block">
              {t('games.selectTeam')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {mockTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  className={cn(
                    "p-3 border rounded-sm transition-all text-left",
                    selectedTeam === team.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/50 hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Shield className={cn(
                      "h-4 w-4",
                      team.color === 'alpha' ? "text-primary" : "text-secondary"
                    )} />
                    <span className="font-display text-sm">{team.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">[{team.tag}]</p>
                </button>
              ))}
              <button
                onClick={() => setSelectedTeam('auto')}
                className={cn(
                  "p-3 border rounded-sm transition-all text-left col-span-2",
                  selectedTeam === 'auto'
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted/50 hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="font-display text-sm">{t('games.autoAssign')}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{t('games.autoAssignDesc')}</p>
              </button>
            </div>
          </div>

          {/* Spots Available */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-sm">
            <span className="text-sm text-muted-foreground">{t('games.spotsAvailable')}</span>
            <span className="font-display text-primary">
              {game.maxPlayers - game.registeredPlayers.length} / {game.maxPlayers}
            </span>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <GlowButton variant="ghost" onClick={() => onOpenChange(false)}>
            {t('common.cancel')}
          </GlowButton>
          <GlowButton 
            variant="primary" 
            onClick={handleJoin}
            disabled={!selectedTeam || isSubmitting}
          >
            {isSubmitting ? t('common.loading') : t('games.confirmJoin')}
          </GlowButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
