import React from 'react';
import { cn } from '@/lib/utils';

export type TierType = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface TierBadgeProps {
  tier: TierType;
  level?: number;
  size?: 'sm' | 'md' | 'lg';
  showLevel?: boolean;
  className?: string;
}

const tierConfig: Record<TierType, { color: string; glow: string; label: string }> = {
  bronze: {
    color: 'from-[#CD7F32] to-[#8B4513]',
    glow: 'shadow-[0_0_20px_rgba(205,127,50,0.5)]',
    label: 'Bronze',
  },
  silver: {
    color: 'from-[#C0C0C0] to-[#808080]',
    glow: 'shadow-[0_0_20px_rgba(192,192,192,0.5)]',
    label: 'Silver',
  },
  gold: {
    color: 'from-[#FFD700] to-[#B8860B]',
    glow: 'shadow-[0_0_20px_rgba(255,215,0,0.5)]',
    label: 'Gold',
  },
  platinum: {
    color: 'from-[#00CED1] to-[#008B8B]',
    glow: 'shadow-[0_0_20px_rgba(0,206,209,0.5)]',
    label: 'Platinum',
  },
  diamond: {
    color: 'from-[#B9F2FF] to-[#5BC0DE]',
    glow: 'shadow-[0_0_25px_rgba(185,242,255,0.6)]',
    label: 'Diamond',
  },
};

const sizeConfig = {
  sm: { wrapper: 'h-10 w-10', text: 'text-xs', level: 'text-[10px]' },
  md: { wrapper: 'h-14 w-14', text: 'text-sm', level: 'text-xs' },
  lg: { wrapper: 'h-20 w-20', text: 'text-base', level: 'text-sm' },
};

export const TierBadge: React.FC<TierBadgeProps> = ({
  tier,
  level = 1,
  size = 'md',
  showLevel = true,
  className,
}) => {
  const config = tierConfig[tier];
  const sizes = sizeConfig[size];

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        sizes.wrapper,
        className
      )}
    >
      {/* Hexagon shape with gradient */}
      <svg
        viewBox="0 0 100 100"
        className={cn(
          'absolute inset-0 w-full h-full drop-shadow-lg',
          config.glow
        )}
      >
        <defs>
          <linearGradient id={`tier-gradient-${tier}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={tier === 'bronze' ? '#CD7F32' : tier === 'silver' ? '#C0C0C0' : tier === 'gold' ? '#FFD700' : tier === 'platinum' ? '#00CED1' : '#B9F2FF'} />
            <stop offset="100%" stopColor={tier === 'bronze' ? '#8B4513' : tier === 'silver' ? '#808080' : tier === 'gold' ? '#B8860B' : tier === 'platinum' ? '#008B8B' : '#5BC0DE'} />
          </linearGradient>
        </defs>
        <polygon
          points="50,2 95,25 95,75 50,98 5,75 5,25"
          fill={`url(#tier-gradient-${tier})`}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        />
      </svg>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-background-primary font-display">
        <span className={cn('font-bold uppercase', sizes.text)}>
          {config.label.charAt(0)}
        </span>
        {showLevel && (
          <span className={cn('font-mono', sizes.level)}>
            {level}
          </span>
        )}
      </div>
    </div>
  );
};
