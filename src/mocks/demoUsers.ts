import { User, UserRole } from '@/types';
import { mockRanks } from '@/mocks/data';

export interface DemoUser {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  label: string;
  description: string;
  icon: string;
  user: User;
}

// Single multi-role user for all demo access
const MULTI_ROLE_DEMO_USER: User = {
  id: 'demo_multirole',
  username: 'GhostSniper92',
  callsign: 'GHOST',
  email: 'demo@ticops.it',
  avatar: undefined,
  role: 'team_leader',
  roles: ['player', 'team_leader', 'referee', 'field_manager', 'shop_owner', 'admin'],
  primaryRole: 'team_leader',
  rank: mockRanks[4],
  stats: {
    gamesPlayed: 156,
    wins: 98,
    kills: 523,
    deaths: 289,
    accuracy: 72.8,
    xp: 8500,
  },
  createdAt: new Date('2023-03-15'),
};

export const DEMO_USERS: DemoUser[] = [
  {
    id: 'demo_player',
    email: 'player@demo.it',
    password: 'demo123',
    role: 'player',
    label: 'Giocatore',
    description: 'Partite, classifica, chat, mercatino, achievement',
    icon: '🎮',
    user: MULTI_ROLE_DEMO_USER,
  },
  {
    id: 'demo_team_leader',
    email: 'teamleader@demo.it',
    password: 'demo123',
    role: 'team_leader',
    label: 'Capitano Squadra',
    description: 'Gestione squadra, radio team, inviti, organizza match',
    icon: '👑',
    user: MULTI_ROLE_DEMO_USER,
  },
  {
    id: 'demo_referee',
    email: 'referee@demo.it',
    password: 'demo123',
    role: 'referee',
    label: 'Arbitro',
    description: 'Gestione partite live, conferme kill, vista arbitro',
    icon: '⚖️',
    user: MULTI_ROLE_DEMO_USER,
  },
  {
    id: 'demo_field_manager',
    email: 'field@demo.it',
    password: 'demo123',
    role: 'field_manager',
    label: 'Gestore Campo',
    description: 'Gestione campo, prenotazioni, calendario',
    icon: '🏟️',
    user: MULTI_ROLE_DEMO_USER,
  },
  {
    id: 'demo_shop_owner',
    email: 'shop@demo.it',
    password: 'demo123',
    role: 'shop_owner',
    label: 'Negoziante',
    description: 'Gestione prodotti, ordini, statistiche',
    icon: '🛒',
    user: MULTI_ROLE_DEMO_USER,
  },
  {
    id: 'demo_admin',
    email: 'admin@demo.it',
    password: 'demo123',
    role: 'admin',
    label: 'Amministratore',
    description: 'Pannello admin completo, gestione utenti, campi, radio',
    icon: '🔐',
    user: MULTI_ROLE_DEMO_USER,
  },
];

export const getDemoUserByRole = (role: UserRole): DemoUser | undefined => {
  return DEMO_USERS.find(u => u.role === role);
};

export const getDemoUserById = (id: string): DemoUser | undefined => {
  return DEMO_USERS.find(u => u.id === id);
};
