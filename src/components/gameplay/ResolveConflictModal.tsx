import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GlowButton } from '@/components/ui/GlowButton';
import { AlertTriangle, Check, X, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ConflictData } from '@/mocks/spectator';

interface ResolveConflictModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conflict: ConflictData | null;
  onResolve: (resolution: 'assign' | 'assist' | 'invalidate', playerId?: string) => void;
}

export const ResolveConflictModal: React.FC<ResolveConflictModalProps> = ({
  open,
  onOpenChange,
  conflict,
  onResolve,
}) => {
  const [selectedPlayer, setSelectedPlayer] = React.useState<string | null>(null);

  if (!conflict) return null;

  const handleAssign = () => {
    if (selectedPlayer) {
      onResolve('assign', selectedPlayer);
      setSelectedPlayer(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0a0a0f] border-accent/50 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-accent">
            <AlertTriangle className="h-5 w-5" />
            Risolvi Conflitto
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-accent/10 border border-accent/30 rounded-sm p-3">
            <p className="text-sm text-gray-300">
              Due giocatori hanno reclamato la kill su{' '}
              <span className="font-bold text-red-400">{conflict.victimName}</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">Candidati:</p>
            
            {conflict.claimants.map((claimant) => (
              <button
                key={claimant.playerId}
                onClick={() => setSelectedPlayer(claimant.playerId)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-sm border transition-all",
                  "min-h-[64px] touch-manipulation",
                  selectedPlayer === claimant.playerId
                    ? "border-primary bg-primary/20"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                    <span className="text-sm font-bold text-blue-400">
                      {claimant.playerName.slice(0, 2)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{claimant.playerName}</p>
                    <p className="text-xs text-gray-400">~{claimant.distance}m di distanza</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={cn(
                    "text-lg font-bold",
                    claimant.confidence >= 80 ? "text-green-400" :
                    claimant.confidence >= 60 ? "text-yellow-400" : "text-red-400"
                  )}>
                    {claimant.confidence}%
                  </div>
                  <p className="text-xs text-gray-500">confidence</p>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-2 pt-4 border-t border-gray-800">
            <GlowButton
              variant="primary"
              className="min-h-[48px]"
              disabled={!selectedPlayer}
              onClick={handleAssign}
            >
              <Check className="h-4 w-4 mr-2" />
              Assegna a {selectedPlayer ? conflict.claimants.find(c => c.playerId === selectedPlayer)?.playerName : '...'}
            </GlowButton>
            
            <GlowButton
              variant="tactical"
              className="min-h-[48px]"
              onClick={() => {
                onResolve('assist');
                onOpenChange(false);
              }}
            >
              <Users className="h-4 w-4 mr-2" />
              Assist Entrambi
            </GlowButton>
            
            <GlowButton
              variant="ghost"
              className="min-h-[48px] text-destructive hover:text-destructive border-destructive/50"
              onClick={() => {
                onResolve('invalidate');
                onOpenChange(false);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Invalida Kill
            </GlowButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
