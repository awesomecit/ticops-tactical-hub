import React from 'react';
import { Archive, ArchiveRestore, Pin, PinOff, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChatStore } from '@/stores/chatStore';
import { useToast } from '@/hooks/use-toast';

interface ConversationActionsProps {
  conversationId: string;
  isPinned?: boolean;
  isArchived?: boolean;
  conversationName: string;
}

export const ConversationActions: React.FC<ConversationActionsProps> = ({
  conversationId,
  isPinned,
  isArchived,
  conversationName,
}) => {
  const { toast } = useToast();
  const { 
    pinConversation, 
    unpinConversation, 
    archiveConversation, 
    unarchiveConversation,
    deleteConversation 
  } = useChatStore();

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPinned) {
      unpinConversation(conversationId);
      toast({ title: 'Chat sbloccata', description: `${conversationName} non è più in evidenza` });
    } else {
      pinConversation(conversationId);
      toast({ title: 'Chat in evidenza', description: `${conversationName} è ora in evidenza` });
    }
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isArchived) {
      unarchiveConversation(conversationId);
      toast({ title: 'Chat ripristinata', description: `${conversationName} è tornata attiva` });
    } else {
      archiveConversation(conversationId);
      toast({ title: 'Chat archiviata', description: `${conversationName} è stata archiviata` });
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConversation(conversationId);
    toast({ 
      title: 'Chat eliminata', 
      description: `${conversationName} è stata eliminata`,
      variant: 'destructive'
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <button className="p-1.5 hover:bg-muted rounded-sm transition-colors opacity-0 group-hover:opacity-100">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handlePin}>
          {isPinned ? (
            <>
              <PinOff className="h-4 w-4 mr-2" />
              Rimuovi da evidenza
            </>
          ) : (
            <>
              <Pin className="h-4 w-4 mr-2" />
              Metti in evidenza
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleArchive}>
          {isArchived ? (
            <>
              <ArchiveRestore className="h-4 w-4 mr-2" />
              Ripristina
            </>
          ) : (
            <>
              <Archive className="h-4 w-4 mr-2" />
              Archivia
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Elimina
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
