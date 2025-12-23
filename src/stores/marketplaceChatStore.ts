import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MarketplaceMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface MarketplaceConversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar?: string;
  messages: MarketplaceMessage[];
  lastMessageAt: Date;
  unreadCount: number;
}

interface MarketplaceChatState {
  conversations: MarketplaceConversation[];
  activeConversationId: string | null;
  
  getConversation: (listingId: string, sellerId: string) => MarketplaceConversation | undefined;
  getOrCreateConversation: (params: {
    listingId: string;
    listingTitle: string;
    listingImage: string;
    sellerId: string;
    sellerName: string;
    sellerAvatar?: string;
    buyerId: string;
    buyerName: string;
    buyerAvatar?: string;
  }) => MarketplaceConversation;
  
  addMessage: (conversationId: string, message: Omit<MarketplaceMessage, 'id' | 'conversationId' | 'timestamp' | 'read'>) => void;
  markAsRead: (conversationId: string) => void;
  setActiveConversation: (id: string | null) => void;
  getUnreadTotal: () => number;
}

// Mock automated seller responses
const sellerResponses = [
  "Ciao! Grazie per l'interesse. L'articolo è ancora disponibile.",
  "Sì, posso fare un piccolo sconto se ritiri di persona.",
  "La spedizione costa circa 8€ con corriere tracciato.",
  "Posso mandare altre foto se ti servono.",
  "Perfetto, quando potresti venire a ritirarlo?",
  "L'ho usato pochissimo, è praticamente nuovo.",
];

export const useMarketplaceChatStore = create<MarketplaceChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      activeConversationId: null,

      getConversation: (listingId, sellerId) => {
        return get().conversations.find(
          (c) => c.listingId === listingId && c.sellerId === sellerId
        );
      },

      getOrCreateConversation: (params) => {
        const existing = get().getConversation(params.listingId, params.sellerId);
        if (existing) return existing;

        const newConversation: MarketplaceConversation = {
          id: `conv-${Date.now()}`,
          listingId: params.listingId,
          listingTitle: params.listingTitle,
          listingImage: params.listingImage,
          sellerId: params.sellerId,
          sellerName: params.sellerName,
          sellerAvatar: params.sellerAvatar,
          buyerId: params.buyerId,
          buyerName: params.buyerName,
          buyerAvatar: params.buyerAvatar,
          messages: [],
          lastMessageAt: new Date(),
          unreadCount: 0,
        };

        set((state) => ({
          conversations: [...state.conversations, newConversation],
        }));

        return newConversation;
      },

      addMessage: (conversationId, message) => {
        const newMessage: MarketplaceMessage = {
          ...message,
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          conversationId,
          timestamp: new Date(),
          read: false,
        };

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, newMessage],
                  lastMessageAt: new Date(),
                }
              : conv
          ),
        }));

        // Simulate seller auto-reply after 1-3 seconds
        const conv = get().conversations.find((c) => c.id === conversationId);
        if (conv && message.senderId !== conv.sellerId) {
          setTimeout(() => {
            const autoReply: MarketplaceMessage = {
              id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              conversationId,
              senderId: conv.sellerId,
              senderName: conv.sellerName,
              senderAvatar: conv.sellerAvatar,
              content: sellerResponses[Math.floor(Math.random() * sellerResponses.length)],
              timestamp: new Date(),
              read: false,
            };

            set((state) => ({
              conversations: state.conversations.map((c) =>
                c.id === conversationId
                  ? {
                      ...c,
                      messages: [...c.messages, autoReply],
                      lastMessageAt: new Date(),
                      unreadCount: state.activeConversationId === conversationId ? 0 : c.unreadCount + 1,
                    }
                  : c
              ),
            }));
          }, 1000 + Math.random() * 2000);
        }
      },

      markAsRead: (conversationId) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  unreadCount: 0,
                  messages: conv.messages.map((m) => ({ ...m, read: true })),
                }
              : conv
          ),
        }));
      },

      setActiveConversation: (id) => {
        set({ activeConversationId: id });
        if (id) {
          get().markAsRead(id);
        }
      },

      getUnreadTotal: () => {
        return get().conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);
      },
    }),
    {
      name: 'marketplace-chat',
      partialize: (state) => ({
        conversations: state.conversations.map((conv) => ({
          ...conv,
          messages: conv.messages.slice(-50), // Keep last 50 messages per conversation
        })),
      }),
    }
  )
);
