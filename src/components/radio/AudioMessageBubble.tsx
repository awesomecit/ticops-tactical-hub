import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface AudioMessageBubbleProps {
  senderName: string;
  callsign: string;
  timestamp: Date;
  duration: number; // in seconds
  audioData?: string; // base64 encoded audio (mock)
  isOwn?: boolean;
  signalStrength?: number;
}

export const AudioMessageBubble: React.FC<AudioMessageBubbleProps> = ({
  senderName,
  callsign,
  timestamp,
  duration,
  isOwn = false,
  signalStrength = 100,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    } else {
      setIsPlaying(true);
      const startTime = Date.now() - (progress / 100) * duration * 1000;
      
      progressInterval.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const newProgress = (elapsed / duration) * 100;
        
        if (newProgress >= 100) {
          setProgress(0);
          setIsPlaying(false);
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
        } else {
          setProgress(newProgress);
        }
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const currentTime = (progress / 100) * duration;

  // Signal strength indicator bars
  const getSignalBars = () => {
    const bars = 4;
    const activeBars = Math.ceil((signalStrength / 100) * bars);
    return Array.from({ length: bars }, (_, i) => i < activeBars);
  };

  return (
    <div className={cn(
      "flex gap-2 max-w-[85%]",
      isOwn ? "ml-auto flex-row-reverse" : ""
    )}>
      {!isOwn && (
        <Avatar className="h-8 w-8 border border-primary/30">
          <AvatarFallback className="bg-primary/20 text-primary text-xs font-mono">
            {callsign.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "rounded-lg p-3 min-w-[200px]",
        isOwn 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted/50 border border-border"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-xs font-mono font-semibold",
              isOwn ? "text-primary-foreground/80" : "text-primary"
            )}>
              [{callsign}]
            </span>
            <span className={cn(
              "text-xs",
              isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
            )}>
              {senderName}
            </span>
          </div>
          
          {/* Signal strength indicator */}
          <div className="flex items-center gap-0.5">
            {getSignalBars().map((active, i) => (
              <div
                key={i}
                className={cn(
                  "w-1 rounded-sm transition-colors",
                  isOwn ? "bg-primary-foreground" : "bg-primary",
                  !active && "opacity-30"
                )}
                style={{ height: `${(i + 1) * 3 + 4}px` }}
              />
            ))}
          </div>
        </div>

        {/* Audio player */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full shrink-0",
              isOwn 
                ? "bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground" 
                : "bg-primary/20 hover:bg-primary/30 text-primary"
            )}
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>

          <div className="flex-1 space-y-1">
            {/* Waveform visualization */}
            <div className="flex items-center gap-0.5 h-6">
              {Array.from({ length: 30 }, (_, i) => {
                const height = Math.sin(i * 0.5) * 0.5 + 0.5;
                const isActive = (i / 30) * 100 <= progress;
                return (
                  <div
                    key={i}
                    className={cn(
                      "w-1 rounded-full transition-all",
                      isOwn 
                        ? isActive ? "bg-primary-foreground" : "bg-primary-foreground/40"
                        : isActive ? "bg-primary" : "bg-primary/30"
                    )}
                    style={{ 
                      height: `${height * 20 + 4}px`,
                      transform: isPlaying && isActive ? 'scaleY(1.2)' : 'scaleY(1)',
                      transition: 'transform 0.1s'
                    }}
                  />
                );
              })}
            </div>

            {/* Progress bar */}
            <div className={cn(
              "h-1 rounded-full overflow-hidden",
              isOwn ? "bg-primary-foreground/30" : "bg-primary/20"
            )}>
              <div
                className={cn(
                  "h-full transition-all",
                  isOwn ? "bg-primary-foreground" : "bg-primary"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Volume2 className={cn(
            "h-4 w-4 shrink-0",
            isOwn ? "text-primary-foreground/60" : "text-muted-foreground"
          )} />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2">
          <span className={cn(
            "text-xs font-mono",
            isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <span className={cn(
            "text-xs",
            isOwn ? "text-primary-foreground/60" : "text-muted-foreground"
          )}>
            {formatTimestamp(timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};
