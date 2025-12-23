import React from 'react';
import { cn } from '@/lib/utils';

interface QuickReplyBarProps {
  onReply: (text: string) => void;
  className?: string;
}

const quickReplies = [
  { text: 'GG', emoji: '🎮' },
  { text: 'Pronto', emoji: '✅' },
  { text: 'Arrivo', emoji: '🏃' },
  { text: '👍', emoji: '' },
  { text: '🔥', emoji: '' },
];

export const QuickReplyBar: React.FC<QuickReplyBarProps> = ({
  onReply,
  className,
}) => {
  return (
    <div className={cn('flex gap-2 overflow-x-auto pb-2', className)}>
      {quickReplies.map((reply) => (
        <button
          key={reply.text}
          onClick={() => onReply(reply.text)}
          className={cn(
            'flex items-center gap-1 px-3 py-1.5 rounded-full',
            'bg-card border border-border hover:border-primary/50 hover:bg-card/80',
            'text-xs font-display uppercase whitespace-nowrap transition-colors'
          )}
        >
          {reply.emoji && <span>{reply.emoji}</span>}
          <span>{reply.text}</span>
        </button>
      ))}
    </div>
  );
};
