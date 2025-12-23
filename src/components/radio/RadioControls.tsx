import React from 'react';
import { Volume2, VolumeX, Mic, MicOff, Radio as RadioIcon, Settings } from 'lucide-react';
import { useRadioStore } from '@/stores/radioStore';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface RadioControlsProps {
  className?: string;
}

export const RadioControls: React.FC<RadioControlsProps> = ({ className }) => {
  const {
    status,
    setVolume,
    toggleMute,
    togglePushToTalk,
  } = useRadioStore();

  return (
    <div className={cn("space-y-4 p-4 bg-card rounded-sm border border-border", className)}>
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <Settings className="h-4 w-4 text-muted-foreground" />
        <span className="font-display text-sm uppercase">Controlli Radio</span>
      </div>

      {/* Volume */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Volume</Label>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleMute}
            className={cn(
              "p-2 rounded-sm transition-colors",
              status.isMuted 
                ? "bg-destructive/10 text-destructive" 
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {status.isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
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
          <span className="text-xs font-mono w-10 text-right">
            {status.isMuted ? 'MUTE' : `${status.volume}%`}
          </span>
        </div>
      </div>

      {/* Push to Talk Toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-sm">Push to Talk</Label>
          <p className="text-xs text-muted-foreground">
            Tieni premuto per trasmettere
          </p>
        </div>
        <Switch
          checked={status.isPushToTalk}
          onCheckedChange={togglePushToTalk}
        />
      </div>

      {/* Status Indicator */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <div className={cn(
          "h-2 w-2 rounded-full",
          status.isConnected ? "bg-green-500" : "bg-muted"
        )} />
        <span className="text-xs text-muted-foreground">
          {status.isConnected ? 'Connesso' : 'Disconnesso'}
        </span>
        
        {status.isTransmitting && (
          <div className="flex items-center gap-1 ml-auto text-red-500">
            <Mic className="h-3 w-3 animate-pulse" />
            <span className="text-xs font-mono">TX</span>
          </div>
        )}
      </div>
    </div>
  );
};
