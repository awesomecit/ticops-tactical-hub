import React, { useState } from 'react';
import { format } from 'date-fns';
import { Send, Hash, Users, Lock, Plus } from 'lucide-react';
import { mockMessages, mockUser } from '@/mocks/data';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { cn } from '@/lib/utils';

const channels = [
  { id: 'global', name: 'Generale', type: 'global', icon: Hash },
  { id: 'team', name: 'Team Delta', type: 'team', icon: Users },
  { id: 'officers', name: 'Ufficiali', type: 'private', icon: Lock },
];

const Chat: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('global');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    // Would send message here
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col lg:flex-row gap-4 animate-slide-in-up">
      {/* Channels Sidebar */}
      <div className="lg:w-64 flex-shrink-0">
        <TacticalCard className="h-full">
          <TacticalCardContent className="p-3 space-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display uppercase text-sm text-muted-foreground">Canali</span>
              <button className="p-1 hover:text-primary transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-all",
                  activeChannel === channel.id
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <channel.icon className="h-4 w-4" />
                <span className="font-display text-sm uppercase">{channel.name}</span>
              </button>
            ))}
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Chat Area */}
      <TacticalCard className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="px-4 py-3 border-b border-border flex items-center gap-3">
          <Hash className="h-5 w-5 text-primary" />
          <span className="font-display uppercase text-foreground">
            {channels.find(c => c.id === activeChannel)?.name}
          </span>
          <span className="text-xs text-muted-foreground">• 24 online</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg, index) => {
            const isOwn = msg.senderId === mockUser.id;
            
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 animate-slide-in-up",
                  isOwn && "flex-row-reverse"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="h-10 w-10 flex-shrink-0 bg-card clip-tactical-sm border border-border flex items-center justify-center">
                  <span className="font-display font-bold text-primary">
                    {msg.sender.callsign.charAt(0)}
                  </span>
                </div>

                <div className={cn("max-w-[70%]", isOwn && "text-right")}>
                  <div className={cn(
                    "flex items-baseline gap-2",
                    isOwn && "flex-row-reverse"
                  )}>
                    <span className="font-display text-sm uppercase text-foreground">
                      {msg.sender.callsign}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {format(msg.createdAt, 'HH:mm')}
                    </span>
                  </div>
                  
                  <div className={cn(
                    "mt-1 px-4 py-2 rounded-sm",
                    isOwn
                      ? "bg-primary/20 text-foreground clip-tactical-sm"
                      : "bg-muted text-foreground"
                  )}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Scrivi un messaggio..."
              className="flex-1 bg-input border border-border px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors clip-tactical-sm"
            />
            <GlowButton
              variant="primary"
              size="icon"
              onClick={handleSend}
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </GlowButton>
          </div>
        </div>
      </TacticalCard>
    </div>
  );
};

export default Chat;
