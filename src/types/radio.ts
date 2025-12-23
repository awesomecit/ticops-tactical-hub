// Radio Types

export type RadioChannelType = 'team' | 'squad' | 'command' | 'all';

export interface RadioChannel {
  id: string;
  name: string;
  type: RadioChannelType;
  frequency: string; // e.g., "145.500"
  isActive: boolean;
  teamId?: string;
  squadId?: string;
  connectedUsers: string[];
}

export interface RadioStatus {
  isConnected: boolean;
  isMuted: boolean;
  isPushToTalk: boolean;
  volume: number; // 0-100
  currentChannelId: string | null;
  isTransmitting: boolean;
  lastTransmission?: {
    userId: string;
    username: string;
    timestamp: Date;
  };
}

export interface RadioUser {
  id: string;
  username: string;
  callsign: string;
  isOnline: boolean;
  isSpeaking: boolean;
  signalStrength: number; // 0-100
}
