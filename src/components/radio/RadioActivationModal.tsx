import React, { useState } from 'react';
import { Radio, Power, Users, AlertTriangle } from 'lucide-react';
import { useRadioStore } from '@/stores/radioStore';
import { getChannelsByTeam } from '@/mocks/radio';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface RadioActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  teamName: string;
}

export const RadioActivationModal: React.FC<RadioActivationModalProps> = ({
  isOpen,
  onClose,
  teamId,
  teamName,
}) => {
  const { channels, activateRadio, deactivateRadio, connect } = useRadioStore();
  const [isActivating, setIsActivating] = useState(false);
  
  const isRadioActive = channels.length > 0;
  const existingChannels = getChannelsByTeam(teamId);

  const handleActivate = async () => {
    setIsActivating(true);
    
    // Simulate activation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    activateRadio(teamId);
    
    // Auto-connect to main channel
    const mainChannel = channels.find(c => c.type === 'team') || channels[0];
    if (mainChannel) {
      connect(mainChannel.id);
    }
    
    setIsActivating(false);
    onClose();
  };

  const handleDeactivate = () => {
    deactivateRadio();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-primary" />
            Radio Team - {teamName}
          </DialogTitle>
          <DialogDescription>
            {isRadioActive 
              ? 'La radio del team è attiva. Puoi disattivarla per tutti i membri.'
              : 'Attiva la radio del team per permettere la comunicazione durante le partite.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Status */}
          <div className={cn(
            "flex items-center gap-3 p-4 rounded-lg border",
            isRadioActive 
              ? "bg-green-500/10 border-green-500/30" 
              : "bg-muted/50 border-border"
          )}>
            <div className={cn(
              "h-3 w-3 rounded-full",
              isRadioActive ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
            )} />
            <div>
              <p className="font-medium text-sm">
                {isRadioActive ? 'Radio Attiva' : 'Radio Inattiva'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isRadioActive 
                  ? `${channels.length} canali disponibili`
                  : 'Nessun canale attivo'
                }
              </p>
            </div>
          </div>

          {/* Channels Preview */}
          {isRadioActive && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Canali Attivi</p>
              <div className="space-y-1">
                {channels.map((channel) => (
                  <div 
                    key={channel.id}
                    className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-primary">
                        {channel.frequency}
                      </span>
                      <span>{channel.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span className="text-xs">{channel.connectedUsers.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warning for deactivation */}
          {isRadioActive && (
            <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Disattivando la radio, tutti i membri del team verranno disconnessi.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Annulla
          </Button>
          
          {isRadioActive ? (
            <Button 
              variant="destructive" 
              onClick={handleDeactivate}
              className="gap-2"
            >
              <Power className="h-4 w-4" />
              Disattiva Radio
            </Button>
          ) : (
            <Button 
              onClick={handleActivate}
              disabled={isActivating}
              className="gap-2"
            >
              <Power className="h-4 w-4" />
              {isActivating ? 'Attivazione...' : 'Attiva Radio'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
