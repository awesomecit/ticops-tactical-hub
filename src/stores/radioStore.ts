import { create } from 'zustand';
import { RadioChannel, RadioStatus, RadioUser } from '@/types/radio';

interface RadioState {
  status: RadioStatus;
  channels: RadioChannel[];
  activeUsers: RadioUser[];
  
  // Actions
  connect: (channelId: string) => void;
  disconnect: () => void;
  setChannel: (channelId: string) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  togglePushToTalk: () => void;
  startTransmission: () => void;
  stopTransmission: () => void;
  activateRadio: (teamId: string) => void;
  deactivateRadio: () => void;
}

const initialStatus: RadioStatus = {
  isConnected: false,
  isMuted: false,
  isPushToTalk: true,
  volume: 75,
  currentChannelId: null,
  isTransmitting: false,
};

export const useRadioStore = create<RadioState>((set, get) => ({
  status: initialStatus,
  channels: [],
  activeUsers: [],

  connect: (channelId: string) => {
    set((state) => ({
      status: {
        ...state.status,
        isConnected: true,
        currentChannelId: channelId,
      },
    }));
  },

  disconnect: () => {
    set((state) => ({
      status: {
        ...state.status,
        isConnected: false,
        currentChannelId: null,
        isTransmitting: false,
      },
    }));
  },

  setChannel: (channelId: string) => {
    set((state) => ({
      status: {
        ...state.status,
        currentChannelId: channelId,
      },
    }));
  },

  setVolume: (volume: number) => {
    set((state) => ({
      status: {
        ...state.status,
        volume: Math.max(0, Math.min(100, volume)),
      },
    }));
  },

  toggleMute: () => {
    set((state) => ({
      status: {
        ...state.status,
        isMuted: !state.status.isMuted,
      },
    }));
  },

  togglePushToTalk: () => {
    set((state) => ({
      status: {
        ...state.status,
        isPushToTalk: !state.status.isPushToTalk,
      },
    }));
  },

  startTransmission: () => {
    const { status } = get();
    if (!status.isConnected || status.isMuted) return;
    
    set((state) => ({
      status: {
        ...state.status,
        isTransmitting: true,
      },
    }));
  },

  stopTransmission: () => {
    set((state) => ({
      status: {
        ...state.status,
        isTransmitting: false,
      },
    }));
  },

  activateRadio: (teamId: string) => {
    // Mock activation - creates default channels for team
    const mockChannels: RadioChannel[] = [
      {
        id: `${teamId}_main`,
        name: 'Canale Principale',
        type: 'team',
        frequency: '145.500',
        isActive: true,
        teamId,
        connectedUsers: [],
      },
      {
        id: `${teamId}_alpha`,
        name: 'Squadra Alpha',
        type: 'squad',
        frequency: '145.525',
        isActive: true,
        teamId,
        squadId: 'alpha',
        connectedUsers: [],
      },
      {
        id: `${teamId}_bravo`,
        name: 'Squadra Bravo',
        type: 'squad',
        frequency: '145.550',
        isActive: true,
        teamId,
        squadId: 'bravo',
        connectedUsers: [],
      },
      {
        id: `${teamId}_command`,
        name: 'Comando',
        type: 'command',
        frequency: '145.600',
        isActive: true,
        teamId,
        connectedUsers: [],
      },
    ];

    set({ channels: mockChannels });
  },

  deactivateRadio: () => {
    set({
      channels: [],
      status: initialStatus,
      activeUsers: [],
    });
  },
}));
