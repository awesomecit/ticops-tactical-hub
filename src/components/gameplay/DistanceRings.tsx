import React from 'react';
import { cn } from '@/lib/utils';

interface DistanceRingsProps {
  /**
   * Distance intervals in meters (e.g., [50, 100, 150])
   */
  intervals?: number[];
  /**
   * Show distance labels
   */
  showLabels?: boolean;
  /**
   * Ring color
   */
  color?: 'primary' | 'secondary' | 'white';
  /**
   * Custom className for container
   */
  className?: string;
}

/**
 * DistanceRings - Concentric circles for range awareness
 * Overlays on tactical map to show distance zones
 */
export const DistanceRings: React.FC<DistanceRingsProps> = ({
  intervals = [50, 100, 150],
  showLabels = true,
  color = 'primary',
  className,
}) => {
  const colorClasses = {
    primary: 'border-primary/30',
    secondary: 'border-secondary/30',
    white: 'border-white/20',
  };

  const labelColorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
  };

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {/* Center point (player position) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="h-3 w-3 rounded-full bg-blue-500 border-2 border-white shadow-lg shadow-blue-500/50" />
      </div>

      {/* Distance rings */}
      {intervals.map((distance, index) => {
        // Calculate radius as percentage of container
        // Assuming container represents 200m total
        const radiusPercent = (distance / 200) * 100;
        const ringSize = `${radiusPercent * 2}%`;

        return (
          <React.Fragment key={distance}>
            {/* Ring circle */}
            <div
              className={cn(
                'absolute top-1/2 left-1/2 rounded-full border-2',
                colorClasses[color],
                'animate-pulse'
              )}
              style={{
                width: ringSize,
                height: ringSize,
                transform: 'translate(-50%, -50%)',
                animationDuration: `${2 + index * 0.5}s`,
              }}
            />

            {/* Distance label */}
            {showLabels && (
              <div
                className={cn(
                  'absolute top-1/2 left-1/2 text-[10px] font-mono font-bold',
                  labelColorClasses[color],
                  'bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm'
                )}
                style={{
                  transform: `translate(-50%, -${radiusPercent}%) translateY(-8px)`,
                }}
              >
                {distance}m
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
