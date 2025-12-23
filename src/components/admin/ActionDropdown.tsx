import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ActionItem {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
}

interface ActionDropdownProps {
  actions: ActionItem[];
  triggerClassName?: string;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({ actions, triggerClassName }) => {
  const regularActions = actions.filter((a) => a.variant !== 'destructive');
  const destructiveActions = actions.filter((a) => a.variant === 'destructive');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('h-8 w-8', triggerClassName)}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {regularActions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            className="cursor-pointer"
          >
            {action.icon && <action.icon className="h-4 w-4 mr-2" />}
            {action.label}
          </DropdownMenuItem>
        ))}
        
        {destructiveActions.length > 0 && regularActions.length > 0 && (
          <DropdownMenuSeparator />
        )}
        
        {destructiveActions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            {action.icon && <action.icon className="h-4 w-4 mr-2" />}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
