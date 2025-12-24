import React from 'react';
import { Ruler } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapScaleProps {
  /**
   * Current zoom level
   */
  zoom?: number;
  /**
   * Show grid coordinates
   */
  showCoordinates?: boolean;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * MapScale - Scala metrica della mappa con coordinate
 */
export const MapScale: React.FC<MapScaleProps> = ({
  zoom = 1,
  showCoordinates = true,
  className,
}) => {
  // Calculate scale based on zoom (1x = 100m, 2x = 200m, etc.)
  const scaleMeters = Math.round(100 * zoom);
  const scaleWidth = 60; // pixels

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Scale Bar */}
      <div className="flex items-center gap-2 bg-black/60 px-2 py-1.5 rounded-sm">
        <Ruler className="h-3 w-3 text-primary" />
        <div className="flex flex-col">
          <div className="flex items-end gap-1">
            <div
              className="h-1 bg-primary rounded-full"
              style={{ width: `${scaleWidth}px` }}
            />
          </div>
          <span className="text-[9px] text-primary mt-0.5">
            {scaleMeters}m
          </span>
        </div>
      </div>

      {/* Grid Coordinates */}
      {showCoordinates && (
        <div className="bg-black/60 px-2 py-1.5 rounded-sm text-[9px] text-gray-400">
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
            <span className="text-primary">Griglia:</span>
            <span>10x10</span>
            <span className="text-primary">Settori:</span>
            <span>A-J / 1-10</span>
          </div>
        </div>
      )}
    </div>
  );
};
