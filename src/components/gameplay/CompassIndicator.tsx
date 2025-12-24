import React from 'react';
import { Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompassIndicatorProps {
  /**
   * Player heading in degrees (0 = North, 90 = East, etc.)
   */
  heading?: number;
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Show cardinal directions
   */
  showCardinals?: boolean;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * CompassIndicator - North indicator and player heading
 * Shows orientation on the map
 */
export const CompassIndicator: React.FC<CompassIndicatorProps> = ({
  heading = 0,
  size = 'md',
  showCardinals = true,
  className,
}) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const cardinals = [
    { label: 'N', angle: 0 },
    { label: 'E', angle: 90 },
    { label: 'S', angle: 180 },
    { label: 'W', angle: 270 },
  ];

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        'bg-black/60 rounded-full border-2 border-white/30',
        'backdrop-blur-sm shadow-lg',
        sizeClasses[size],
        className
      )}
    >
      {/* Compass rose background */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />

      {/* Cardinal directions */}
      {showCardinals && cardinals.map(({ label, angle }) => {
        const isNorth = angle === 0;
        return (
          <div
            key={label}
            className={cn(
              'absolute text-[10px] font-bold',
              isNorth ? 'text-red-400' : 'text-white/60'
            )}
            style={{
              transform: `rotate(${angle}deg) translateY(-${size === 'sm' ? '20' : size === 'md' ? '26' : '32'}px)`,
            }}
          >
            <span style={{ transform: `rotate(-${angle}deg)`, display: 'inline-block' }}>
              {label}
            </span>
          </div>
        );
      })}

      {/* Player heading arrow */}
      <Navigation
        className={cn(
          iconSizes[size],
          'text-primary transition-transform duration-300'
        )}
        style={{
          transform: `rotate(${heading}deg)`,
        }}
      />

      {/* North indicator (always pointing up) */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2">
        <div className="h-2 w-0.5 bg-red-500" />
      </div>

      {/* Heading degrees */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
        {Math.round(heading)}°
      </div>
    </div>
  );
};
