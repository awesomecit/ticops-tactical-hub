import { useEffect, useCallback } from 'react';
import { mockRealtimeClient } from '@/lib/mockRealtimeClient';
import { useNotificationStore } from '@/stores/notificationStore';
import { toast } from 'sonner';

/**
 * Hook for real-time notifications using mock realtime client
 * Simulates WebSocket-based push notifications
 */
export const useRealtimeNotifications = (enabled: boolean = true) => {
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!enabled) return;

    const channel = mockRealtimeClient.channel('notifications');

    channel
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          const notification = payload.new;
          
          // Add to store (id, timestamp, read are auto-generated)
          addNotification({
            type: notification.type || 'system',
            title: notification.title,
            message: notification.message,
          });

          // Show toast
          toast(notification.title, {
            description: notification.message,
            duration: 4000,
          });
        }
      )
      .subscribe((status) => {
        console.log('[Realtime] Notifications channel:', status);
      });

    return () => {
      mockRealtimeClient.removeChannel(channel);
    };
  }, [enabled, addNotification]);

  // Manual trigger for demo
  const triggerDemoNotification = useCallback(() => {
    const channel = mockRealtimeClient.channel('notifications');
    const demoNotifications = [
      { type: 'match_invite', title: '🎮 Invito Partita', message: 'Sei stato invitato a "Operazione Falco"' },
      { type: 'team_update', title: '👥 Nuovo Membro', message: 'DragonSlayer si è unito alla tua squadra' },
      { type: 'achievement', title: '🏆 Achievement Sbloccato', message: 'Hai ottenuto "Prima Vittoria"!' },
      { type: 'match_found', title: '🔍 Match Trovato', message: 'Abbiamo trovato una partita compatibile!' },
    ];
    const randomNotif = demoNotifications[Math.floor(Math.random() * demoNotifications.length)];
    
    channel._simulateChange('INSERT', 'notifications', {
      new: { id: Date.now(), ...randomNotif, created_at: new Date().toISOString() }
    });
  }, []);

  return { triggerDemoNotification };
};
