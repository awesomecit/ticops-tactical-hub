import React from 'react';
import { Bomb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BombIndicatorProps {
  /**
   * Bomb position on map (percentage)
   */
  position: { x: number; y: number };
  /**
   * Bomb state: planted, defusing, armed, detonated
   */
  state: 'planted' | 'defusing' | 'armed' | 'detonated';
  /**
   * Time remaining until detonation (seconds)
   */
  timeRemaining?: number;
  /**
   * Player defusing the bomb
   */
  defusingPlayer?: string;
  /**
   * Blast radius in percentage of map
   */
  blastRadius?: number;
  /**
   * Defuse radius in percentage of map
   */
  defuseRadius?: number;
  /**
   * Show danger zone
   */
  showDangerZone?: boolean;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * BombIndicator - Shows bomb location, state, and action radiuses
 * Displays blast radius (danger zone) and defuse radius
 */
export const BombIndicator: React.FC<BombIndicatorProps> = ({
  position,
  state,
  timeRemaining = 45,
  defusingPlayer,
  blastRadius = 15,
  defuseRadius = 5,
  showDangerZone = true,
  className,
}) => {
  const isActive = state !== 'detonated';
  const isCritical = timeRemaining <= 10;
  const isDefusing = state === 'defusing';

  const stateColors = {
    planted: 'border-orange-500 bg-orange-500/20 text-orange-400',
    defusing: 'border-blue-500 bg-blue-500/20 text-blue-400',
    armed: 'border-red-500 bg-red-500/20 text-red-400',
    detonated: 'border-gray-600 bg-gray-600/20 text-gray-500',
  };

  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Blast Radius - Danger Zone */}
      {showDangerZone && isActive && (
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'rounded-full border-2 border-dashed',
            isCritical ? 'border-red-500/50 animate-pulse' : 'border-orange-500/30',
            'transition-all duration-300'
          )}
          style={{
            width: `${blastRadius * 2}%`,
            height: `${blastRadius * 2}%`,
            animation: isCritical ? 'pulse 1s ease-in-out infinite' : 'pulse 3s ease-in-out infinite',
          }}
        >
          {/* Danger gradient */}
          <div
            className={cn(
              'absolute inset-0 rounded-full',
              isCritical ? 'bg-red-500/10' : 'bg-orange-500/5'
            )}
          />
        </div>
      )}

      {/* Defuse Radius - Action Zone */}
      {isActive && (
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'rounded-full border-2',
            isDefusing ? 'border-blue-500/60' : 'border-green-500/40',
            'animate-pulse'
          )}
          style={{
            width: `${defuseRadius * 2}%`,
            height: `${defuseRadius * 2}%`,
            animationDuration: '2s',
          }}
        >
          {/* Action zone gradient */}
          <div
            className={cn(
              'absolute inset-0 rounded-full',
              isDefusing ? 'bg-blue-500/10' : 'bg-green-500/5'
            )}
          />
        </div>
      )}

      {/* Bomb Icon and Info */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Bomb indicator */}
        <div
          className={cn(
            'relative flex items-center justify-center w-10 h-10 rounded-full border-2',
            stateColors[state],
            isActive && 'shadow-lg',
            isCritical && 'animate-bounce'
          )}
        >
          {/* Pulse effect for active bomb */}
          {isActive && (
            <>
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75 animate-ping" />
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-50 animate-ping" style={{ animationDelay: '0.5s' }} />
            </>
          )}

          {/* Icon */}
          {state === 'detonated' ? (
            <AlertTriangle className="h-5 w-5 relative z-10" />
          ) : (
            <Bomb className="h-5 w-5 relative z-10" />
          )}
        </div>

        {/* Timer display */}
        {isActive && timeRemaining !== undefined && (
          <div
            className={cn(
              'mt-1 px-2 py-0.5 rounded bg-black/80 border',
              isCritical ? 'border-red-500 text-red-400' : 'border-orange-500 text-orange-400',
              'font-mono text-xs font-bold'
            )}
          >
            {Math.floor(timeRemaining / 60)}:{String(Math.floor(timeRemaining % 60)).padStart(2, '0')}
          </div>
        )}

        {/* Defusing indicator */}
        {isDefusing && defusingPlayer && (
          <div className="mt-1 px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500 text-blue-400 text-[10px] font-bold animate-pulse">
            {defusingPlayer} disinnesca
          </div>
        )}

        {/* State label */}
        <div
          className={cn(
            'mt-1 px-1.5 py-0.5 rounded text-[9px] font-display uppercase tracking-wider font-bold',
            'bg-black/60 backdrop-blur-sm',
            state === 'planted' && 'text-orange-400',
            state === 'defusing' && 'text-blue-400',
            state === 'armed' && 'text-red-400',
            state === 'detonated' && 'text-gray-400'
          )}
        >
          {state === 'planted' && 'Bomba Piazzata'}
          {state === 'defusing' && 'Disinnesco'}
          {state === 'armed' && 'Armata'}
          {state === 'detonated' && 'Detonata'}
        </div>
      </div>
    </div>
  );
};
