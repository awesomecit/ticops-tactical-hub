import React from 'react';
import { cn } from '@/lib/utils';

interface PlayerVisionConeProps {
  /**
   * Player position on map (percentage)
   */
  position: { x: number; y: number };
  /**
   * Player heading/direction in degrees (0 = North)
   */
  heading: number;
  /**
   * Vision range in percentage of map
   */
  range?: number;
  /**
   * Field of view angle in degrees
   */
  fovAngle?: number;
  /**
   * Vision cone color (team-based)
   */
  color?: 'blue' | 'red' | 'green';
  /**
   * Opacity of the cone
   */
  opacity?: number;
  /**
   * Show player dot
   */
  showPlayer?: boolean;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * PlayerVisionCone - Shows player field of view as a cone
 * Useful for tactical awareness and line-of-sight visualization
 */
export const PlayerVisionCone: React.FC<PlayerVisionConeProps> = ({
  position,
  heading,
  range = 20,
  fovAngle = 90,
  color = 'blue',
  opacity = 0.2,
  showPlayer = true,
  className,
}) => {
  const colorClasses = {
    blue: 'fill-blue-500',
    red: 'fill-red-500',
    green: 'fill-green-500',
  };

  const borderColors = {
    blue: 'stroke-blue-400',
    red: 'stroke-red-400',
    green: 'stroke-green-400',
  };

  // Calculate cone path (SVG path)
  // Cone starts at player position and spreads based on FOV angle
  const halfAngle = fovAngle / 2;
  const startAngle = heading - halfAngle;
  const endAngle = heading + halfAngle;

  // Convert to radians for calculations
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  // Calculate end points of the cone (scaled to percentage)
  const leftX = Math.sin(startRad) * range;
  const leftY = -Math.cos(startRad) * range;
  const rightX = Math.sin(endRad) * range;
  const rightY = -Math.cos(endRad) * range;

  // Convert range from percentage to pixels based on typical map size
  const pixelRange = range * 6; // Multiplier to get reasonable pixel size
  
  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Vision Cone SVG */}
      <svg
        className="absolute overflow-visible"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: opacity,
        }}
        width={pixelRange * 2}
        height={pixelRange * 2}
        viewBox={`${-pixelRange} ${-pixelRange} ${pixelRange * 2} ${pixelRange * 2}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Cone fill */}
        <path
          d={`M 0,0 L ${leftX * 6},${leftY * 6} A ${pixelRange} ${pixelRange} 0 0 1 ${rightX * 6},${rightY * 6} Z`}
          className={cn(colorClasses[color], borderColors[color], 'transition-all duration-300')}
          strokeWidth="2"
        />

        {/* Cone border lines */}
        <line
          x1="0"
          y1="0"
          x2={leftX * 6}
          y2={leftY * 6}
          className={borderColors[color]}
          strokeWidth="1.5"
          strokeDasharray="5,5"
          opacity="0.5"
        />
        <line
          x1="0"
          y1="0"
          x2={rightX * 6}
          y2={rightY * 6}
          className={borderColors[color]}
          strokeWidth="1.5"
          strokeDasharray="5,5"
          opacity="0.5"
        />

        {/* Arc at the end */}
        <path
          d={`M ${leftX * 6},${leftY * 6} A ${pixelRange} ${pixelRange} 0 0 1 ${rightX * 6},${rightY * 6}`}
          fill="none"
          className={borderColors[color]}
          strokeWidth="1.5"
          strokeDasharray="5,5"
          opacity="0.5"
        />
      </svg>

      {/* Player indicator */}
      {showPlayer && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className={cn(
              'w-3 h-3 rounded-full border-2',
              color === 'blue' && 'bg-blue-500 border-blue-300',
              color === 'red' && 'bg-red-500 border-red-300',
              color === 'green' && 'bg-green-500 border-green-300',
              'shadow-lg'
            )}
          />

          {/* Direction indicator (small arrow) */}
          <div
            className="absolute top-1/2 left-1/2 w-1 h-2 bg-white"
            style={{
              transform: `translate(-50%, -100%) rotate(${heading}deg)`,
              transformOrigin: 'bottom center',
            }}
          />
        </div>
      )}
    </div>
  );
};
