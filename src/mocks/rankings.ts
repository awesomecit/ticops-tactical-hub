import { IMockUser, MOCK_USERS, getCurrentUser } from './users';
import { IMockTeam, MOCK_TEAMS } from './teams';

export interface IRankingEntry {
  rank: number;
  previousRank: number;
  userId: string;
  username: string;
  tier: string;
  tierLevel: number;
  elo: number;
  eloChange: number;
  stats: {
    matches: number;
    wins: number;
    winRate: number;
    kdRatio: number;
  };
  isCurrentUser?: boolean;
}

export interface ITeamRankingEntry {
  rank: number;
  previousRank: number;
  teamId: string;
  teamName: string;
  tag: string;
  elo: number;
  eloChange: number;
  stats: {
    matches: number;
    wins: number;
    winRate: number;
  };
  memberCount: number;
  isUserTeam?: boolean;
}

// Simulated global top players
export const MOCK_GLOBAL_TOP_5: IRankingEntry[] = [
  {
    rank: 1,
    previousRank: 1,
    userId: 'user_top_001',
    username: 'ProKiller_ITA',
    tier: 'diamond',
    tierLevel: 5,
    elo: 2450,
    eloChange: 15,
    stats: { matches: 523, wins: 412, winRate: 78.8, kdRatio: 3.12 },
  },
  {
    rank: 2,
    previousRank: 3,
    userId: 'user_top_002',
    username: 'ShadowHunter',
    tier: 'diamond',
    tierLevel: 4,
    elo: 2380,
    eloChange: 42,
    stats: { matches: 489, wins: 378, winRate: 77.3, kdRatio: 2.89 },
  },
  {
    rank: 3,
    previousRank: 2,
    userId: 'user_top_003',
    username: 'TacOps_Legend',
    tier: 'diamond',
    tierLevel: 4,
    elo: 2350,
    eloChange: -18,
    stats: { matches: 612, wins: 465, winRate: 75.9, kdRatio: 2.76 },
  },
  {
    rank: 4,
    previousRank: 5,
    userId: 'user_top_004',
    username: 'NightViper',
    tier: 'diamond',
    tierLevel: 3,
    elo: 2290,
    eloChange: 28,
    stats: { matches: 445, wins: 334, winRate: 75.1, kdRatio: 2.54 },
  },
  {
    rank: 5,
    previousRank: 4,
    userId: 'user_008',
    username: 'TicOpsAdmin',
    tier: 'diamond',
    tierLevel: 5,
    elo: 2150,
    eloChange: -12,
    stats: { matches: 412, wins: 298, winRate: 72.3, kdRatio: 2.34 },
  },
];

// Rankings around user_003 (GhostSniper92) who is rank 127
export const MOCK_GLOBAL_AROUND_USER: IRankingEntry[] = [
  {
    rank: 125,
    previousRank: 128,
    userId: 'user_rank_125',
    username: 'TacticalEagle',
    tier: 'gold',
    tierLevel: 4,
    elo: 1695,
    eloChange: 22,
    stats: { matches: 142, wins: 89, winRate: 62.7, kdRatio: 1.78 },
  },
  {
    rank: 126,
    previousRank: 124,
    userId: 'user_rank_126',
    username: 'SilentAssassin',
    tier: 'gold',
    tierLevel: 4,
    elo: 1688,
    eloChange: -8,
    stats: { matches: 167, wins: 102, winRate: 61.1, kdRatio: 1.72 },
  },
  {
    rank: 127,
    previousRank: 130,
    userId: 'user_003',
    username: 'GhostSniper92',
    tier: 'gold',
    tierLevel: 4,
    elo: 1680,
    eloChange: 35,
    stats: { matches: 156, wins: 98, winRate: 62.8, kdRatio: 1.81 },
    isCurrentUser: true,
  },
  {
    rank: 128,
    previousRank: 126,
    userId: 'user_rank_128',
    username: 'DeltaForce_IT',
    tier: 'gold',
    tierLevel: 4,
    elo: 1675,
    eloChange: -5,
    stats: { matches: 134, wins: 82, winRate: 61.2, kdRatio: 1.65 },
  },
  {
    rank: 129,
    previousRank: 127,
    userId: 'user_rank_129',
    username: 'BravoTeamLead',
    tier: 'gold',
    tierLevel: 3,
    elo: 1668,
    eloChange: 12,
    stats: { matches: 178, wins: 108, winRate: 60.7, kdRatio: 1.58 },
  },
];

