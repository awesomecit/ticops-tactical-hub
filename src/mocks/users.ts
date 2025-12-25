export type UserRole = 'player' | 'team_leader' | 'referee' | 'field_manager' | 'admin';
export type UserTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
export type RefereeStatus = 'none' | 'pending' | 'approved';
export type TeamRole = 'leader' | 'officer' | 'member' | null;

export interface IMockUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: UserRole;
  roles?: UserRole[]; // Multi-role support
  tier: UserTier;
  tierLevel: 1 | 2 | 3 | 4 | 5;
  elo: number;
  stats: {
    matches: number;
    wins: number;
    kills: number;
    deaths: number;
    kdRatio: number;
    winRate: number;
  };
  teamId: string | null;
  teamRole: TeamRole;
  refereeStatus: RefereeStatus;
  isOnline: boolean;
  isPro: boolean;
  createdAt: Date;
  lastActiveAt: Date;
}

export const MOCK_USERS: IMockUser[] = [
  {
    id: 'user_001',
    username: 'NewRecruit',
    email: 'newrecruit@email.com',
    avatar: undefined,
    role: 'player',
    tier: 'bronze',
    tierLevel: 1,
    elo: 850,
    stats: {
      matches: 3,
      wins: 1,
      kills: 8,
      deaths: 15,
      kdRatio: 0.53,
      winRate: 33.3,
    },
    teamId: null,
    teamRole: null,
    refereeStatus: 'none',
    isOnline: true,
    isPro: false,
    createdAt: new Date('2024-12-15'),
    lastActiveAt: new Date(),
  },
  {
    id: 'user_002',
    username: 'LoneWolf99',
    email: 'lonewolf99@email.com',
    avatar: undefined,
    role: 'player',
    tier: 'silver',
    tierLevel: 3,
    elo: 1150,
    stats: {
      matches: 28,
      wins: 14,
      kills: 89,
      deaths: 72,
      kdRatio: 1.24,
      winRate: 50.0,
    },
    teamId: null,
    teamRole: null,
    refereeStatus: 'none',
    isOnline: true,
    isPro: false,
    createdAt: new Date('2024-08-20'),
    lastActiveAt: new Date(),
  },
  {
    id: 'user_003',
    username: 'GhostSniper92',
    email: 'ghostsniper92@email.com',
    avatar: undefined,
    role: 'team_leader',
    roles: ['player', 'team_leader', 'referee', 'field_manager', 'shop_owner', 'admin'],
    tier: 'gold',
    tierLevel: 4,
    elo: 1680,
    stats: {
      matches: 156,
      wins: 98,
      kills: 523,
      deaths: 289,
      kdRatio: 1.81,
      winRate: 62.8,
    },
    teamId: 'team_001',
    teamRole: 'leader',
    refereeStatus: 'none',
    isOnline: true,
    isPro: true,
    createdAt: new Date('2023-03-10'),
    lastActiveAt: new Date(),
  },
  {
    id: 'user_004',
    username: 'TacticalMike',
    email: 'tacticalmike@email.com',
    avatar: undefined,
    role: 'player',
    tier: 'gold',
    tierLevel: 2,
    elo: 1520,
    stats: {
      matches: 89,
      wins: 51,
      kills: 312,
      deaths: 198,
      kdRatio: 1.58,
      winRate: 57.3,
    },
    teamId: 'team_001',
    teamRole: 'officer',
    refereeStatus: 'none',
    isOnline: false,
    isPro: false,
    createdAt: new Date('2023-09-05'),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 'user_005',
    username: 'RefereeMaster',
    email: 'refereemaster@email.com',
    avatar: undefined,
    role: 'referee',
    tier: 'platinum',
    tierLevel: 1,
    elo: 1820,
    stats: {
      matches: 234,
      wins: 156,
      kills: 678,
      deaths: 412,
      kdRatio: 1.65,
      winRate: 66.7,
    },
    teamId: null,
    teamRole: null,
    refereeStatus: 'approved',
    isOnline: true,
    isPro: true,
    createdAt: new Date('2022-06-15'),
    lastActiveAt: new Date(),
  },
  {
    id: 'user_006',
    username: 'WannaBeRef',
    email: 'wannaberef@email.com',
    avatar: undefined,
    role: 'player',
    tier: 'silver',
    tierLevel: 5,
    elo: 1280,
    stats: {
      matches: 45,
      wins: 22,
      kills: 134,
      deaths: 118,
      kdRatio: 1.14,
      winRate: 48.9,
    },
    teamId: 'team_002',
    teamRole: 'member',
    refereeStatus: 'pending',
    isOnline: false,
    isPro: false,
    createdAt: new Date('2024-02-28'),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 'user_007',
    username: 'CampoBravoOwner',
    email: 'campobravo@email.com',
    avatar: undefined,
    role: 'field_manager',
    tier: 'gold',
    tierLevel: 1,
    elo: 1450,
    stats: {
      matches: 67,
      wins: 38,
      kills: 189,
      deaths: 156,
      kdRatio: 1.21,
      winRate: 56.7,
    },
    teamId: null,
    teamRole: null,
    refereeStatus: 'none',
    isOnline: true,
    isPro: false,
    createdAt: new Date('2023-01-20'),
    lastActiveAt: new Date(),
  },
  {
    id: 'user_008',
    username: 'TicOpsAdmin',
    email: 'admin@ticops.it',
    avatar: undefined,
    role: 'admin',
    tier: 'diamond',
    tierLevel: 5,
    elo: 2150,
    stats: {
      matches: 412,
      wins: 298,
      kills: 1456,
      deaths: 623,
      kdRatio: 2.34,
      winRate: 72.3,
    },
    teamId: null,
    teamRole: null,
    refereeStatus: 'approved',
    isOnline: true,
    isPro: true,
    createdAt: new Date('2022-01-01'),
    lastActiveAt: new Date(),
  },
];

// Default current user is GhostSniper92
export const CURRENT_USER_ID = 'user_003';

export const getCurrentUser = (): IMockUser => {
  return MOCK_USERS.find(u => u.id === CURRENT_USER_ID) || MOCK_USERS[2];
};

export const getUserById = (id: string): IMockUser | undefined => {
  return MOCK_USERS.find(u => u.id === id);
};

export const getOnlineUsers = (): IMockUser[] => {
  return MOCK_USERS.filter(u => u.isOnline);
};

export const getUsersByTeam = (teamId: string): IMockUser[] => {
  return MOCK_USERS.filter(u => u.teamId === teamId);
};
