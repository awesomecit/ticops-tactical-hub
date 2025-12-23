import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Check, CheckCheck, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MessageType } from '@/mocks/chat';
import { MessageActions } from './MessageActions';

interface MessageBubbleProps {
  id: string;
  type: MessageType;
  content: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
  isOwn: boolean;
  isRead: boolean;
  reactions?: { emoji: string; userId: string }[];
  showSender?: boolean;
  isEdited?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  id,
  type,
  content,
  senderName,
  senderAvatar,
  timestamp,
  isOwn,
  isRead,
  reactions,
  showSender = true,
  isEdited,
}) => {
  // System message
  if (type === 'system') {
    return (
      <div className="flex justify-center my-2">
        <div className="px-3 py-1.5 bg-muted/50 rounded-full text-xs text-muted-foreground text-center">
          {content}
        </div>
      </div>
    );
  }

  // Achievement message
  if (type === 'achievement') {
    return (
      <div className="flex justify-center my-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-sm">
          <Trophy className="h-5 w-5 text-accent" />
          <span className="text-sm font-display uppercase text-accent">
            {content}
          </span>
        </div>
      </div>
    );
  }

  // Regular message
  return (
    <div
      className={cn(
        'group flex gap-2 max-w-[85%] sm:max-w-[70%]',
        isOwn ? 'ml-auto flex-row-reverse' : 'mr-auto'
      )}
    >
      {/* Avatar (for others) */}
      {!isOwn && showSender && (
        <div className="flex-shrink-0">
          {senderAvatar ? (
            <img
              src={senderAvatar}
              alt={senderName}
              className="h-8 w-8 rounded-full border border-border"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center font-display text-sm text-primary">
              {senderName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          'flex flex-col',
          isOwn ? 'items-end' : 'items-start'
        )}
      >
        {/* Sender name */}
        {!isOwn && showSender && (
          <span className="text-xs text-muted-foreground mb-1 font-display uppercase">
            {senderName}
          </span>
        )}

        {/* Message content */}
        <div
          className={cn(
            'px-3 py-2 rounded-lg relative',
            isOwn
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-card border border-border rounded-bl-sm'
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
          {isEdited && (
            <span className="text-[10px] text-muted-foreground ml-1">(modificato)</span>
          )}

          {/* Message Actions */}
          <div className={cn(
            'absolute top-1',
            isOwn ? 'left-0 -translate-x-full pl-1' : 'right-0 translate-x-full pr-1'
          )}>
            <MessageActions messageId={id} content={content} isOwn={isOwn} />
          </div>

          {/* Reactions */}
          {reactions && reactions.length > 0 && (
            <div className={cn(
              'absolute -bottom-2.5 flex gap-0.5',
              isOwn ? 'left-0' : 'right-0'
            )}>
              {reactions.map((reaction, idx) => (
                <span
                  key={idx}
                  className="h-5 min-w-5 px-1 bg-card border border-border rounded-full text-xs flex items-center justify-center"
                >
                  {reaction.emoji}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Timestamp & Read status */}
        <div className={cn(
          'flex items-center gap-1 mt-1',
          reactions && reactions.length > 0 && 'mt-3'
        )}>
          <span className="text-[10px] text-muted-foreground">
            {format(timestamp, 'HH:mm')}
          </span>
          {isOwn && (
            isRead ? (
              <CheckCheck className="h-3 w-3 text-secondary" />
            ) : (
              <Check className="h-3 w-3 text-muted-foreground" />
            )
          )}
        </div>
      </div>
    </div>
  );
};
