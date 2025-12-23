import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GlowButton } from '@/components/ui/GlowButton';
import { Crosshair, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NearbyEnemy {
  id: string;
  name: string;
  avatar: string;
  distance: number;
}

interface KillDeclarationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enemies: NearbyEnemy[];
  onConfirmKill: (enemyId: string) => void;
}

export const KillDeclarationModal: React.FC<KillDeclarationModalProps> = ({
  open,
  onOpenChange,
  enemies,
  onConfirmKill,
}) => {
  const [selectedEnemy, setSelectedEnemy] = React.useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedEnemy) {
      onConfirmKill(selectedEnemy);
      setSelectedEnemy(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0a0a0f] border-primary/30 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Crosshair className="h-5 w-5" />
            Dichiara Kill
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          <p className="text-sm text-gray-400 mb-3">
            Seleziona il nemico eliminato:
          </p>

          {enemies.map((enemy) => (
            <button
              key={enemy.id}
              onClick={() => setSelectedEnemy(enemy.id)}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-sm border transition-all",
                "min-h-[64px] touch-manipulation",
                selectedEnemy === enemy.id
                  ? "border-primary bg-primary/20"
                  : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
              )}
            >
              <Avatar className="h-10 w-10 border border-red-500/50">
                <AvatarImage src={enemy.avatar} />
                <AvatarFallback className="bg-red-500/20 text-red-400">
                  {enemy.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-left">
                <p className="font-medium text-white">{enemy.name}</p>
                <p className="text-xs text-gray-400">~{enemy.distance}m di distanza</p>
              </div>

              {selectedEnemy === enemy.id && (
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <GlowButton
            variant="ghost"
            className="flex-1 min-h-[56px] border-gray-700"
            onClick={() => onOpenChange(false)}
          >
            Annulla
          </GlowButton>
          <GlowButton
            variant="primary"
            className="flex-1 min-h-[56px]"
            disabled={!selectedEnemy}
            onClick={handleConfirm}
          >
            <Check className="h-5 w-5 mr-2" />
            Conferma Kill
          </GlowButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
