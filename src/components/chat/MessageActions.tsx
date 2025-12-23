import React, { useState } from 'react';
import { Edit2, Trash2, MoreVertical, Copy, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatStore } from '@/stores/chatStore';
import { useToast } from '@/hooks/use-toast';

interface MessageActionsProps {
  messageId: string;
  content: string;
  isOwn: boolean;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  messageId,
  content,
  isOwn,
}) => {
  const { toast } = useToast();
  const { editMessage, deleteMessage } = useChatStore();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Copiato', description: 'Messaggio copiato negli appunti' });
  };

  const handleEdit = () => {
    if (editedContent.trim() && editedContent !== content) {
      editMessage(messageId, editedContent.trim());
      toast({ title: 'Messaggio modificato' });
    }
    setEditDialogOpen(false);
  };

  const handleDelete = () => {
    deleteMessage(messageId);
    toast({ 
      title: 'Messaggio eliminato',
      variant: 'destructive'
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 hover:bg-muted rounded-sm transition-colors opacity-0 group-hover:opacity-100">
            <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isOwn ? "end" : "start"} className="w-40">
          <DropdownMenuItem onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copiato!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copia
              </>
            )}
          </DropdownMenuItem>
          {isOwn && (
            <>
              <DropdownMenuItem onClick={() => {
                setEditedContent(content);
                setEditDialogOpen(true);
              }}>
                <Edit2 className="h-4 w-4 mr-2" />
                Modifica
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Elimina
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display uppercase">Modifica Messaggio</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Scrivi il messaggio..."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleEdit} disabled={!editedContent.trim()}>
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
