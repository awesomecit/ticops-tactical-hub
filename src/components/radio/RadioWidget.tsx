import React, { useState } from 'react';
import { Radio, Volume2, VolumeX, Mic, MicOff, Settings } from 'lucide-react';
import { useRadioStore } from '@/stores/radioStore';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioActivationModal } from './RadioActivationModal';
import { RadioStatus, RadioChannel, RadioUser } from '@/types/radio';

interface RadioWidgetProps {
  collapsed?: boolean;
}

export const RadioWidget: React.FC<RadioWidgetProps> = ({ collapsed = false }) => {
  const { user } = useAuthStore();
  const {
    status,
    channels,
    activeUsers,
    setVolume,
    toggleMute,
    startTransmission,
    stopTransmission,
  } = useRadioStore();
  
  const [showActivationModal, setShowActivationModal] = useState(false);

  const currentChannel = channels.find(c => c.id === status.currentChannelId);
  const isConnected = status.isConnected;

  // Handle PTT (Push-To-Talk)
  const handlePTTStart = () => {
    if (isConnected && !status.isMuted) {
      startTransmission();
    }
  };

  const handlePTTEnd = () => {
    stopTransmission();
  };

  const teamId = user?.team?.id || 'team_001';
  const teamName = user?.team?.name || 'Team';

  if (collapsed) {
    return (
      <>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "relative p-2 rounded-sm transition-all",
                isConnected 
                  ? "text-primary hover:bg-primary/10" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Radio className="h-5 w-5" />
              {isConnected && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent side="right" className="w-64 p-3">
            <RadioWidgetContent 
              status={status}
              currentChannel={currentChannel}
              activeUsers={activeUsers}
              onVolumeChange={setVolume}
              onToggleMute={toggleMute}
              onPTTStart={handlePTTStart}
              onPTTEnd={handlePTTEnd}
              onOpenSettings={() => setShowActivationModal(true)}
            />
          </PopoverContent>
        </Popover>
        
        <RadioActivationModal 
          isOpen={showActivationModal} 
          onClose={() => setShowActivationModal(false)}
          teamId={teamId}
          teamName={teamName}
        />
      </>
    );
  }

  return (
    <>
      <div className={cn(
        "rounded-sm border p-3 transition-all",
        isConnected 
          ? "border-primary/30 bg-primary/5" 
          : "border-border bg-muted/30"
      )}>
        <RadioWidgetContent 
          status={status}
          currentChannel={currentChannel}
          activeUsers={activeUsers}
          onVolumeChange={setVolume}
          onToggleMute={toggleMute}
          onPTTStart={handlePTTStart}
          onPTTEnd={handlePTTEnd}
          onOpenSettings={() => setShowActivationModal(true)}
        />
      </div>
      
      <RadioActivationModal 
        isOpen={showActivationModal} 
        onClose={() => setShowActivationModal(false)}
        teamId={teamId}
        teamName={teamName}
      />
    </>
  );
};

interface RadioWidgetContentProps {
  status: RadioStatus;
  currentChannel?: RadioChannel;
  activeUsers: RadioUser[];
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
  onPTTStart: () => void;
  onPTTEnd: () => void;
  onOpenSettings: () => void;
}

const RadioWidgetContent: React.FC<RadioWidgetContentProps> = ({
  status,
  currentChannel,
  activeUsers,
  onVolumeChange,
  onToggleMute,
  onPTTStart,
  onPTTEnd,
  onOpenSettings,
}) => {
  const isConnected = status.isConnected;
  const speakingUsers = activeUsers.filter(u => u.isSpeaking);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className={cn(
            "h-4 w-4",
            isConnected ? "text-primary" : "text-muted-foreground"
          )} />
          <span className="text-xs font-medium uppercase tracking-wider">
            Radio
          </span>
        </div>
        <button
          onClick={onOpenSettings}
          className="p-1 hover:bg-muted rounded-sm transition-colors"
        >
          <Settings className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>

      {isConnected ? (
        <>
          {/* Current Channel */}
          <div className="text-xs">
            <span className="text-muted-foreground">Canale: </span>
            <span className="text-foreground font-medium">
              {currentChannel?.name || 'N/A'}
            </span>
            {currentChannel && (
              <span className="text-primary ml-1">
                {currentChannel.frequency} MHz
              </span>
            )}
          </div>

          {/* Speaking indicator */}
          {speakingUsers.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <Mic className="h-3 w-3 animate-pulse" />
              <span>{speakingUsers.map(u => u.callsign).join(', ')}</span>
            </div>
          )}

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMute}
              className="p-1 hover:bg-muted rounded-sm transition-colors"
            >
              {status.isMuted ? (
                <VolumeX className="h-4 w-4 text-destructive" />
              ) : (
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            <Slider
              value={[status.isMuted ? 0 : status.volume]}
              max={100}
              step={5}
              onValueChange={(v) => onVolumeChange(v[0])}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8">
              {status.volume}%
            </span>
          </div>

          {/* PTT Button */}
          {status.isPushToTalk && (
            <Button
              size="sm"
              variant={status.isTransmitting ? "default" : "outline"}
              className={cn(
                "w-full transition-all",
                status.isTransmitting && "bg-red-600 hover:bg-red-700 animate-pulse"
              )}
              onMouseDown={onPTTStart}
              onMouseUp={onPTTEnd}
              onMouseLeave={onPTTEnd}
              onTouchStart={onPTTStart}
              onTouchEnd={onPTTEnd}
            >
              {status.isTransmitting ? (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Trasmissione...
                </>
              ) : (
                <>
                  <MicOff className="h-4 w-4 mr-2" />
                  Premi per parlare
                </>
              )}
            </Button>
          )}

          {/* Connected users count */}
          <div className="text-xs text-muted-foreground">
            {activeUsers.filter(u => u.isOnline).length} utenti connessi
          </div>
        </>
      ) : (
        <div className="text-xs text-muted-foreground">
          Radio non attiva. Clicca l'icona impostazioni per attivarla.
        </div>
      )}
    </div>
  );
};
