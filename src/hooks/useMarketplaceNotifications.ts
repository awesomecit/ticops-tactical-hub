import { useEffect, useRef } from 'react';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { mockListings } from '@/mocks/marketplace';

// Mock events that can happen to listings
type MockEventType = 'price_drop' | 'sold' | 'reserved' | 'updated';

interface MockEvent {
  type: MockEventType;
  listingId: string;
  data?: Record<string, unknown>;
}

const eventMessages: Record<MockEventType, (title: string) => { title: string; message: string }> = {
  price_drop: (title) => ({
    title: '💰 Prezzo ribassato!',
    message: `"${title}" ha un nuovo prezzo! Controlla l'offerta.`,
  }),
  sold: (title) => ({
    title: '❌ Annuncio venduto',
    message: `"${title}" è stato venduto. Rimuovilo dai preferiti.`,
  }),
  reserved: (title) => ({
    title: '🔒 Annuncio riservato',
    message: `"${title}" è stato riservato da un altro acquirente.`,
  }),
  updated: (title) => ({
    title: '📝 Annuncio aggiornato',
    message: `"${title}" è stato modificato. Controlla le novità.`,
  }),
};

// Simulate random events for demo purposes
const generateMockEvent = (favoriteIds: string[]): MockEvent | null => {
  if (favoriteIds.length === 0) return null;

  const randomListingId = favoriteIds[Math.floor(Math.random() * favoriteIds.length)];
  const eventTypes: MockEventType[] = ['price_drop', 'sold', 'reserved', 'updated'];
  const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  return {
    type: randomType,
    listingId: randomListingId,
  };
};

export function useMarketplaceNotifications(enabled: boolean = true) {
  const { favorites } = useFavoritesStore();
  const { addNotification } = useNotificationStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastNotificationRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled || favorites.length === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Simulate periodic events (every 30-60 seconds for demo)
    const scheduleNextEvent = () => {
      const delay = 30000 + Math.random() * 30000; // 30-60 seconds
      
      intervalRef.current = setTimeout(() => {
        const now = Date.now();
        
        // Prevent spamming (min 20 seconds between notifications)
        if (now - lastNotificationRef.current < 20000) {
          scheduleNextEvent();
          return;
        }

        const event = generateMockEvent(favorites);
        
        if (event) {
          const listing = mockListings.find((l) => l.id === event.listingId);
          
          if (listing) {
            const { title, message } = eventMessages[event.type](listing.title);
            
            addNotification({
              type: 'system',
              title,
              message,
              link: '/marketplace',
            });

            lastNotificationRef.current = now;
          }
        }

        scheduleNextEvent();
      }, delay);
    };

    scheduleNextEvent();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, favorites, addNotification]);

  // Manual trigger for demo
  const triggerMockNotification = (type?: MockEventType) => {
    if (favorites.length === 0) return;

    const randomListingId = favorites[Math.floor(Math.random() * favorites.length)];
    const listing = mockListings.find((l) => l.id === randomListingId);
    
    if (!listing) return;

    const eventType = type || (['price_drop', 'sold', 'reserved', 'updated'] as MockEventType[])[
      Math.floor(Math.random() * 4)
    ];
    
    const { title, message } = eventMessages[eventType](listing.title);
    
    addNotification({
      type: 'system',
      title,
      message,
      link: '/marketplace',
    });
  };

  return { triggerMockNotification };
}
