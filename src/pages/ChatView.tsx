import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Send, Smile } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { GlowButton } from '@/components/ui/GlowButton';
import { MessageBubble, QuickReplyBar, TypingIndicator } from '@/components/chat';
import {
  getConversationById,
  getMessagesByConversation,
  IMockMessage,
  ConversationType,
} from '@/mocks/chat';
import { getCurrentUser } from '@/mocks';
import { cn } from '@/lib/utils';

const typeBadges: Record<ConversationType, { emoji: string; label: string }> = {
  private: { emoji: '🔵', label: 'Privato' },
  team: { emoji: '🟢', label: 'Team' },
  match: { emoji: '🟠', label: 'Partita' },
};

const ChatView: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();

  const [messages, setMessages] = useState<IMockMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);

  const conversation = conversationId ? getConversationById(conversationId) : null;

  // Load messages
  useEffect(() => {
    if (conversationId) {
      const conversationMessages = getMessagesByConversation(conversationId);
      setMessages(conversationMessages);
    }
  }, [conversationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (conversation?.type !== 'private') return;

    const interval = setInterval(() => {
      const shouldType = Math.random() > 0.7;
      if (shouldType) {
        setTypingUser(conversation.name);
        setTimeout(() => {
          setTypingUser(null);
        }, 2000 + Math.random() * 2000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [conversation]);

  const handleSend = () => {
    if (!inputText.trim() || !conversationId) return;

    const newMessage: IMockMessage = {
      id: `msg_new_${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.username,
      type: 'text',
      content: inputText.trim(),
      timestamp: new Date(),
      isRead: false,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate reply after delay
    if (conversation?.type === 'private') {
      setTimeout(() => {
        setTypingUser(conversation.name);
        
        setTimeout(() => {
          setTypingUser(null);
          
          const replyMessage: IMockMessage = {
            id: `msg_reply_${Date.now()}`,
            conversationId,
            senderId: 'other',
            senderName: conversation.name,
            type: 'text',
            content: getRandomReply(),
            timestamp: new Date(),
            isRead: true,
          };
          
          setMessages(prev => [...prev, replyMessage]);
        }, 1500 + Math.random() * 1500);
      }, 1000);
    }
  };

  const handleQuickReply = (text: string) => {
    setInputText(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Conversazione non trovata</p>
      </div>
    );
  }

  const badge = typeBadges[conversation.type];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)] -m-4 lg:-m-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-card border-b border-border">
        <button
          onClick={() => navigate('/chat')}
          className="p-2 hover:bg-muted rounded-sm transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Avatar */}
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-display font-bold text-primary border-2 border-border">
            {conversation.name.charAt(0).toUpperCase()}
          </div>
          {conversation.type === 'private' && conversation.isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-secondary rounded-full border-2 border-card" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-display uppercase text-sm text-foreground truncate">
              {conversation.name}
            </h2>
            <span className="text-sm">{badge.emoji}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {conversation.type === 'private'
              ? (conversation.isOnline ? 'Online' : 'Offline')
              : `${conversation.participants.length} partecipanti`}
          </p>
        </div>

        <button className="p-2 hover:bg-muted rounded-sm transition-colors">
          <MoreVertical className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isOwn = message.senderId === currentUser.id;
          const showSender = !isOwn && (
            index === 0 ||
            messages[index - 1].senderId !== message.senderId ||
            messages[index - 1].type === 'system' ||
            messages[index - 1].type === 'achievement'
          );

          return (
            <MessageBubble
              key={message.id}
              id={message.id}
              type={message.type}
              content={message.content}
              senderName={message.senderName}
              senderAvatar={message.senderAvatar}
              timestamp={message.timestamp}
              isOwn={isOwn}
              isRead={message.isRead}
              reactions={message.reactions}
              showSender={showSender}
            />
          );
        })}

        {/* Typing Indicator */}
        {typingUser && (
          <TypingIndicator userName={typingUser} />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-4">
        <QuickReplyBar onReply={handleQuickReply} />
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 p-4 bg-card border-t border-border">
        <button className="p-2 hover:bg-muted rounded-sm transition-colors">
          <Smile className="h-5 w-5 text-muted-foreground" />
        </button>

        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Scrivi un messaggio..."
          className="flex-1"
        />

        <GlowButton
          variant="primary"
          size="sm"
          onClick={handleSend}
          disabled={!inputText.trim()}
        >
          <Send className="h-4 w-4" />
        </GlowButton>
      </div>
    </div>
  );
};

// Helper function for random replies
const getRandomReply = (): string => {
  const replies = [
    'Ok, perfetto! 👍',
    'Ci vediamo lì!',
    'Roger that!',
    'Ottimo, confermo',
    'GG! 🎯',
    'A dopo!',
  ];
  return replies[Math.floor(Math.random() * replies.length)];
};

export default ChatView;
