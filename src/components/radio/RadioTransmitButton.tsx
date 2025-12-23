import React, { useState, useCallback, useEffect } from 'react';
import { Mic, MicOff, Radio, Waves } from 'lucide-react';
import { useRadioStore } from '@/stores/radioStore';
import { useRadioSounds } from '@/hooks/useRadioSounds';
import { cn } from '@/lib/utils';

interface RadioTransmitButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWaveform?: boolean;
  disabled?: boolean;
}

export const RadioTransmitButton: React.FC<RadioTransmitButtonProps> = ({
  className,
  size = 'md',
  showWaveform = true,
  disabled = false,
}) => {
  const { status, startTransmission, stopTransmission } = useRadioStore();
  const { playPTTStart, playPTTEnd, playStatic } = useRadioSounds({ 
    volume: status.volume / 100,
    enabled: !status.isMuted 
  });
  
  const [waveformBars, setWaveformBars] = useState<number[]>([0.2, 0.4, 0.6, 0.4, 0.2]);
  const [holdTime, setHoldTime] = useState(0);

  const isTransmitting = status.isTransmitting;
  const canTransmit = status.isConnected && !status.isMuted && !disabled;

  // Animate waveform when transmitting
  useEffect(() => {
    if (!isTransmitting) {
      setWaveformBars([0.2, 0.4, 0.6, 0.4, 0.2]);
      return;
    }

    const interval = setInterval(() => {
      setWaveformBars(prev => 
        prev.map(() => 0.3 + Math.random() * 0.7)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isTransmitting]);

  // Track hold time
  useEffect(() => {
    if (!isTransmitting) {
      setHoldTime(0);
      return;
    }

    const interval = setInterval(() => {
      setHoldTime(prev => prev + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [isTransmitting]);

  const handlePTTStart = useCallback(() => {
    if (!canTransmit) return;
    playPTTStart();
    playStatic();
    startTransmission();
  }, [canTransmit, playPTTStart, playStatic, startTransmission]);

  const handlePTTEnd = useCallback(() => {
    if (!isTransmitting) return;
    playPTTEnd();
    stopTransmission();
  }, [isTransmitting, playPTTEnd, stopTransmission]);

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Waveform Visualization */}
      {showWaveform && (
        <div className="flex items-end gap-0.5 h-8">
          {waveformBars.map((height, i) => (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full transition-all duration-100",
                isTransmitting 
                  ? "bg-red-500" 
                  : "bg-muted-foreground/30"
              )}
              style={{ height: `${height * 100}%` }}
            />
          ))}
        </div>
      )}

      {/* Main PTT Button */}
      <button
        className={cn(
          "relative rounded-full transition-all duration-200",
          "flex items-center justify-center",
          "border-4 select-none touch-none",
          sizeClasses[size],
          canTransmit
            ? isTransmitting
              ? "bg-red-600 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.5)] scale-95"
              : "bg-muted hover:bg-muted/80 border-border hover:border-primary/50 hover:shadow-lg"
            : "bg-muted/50 border-border/50 opacity-50 cursor-not-allowed"
        )}
        onMouseDown={handlePTTStart}
        onMouseUp={handlePTTEnd}
        onMouseLeave={handlePTTEnd}
        onTouchStart={(e) => {
          e.preventDefault();
          handlePTTStart();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handlePTTEnd();
        }}
        disabled={!canTransmit}
      >
        {/* Pulsing ring when transmitting */}
        {isTransmitting && (
          <>
            <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
            <span className="absolute inset-[-4px] rounded-full border-2 border-red-400/50 animate-pulse" />
          </>
        )}

        {/* Icon */}
        {status.isMuted ? (
          <MicOff className={cn(iconSizes[size], "text-muted-foreground")} />
        ) : isTransmitting ? (
          <Mic className={cn(iconSizes[size], "text-white animate-pulse")} />
        ) : (
          <Mic className={cn(iconSizes[size], "text-foreground")} />
        )}
      </button>

      {/* Status Label */}
      <div className="text-center">
        {isTransmitting ? (
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-red-500 animate-pulse">
              TRASMISSIONE
            </p>
            <p className="text-[10px] text-muted-foreground font-mono">
              {holdTime.toFixed(1)}s
            </p>
          </div>
        ) : canTransmit ? (
          <p className="text-xs text-muted-foreground">
            Tieni premuto per parlare
          </p>
        ) : status.isMuted ? (
          <p className="text-xs text-destructive">
            Microfono disattivato
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Radio non connessa
          </p>
        )}
      </div>

      {/* Channel indicator */}
      {status.isConnected && status.currentChannelId && (
        <div className="flex items-center gap-1 text-[10px] text-primary">
          <Radio className="h-3 w-3" />
          <span className="font-mono">CH {status.currentChannelId.slice(-1)}</span>
        </div>
      )}
    </div>
  );
};
