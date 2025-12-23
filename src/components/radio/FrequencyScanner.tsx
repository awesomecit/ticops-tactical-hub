import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Radio, Scan, Signal, SignalHigh, SignalLow, AlertTriangle, X, Lock } from 'lucide-react';
import { useRadioSounds } from '@/hooks/useRadioSounds';
import { MOCK_RADIO_CHANNELS } from '@/mocks/radio';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioChannel } from '@/types/radio';

interface DetectedChannel {
  frequency: string;
  signalStrength: number;
  teamName?: string;
  channelType: string;
  isEncrypted: boolean;
  lastDetected: Date;
}

interface FrequencyScannerProps {
  className?: string;
  onChannelDetected?: (channel: DetectedChannel) => void;
  hasEngineerBadge?: boolean;
}

export const FrequencyScanner: React.FC<FrequencyScannerProps> = ({
  className,
  onChannelDetected,
  hasEngineerBadge = true, // Mock: assume user has badge
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentFrequency, setCurrentFrequency] = useState('144.000');
  const [detectedChannels, setDetectedChannels] = useState<DetectedChannel[]>([]);
  const [scanRange, setScanRange] = useState({ min: 144.0, max: 148.0 });
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { playScan, playScanFound, playStatic } = useRadioSounds({ volume: 0.3 });

  // Generate mock enemy frequencies
  const enemyFrequencies = useRef([
    { freq: '145.750', team: 'Red Wolves', type: 'team', encrypted: false },
    { freq: '146.200', team: 'Night Ravens', type: 'squad', encrypted: true },
    { freq: '146.850', team: 'Steel Legion', type: 'command', encrypted: true },
    { freq: '147.100', team: 'Ghost Unit', type: 'team', encrypted: false },
  ]);

  const startScan = useCallback(() => {
    if (!hasEngineerBadge) return;
    
    setIsScanning(true);
    setScanProgress(0);
    setDetectedChannels([]);
    playStatic();

    let progress = 0;
    const step = (scanRange.max - scanRange.min) / 100;
    let currentFreq = scanRange.min;

    scanIntervalRef.current = setInterval(() => {
      progress += 1;
      currentFreq += step;
      
      setCurrentFrequency(currentFreq.toFixed(3));
      setScanProgress(progress);
      
      // Random scan beep
      if (Math.random() > 0.7) {
        playScan();
      }

      // Check if we hit an enemy frequency
      const detected = enemyFrequencies.current.find(
        ef => Math.abs(parseFloat(ef.freq) - currentFreq) < 0.05
      );

      if (detected) {
        playScanFound();
        const newDetection: DetectedChannel = {
          frequency: detected.freq,
          signalStrength: 60 + Math.random() * 40,
          teamName: detected.encrypted ? undefined : detected.team,
          channelType: detected.type,
          isEncrypted: detected.encrypted,
          lastDetected: new Date(),
        };
        
        setDetectedChannels(prev => {
          const exists = prev.some(d => d.frequency === detected.freq);
          if (exists) return prev;
          return [...prev, newDetection];
        });
        
        onChannelDetected?.(newDetection);
      }

      if (progress >= 100) {
        setIsScanning(false);
        if (scanIntervalRef.current) {
          clearInterval(scanIntervalRef.current);
        }
      }
    }, 80);
  }, [hasEngineerBadge, scanRange, playScan, playScanFound, playStatic, onChannelDetected]);

  const stopScan = useCallback(() => {
    setIsScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);

  const getSignalIcon = (strength: number) => {
    if (strength > 80) return <SignalHigh className="h-4 w-4 text-green-500" />;
    if (strength > 50) return <Signal className="h-4 w-4 text-yellow-500" />;
    return <SignalLow className="h-4 w-4 text-red-500" />;
  };

  if (!hasEngineerBadge) {
    return (
      <div className={cn(
        "p-4 rounded-lg border border-border bg-muted/30 text-center",
        className
      )}>
        <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          Scanner disponibile solo con badge Ingegnere
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "p-4 rounded-lg border bg-card space-y-4",
      isScanning ? "border-primary/50" : "border-border",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scan className={cn(
            "h-5 w-5",
            isScanning ? "text-primary animate-pulse" : "text-muted-foreground"
          )} />
          <span className="font-display text-sm uppercase tracking-wider">
            Scanner Frequenze
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-500 rounded">
          INGEGNERE
        </span>
      </div>

      {/* Frequency Display */}
      <div className={cn(
        "font-mono text-2xl text-center py-3 rounded bg-black/50 border",
        isScanning ? "text-primary border-primary/30" : "text-muted-foreground border-border"
      )}>
        <span className="text-xs text-muted-foreground block mb-1">FREQUENZA</span>
        {currentFrequency} <span className="text-sm">MHz</span>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <div className="space-y-2">
          <Progress value={scanProgress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{scanRange.min.toFixed(1)} MHz</span>
            <span className="text-primary">{scanProgress}%</span>
            <span>{scanRange.max.toFixed(1)} MHz</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        {isScanning ? (
          <Button 
            variant="destructive" 
            size="sm" 
            className="flex-1"
            onClick={stopScan}
          >
            <X className="h-4 w-4 mr-1" />
            Interrompi
          </Button>
        ) : (
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={startScan}
          >
            <Scan className="h-4 w-4 mr-1" />
            Avvia Scansione
          </Button>
        )}
      </div>

      {/* Detected Channels */}
      {detectedChannels.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Canali Rilevati ({detectedChannels.length})
          </p>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {detectedChannels.map((channel, i) => (
              <div 
                key={channel.frequency}
                className={cn(
                  "flex items-center justify-between p-2 rounded text-sm",
                  "bg-muted/50 border border-border/50",
                  channel.isEncrypted && "border-amber-500/30"
                )}
              >
                <div className="flex items-center gap-2">
                  {getSignalIcon(channel.signalStrength)}
                  <div>
                    <span className="font-mono text-primary">{channel.frequency}</span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {channel.channelType}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {channel.isEncrypted ? (
                    <span className="flex items-center gap-1 text-xs text-amber-500">
                      <Lock className="h-3 w-3" />
                      Cifrato
                    </span>
                  ) : channel.teamName ? (
                    <span className="text-xs text-foreground">{channel.teamName}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <AlertTriangle className="h-3 w-3 mt-0.5 text-amber-500" />
        <span>
          La scansione può essere rilevata dai team avversari con contromisure attive.
        </span>
      </div>
    </div>
  );
};