// Regional ranking - Lombardia Top 3
export const MOCK_REGIONAL_LOMBARDIA_TOP_3: IRankingEntry[] = [
  {
    rank: 1,
    previousRank: 1,
    userId: 'user_top_002',
    username: 'ShadowHunter',
    tier: 'diamond',
    tierLevel: 4,
    elo: 2380,
    eloChange: 42,
    stats: { matches: 489, wins: 378, winRate: 77.3, kdRatio: 2.89 },
  },
  {
    rank: 2,
    previousRank: 2,
    userId: 'user_lom_002',
    username: 'MilanoSniper',
    tier: 'platinum',
    tierLevel: 3,
    elo: 1980,
    eloChange: 18,
    stats: { matches: 312, wins: 223, winRate: 71.5, kdRatio: 2.12 },
  },
  {
    rank: 3,
    previousRank: 4,
    userId: 'user_005',
    username: 'RefereeMaster',
    tier: 'platinum',
    tierLevel: 1,
    elo: 1820,
    eloChange: 25,
    stats: { matches: 234, wins: 156, winRate: 66.7, kdRatio: 1.65 },
  },
];

// Team rankings
export const MOCK_TEAM_RANKINGS: ITeamRankingEntry[] = [
  {
    rank: 1,
    previousRank: 1,
    teamId: 'team_top_001',
    teamName: 'Italian Legends',
    tag: 'ITA',
    elo: 2180,
    eloChange: 25,
    stats: { matches: 234, wins: 189, winRate: 80.8 },
    memberCount: 8,
  },
  {
    rank: 2,
    previousRank: 3,
    teamId: 'team_top_002',
    teamName: 'Delta Operators',
    tag: 'DOP',
    elo: 2050,
    eloChange: 45,
    stats: { matches: 198, wins: 154, winRate: 77.8 },
    memberCount: 6,
  },
  {
    rank: 3,
    previousRank: 2,
    teamId: 'team_top_003',
    teamName: 'Phantom Brigade',
    tag: 'PHB',
    elo: 2020,
    eloChange: -15,
    stats: { matches: 212, wins: 162, winRate: 76.4 },
    memberCount: 7,
  },
  {
    rank: 15,
    previousRank: 18,
    teamId: 'team_002',
    teamName: 'Alpha Squad',
    tag: 'ASQ',
    elo: 1780,
    eloChange: 32,
    stats: { matches: 134, wins: 96, winRate: 71.6 },
    memberCount: 4,
  },
  {
    rank: 23,
    previousRank: 25,
    teamId: 'team_001',
    teamName: 'Shadow Wolves',
    tag: 'SWF',
    elo: 1620,
    eloChange: 18,
    stats: { matches: 89, wins: 58, winRate: 65.2 },
    memberCount: 5,
    isUserTeam: true,
  },
  {
    rank: 156,
    previousRank: 0,
    teamId: 'team_003',
    teamName: 'Night Raiders',
    tag: 'NRD',
    elo: 1050,
    eloChange: 50,
    stats: { matches: 8, wins: 3, winRate: 37.5 },
    memberCount: 2,
  },
];

export const getGlobalTopRankings = (limit: number = 5): IRankingEntry[] => {
  return MOCK_GLOBAL_TOP_5.slice(0, limit);
};

export const getRankingsAroundUser = (userId: string = 'user_003'): IRankingEntry[] => {
  return MOCK_GLOBAL_AROUND_USER;
};

export const getRegionalRankings = (region: string, limit: number = 3): IRankingEntry[] => {
  if (region.toLowerCase() === 'lombardia') {
    return MOCK_REGIONAL_LOMBARDIA_TOP_3.slice(0, limit);
  }
  return [];
};

export const getTeamRankings = (limit?: number): ITeamRankingEntry[] => {
  const sorted = [...MOCK_TEAM_RANKINGS].sort((a, b) => a.rank - b.rank);
  return limit ? sorted.slice(0, limit) : sorted;
};

export const getUserRanking = (userId: string): IRankingEntry | undefined => {
  return [...MOCK_GLOBAL_TOP_5, ...MOCK_GLOBAL_AROUND_USER].find(r => r.userId === userId);
};

export const getTeamRanking = (teamId: string): ITeamRankingEntry | undefined => {
  return MOCK_TEAM_RANKINGS.find(r => r.teamId === teamId);
};

export const getRankChange = (current: number, previous: number): 'up' | 'down' | 'same' => {
  if (previous === 0) return 'up'; // New entry
  if (current < previous) return 'up';
  if (current > previous) return 'down';
  return 'same';
};
