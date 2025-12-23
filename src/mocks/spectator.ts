import type { GamePlayer, GameState } from './gameplay';

export interface KillEvent {
  id: string;
  type: 'kill' | 'conflict' | 'objective' | 'round' | 'system';
  killerId?: string;
  killerName?: string;
  victimId?: string;
  victimName?: string;
  timestamp: string;
  confirmed: boolean;
  message?: string;
}

export interface ConflictData {
  id: string;
  victimId: string;
  victimName: string;
  claimants: {
    playerId: string;
    playerName: string;
    distance: number;
    confidence: number;
  }[];
  timestamp: string;
}

export const MOCK_SPECTATOR_PLAYERS: GamePlayer[] = [
  // Alpha Team
  { id: 'p-1', name: 'GHOST_ALPHA', avatar: '/placeholder.svg', team: 'alpha', position: { x: 35, y: 55 }, isAlive: true },
  { id: 'p-2', name: 'SNIPER_PRO', avatar: '/placeholder.svg', team: 'alpha', position: { x: 28, y: 48 }, isAlive: true },
  { id: 'p-3', name: 'SHADOW_OPS', avatar: '/placeholder.svg', team: 'alpha', position: { x: 42, y: 62 }, isAlive: true },
  { id: 'p-4', name: 'TACTICAL_X', avatar: '/placeholder.svg', team: 'alpha', position: { x: 20, y: 40 }, isAlive: false },
  { id: 'p-5', name: 'IRON_WOLF', avatar: '/placeholder.svg', team: 'alpha', position: { x: 38, y: 35 }, isAlive: true },
  // Bravo Team
  { id: 'p-6', name: 'VIPER_X', avatar: '/placeholder.svg', team: 'bravo', position: { x: 65, y: 35 }, isAlive: true },
  { id: 'p-7', name: 'RED_STORM', avatar: '/placeholder.svg', team: 'bravo', position: { x: 72, y: 45 }, isAlive: true },
  { id: 'p-8', name: 'TOXIC_PLAYER', avatar: '/placeholder.svg', team: 'bravo', position: { x: 58, y: 28 }, isAlive: false },
  { id: 'p-9', name: 'DARK_HUNTER', avatar: '/placeholder.svg', team: 'bravo', position: { x: 68, y: 55 }, isAlive: true },
  { id: 'p-10', name: 'NIGHT_OWL', avatar: '/placeholder.svg', team: 'bravo', position: { x: 75, y: 38 }, isAlive: true },
];

export const MOCK_SPECTATOR_GAME_STATE: GameState = {
  id: 'game-spectate-1',
  mode: 'TDM',
  round: 2,
  totalRounds: 3,
  timeRemaining: '08:45',
  score: { alpha: 1, bravo: 1 },
  objective: {
    type: 'zone',
    position: { x: 50, y: 50 },
    label: 'Zona Centrale',
  },
};

export const MOCK_KILL_EVENTS: KillEvent[] = [
  {
    id: 'e-1',
    type: 'kill',
    killerId: 'p-1',
    killerName: 'GHOST_ALPHA',
    victimId: 'p-8',
    victimName: 'TOXIC_PLAYER',
    timestamp: '2024-01-15T20:15:30',
    confirmed: true,
  },
  {
    id: 'e-2',
    type: 'kill',
    killerId: 'p-6',
    killerName: 'VIPER_X',
    victimId: 'p-4',
    victimName: 'TACTICAL_X',
    timestamp: '2024-01-15T20:14:15',
    confirmed: true,
  },
  {
    id: 'e-3',
    type: 'conflict',
    victimId: 'p-9',
    victimName: 'DARK_HUNTER',
    timestamp: '2024-01-15T20:16:00',
    confirmed: false,
    message: 'Kill contestata tra SNIPER_PRO e SHADOW_OPS',
  },
  {
    id: 'e-4',
    type: 'objective',
    timestamp: '2024-01-15T20:12:00',
    confirmed: true,
    message: 'ALPHA ha conquistato la Zona Centrale',
  },
  {
    id: 'e-5',
    type: 'round',
    timestamp: '2024-01-15T20:10:00',
    confirmed: true,
    message: 'Round 2 iniziato',
  },
  {
    id: 'e-6',
    type: 'kill',
    killerId: 'p-2',
    killerName: 'SNIPER_PRO',
    victimId: 'p-10',
    victimName: 'NIGHT_OWL',
    timestamp: '2024-01-15T20:16:45',
    confirmed: false,
  },
];

export const MOCK_CONFLICTS: ConflictData[] = [
  {
    id: 'c-1',
    victimId: 'p-9',
    victimName: 'DARK_HUNTER',
    claimants: [
      { playerId: 'p-2', playerName: 'SNIPER_PRO', distance: 15, confidence: 85 },
      { playerId: 'p-3', playerName: 'SHADOW_OPS', distance: 22, confidence: 70 },
    ],
    timestamp: '2024-01-15T20:16:00',
  },
];

export const MOCK_TEAM_SCORES = {
  alpha: {
    name: 'ALPHA',
    score: 1,
    kills: 8,
    deaths: 5,
    players: [
      { id: 'p-1', name: 'GHOST_ALPHA', kills: 3, deaths: 1, isAlive: true },
      { id: 'p-2', name: 'SNIPER_PRO', kills: 2, deaths: 1, isAlive: true },
      { id: 'p-3', name: 'SHADOW_OPS', kills: 2, deaths: 1, isAlive: true },
      { id: 'p-4', name: 'TACTICAL_X', kills: 1, deaths: 1, isAlive: false },
      { id: 'p-5', name: 'IRON_WOLF', kills: 0, deaths: 1, isAlive: true },
    ],
  },
  bravo: {
    name: 'BRAVO',
    score: 1,
    kills: 5,
    deaths: 8,
    players: [
      { id: 'p-6', name: 'VIPER_X', kills: 2, deaths: 2, isAlive: true },
      { id: 'p-7', name: 'RED_STORM', kills: 1, deaths: 1, isAlive: true },
      { id: 'p-8', name: 'TOXIC_PLAYER', kills: 1, deaths: 2, isAlive: false },
      { id: 'p-9', name: 'DARK_HUNTER', kills: 1, deaths: 2, isAlive: true },
      { id: 'p-10', name: 'NIGHT_OWL', kills: 0, deaths: 1, isAlive: true },
    ],
  },
};
