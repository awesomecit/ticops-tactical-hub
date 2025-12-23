import { RadioChannel, RadioUser } from '@/types/radio';

// Mock radio channels for teams
export const MOCK_RADIO_CHANNELS: RadioChannel[] = [
  {
    id: 'team_001_main',
    name: 'Shadow Hunters - Principale',
    type: 'team',
    frequency: '145.500',
    isActive: true,
    teamId: 'team_001',
    connectedUsers: ['user_001', 'user_003', 'user_004'],
  },
  {
    id: 'team_001_alpha',
    name: 'Squadra Alpha',
    type: 'squad',
    frequency: '145.525',
    isActive: true,
    teamId: 'team_001',
    squadId: 'alpha',
    connectedUsers: ['user_001', 'user_003'],
  },
  {
    id: 'team_001_bravo',
    name: 'Squadra Bravo',
    type: 'squad',
    frequency: '145.550',
    isActive: true,
    teamId: 'team_001',
    squadId: 'bravo',
    connectedUsers: ['user_004'],
  },
  {
    id: 'team_001_command',
    name: 'Comando',
    type: 'command',
    frequency: '145.600',
    isActive: true,
    teamId: 'team_001',
    connectedUsers: ['user_001'],
  },
];

// Mock connected users
export const MOCK_RADIO_USERS: RadioUser[] = [
  {
    id: 'user_001',
    username: 'ShadowLeader',
    callsign: 'SHADOW-1',
    isOnline: true,
    isSpeaking: false,
    signalStrength: 95,
  },
  {
    id: 'user_003',
    username: 'TacticalGhost',
    callsign: 'GHOST',
    isOnline: true,
    isSpeaking: false,
    signalStrength: 88,
  },
  {
    id: 'user_004',
    username: 'TacticalMike',
    callsign: 'MIKE',
    isOnline: true,
    isSpeaking: true,
    signalStrength: 72,
  },
  {
    id: 'user_m1',
    username: 'Viper',
    callsign: 'VIPER',
    isOnline: false,
    isSpeaking: false,
    signalStrength: 0,
  },
];

// Helper functions
export const getChannelsByTeam = (teamId: string): RadioChannel[] => {
  return MOCK_RADIO_CHANNELS.filter(c => c.teamId === teamId);
};

export const getConnectedUsers = (channelId: string): RadioUser[] => {
  const channel = MOCK_RADIO_CHANNELS.find(c => c.id === channelId);
  if (!channel) return [];
  
  return MOCK_RADIO_USERS.filter(u => channel.connectedUsers.includes(u.id));
};

export const isTeamRadioActive = (teamId: string): boolean => {
  return MOCK_RADIO_CHANNELS.some(c => c.teamId === teamId && c.isActive);
};
