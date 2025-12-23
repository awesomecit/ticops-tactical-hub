import { useEffect, useCallback, useState } from 'react';
import { mockRealtimeClient } from '@/lib/mockRealtimeClient';
import { useRadioStore } from '@/stores/radioStore';
import { toast } from 'sonner';

interface RadioTransmission {
  id: string;
  senderId: string;
  senderName: string;
  channelId: string;
  type: 'voice' | 'text' | 'alert';
  content?: string;
  timestamp: Date;
}

/**
 * Hook for real-time radio communication using mock realtime client
 * Simulates PTT (Push-To-Talk) radio with WebSocket
 */
export const useRealtimeRadio = (channelId: string | null, enabled: boolean = true) => {
  const { status } = useRadioStore();
  const [transmissions, setTransmissions] = useState<RadioTransmission[]>([]);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !channelId || !status.isConnected) return;

    const channel = mockRealtimeClient.channel(`radio:${channelId}`);

    channel
      .on(
        'broadcast',
        { event: 'transmission' },
        (payload) => {
          const transmission = payload.payload as RadioTransmission;
          
          setTransmissions(prev => [...prev.slice(-50), transmission]); // Keep last 50
          
          if (transmission.type === 'voice') {
            setActiveSpeaker(transmission.senderName);
            // Auto-clear speaker after 2 seconds
            setTimeout(() => setActiveSpeaker(null), 2000);
          }

          if (transmission.type === 'alert') {
            toast(`📻 ${transmission.senderName}`, {
              description: transmission.content,
            });
          }
        }
      )
      .on(
        'broadcast',
        { event: 'ptt_start' },
        (payload) => {
          setActiveSpeaker(payload.payload.senderName);
        }
      )
      .on(
        'broadcast',
        { event: 'ptt_end' },
        () => {
          setActiveSpeaker(null);
        }
      )
      .subscribe((status) => {
        console.log(`[Realtime] Radio channel ${channelId}:`, status);
      });

    return () => {
      mockRealtimeClient.removeChannel(channel);
    };
  }, [enabled, channelId, status.isConnected]);

  // Start PTT transmission
  const startTransmission = useCallback(() => {
    if (!channelId) return;
    
    const channel = mockRealtimeClient.channel(`radio:${channelId}`);
    channel._simulateBroadcast('ptt_start', {
      senderId: 'current_user',
      senderName: 'Tu',
      timestamp: new Date().toISOString(),
    });
  }, [channelId]);

  // End PTT transmission
  const endTransmission = useCallback(() => {
    if (!channelId) return;
    
    const channel = mockRealtimeClient.channel(`radio:${channelId}`);
    channel._simulateBroadcast('ptt_end', {
      senderId: 'current_user',
      timestamp: new Date().toISOString(),
    });
  }, [channelId]);

  // Send text message over radio
  const sendRadioMessage = useCallback((content: string) => {
    if (!channelId) return;
    
    const transmission: RadioTransmission = {
      id: `tx_${Date.now()}`,
      senderId: 'current_user',
      senderName: 'Tu',
      channelId,
      type: 'text',
      content,
      timestamp: new Date(),
    };

    const channel = mockRealtimeClient.channel(`radio:${channelId}`);
    channel._simulateBroadcast('transmission', transmission);
  }, [channelId]);

  // Simulate incoming transmission (for demo)
  const simulateIncomingTransmission = useCallback((senderName: string, content?: string) => {
    if (!channelId) return;
    
    const transmission: RadioTransmission = {
      id: `tx_${Date.now()}`,
      senderId: `user_${Date.now()}`,
      senderName,
      channelId,
      type: content ? 'text' : 'voice',
      content,
      timestamp: new Date(),
    };

    const channel = mockRealtimeClient.channel(`radio:${channelId}`);
    channel._simulateBroadcast('transmission', transmission);
  }, [channelId]);

  return {
    transmissions,
    activeSpeaker,
    startTransmission,
    endTransmission,
    sendRadioMessage,
    simulateIncomingTransmission,
  };
};
