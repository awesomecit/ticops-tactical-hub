import { IMockUser, MOCK_USERS, getUsersByTeam } from './users';

export type TeamStatus = 'active' | 'inactive' | 'recruiting' | 'disbanded';
export type JoinRequestStatus = 'pending' | 'approved' | 'rejected';

export interface IMockTeam {
  id: string;
  name: string;
  tag: string;
  logo?: string;
  description: string;
  color: string;
  status: TeamStatus;
  isRecruiting: boolean;
  rank: number;
  elo: number;
  stats: {
    matches: number;
    wins: number;
    losses: number;
    winRate: number;
  };
  leaderId: string;
  memberCount: number;
  maxMembers: number;
  region: string;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface IMockJoinRequest {
  id: string;
  teamId: string;
  userId: string;
  message: string;
  status: JoinRequestStatus;
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export const MOCK_TEAMS: IMockTeam[] = [
  {
    id: 'team_001',
    name: 'Shadow Wolves',
    tag: 'SWF',
    logo: undefined,
    description: 'Elite tactical unit specializing in stealth operations and night raids. Looking for skilled snipers and recon specialists.',
    color: '#6366f1',
    status: 'active',
    isRecruiting: true,
    rank: 23,
    elo: 1620,
    stats: {
      matches: 89,
      wins: 58,
      losses: 31,
      winRate: 65.2,
    },
    leaderId: 'user_003',
    memberCount: 5,
    maxMembers: 8,
    region: 'Lombardia',
    createdAt: new Date('2023-03-15'),
    lastActiveAt: new Date(),
  },
  {
    id: 'team_002',
    name: 'Alpha Squad',
    tag: 'ASQ',
    logo: undefined,
    description: 'Competitive team focused on tournament play. Veterans only.',
    color: '#ef4444',
    status: 'active',
    isRecruiting: false,
    rank: 15,
    elo: 1780,
    stats: {
      matches: 134,
      wins: 96,
      losses: 38,
      winRate: 71.6,
    },
    leaderId: 'user_009',
    memberCount: 4,
    maxMembers: 6,
    region: 'Lombardia',
    createdAt: new Date('2022-11-20'),
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: 'team_003',
    name: 'Night Raiders',
    tag: 'NRD',
    logo: undefined,
    description: 'New team looking for active players. All skill levels welcome!',
    color: '#22c55e',
    status: 'recruiting',
    isRecruiting: true,
    rank: 156,
    elo: 1050,
    stats: {
      matches: 8,
      wins: 3,
      losses: 5,
      winRate: 37.5,
    },
    leaderId: 'user_010',
    memberCount: 2,
    maxMembers: 8,
    region: 'Lombardia',
    createdAt: new Date('2024-11-28'),
    lastActiveAt: new Date(),
  },
];

export const MOCK_JOIN_REQUESTS: IMockJoinRequest[] = [
  {
    id: 'jr_001',
    teamId: 'team_001',
    userId: 'user_002',
    message: 'Ciao! Sono LoneWolf99, cerco un team competitivo. Ho esperienza in ruoli di supporto e sniper. Posso partecipare a tutti gli eventi del weekend.',
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: 'jr_002',
    teamId: 'team_001',
    userId: 'user_001',
    message: 'Salve, sono nuovo ma molto motivato. Vorrei imparare dai migliori!',
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
];

export const getTeamById = (id: string): IMockTeam | undefined => {
  return MOCK_TEAMS.find(t => t.id === id);
};

export const getTeamMembers = (teamId: string): IMockUser[] => {
  return getUsersByTeam(teamId);
};

export const getTeamJoinRequests = (teamId: string): IMockJoinRequest[] => {
  return MOCK_JOIN_REQUESTS.filter(r => r.teamId === teamId && r.status === 'pending');
};

export const getRecruitingTeams = (): IMockTeam[] => {
  return MOCK_TEAMS.filter(t => t.isRecruiting);
};

export const getTeamsByRank = (limit?: number): IMockTeam[] => {
  const sorted = [...MOCK_TEAMS].sort((a, b) => a.rank - b.rank);
  return limit ? sorted.slice(0, limit) : sorted;
};
