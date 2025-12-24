import React from 'react';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GamePlayer } from '@/mocks/gameplay';

interface MiniRadarProps {
  /**
   * Players to display (filtered to nearby)
   */
  players: GamePlayer[];
  /**
   * Current player position (center of radar)
   */
  playerPosition?: { x: number; y: number };
  /**
   * Radar range in percentage (how much of map to show)
   */
  range?: number;
  /**
   * Size in pixels
   */
  size?: number;
  /**
   * Show objective indicator
   */
  showObjective?: boolean;
  /**
   * Objective position
   */
  objectivePosition?: { x: number; y: number };
  /**
   * Custom className
   */
  className?: string;
}

/**
 * MiniRadar - Compact corner radar display (COD-style)
 * Shows nearby players and objectives relative to player
 */
export const MiniRadar: React.FC<MiniRadarProps> = ({
  players,
  playerPosition = { x: 50, y: 50 },
  range = 30,
  size = 120,
  showObjective = true,
  objectivePosition = { x: 50, y: 50 },
  className,
}) => {
  // Calculate relative positions for radar
  const getRadarPosition = (pos: { x: number; y: number }) => {
    const dx = pos.x - playerPosition.x;
    const dy = pos.y - playerPosition.y;
    
    // Scale to radar range
    const scaledX = (dx / range) * 50 + 50;
    const scaledY = (dy / range) * 50 + 50;
    
    // Clamp to radar boundaries
    return {
      x: Math.max(5, Math.min(95, scaledX)),
      y: Math.max(5, Math.min(95, scaledY)),
    };
  };

  // Filter players within range
  const nearbyPlayers = players.filter((p) => {
    const dx = Math.abs(p.position.x - playerPosition.x);
    const dy = Math.abs(p.position.y - playerPosition.y);
    return Math.sqrt(dx * dx + dy * dy) <= range && p.isAlive;
  });

  return (
    <div
      className={cn(
        'relative bg-black/80 border-2 border-white/30 rounded-sm backdrop-blur-sm',
        'shadow-lg shadow-black/50',
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Radar grid */}
      <div className="absolute inset-0 opacity-20">
        {/* Crosshair lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary/50" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-primary/50" />
        
        {/* Circular grid */}
        <Circle
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30"
          style={{ width: '60%', height: '60%' }}
        />
        <Circle
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/20"
          style={{ width: '30%', height: '30%' }}
        />
      </div>

      {/* Sweep line animation (radar scan) */}
      <div
        className="absolute top-1/2 left-1/2 origin-center h-px w-1/2 bg-gradient-to-r from-primary to-transparent"
        style={{
          transform: 'translate(-100%, -50%) rotate(0deg)',
          animation: 'radarSweep 4s linear infinite',
        }}
      />

      {/* Center dot (player) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="h-3 w-3 rounded-full bg-blue-500 border-2 border-white shadow-glow-primary" />
      </div>

      {/* Objective marker */}
      {showObjective && (
        <div
          className="absolute z-10 transition-all duration-300"
          style={{
            left: `${getRadarPosition(objectivePosition).x}%`,
            top: `${getRadarPosition(objectivePosition).y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 border border-yellow-300 animate-pulse" />
        </div>
      )}

      {/* Enemy/Ally dots */}
      {nearbyPlayers.map((player) => {
        const radarPos = getRadarPosition(player.position);
        const isAlly = player.team === 'alpha';
        const isUser = player.isUser;

        if (isUser) return null; // Skip rendering user (shown as center dot)

        return (
          <div
            key={player.id}
            className="absolute z-10 transition-all duration-300"
            style={{
              left: `${radarPos.x}%`,
              top: `${radarPos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={cn(
                'h-2 w-2 rounded-full border',
                isAlly
                  ? 'bg-blue-400 border-blue-300'
                  : 'bg-red-500 border-red-300 shadow-glow-red'
              )}
            />
          </div>
        );
      })}

      {/* Border glow */}
      <div className="absolute inset-0 rounded-sm border border-primary/50 pointer-events-none" />

      {/* Radar label */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-display uppercase tracking-wider text-primary">
        Radar
      </div>

      {/* CSS for sweep animation */}
      <style>{`
        @keyframes radarSweep {
          0% { transform: translate(-100%, -50%) rotate(0deg); }
          100% { transform: translate(-100%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
