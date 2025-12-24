import React from 'react';
import { Radio } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
  /**
   * Size variant
   * - sm: Compact for corner display
   * - md: Standard size
   * - lg: Prominent top bar
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Show pulse animation
   */
  pulse?: boolean;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * LiveIndicator - Animated "LIVE" badge for active gameplay
 * Mimics streaming platforms live indicators
 */
export const LiveIndicator: React.FC<LiveIndicatorProps> = ({
  size = 'md',
  pulse = true,
  className,
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-3 py-1 text-xs gap-1.5',
    lg: 'px-4 py-2 text-sm gap-2',
  };

  const iconSizes = {
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-sm font-display font-bold uppercase tracking-wider',
        'bg-red-600 text-white border border-red-500',
        'shadow-lg shadow-red-500/50',
        sizeClasses[size],
        className
      )}
    >
      {/* Animated radio icon */}
      <Radio
        className={cn(
          iconSizes[size],
          pulse && 'animate-pulse'
        )}
      />
      
      {/* LIVE text */}
      <span className="relative">
        LIVE
        {pulse && (
          <span className="absolute inset-0 animate-ping opacity-75">
            LIVE
          </span>
        )}
      </span>

      {/* Pulsing dot indicator */}
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      )}
    </div>
  );
};
