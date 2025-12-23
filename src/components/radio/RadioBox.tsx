import React from 'react';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Signal, 
  Users,
  ChevronDown 
} from 'lucide-react';
import { useRadioStore } from '@/stores/radioStore';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RadioBoxProps {
  className?: string;
  compact?: boolean;
}

export const RadioBox: React.FC<RadioBoxProps> = ({ className, compact = false }) => {
  const { 
    status, 
    channels, 
    toggleMute, 
    setVolume, 
    setChannel,
    startTransmission,
    stopTransmission,
  } = useRadioStore();

  const currentChannel = channels.find(c => c.id === status.currentChannelId);

  if (!status.isConnected) {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-sm border border-border text-muted-foreground",
        className
      )}>
        <Radio className="h-4 w-4" />
        <span className="text-xs font-mono">RADIO OFF</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 bg-card rounded-sm border",
        status.isTransmitting ? "border-red-500 bg-red-500/10" : "border-primary/30",
        className
      )}>
        <Radio className={cn(
          "h-4 w-4",
          status.isTransmitting ? "text-red-500 animate-pulse" : "text-primary"
        )} />
        
        <span className="text-xs font-mono text-primary">
          {currentChannel?.frequency || '---'}
        </span>

        <button
          onClick={toggleMute}
          className="p-1 hover:bg-muted rounded"
        >
          {status.isMuted ? (
            <VolumeX className="h-3 w-3 text-destructive" />
          ) : (
            <Volume2 className="h-3 w-3 text-muted-foreground" />
          )}
        </button>

        <button
          onMouseDown={startTransmission}
          onMouseUp={stopTransmission}
          onMouseLeave={stopTransmission}
          onTouchStart={startTransmission}
          onTouchEnd={stopTransmission}
          className={cn(
            "p-1 rounded transition-colors",
            status.isTransmitting 
              ? "bg-red-500 text-white" 
              : "bg-muted hover:bg-muted/80"
          )}
        >
          {status.isTransmitting ? (
            <Mic className="h-3 w-3" />
          ) : (
            <MicOff className="h-3 w-3 text-muted-foreground" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={cn(
      "p-4 bg-card rounded-sm border space-y-3",
      status.isTransmitting ? "border-red-500" : "border-border",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className={cn(
            "h-5 w-5",
            status.isTransmitting ? "text-red-500 animate-pulse" : "text-primary"
          )} />
          <span className="font-display text-sm uppercase">Radio Team</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Signal className="h-4 w-4 text-green-500" />
          <span className="text-xs font-mono text-green-500">ONLINE</span>
        </div>
      </div>

      {/* Channel Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 bg-muted/50 rounded border border-border hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">CH:</span>
            <span className="font-mono text-sm">{currentChannel?.frequency || '---'}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[100px]">
              {currentChannel?.name}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {channels.map((channel) => (
            <DropdownMenuItem
              key={channel.id}
              onClick={() => setChannel(channel.id)}
              className={cn(
                "flex items-center justify-between",
                channel.id === status.currentChannelId && "bg-primary/10"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs">{channel.frequency}</span>
                <span className="text-sm">{channel.name}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-3 w-3" />
                <span className="text-xs">{channel.connectedUsers.length}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <button onClick={toggleMute} className="p-1">
          {status.isMuted ? (
            <VolumeX className="h-4 w-4 text-destructive" />
          ) : (
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        <Slider
          value={[status.volume]}
          onValueChange={([v]) => setVolume(v)}
          max={100}
          step={5}
          className="flex-1"
          disabled={status.isMuted}
        />
        <span className="text-xs font-mono w-8 text-right">{status.volume}%</span>
      </div>

      {/* PTT Button */}
      <button
        onMouseDown={startTransmission}
        onMouseUp={stopTransmission}
        onMouseLeave={stopTransmission}
        onTouchStart={startTransmission}
        onTouchEnd={stopTransmission}
        className={cn(
          "w-full py-3 rounded-sm font-display uppercase text-sm font-bold transition-all",
          "flex items-center justify-center gap-2",
          status.isTransmitting
            ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
            : "bg-muted hover:bg-muted/80 text-muted-foreground",
          status.isMuted && "opacity-50 cursor-not-allowed"
        )}
        disabled={status.isMuted}
      >
        {status.isTransmitting ? (
          <>
            <Mic className="h-5 w-5 animate-pulse" />
            <span>Trasmissione...</span>
          </>
        ) : (
          <>
            <MicOff className="h-5 w-5" />
            <span>Premi per Parlare</span>
          </>
        )}
      </button>

      {/* Connected Users */}
      {currentChannel && currentChannel.connectedUsers.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>{currentChannel.connectedUsers.length} utenti connessi</span>
        </div>
      )}
    </div>
  );
};
