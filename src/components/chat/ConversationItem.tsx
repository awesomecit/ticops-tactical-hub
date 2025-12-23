import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { Pin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConversationType } from '@/mocks/chat';

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
  onClick?: () => void;
}

const typeBadges: Record<ConversationType, { emoji: string; color: string }> = {
  private: { emoji: '🔵', color: 'text-blue-400' },
  team: { emoji: '🟢', color: 'text-secondary' },
  match: { emoji: '🟠', color: 'text-primary' },
  field: { emoji: '📍', color: 'text-green-400' },
  shop: { emoji: '🛒', color: 'text-purple-400' },
};

export const ConversationItem: React.FC<ConversationItemProps> = ({
  type,
  name,
  avatar,
  lastMessage,
  lastMessageTime,
  unreadCount,
  isOnline,
  isPinned,
  isActive,
  onClick,
}) => {
  const badge = typeBadges[type];

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-sm transition-all duration-200 text-left',
        'hover:bg-muted/50',
        isActive && 'bg-primary/10 border-l-2 border-primary',
        !isActive && 'border-l-2 border-transparent'
      )}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-12 w-12 rounded-full border-2 border-border"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-card border-2 border-border flex items-center justify-center font-display font-bold text-lg text-primary">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        
        {/* Online indicator */}
        {type === 'private' && isOnline !== undefined && (
          <span
            className={cn(
              'absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background',
              isOnline ? 'bg-secondary' : 'bg-muted'
            )}
          />
        )}

        {/* Type badge */}
        <span className="absolute -top-1 -left-1 text-sm">
          {badge.emoji}
        </span>
      </div>

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
  );
};
