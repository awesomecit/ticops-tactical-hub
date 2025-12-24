import React from 'react';
import { Home, Warehouse, Building2, Store } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BuildingProps {
  /**
   * Position on map (percentage)
   */
  position: { x: number; y: number };
  /**
   * Size (percentage)
   */
  size?: { width: number; height: number };
  /**
   * Building type
   */
  type?: 'shed' | 'warehouse' | 'house' | 'container';
  /**
   * Rotation in degrees
   */
  rotation?: number;
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
 * Building - Edificio/Capannone sulla mappa
 */
export const Building: React.FC<BuildingProps> = ({
  position,
  size = { width: 6, height: 8 },
  type = 'shed',
  rotation = 0,
  label,
  className,
}) => {
  const IconComponent = {
    shed: Home,
    warehouse: Warehouse,
    house: Building2,
    container: Store,
  }[type];

  const bgColor = {
    shed: 'bg-gray-700/70',
    warehouse: 'bg-gray-800/80',
    house: 'bg-gray-700/60',
    container: 'bg-orange-900/60',
  }[type];

  return (
    <div
      className={cn('absolute group', className)}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size.width}%`,
        height: `${size.height}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      {/* Building body */}
      <div
        className={cn(
          'relative w-full h-full rounded-sm border-2 border-gray-600/50',
          bgColor,
          'transition-all duration-200 group-hover:border-gray-500'
        )}
      >
        {/* Roof line */}
        <div className="absolute top-0 left-0 right-0 h-[20%] bg-gray-900/30 border-b border-gray-600/30" />

        {/* Windows/Details */}
        {type !== 'container' && (
          <div className="absolute inset-2 grid grid-cols-2 gap-1 opacity-50">
            <div className="bg-yellow-600/20 border border-yellow-700/30 rounded-[1px]" />
            <div className="bg-yellow-600/20 border border-yellow-700/30 rounded-[1px]" />
          </div>
        )}

        {/* Container stripes */}
        {type === 'container' && (
          <div className="absolute inset-0 flex flex-col justify-around opacity-30">
            <div className="h-px bg-orange-700" />
            <div className="h-px bg-orange-700" />
            <div className="h-px bg-orange-700" />
          </div>
        )}

        {/* Icon indicator */}
        <div className="absolute -top-2 -right-2 h-4 w-4 bg-gray-800 rounded-full flex items-center justify-center border border-gray-600">
          <IconComponent className="h-2.5 w-2.5 text-gray-400" />
        </div>

        {/* Label */}
        {label && (
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-[9px] text-gray-400 bg-black/60 px-1.5 py-0.5 rounded">
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
