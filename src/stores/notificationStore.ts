import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'match' | 'team' | 'kill' | 'rank' | 'system' | 'message';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'match',
    title: 'Partita in arrivo',
    message: 'La tua partita CTF inizia tra 2 ore - Campo Bravo',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    link: '/games'
  },
  {
    id: '2',
    type: 'team',
    title: 'Nuovo messaggio team',
    message: 'VIPER-6 ha inviato un messaggio nel canale team',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: false,
    link: '/chat'
  },
  {
    id: '3',
    type: 'kill',
    title: 'Kill confermata',
    message: 'La tua kill su REAPER-3 è stata confermata dall\'arbitro',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true
  },
  {
    id: '4',
    type: 'rank',
    title: 'ELO aggiornato',
    message: 'Hai guadagnato +25 ELO! Nuovo rating: 1425',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true
  },
  {
    id: '5',
    type: 'system',
    title: 'Benvenuto su TicOps',
    message: 'Completa il tuo profilo per sbloccare tutte le funzionalità',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    link: '/settings'
  }
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: initialNotifications,
  unreadCount: initialNotifications.filter(n => !n.read).length,
  
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }));
  },
  
  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - (state.notifications.find(n => n.id === id && !n.read) ? 1 : 0))
    }));
  },
  
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    }));
  },
  
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id),
      unreadCount: state.notifications.find(n => n.id === id && !n.read) 
        ? state.unreadCount - 1 
        : state.unreadCount
    }));
  },
  
  clearAll: () => {
    set({ notifications: [], unreadCount: 0 });
  }
}));
