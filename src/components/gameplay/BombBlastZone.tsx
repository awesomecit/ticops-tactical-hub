import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GamePlayer } from '@/mocks/gameplay';

interface BombBlastZoneProps {
  /**
   * Bomb position
   */
  bombPosition: { x: number; y: number };
  /**
   * All players on map
   */
  players: GamePlayer[];
  /**
   * Blast radius in percentage
   */
  blastRadius?: number;
  /**
   * Show which players are in danger
   */
  highlightDanger?: boolean;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * BombBlastZone - Shows blast radius and highlights players in danger zone
 * Calculates distance and shows warning indicators
 */
export const BombBlastZone: React.FC<BombBlastZoneProps> = ({
  bombPosition,
  players,
  blastRadius = 15,
  highlightDanger = true,
  className,
}) => {
  // Calculate if player is in blast radius
  const isPlayerInDanger = (playerPos: { x: number; y: number }) => {
    const dx = playerPos.x - bombPosition.x;
    const dy = playerPos.y - bombPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= blastRadius;
  };

  const playersInDanger = players.filter(p => 
    p.isAlive && isPlayerInDanger(p.position)
  );

  return (
    <>
      {/* Danger zone overlay */}
      <div
        className={cn('absolute pointer-events-none', className)}
        style={{
          left: `${bombPosition.x}%`,
          top: `${bombPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Blast radius circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-red-500/40"
          style={{
            width: `${blastRadius * 2}%`,
            height: `${blastRadius * 2}%`,
          }}
        >
          {/* Gradient danger zone */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-red-500/20 via-red-500/10 to-transparent animate-pulse" />
        </div>

        {/* Warning rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/30 animate-ping"
          style={{
            width: `${blastRadius * 2}%`,
            height: `${blastRadius * 2}%`,
            animationDuration: '2s',
          }}
        />
      </div>

      {/* Highlight players in danger */}
      {highlightDanger && playersInDanger.map((player) => (
        <div
          key={player.id}
          className="absolute pointer-events-none z-30"
          style={{
            left: `${player.position.x}%`,
            top: `${player.position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Warning indicator above player */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            {/* Danger icon */}
            <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />
            
            {/* Warning badge */}
            <div className="mt-0.5 px-1.5 py-0.5 bg-red-500/90 text-white text-[8px] font-bold uppercase rounded border border-red-300">
              Zona Esplosione
            </div>
          </div>

          {/* Pulsing danger ring around player */}
          <div className="absolute inset-0 -m-3">
            <div className="w-full h-full rounded-full border-2 border-red-500 animate-ping" />
          </div>
        </div>
      ))}
    </>
  );
};
