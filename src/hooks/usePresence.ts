import { useEffect, useState, useCallback } from 'react';
import { mockRealtimeClient, PresenceState } from '@/lib/mockRealtimeClient';
import { useAuthStore } from '@/stores/authStore';

export interface OnlineUser {
  id: string;
  username: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy';
  online_at: string;
  currentPage?: string;
}

/**
 * Hook for tracking user presence using mock realtime client
 * Shows who's online and their current status
 */
export const usePresence = (roomId: string = 'global', enabled: boolean = true) => {
  const { user } = useAuthStore();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (!enabled || !user) return;

    const channel = mockRealtimeClient.channel(`presence:${roomId}`);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.getPresenceState();
        const users = Object.values(state).flat() as OnlineUser[];
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('[Presence] User joined:', key, newPresences);
        setOnlineUsers(prev => {
          const filtered = prev.filter(u => u.id !== key);
          return [...filtered, ...(newPresences as OnlineUser[])];
        });
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        console.log('[Presence] User left:', key);
        setOnlineUsers(prev => prev.filter(u => u.id !== key));
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track own presence
          await channel.track({
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            status: 'online',
            currentPage: window.location.pathname,
          });
          setIsTracking(true);
        }
      });

    // Simulate some online users for demo
    setTimeout(() => {
      channel._simulateJoin('user_online_1', {
        id: 'user_online_1',
        username: 'TacticalGhost',
        status: 'online',
        online_at: new Date().toISOString(),
      });
    }, 1000);

    setTimeout(() => {
      channel._simulateJoin('user_online_2', {
        id: 'user_online_2',
        username: 'SniperElite',
        status: 'away',
        online_at: new Date().toISOString(),
      });
    }, 2000);

    setTimeout(() => {
      channel._simulateJoin('user_online_3', {
        id: 'user_online_3',
        username: 'StealthMaster',
        status: 'online',
        online_at: new Date().toISOString(),
      });
    }, 3000);

    return () => {
      mockRealtimeClient.removeChannel(channel);
      setIsTracking(false);
    };
  }, [enabled, user, roomId]);

  // Update own status
  const updateStatus = useCallback(async (status: 'online' | 'away' | 'busy') => {
    if (!user) return;
    
    const channel = mockRealtimeClient.channel(`presence:${roomId}`);
    await channel.track({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      status,
      currentPage: window.location.pathname,
    });
  }, [user, roomId]);

  // Update current page
  const updateCurrentPage = useCallback(async (page: string) => {
    if (!user) return;
    
    const channel = mockRealtimeClient.channel(`presence:${roomId}`);
    await channel.track({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      status: 'online',
      currentPage: page,
    });
  }, [user, roomId]);

  return {
    onlineUsers,
    isTracking,
    onlineCount: onlineUsers.length,
    updateStatus,
    updateCurrentPage,
  };
};
