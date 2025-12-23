import { create } from 'zustand';
import { 
  MOCK_CONVERSATIONS, 
  MOCK_MESSAGES, 
  IMockConversation, 
  IMockMessage,
  ConversationType 
} from '@/mocks/chat';

interface ChatState {
  conversations: IMockConversation[];
  messages: IMockMessage[];
  archivedConversationIds: Set<string>;
  
  // Conversation actions
  archiveConversation: (id: string) => void;
  unarchiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  pinConversation: (id: string) => void;
  unpinConversation: (id: string) => void;
  markAsRead: (id: string) => void;
  
  // Message actions
  addMessage: (message: IMockMessage) => void;
  editMessage: (messageId: string, newContent: string) => void;
  deleteMessage: (messageId: string) => void;
  
  // Create new conversation
  createConversation: (
    type: ConversationType,
    name: string,
    entityType?: 'field' | 'shop' | 'player' | 'referee',
    entityId?: string
  ) => IMockConversation;
  
  // Getters
  getConversationById: (id: string) => IMockConversation | undefined;
  getMessagesByConversation: (conversationId: string) => IMockMessage[];
  getActiveConversations: () => IMockConversation[];
  getArchivedConversations: () => IMockConversation[];
  getTotalUnreadCount: () => number;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [...MOCK_CONVERSATIONS],
  messages: [...MOCK_MESSAGES],
  archivedConversationIds: new Set<string>(),
  
  archiveConversation: (id: string) => {
    set((state) => ({
      archivedConversationIds: new Set([...state.archivedConversationIds, id])
    }));
  },
  
  unarchiveConversation: (id: string) => {
    set((state) => {
      const newSet = new Set(state.archivedConversationIds);
      newSet.delete(id);
      return { archivedConversationIds: newSet };
    });
  },
  
  deleteConversation: (id: string) => {
    set((state) => ({
      conversations: state.conversations.filter(c => c.id !== id),
      messages: state.messages.filter(m => m.conversationId !== id)
    }));
  },
  
  pinConversation: (id: string) => {
    set((state) => ({
      conversations: state.conversations.map(c => 
        c.id === id ? { ...c, isPinned: true } : c
      )
    }));
  },
  
  unpinConversation: (id: string) => {
    set((state) => ({
      conversations: state.conversations.map(c => 
        c.id === id ? { ...c, isPinned: false } : c
      )
    }));
  },
  
  markAsRead: (id: string) => {
    set((state) => ({
      conversations: state.conversations.map(c => 
        c.id === id ? { ...c, unreadCount: 0 } : c
      ),
      messages: state.messages.map(m => 
        m.conversationId === id ? { ...m, isRead: true } : m
      )
    }));
  },
  
  addMessage: (message: IMockMessage) => {
    set((state) => ({
      messages: [...state.messages, message],
      conversations: state.conversations.map(c => 
        c.id === message.conversationId 
          ? { 
              ...c, 
              lastMessage: { 
                text: message.content, 
                senderId: message.senderId, 
                timestamp: message.timestamp 
              } 
            } 
          : c
      )
    }));
  },
  
  editMessage: (messageId: string, newContent: string) => {
    set((state) => ({
      messages: state.messages.map(m => 
        m.id === messageId 
          ? { ...m, content: newContent, isEdited: true } as IMockMessage
          : m
      )
    }));
  },
  
  deleteMessage: (messageId: string) => {
    set((state) => ({
      messages: state.messages.filter(m => m.id !== messageId)
    }));
  },
  
  createConversation: (type, name, entityType, entityId) => {
    const newConversation: IMockConversation = {
      id: `conv_${Date.now()}`,
      type,
      name,
      participants: ['current_user'],
      lastMessage: {
        text: 'Inizia una conversazione...',
        senderId: 'system',
        timestamp: new Date(),
      },
      unreadCount: 0,
      entityType,
      entityId,
    };
    
    set((state) => ({
      conversations: [newConversation, ...state.conversations]
    }));
    
    return newConversation;
  },
  
  getConversationById: (id: string) => {
    return get().conversations.find(c => c.id === id);
  },
  
  getMessagesByConversation: (conversationId: string) => {
    return get().messages.filter(m => m.conversationId === conversationId);
  },
  
  getActiveConversations: () => {
    const { conversations, archivedConversationIds } = get();
    return conversations.filter(c => !archivedConversationIds.has(c.id));
  },
  
  getArchivedConversations: () => {
    const { conversations, archivedConversationIds } = get();
    return conversations.filter(c => archivedConversationIds.has(c.id));
  },
  
  getTotalUnreadCount: () => {
    const { conversations, archivedConversationIds } = get();
    return conversations
      .filter(c => !archivedConversationIds.has(c.id))
      .reduce((sum, c) => sum + c.unreadCount, 0);
  },
}));
