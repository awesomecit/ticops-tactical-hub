import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { findOrCreateEntityConversation } from '@/mocks/chat';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export type EntityType = 'field' | 'shop' | 'player' | 'referee';

interface StartConversationButtonProps {
  entityType: EntityType;
  entityId: string;
  entityName: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
  className?: string;
}

const entityLabels: Record<EntityType, string> = {
  field: 'campo',
  shop: 'negozio',
  player: 'giocatore',
  referee: 'arbitro',
};

export const StartConversationButton: React.FC<StartConversationButtonProps> = ({
  entityType,
  entityId,
  entityName,
  variant = 'outline',
  size = 'sm',
  showLabel = true,
  className,
}) => {
  const navigate = useNavigate();

  const handleStartConversation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    const conversation = findOrCreateEntityConversation(entityType, entityId, entityName);
    
    toast.success(`Chat con ${entityLabels[entityType]} avviata`, {
      description: entityName,
    });
    
    navigate(`/chat/${conversation.id}`);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleStartConversation}
      className={cn('gap-2', className)}
    >
      <MessageCircle className="h-4 w-4" />
      {showLabel && <span>Contatta</span>}
    </Button>
  );
};
