import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, ArrowLeft } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useMarketplaceChatStore, MarketplaceConversation } from '@/stores/marketplaceChatStore';
import { MarketplaceListing } from '@/types/marketplace';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface ListingChatDrawerProps {
  listing: MarketplaceListing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock current user
const CURRENT_USER = {
  id: 'current-user',
  name: 'Tu',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
};

export function ListingChatDrawer({ listing, open, onOpenChange }: ListingChatDrawerProps) {
  const [message, setMessage] = useState('');
  const [view, setView] = useState<'list' | 'chat'>('chat');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const {
    conversations,
    getOrCreateConversation,
    addMessage,
    setActiveConversation,
  } = useMarketplaceChatStore();

  // Get or create conversation for this listing
  const conversation = getOrCreateConversation({
    listingId: listing.id,
    listingTitle: listing.title,
    listingImage: listing.images[0] || '/placeholder.svg',
    sellerId: listing.sellerId,
    sellerName: listing.sellerName,
    sellerAvatar: listing.sellerAvatar,
    buyerId: CURRENT_USER.id,
    buyerName: CURRENT_USER.name,
    buyerAvatar: CURRENT_USER.avatar,
  });

  // Get all conversations for sidebar
  const allConversations = conversations.filter(
    (c) => c.buyerId === CURRENT_USER.id || c.sellerId === CURRENT_USER.id
  );

  useEffect(() => {
    if (open) {
      setActiveConversation(conversation.id);
    } else {
      setActiveConversation(null);
    }
  }, [open, conversation.id, setActiveConversation]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation.messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    addMessage(conversation.id, {
      senderId: CURRENT_USER.id,
      senderName: CURRENT_USER.name,
      senderAvatar: CURRENT_USER.avatar,
      content: message.trim(),
    });

    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const switchToConversation = (conv: MarketplaceConversation) => {
    setActiveConversation(conv.id);
    setView('chat');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            {view === 'chat' && allConversations.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setView('list')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            
            {view === 'chat' ? (
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={listing.sellerAvatar} />
                  <AvatarFallback>{listing.sellerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <SheetTitle className="text-base truncate">
                    {listing.sellerName}
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground truncate">
                    {listing.title}
                  </p>
                </div>
              </div>
            ) : (
              <SheetTitle className="text-lg">Le tue conversazioni</SheetTitle>
            )}
          </div>
        </SheetHeader>

        {view === 'list' ? (
          // Conversations List
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border">
              {allConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => switchToConversation(conv)}
                  className="w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors text-left"
                >
                  <img
                    src={conv.listingImage}
                    alt=""
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-sm truncate">
                        {conv.sellerName}
                      </span>
                      {conv.unreadCount > 0 && (
                        <Badge variant="default" className="text-xs">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conv.listingTitle}
                    </p>
                    {conv.messages.length > 0 && (
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {conv.messages[conv.messages.length - 1].content}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        ) : (
          // Chat View
          <>
            {/* Listing Preview */}
            <div className="p-3 bg-muted/50 border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src={listing.images[0] || '/placeholder.svg'}
                  alt=""
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{listing.title}</p>
                  <p className="text-lg font-bold text-primary">
                    €{listing.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              {conversation.messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <MessageSquare className="w-12 h-12 text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Inizia una conversazione con {listing.sellerName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chiedi informazioni sull'articolo
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {conversation.messages.map((msg) => {
                    const isMe = msg.senderId === CURRENT_USER.id;
                    return (
                      <div
                        key={msg.id}
                        className={cn(
                          'flex items-end gap-2',
                          isMe ? 'flex-row-reverse' : 'flex-row'
                        )}
                      >
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={msg.senderAvatar} />
                          <AvatarFallback className="text-xs">
                            {msg.senderName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={cn(
                            'max-w-[75%] rounded-2xl px-4 py-2',
                            isMe
                              ? 'bg-primary text-primary-foreground rounded-br-md'
                              : 'bg-muted rounded-bl-md'
                          )}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p
                            className={cn(
                              'text-[10px] mt-1',
                              isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            )}
                          >
                            {formatDistanceToNow(new Date(msg.timestamp), {
                              addSuffix: true,
                              locale: it,
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
