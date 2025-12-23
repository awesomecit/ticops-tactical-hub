import React from 'react';
import { Badge } from '@/types/achievements';
import { getRarityColor, getRarityGlow } from '@/mocks/achievements';
import { Award, Zap, Lock, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface BadgeDisplayProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  isLocked?: boolean;
  onClick?: () => void;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badge,
  size = 'md',
  showTooltip = true,
  isLocked = false,
  onClick,
}) => {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  const IconComponent = icons[badge.icon] || Award;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const badgeElement = (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-full flex items-center justify-center border-2 transition-all duration-300",
        sizeClasses[size],
        isLocked 
          ? "bg-muted/50 border-muted-foreground/20 text-muted-foreground opacity-50"
          : cn(getRarityColor(badge.rarity), getRarityGlow(badge.rarity)),
        onClick && "cursor-pointer hover:scale-110",
        badge.rarity === 'legendary' && !isLocked && "animate-[pulse_3s_ease-in-out_infinite]"
      )}
    >
      <IconComponent className={iconSizes[size]} />
      
      {/* Ability indicator */}
      {badge.ability && !isLocked && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary border border-background flex items-center justify-center">
          <Zap className="h-2 w-2 text-primary-foreground" />
        </div>
      )}

      {/* Lock indicator */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-full">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );

  if (!showTooltip) return badgeElement;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {badgeElement}
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-1">
          <p className={cn(
            "font-display font-bold",
            badge.rarity === 'legendary' && "text-amber-400",
            badge.rarity === 'epic' && "text-purple-400",
            badge.rarity === 'rare' && "text-blue-400"
          )}>
            {badge.name}
          </p>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
          {badge.ability && (
            <div className="pt-1 border-t border-border mt-1">
              <p className="text-xs text-primary font-medium">{badge.ability.name}</p>
              <p className="text-xs text-muted-foreground">{badge.ability.description}</p>
            </div>
          )}
          {isLocked && badge.isPurchasable && badge.price && (
            <p className="text-xs text-amber-400 pt-1">
              Acquistabile: {badge.price} monete
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

// Badge collection display
interface BadgeCollectionProps {
  badges: Badge[];
  userBadges: Badge[];
  size?: 'sm' | 'md' | 'lg';
  maxDisplay?: number;
  onBadgeClick?: (badge: Badge) => void;
}

export const BadgeCollection: React.FC<BadgeCollectionProps> = ({
  badges,
  userBadges,
  size = 'md',
  maxDisplay,
  onBadgeClick,
}) => {
  const displayBadges = maxDisplay ? badges.slice(0, maxDisplay) : badges;
  const remaining = maxDisplay && badges.length > maxDisplay ? badges.length - maxDisplay : 0;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayBadges.map((badge) => {
        const isUnlocked = userBadges.some(ub => ub.id === badge.id);
        return (
          <BadgeDisplay
            key={badge.id}
            badge={badge}
            size={size}
            isLocked={!isUnlocked}
            onClick={() => onBadgeClick?.(badge)}
          />
        );
      })}
      {remaining > 0 && (
        <div className={cn(
          "rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium",
          size === 'sm' && "w-8 h-8",
          size === 'md' && "w-12 h-12",
          size === 'lg' && "w-16 h-16"
        )}>
          +{remaining}
        </div>
      )}
    </div>
  );
};
