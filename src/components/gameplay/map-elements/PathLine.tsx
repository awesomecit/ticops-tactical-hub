import React from 'react';
import { cn } from '@/lib/utils';

interface PathLineProps {
  /**
   * Array of points defining the path (percentage coordinates)
   */
  points: Array<{ x: number; y: number }>;
  /**
   * Path type
   */
  type?: 'main' | 'secondary' | 'trail';
  /**
   * Custom className
   */
  className?: string;
}

/**
 * PathLine - Percorso sulla mappa (strada, sentiero)
 */
export const PathLine: React.FC<PathLineProps> = ({
  points,
  type = 'main',
  className,
}) => {
  if (points.length < 2) return null;

  // Generate SVG path string
  const pathString = points
    .map((point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${command} ${point.x} ${point.y}`;
    })
    .join(' ');

  const strokeWidth = {
    main: 0.8,
    secondary: 0.5,
    trail: 0.3,
  }[type];

  const strokeColor = {
    main: 'stroke-gray-600',
    secondary: 'stroke-gray-700',
    trail: 'stroke-gray-700/50',
  }[type];

  const dashArray = type === 'trail' ? '2,2' : undefined;

  return (
    <svg
      className={cn('absolute inset-0 pointer-events-none overflow-visible', className)}
      style={{ width: '100%', height: '100%' }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d={pathString}
        fill="none"
        className={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
