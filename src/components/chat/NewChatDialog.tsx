import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Users, MapPin, Store, Scale } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useChatStore } from '@/stores/chatStore';
import { cn } from '@/lib/utils';

interface NewChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock users/entities to start conversations with
const AVAILABLE_CONTACTS = [
  { id: 'player_1', name: 'SniperElite', type: 'player' as const, isOnline: true },
  { id: 'player_2', name: 'StealthMaster', type: 'player' as const, isOnline: false },
  { id: 'player_3', name: 'TacticPro', type: 'player' as const, isOnline: true },
  { id: 'player_4', name: 'NightHawk', type: 'player' as const, isOnline: false },
  { id: 'referee_2', name: 'FairPlayRef', type: 'referee' as const, isOnline: true },
  { id: 'field_2', name: 'Delta Force Arena', type: 'field' as const },
  { id: 'field_3', name: 'Urban Combat Zone', type: 'field' as const },
  { id: 'shop_2', name: 'AirSoft Pro Shop', type: 'shop' as const },
  { id: 'shop_3', name: 'Combat Gear Store', type: 'shop' as const },
];

const typeIcons = {
  player: User,
  referee: Scale,
  field: MapPin,
  shop: Store,
};

const typeLabels = {
  player: 'Giocatore',
  referee: 'Arbitro',
  field: 'Campo',
  shop: 'Shop',
};

export const NewChatDialog: React.FC<NewChatDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  const { createConversation, conversations } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredContacts = AVAILABLE_CONTACTS.filter(contact => {
    // Filter by search
    if (searchQuery && !contact.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Filter by tab
    if (activeTab !== 'all' && contact.type !== activeTab) {
      return false;
    }
    // Exclude existing conversations
    const hasConversation = conversations.some(
      c => c.entityId === contact.id && c.entityType === contact.type
    );
    return !hasConversation;
  });

  const handleStartConversation = (contact: typeof AVAILABLE_CONTACTS[0]) => {
    const convType = contact.type === 'field' ? 'field' : 
                     contact.type === 'shop' ? 'shop' : 'private';
    
    const newConv = createConversation(
      convType,
      contact.name,
      contact.type,
      contact.id
    );
    
    onOpenChange(false);
    navigate(`/chat/${newConv.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display uppercase">Nuova Chat</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca contatto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="all" className="text-xs">Tutti</TabsTrigger>
              <TabsTrigger value="player" className="text-xs">
                <User className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="referee" className="text-xs">
                <Scale className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="field" className="text-xs">
                <MapPin className="h-3 w-3" />
              </TabsTrigger>
              <TabsTrigger value="shop" className="text-xs">
                <Store className="h-3 w-3" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Contacts List */}
          <ScrollArea className="h-[300px]">
            <div className="space-y-1">
              {filteredContacts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nessun contatto trovato
                </p>
              ) : (
                filteredContacts.map((contact) => {
                  const Icon = typeIcons[contact.type];
                  return (
                    <button
                      key={contact.id}
                      onClick={() => handleStartConversation(contact)}
                      className="w-full flex items-center gap-3 p-3 rounded-sm hover:bg-muted transition-colors text-left"
                    >
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        {contact.type === 'player' && 'isOnline' in contact && (
                          <span className={cn(
                            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                            contact.isOnline ? "bg-green-500" : "bg-muted-foreground"
                          )} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display uppercase text-sm truncate">
                          {contact.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {typeLabels[contact.type]}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
