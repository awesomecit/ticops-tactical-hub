import React from 'react';
import { Trees } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeClusterProps {
  /**
   * Position on map (percentage)
   */
  position: { x: number; y: number };
  /**
   * Density (number of trees)
   */
  density?: 'sparse' | 'medium' | 'dense';
  /**
   * Size of the cluster area (percentage)
   */
  size?: number;
  /**
   * Custom className
   */
  className?: string;
}

/**
 * TreeCluster - Gruppo di alberi sulla mappa
 */
export const TreeCluster: React.FC<TreeClusterProps> = ({
  position,
  density = 'medium',
  size = 4,
  className,
}) => {
  const treeCount = {
    sparse: 3,
    medium: 5,
    dense: 8,
  }[density];

  // Generate random tree positions within cluster
  const trees = Array.from({ length: treeCount }, (_, i) => ({
    id: i,
    offsetX: (Math.random() - 0.5) * size * 0.8,
    offsetY: (Math.random() - 0.5) * size * 0.8,
    scale: 0.6 + Math.random() * 0.4, // Random size variation
  }));

  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size}%`,
        height: `${size}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Background foliage area */}
      <div className="absolute inset-0 bg-green-900/20 rounded-full blur-sm" />

      {/* Individual trees */}
      {trees.map((tree) => (
        <div
          key={tree.id}
          className="absolute"
          style={{
            left: `${50 + tree.offsetX}%`,
            top: `${50 + tree.offsetY}%`,
            transform: `translate(-50%, -50%) scale(${tree.scale})`,
          }}
        >
          <Trees className="h-3 w-3 text-green-700/80" />
        </div>
      ))}
    </div>
  );
};
