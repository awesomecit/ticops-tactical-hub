import React from 'react';
import { MapPin, Store, User, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

export type EntityType = 'field' | 'shop' | 'player' | 'referee';

interface EntityAvatarProps {
  entityType?: EntityType;
  name: string;
  avatar?: string;
  isOnline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  className?: string;
}

const entityConfig: Record<EntityType, { icon: React.ElementType; color: string; bgColor: string }> = {
  field: { icon: MapPin, color: 'text-green-400', bgColor: 'bg-green-500/20' },
  shop: { icon: Store, color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
  player: { icon: User, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  referee: { icon: Scale, color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
};

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

const iconSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-8 w-8',
};

const badgeSizeClasses = {
  sm: 'h-3 w-3 -top-0.5 -left-0.5',
  md: 'h-4 w-4 -top-1 -left-1',
  lg: 'h-5 w-5 -top-1 -left-1',
};

const onlineIndicatorSizes = {
  sm: 'h-2.5 w-2.5',
  md: 'h-3.5 w-3.5',
  lg: 'h-4 w-4',
};

export const EntityAvatar: React.FC<EntityAvatarProps> = ({
  entityType,
  name,
  avatar,
  isOnline,
  size = 'md',
  showBadge = true,
  className,
}) => {
  const config = entityType ? entityConfig[entityType] : null;
  const IconComponent = config?.icon;

  return (
    <div className={cn('relative flex-shrink-0', className)}>
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className={cn(
            sizeClasses[size],
            'rounded-full border-2 border-border object-cover'
          )}
        />
      ) : (
        <div
          className={cn(
            sizeClasses[size],
            'rounded-full border-2 border-border flex items-center justify-center font-display font-bold',
            config ? config.bgColor : 'bg-card',
            config ? config.color : 'text-primary'
          )}
        >
          {IconComponent ? (
            <IconComponent className={iconSizeClasses[size]} />
          ) : (
            <span className={size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg'}>
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      )}

      {/* Online indicator */}
      {isOnline !== undefined && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-background',
            onlineIndicatorSizes[size],
            isOnline ? 'bg-secondary' : 'bg-muted'
          )}
        />
      )}

      {/* Entity type badge */}
      {showBadge && config && IconComponent && (
        <span
          className={cn(
            'absolute flex items-center justify-center rounded-full',
            badgeSizeClasses[size],
            config.bgColor,
            config.color
          )}
        >
          <IconComponent className="h-2.5 w-2.5" />
        </span>
      )}
    </div>
  );
};
