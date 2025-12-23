import React, { useEffect, useState } from 'react';
import { AlertTriangle, Radio, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRadioSounds } from '@/hooks/useRadioSounds';

interface InterferenceEffectProps {
  isActive: boolean;
  intensity?: 'low' | 'medium' | 'high';
  type?: 'scanning' | 'jamming';
  onDismiss?: () => void;
  className?: string;
}

export const InterferenceEffect: React.FC<InterferenceEffectProps> = ({
  isActive,
  intensity = 'medium',
  type = 'scanning',
  onDismiss,
  className,
}) => {
  const [glitchBars, setGlitchBars] = useState<number[]>([]);
  const { playInterference, playJamming } = useRadioSounds({ volume: 0.4 });

  // Play sound on activation
  useEffect(() => {
    if (isActive) {
      if (type === 'jamming') {
        playJamming();
      } else {
        playInterference();
      }
    }
  }, [isActive, type, playInterference, playJamming]);

  // Animate glitch bars
  useEffect(() => {
    if (!isActive) {
      setGlitchBars([]);
      return;
    }

    const interval = setInterval(() => {
      const barCount = intensity === 'high' ? 8 : intensity === 'medium' ? 5 : 3;
      setGlitchBars(
        Array.from({ length: barCount }, () => ({
          width: 20 + Math.random() * 80,
          top: Math.random() * 100,
          opacity: 0.3 + Math.random() * 0.7,
        })) as any
      );
    }, intensity === 'high' ? 50 : intensity === 'medium' ? 100 : 200);

    return () => clearInterval(interval);
  }, [isActive, intensity]);

  if (!isActive) return null;

  const intensityStyles = {
    low: 'opacity-30',
    medium: 'opacity-60',
    high: 'opacity-90',
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 pointer-events-none z-50",
        intensityStyles[intensity],
        className
      )}
      onClick={onDismiss}
    >
      {/* Scanline overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 0, 0.03) 2px,
            rgba(255, 0, 0, 0.03) 4px
          )`,
          animation: 'scanlines 0.1s linear infinite',
        }}
      />

      {/* Random glitch bars */}
      {glitchBars.map((bar: any, i) => (
        <div
          key={i}
          className="absolute left-0 h-1 bg-red-500/50"
          style={{
            width: `${bar.width}%`,
            top: `${bar.top}%`,
            opacity: bar.opacity,
            transform: `translateX(${Math.random() * 20 - 10}px)`,
          }}
        />
      ))}

      {/* Static noise overlay */}
      <div 
        className="absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: intensity === 'high' ? 0.15 : 0.08,
        }}
      />

      {/* Warning indicator */}
      <div className={cn(
        "absolute top-4 left-1/2 -translate-x-1/2",
        "flex items-center gap-2 px-4 py-2 rounded-lg",
        "bg-red-900/90 border border-red-500/50 backdrop-blur-sm",
        "animate-pulse pointer-events-auto"
      )}>
        {type === 'jamming' ? (
          <Zap className="h-5 w-5 text-red-400" />
        ) : (
          <Radio className="h-5 w-5 text-red-400" />
        )}
        <span className="text-red-200 text-sm font-medium">
          {type === 'jamming' ? 'DISTURBO RADIO RILEVATO' : 'SCANSIONE IN CORSO'}
        </span>
        <AlertTriangle className="h-4 w-4 text-amber-400" />
      </div>

      {/* Edge vignette */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: `inset 0 0 ${intensity === 'high' ? '150px' : '100px'} rgba(255, 0, 0, 0.3)`,
        }}
      />

      {/* CSS for scanlines animation */}
      <style>{`
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};
