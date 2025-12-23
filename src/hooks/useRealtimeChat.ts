import { useEffect, useCallback, useRef } from 'react';
import { mockRealtimeClient } from '@/lib/mockRealtimeClient';
import { useChatStore } from '@/stores/chatStore';
import { toast } from 'sonner';

/**
 * Hook for real-time chat messages using mock realtime client
 * Simulates WebSocket-based live chat
 */
export const useRealtimeChat = (conversationId: string | null, enabled: boolean = true) => {
  const { addMessage } = useChatStore();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled || !conversationId) return;

    const channel = mockRealtimeClient.channel(`chat:${conversationId}`);

    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const message = payload.new;
          
          // Add message to store
          addMessage({
            id: message.id,
            conversationId,
            senderId: message.sender_id,
            senderName: message.sender_name || 'Unknown',
            type: 'text',
            content: message.content,
            timestamp: new Date(message.created_at),
            isRead: false,
          });
        }
      )
      .on(
        'broadcast',
        { event: 'typing' },
        (payload) => {
          console.log('[Realtime] User typing:', payload);
          // Handle typing indicator
        }
      )
      .subscribe((status) => {
        console.log(`[Realtime] Chat channel ${conversationId}:`, status);
      });

    return () => {
      mockRealtimeClient.removeChannel(channel);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [enabled, conversationId, addMessage]);

  // Broadcast typing indicator
  const sendTypingIndicator = useCallback(() => {
    if (!conversationId) return;
    
    const channel = mockRealtimeClient.channel(`chat:${conversationId}`);
    channel._simulateBroadcast('typing', { userId: 'current_user', isTyping: true });

    // Clear typing after 2 seconds
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      channel._simulateBroadcast('typing', { userId: 'current_user', isTyping: false });
    }, 2000);
  }, [conversationId]);

  // Simulate receiving a message (for demo)
  const simulateIncomingMessage = useCallback((senderName: string, content: string) => {
    if (!conversationId) return;
    
    const channel = mockRealtimeClient.channel(`chat:${conversationId}`);
    channel._simulateChange('INSERT', 'messages', {
      new: {
        id: `msg_${Date.now()}`,
        sender_id: 'other_user',
        sender_name: senderName,
        content,
        created_at: new Date().toISOString(),
      }
    });

    toast(`💬 ${senderName}`, {
      description: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
    });
  }, [conversationId]);

  return { sendTypingIndicator, simulateIncomingMessage };
};
