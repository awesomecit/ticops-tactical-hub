export type ConversationType = 'private' | 'team' | 'match' | 'field' | 'shop';
export type MessageType = 'text' | 'system' | 'achievement';

export interface IMockConversation {
  id: string;
  type: ConversationType;
  name: string;
  avatar?: string;
  participants: string[];
  lastMessage: {
    text: string;
    senderId: string;
    timestamp: Date;
  };
  unreadCount: number;
  isOnline?: boolean;
  isPinned?: boolean;
  // Entity reference for field/shop conversations
  entityId?: string;
  entityType?: 'field' | 'shop' | 'player' | 'referee';
}

export interface IMockMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  isRead: boolean;
  reactions?: { emoji: string; userId: string }[];
}

export const MOCK_CONVERSATIONS: IMockConversation[] = [
  {
    id: 'conv_001',
    type: 'team',
    name: 'Shadow Wolves',
    participants: ['user_003', 'user_004', 'user_m1', 'user_m2', 'user_m3'],
    lastMessage: {
      text: 'Pronti per domani? Briefing alle 13:30',
      senderId: 'user_003',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    unreadCount: 3,
    isPinned: true,
  },
  {
    id: 'conv_002',
    type: 'private',
    name: 'TacticalMike',
    participants: ['user_003', 'user_004'],
    lastMessage: {
      text: 'Ho controllato il campo, tutto ok per sabato',
      senderId: 'user_004',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    unreadCount: 1,
    isOnline: false,
    entityType: 'player',
    entityId: 'user_004',
  },
  {
    id: 'conv_003',
    type: 'match',
    name: 'Torneo Regionale - Round 2',
    participants: ['user_003', 'user_004', 'user_005', 'user_006', 'user_007'],
    lastMessage: {
      text: 'Confermate le squadre per le 14:00',
      senderId: 'user_005',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    unreadCount: 0,
  },
  {
    id: 'conv_004',
    type: 'private',
    name: 'LoneWolf99',
    participants: ['user_003', 'user_002'],
    lastMessage: {
      text: 'Grazie per aver accettato la richiesta!',
      senderId: 'user_002',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    unreadCount: 0,
    isOnline: true,
    entityType: 'player',
    entityId: 'user_002',
  },
  {
    id: 'conv_005',
    type: 'team',
    name: 'Officers Chat',
    participants: ['user_003', 'user_004'],
    lastMessage: {
      text: 'Dobbiamo parlare delle nuove reclute',
      senderId: 'user_003',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    unreadCount: 0,
    isPinned: true,
  },
  {
    id: 'conv_006',
    type: 'match',
    name: 'Training Day - Campo Alpha',
    participants: ['user_003', 'user_001', 'user_002', 'user_004'],
    lastMessage: {
      text: 'Partita conclusa! GG a tutti 🎯',
      senderId: 'user_001',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    unreadCount: 0,
  },
  // Field conversation
  {
    id: 'conv_field_001',
    type: 'field',
    name: 'Campo Alpha Zone',
    participants: ['current_user', 'field_1'],
    lastMessage: {
      text: 'Il campo è disponibile per prenotazioni',
      senderId: 'field_1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    unreadCount: 1,
    entityType: 'field',
    entityId: '1',
  },
  // Shop conversation
  {
    id: 'conv_shop_001',
    type: 'shop',
    name: 'Tactical Gear Milano',
    participants: ['current_user', 'shop_1'],
    lastMessage: {
      text: 'Ciao! Il prodotto che cerchi è disponibile',
      senderId: 'shop_1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    },
    unreadCount: 2,
    entityType: 'shop',
    entityId: 'shop_1',
  },
  // Referee conversation
  {
    id: 'conv_referee_001',
    type: 'private',
    name: 'RefereeMaster',
    participants: ['current_user', 'referee_1'],
    lastMessage: {
      text: 'Confermo la mia disponibilità per sabato',
      senderId: 'referee_1',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
    unreadCount: 0,
    entityType: 'referee',
    entityId: 'referee_1',
    isOnline: true,
  },
];

export const MOCK_MESSAGES: IMockMessage[] = [
  // Team conversation (conv_001)
  {
    id: 'msg_001',
    conversationId: 'conv_001',
    senderId: 'user_004',
    senderName: 'TacticalMike',
    type: 'text',
    content: 'Ragazzi, ho prenotato il campo per sabato',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isRead: true,
  },
  {
    id: 'msg_002',
    conversationId: 'conv_001',
    senderId: 'user_m1',
    senderName: 'ViperOne',
    type: 'text',
    content: 'Perfetto! Io porto le granate fumogene',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isRead: true,
    reactions: [{ emoji: '👍', userId: 'user_003' }],
  },
  {
    id: 'msg_003',
    conversationId: 'conv_001',
    senderId: 'user_003',
    senderName: 'GhostSniper92',
    type: 'text',
    content: 'Pronti per domani? Briefing alle 13:30',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isRead: false,
  },
  {
    id: 'msg_004',
    conversationId: 'conv_001',
    senderId: 'system',
    senderName: 'Sistema',
    type: 'system',
    content: 'TacticalMike ha confermato la partecipazione',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    isRead: false,
  },

  // Private conversation (conv_002)
  {
    id: 'msg_010',
    conversationId: 'conv_002',
    senderId: 'user_003',
    senderName: 'GhostSniper92',
    type: 'text',
    content: 'Ehi Mike, hai controllato il campo?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isRead: true,
  },
  {
    id: 'msg_011',
    conversationId: 'conv_002',
    senderId: 'user_004',
    senderName: 'TacticalMike',
    type: 'text',
    content: 'Sì, ci sono stato ieri',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isRead: true,
  },
  {
    id: 'msg_012',
    conversationId: 'conv_002',
    senderId: 'user_004',
    senderName: 'TacticalMike',
    type: 'text',
    content: 'Ho controllato il campo, tutto ok per sabato',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
  },

  // Match conversation (conv_003)
  {
    id: 'msg_020',
    conversationId: 'conv_003',
    senderId: 'user_005',
    senderName: 'RefereeMaster',
    type: 'text',
    content: 'Benvenuti alla chat del torneo!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    isRead: true,
  },
  {
    id: 'msg_021',
    conversationId: 'conv_003',
    senderId: 'system',
    senderName: 'Sistema',
    type: 'achievement',
    content: '🏆 Shadow Wolves ha vinto il Round 1!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    isRead: true,
  },
  {
    id: 'msg_022',
    conversationId: 'conv_003',
    senderId: 'user_005',
    senderName: 'RefereeMaster',
    type: 'text',
    content: 'Confermate le squadre per le 14:00',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: true,
  },
];

export const getConversationsByType = (type?: ConversationType): IMockConversation[] => {
  if (!type) return MOCK_CONVERSATIONS;
  return MOCK_CONVERSATIONS.filter(c => c.type === type);
};

export const getConversationById = (id: string): IMockConversation | undefined => {
  return MOCK_CONVERSATIONS.find(c => c.id === id);
};

export const getMessagesByConversation = (conversationId: string): IMockMessage[] => {
  return MOCK_MESSAGES.filter(m => m.conversationId === conversationId);
};

export const getTotalUnreadCount = (): number => {
  return MOCK_CONVERSATIONS.reduce((sum, c) => sum + c.unreadCount, 0);
};

// Find or create conversation for an entity
export const findOrCreateEntityConversation = (
  entityType: 'field' | 'shop' | 'player' | 'referee',
  entityId: string,
  entityName: string
): IMockConversation => {
  // Check if conversation already exists
  const existing = MOCK_CONVERSATIONS.find(
    c => c.entityType === entityType && c.entityId === entityId
  );
  
  if (existing) {
    return existing;
  }
  
  // Create new conversation
  const newConversation: IMockConversation = {
    id: `conv_${entityType}_${entityId}`,
    type: entityType === 'field' ? 'field' : entityType === 'shop' ? 'shop' : 'private',
    name: entityName,
    participants: ['current_user', `${entityType}_${entityId}`],
    lastMessage: {
      text: 'Inizia una conversazione...',
      senderId: 'system',
      timestamp: new Date(),
    },
    unreadCount: 0,
    entityId,
    entityType,
  };
  
  // Add to mock conversations
  MOCK_CONVERSATIONS.unshift(newConversation);
  
  return newConversation;
};

// Get conversations by entity type
export const getConversationsByEntityType = (
  entityType: 'field' | 'shop' | 'player' | 'referee'
): IMockConversation[] => {
  return MOCK_CONVERSATIONS.filter(c => c.entityType === entityType);
};
