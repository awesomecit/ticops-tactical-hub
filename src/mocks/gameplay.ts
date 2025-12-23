export interface GamePlayer {
  id: string;
  name: string;
  avatar: string;
  team: 'alpha' | 'bravo';
  position: { x: number; y: number };
  isAlive: boolean;
  isUser?: boolean;
  lastSeen?: string;
}

export interface GameState {
  id: string;
  mode: 'CTF' | 'TDM' | 'Domination' | 'Conquest';
  round: number;
  totalRounds: number;
  timeRemaining: string;
  score: {
    alpha: number;
    bravo: number;
  };
  objective: {
    type: 'flag' | 'zone' | 'target';
    position: { x: number; y: number };
    label: string;
  };
}

export interface PlayerStats {
  isAlive: boolean;
  kills: number;
  deaths: number;
  distance: number;
}

export const MOCK_GAME_STATE: GameState = {
  id: 'game-1',
  mode: 'CTF',
  round: 2,
  totalRounds: 3,
  timeRemaining: '12:34',
  score: {
    alpha: 2,
    bravo: 1,
  },
  objective: {
    type: 'flag',
    position: { x: 70, y: 30 },
    label: 'Bandiera Bravo',
  },
};

export const MOCK_PLAYER_STATS: PlayerStats = {
  isAlive: true,
  kills: 5,
  deaths: 2,
  distance: 1.2,
};

export const MOCK_GAME_PLAYERS: GamePlayer[] = [
  // Alpha Team (allies)
  {
    id: 'p-1',
    name: 'Tu',
    avatar: '/placeholder.svg',
    team: 'alpha',
    position: { x: 35, y: 55 },
    isAlive: true,
    isUser: true,
  },
  {
    id: 'p-2',
    name: 'GHOST_ALPHA',
    avatar: '/placeholder.svg',
    team: 'alpha',
    position: { x: 28, y: 48 },
    isAlive: true,
  },
  {
    id: 'p-3',
    name: 'SNIPER_PRO',
    avatar: '/placeholder.svg',
    team: 'alpha',
    position: { x: 42, y: 62 },
    isAlive: true,
  },
  {
    id: 'p-4',
    name: 'SHADOW_OPS',
    avatar: '/placeholder.svg',
    team: 'alpha',
    position: { x: 20, y: 40 },
    isAlive: false,
  },
  // Bravo Team (enemies - spotted)
  {
    id: 'p-5',
    name: 'VIPER_X',
    avatar: '/placeholder.svg',
    team: 'bravo',
    position: { x: 65, y: 35 },
    isAlive: true,
    lastSeen: '30s fa',
  },
  {
    id: 'p-6',
    name: 'TOXIC_PLAYER',
    avatar: '/placeholder.svg',
    team: 'bravo',
    position: { x: 72, y: 45 },
    isAlive: true,
    lastSeen: '15s fa',
  },
  {
    id: 'p-7',
    name: 'RED_STORM',
    avatar: '/placeholder.svg',
    team: 'bravo',
    position: { x: 58, y: 28 },
    isAlive: true,
    lastSeen: '1m fa',
  },
];

// Enemies nearby for kill modal
export const MOCK_NEARBY_ENEMIES = [
  { id: 'p-6', name: 'TOXIC_PLAYER', avatar: '/placeholder.svg', distance: 12 },
  { id: 'p-5', name: 'VIPER_X', avatar: '/placeholder.svg', distance: 28 },
  { id: 'p-7', name: 'RED_STORM', avatar: '/placeholder.svg', distance: 45 },
];
