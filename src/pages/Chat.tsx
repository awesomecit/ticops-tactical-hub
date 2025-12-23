import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Users, MapPin, Store, User, Scale, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { ConversationItem } from '@/components/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  MOCK_CONVERSATIONS,
  getTotalUnreadCount,
  ConversationType,
} from '@/mocks/chat';

type FilterType = 'all' | 'private' | 'team' | 'match' | 'field' | 'shop' | 'referee';

interface FilterOption {
  id: FilterType;
  label: string;
  icon: React.ElementType;
  entityType?: 'field' | 'shop' | 'player' | 'referee';
}

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'Tutti', icon: MessageCircle },
  { id: 'private', label: 'Giocatori', icon: User, entityType: 'player' },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'match', label: 'Partite', icon: Users },
  { id: 'field', label: 'Campi', icon: MapPin, entityType: 'field' },
  { id: 'shop', label: 'Shop', icon: Store, entityType: 'shop' },
  { id: 'referee', label: 'Arbitri', icon: Scale, entityType: 'referee' },
];

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const totalUnread = getTotalUnreadCount();

  const filteredConversations = useMemo(() => {
    let results = [...MOCK_CONVERSATIONS];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.lastMessage.text.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'referee') {
        results = results.filter(c => c.entityType === 'referee');
      } else if (activeFilter === 'private') {
        // Show player conversations (private without specific entity or with player entity)
        results = results.filter(c => 
          c.type === 'private' && (!c.entityType || c.entityType === 'player')
        );
      } else {
        results = results.filter(c => c.type === activeFilter);
      }
    }

    // Sort: pinned first, then by last message time
    return results.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime();
    });
  }, [searchQuery, activeFilter]);

  const getFilterCount = (filter: FilterType): number => {
    if (filter === 'all') return MOCK_CONVERSATIONS.length;
    if (filter === 'referee') {
      return MOCK_CONVERSATIONS.filter(c => c.entityType === 'referee').length;
    }
    if (filter === 'private') {
      return MOCK_CONVERSATIONS.filter(c => 
        c.type === 'private' && (!c.entityType || c.entityType === 'player')
      ).length;
    }
    return MOCK_CONVERSATIONS.filter(c => c.type === filter).length;
  };

  const handleConversationClick = (conversationId: string) => {
    navigate(`/chat/${conversationId}`);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col lg:flex-row gap-4 animate-slide-in-up">
      {/* Sidebar - Filters */}
      <div className="lg:w-64 flex-shrink-0">
        <TacticalCard className="h-full">
          <TacticalCardContent className="p-3 space-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display uppercase text-sm text-muted-foreground">Filtri</span>
              {totalUnread > 0 && (
                <Badge className="bg-primary text-primary-foreground">
                  {totalUnread} nuovi
                </Badge>
              )}
            </div>

            {filterOptions.map((filter) => {
              const count = getFilterCount(filter.id);
              const isActive = activeFilter === filter.id;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-all",
                    isActive
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground border-l-2 border-transparent"
                  )}
                >
                  <filter.icon className="h-4 w-4" />
                  <span className="font-display text-sm uppercase flex-1 text-left">
                    {filter.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {count}
                  </span>
                </button>
              );
            })}
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Main Content - Conversations List */}
      <TacticalCard className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display uppercase text-foreground">
              Messaggi
            </h2>
            <Button size="sm" variant="ghost" className="gap-2">
              <Plus className="h-4 w-4" />
              Nuova Chat
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca conversazioni..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? 'Nessuna conversazione trovata' 
                    : 'Nessuna conversazione'}
                </p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  id={conversation.id}
                  type={conversation.type}
                  name={conversation.name}
                  avatar={conversation.avatar}
                  lastMessage={conversation.lastMessage.text}
                  lastMessageTime={conversation.lastMessage.timestamp}
                  unreadCount={conversation.unreadCount}
                  isOnline={conversation.isOnline}
                  isPinned={conversation.isPinned}
                  entityType={conversation.entityType}
                  entityId={conversation.entityId}
                  onClick={() => handleConversationClick(conversation.id)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </TacticalCard>
    </div>
  );
};

export default Chat;