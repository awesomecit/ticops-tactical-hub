import { useMemo } from 'react';
import {
  getCurrentUser,
  MOCK_USERS,
  MOCK_TEAMS,
  MOCK_FIELDS,
  getTeamById,
} from '@/mocks';
import { mockGames, mockNotifications } from '@/mocks/data';

// Mock live matches data
export interface LiveMatch {
  id: string;
  teamAlpha: { name: string; score: number };
  teamBravo: { name: string; score: number };
  fieldName: string;
  gameMode: string;
  timeElapsed: string;
}

// Mock activity data
export interface Activity {
  id: string;
  type: 'game' | 'achievement' | 'team' | 'rank' | 'social';
  text: string;
  timestamp: Date;
  isNew: boolean;
}

export const useMockData = () => {
  const currentUser = useMemo(() => getCurrentUser(), []);
  
  const userTeam = useMemo(() => {
    if (!currentUser.teamId) return null;
    return getTeamById(currentUser.teamId);
  }, [currentUser]);

  const liveMatches: LiveMatch[] = useMemo(() => [
    {
      id: 'live_001',
      teamAlpha: { name: 'Shadow Wolves', score: 3 },
      teamBravo: { name: 'Red Legion', score: 2 },
      fieldName: 'Campo Alpha',
      gameMode: 'Domination',
      timeElapsed: '12:34',
    },
    {
      id: 'live_002',
      teamAlpha: { name: 'Night Raiders', score: 1 },
      teamBravo: { name: 'Alpha Squad', score: 1 },
      fieldName: 'Arena Tactix',
      gameMode: 'TDM',
      timeElapsed: '08:15',
    },
    {
      id: 'live_003',
      teamAlpha: { name: 'Lone Wolves', score: 5 },
      teamBravo: { name: 'Delta Force', score: 4 },
      fieldName: 'Bunker Zone',
      gameMode: 'S&D',
      timeElapsed: '18:42',
    },
  ], []);

  const upcomingMatches = useMemo(() => {
    return mockGames
      .filter(g => g.status === 'upcoming')
      .map(g => ({
        id: g.id,
        name: g.name,
        date: g.date,
        fieldName: g.location.name,
        gameMode: g.gameMode.name,
        gameModeIcon: g.gameMode.icon,
        registeredCount: g.registeredPlayers.length + Math.floor(Math.random() * 20) + 5,
        maxPlayers: g.maxPlayers,
      }));
  }, []);

  const recentActivities: Activity[] = useMemo(() => [
    {
      id: 'act_001',
      type: 'game',
      text: 'Hai completato la partita "Training Day" con 8 kill',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isNew: true,
    },
    {
      id: 'act_002',
      type: 'achievement',
      text: 'Achievement sbloccato: "First Blood" - Prima eliminazione della partita',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      isNew: true,
    },
    {
      id: 'act_003',
      type: 'team',
      text: 'LoneWolf99 ha richiesto di entrare nel team Shadow Wolves',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      isNew: false,
    },
    {
      id: 'act_004',
      type: 'rank',
      text: 'Sei salito al tier Gold IV - ELO: 1680',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isNew: false,
    },
    {
      id: 'act_005',
      type: 'social',
      text: 'TacticalMike ti ha aggiunto come amico',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      isNew: false,
    },
  ], []);

  // ELO tier thresholds
  const eloTiers = useMemo(() => ({
    bronze: { min: 0, max: 1000 },
    silver: { min: 1000, max: 1400 },
    gold: { min: 1400, max: 1800 },
    platinum: { min: 1800, max: 2200 },
    diamond: { min: 2200, max: 3000 },
  }), []);

  const currentTierBounds = useMemo(() => {
    const tier = currentUser.tier;
    return eloTiers[tier];
  }, [currentUser.tier, eloTiers]);

  return {
    currentUser,
    userTeam,
    users: MOCK_USERS,
    teams: MOCK_TEAMS,
    fields: MOCK_FIELDS,
    games: mockGames,
    notifications: mockNotifications,
    liveMatches,
    upcomingMatches,
    recentActivities,
    currentTierBounds,
  };
};
