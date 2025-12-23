import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { Pin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConversationType } from '@/mocks/chat';
import { EntityAvatar, EntityType } from './EntityAvatar';
import { ConversationActions } from './ConversationActions';

interface ConversationItemProps {
  id: string;
  type: ConversationType;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline?: boolean;
  isPinned?: boolean;
  isActive?: boolean;
  isArchived?: boolean;
  entityType?: EntityType;
  entityId?: string;
  onClick?: () => void;
}

const typeBadges: Record<ConversationType, { label: string; color: string }> = {
  private: { label: 'Privato', color: 'text-blue-400' },
  team: { label: 'Team', color: 'text-secondary' },
  match: { label: 'Partita', color: 'text-primary' },
  field: { label: 'Campo', color: 'text-green-400' },
  shop: { label: 'Shop', color: 'text-purple-400' },
};

export const ConversationItem: React.FC<ConversationItemProps> = ({
  id,
  type,
  name,
  avatar,
  lastMessage,
  lastMessageTime,
  unreadCount,
  isOnline,
  isPinned,
  isActive,
  isArchived,
  entityType,
  onClick,
}) => {
  const badge = typeBadges[type];

  // Determine avatar entity type based on conversation type
  const avatarEntityType: EntityType | undefined = entityType || 
    (type === 'field' ? 'field' : type === 'shop' ? 'shop' : undefined);

  return (
    <div className="group relative">
      <button
        onClick={onClick}
        className={cn(
          'w-full flex items-center gap-3 p-3 pr-10 rounded-sm transition-all duration-200 text-left',
          'hover:bg-muted/50',
          isActive && 'bg-primary/10 border-l-2 border-primary',
          !isActive && 'border-l-2 border-transparent',
          isArchived && 'opacity-60'
        )}
      >
      {/* Avatar with Entity Icon */}
      <EntityAvatar
        entityType={avatarEntityType}
        name={name}
        avatar={avatar}
        isOnline={type === 'private' ? isOnline : undefined}
        size="md"
        showBadge={!!avatarEntityType}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={cn(
              'font-display uppercase text-sm truncate',
              unreadCount > 0 ? 'text-foreground font-bold' : 'text-foreground'
            )}>
              {name}
            </span>
            {isPinned && (
              <Pin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            )}
            {/* Entity type label */}
            {avatarEntityType && (
              <span className={cn(
                'text-[10px] font-medium uppercase px-1.5 py-0.5 rounded-sm',
                badge.color,
                'bg-current/10'
              )}>
                {badge.label}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {formatDistanceToNow(lastMessageTime, { addSuffix: false, locale: it })}
          </span>
        </div>
        
        <p className={cn(
          'text-sm truncate mt-0.5',
          unreadCount > 0 ? 'text-foreground' : 'text-muted-foreground'
        )}>
          {lastMessage}
        </p>
      </div>

      {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="h-5 min-w-5 px-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>
      
      {/* Actions Menu */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <ConversationActions
          conversationId={id}
          isPinned={isPinned}
          isArchived={isArchived}
          conversationName={name}
        />
      </div>
    </div>
  );
};
