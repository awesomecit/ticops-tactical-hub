import React from 'react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  userName?: string;
  className?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  userName,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-1 px-3 py-2 bg-card border border-border rounded-lg rounded-bl-sm">
        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      {userName && (
        <span className="text-xs text-muted-foreground">
          {userName} sta scrivendo...
        </span>
      )}
    </div>
  );
};
