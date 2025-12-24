import React from 'react';
import { Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpawnZoneProps {
  /**
   * Position on map (percentage)
   */
  position: { x: number; y: number };
  /**
   * Size in percentage
   */
  size?: { width: number; height: number };
  /**
   * Team (alpha/bravo)
   */
  team: 'alpha' | 'bravo';
  /**
   * Label
   */
  label?: string;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * SpawnZone - Area di spawn del team sulla mappa
 */
export const SpawnZone: React.FC<SpawnZoneProps> = ({
  position,
  size = { width: 8, height: 8 },
  team,
  label,
  className,
}) => {
  const isAlpha = team === 'alpha';

  return (
    <div
      className={cn(
        'absolute border-2 border-dashed rounded-sm',
        isAlpha
          ? 'bg-blue-500/10 border-blue-500/50'
          : 'bg-red-500/10 border-red-500/50',
        className
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size.width}%`,
        height: `${size.height}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Icon and Label */}
      <div className="absolute top-1 left-1 flex items-center gap-1">
        <Flag
          className={cn(
            'h-3 w-3',
            isAlpha ? 'text-blue-400' : 'text-red-400'
          )}
        />
        {label && (
          <span
            className={cn(
              'text-[9px] font-semibold',
              isAlpha ? 'text-blue-400' : 'text-red-400'
            )}
          >
            {label}
          </span>
        )}
      </div>

      {/* Spawn indicator lines */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={cn(
            'absolute top-0 left-1/2 w-px h-full',
            isAlpha ? 'bg-blue-500' : 'bg-red-500'
          )}
        />
        <div
          className={cn(
            'absolute left-0 top-1/2 h-px w-full',
            isAlpha ? 'bg-blue-500' : 'bg-red-500'
          )}
        />
      </div>
    </div>
  );
};
