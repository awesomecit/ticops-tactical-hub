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

export const DEMO_USERS: DemoUser[] = [
  {
    id: 'demo_player',
    email: 'player@demo.it',
    password: 'demo123',
    role: 'player',
    label: 'Giocatore',
    description: 'Partite, classifica, chat, mercatino, achievement',
    icon: '🎮',
    user: {
      id: 'demo_player',
      username: 'DemoPlayer',
      callsign: 'PLAYER',
      email: 'player@demo.it',
      avatar: undefined,
      role: 'player',
      rank: mockRanks[1],
      stats: {
        gamesPlayed: 25,
        wins: 12,
        kills: 89,
        deaths: 67,
        accuracy: 58.5,
        xp: 1250,
      },
      createdAt: new Date('2024-03-15'),
    },
  },
  {
    id: 'demo_team_leader',
    email: 'teamleader@demo.it',
    password: 'demo123',
    role: 'team_leader',
    label: 'Capitano Squadra',
    description: 'Gestione squadra, radio team, inviti, organizza match',
    icon: '👑',
    user: {
      id: 'demo_team_leader',
      username: 'TeamCaptain',
      callsign: 'CAPTAIN',
      email: 'teamleader@demo.it',
      avatar: undefined,
      role: 'team_leader',
      rank: mockRanks[3],
      stats: {
        gamesPlayed: 85,
        wins: 52,
        kills: 312,
        deaths: 198,
        accuracy: 72.3,
        xp: 4500,
      },
      createdAt: new Date('2023-06-01'),
    },
  },
  {
    id: 'demo_referee',
    email: 'referee@demo.it',
    password: 'demo123',
    role: 'referee',
    label: 'Arbitro',
    description: 'Gestione partite live, conferme kill, vista arbitro',
    icon: '⚖️',
    user: {
      id: 'demo_referee',
      username: 'RefPro',
      callsign: 'REF',
      email: 'referee@demo.it',
      avatar: undefined,
      role: 'referee',
      rank: mockRanks[2],
      stats: {
        gamesPlayed: 120,
        wins: 0,
        kills: 0,
        deaths: 0,
        accuracy: 0,
        xp: 3200,
      },
      createdAt: new Date('2023-01-10'),
    },
  },
  {
    id: 'demo_field_manager',
    email: 'field@demo.it',
    password: 'demo123',
    role: 'field_manager',
    label: 'Gestore Campo',
    description: 'Gestione campo, prenotazioni, calendario',
    icon: '🏟️',
    user: {
      id: 'demo_field_manager',
      username: 'FieldManager',
      callsign: 'FIELD',
      email: 'field@demo.it',
      avatar: undefined,
      role: 'field_manager',
      rank: mockRanks[0],
      stats: {
        gamesPlayed: 0,
        wins: 0,
        kills: 0,
        deaths: 0,
        accuracy: 0,
        xp: 500,
      },
      createdAt: new Date('2024-01-01'),
    },
  },
  {
    id: 'demo_shop_owner',
    email: 'shop@demo.it',
    password: 'demo123',
    role: 'shop_owner',
    label: 'Negoziante',
    description: 'Gestione prodotti, ordini, statistiche',
    icon: '🛒',
    user: {
      id: 'demo_shop_owner',
      username: 'ShopOwner',
      callsign: 'SHOP',
      email: 'shop@demo.it',
      avatar: undefined,
      role: 'shop_owner',
      rank: mockRanks[0],
      stats: {
        gamesPlayed: 5,
        wins: 2,
        kills: 15,
        deaths: 18,
        accuracy: 45.0,
        xp: 350,
      },
      createdAt: new Date('2024-02-20'),
    },
  },
  {
    id: 'demo_admin',
    email: 'admin@demo.it',
    password: 'demo123',
    role: 'admin',
    label: 'Amministratore',
    description: 'Pannello admin completo, gestione utenti, campi, radio',
    icon: '🔐',
    user: {
      id: 'demo_admin',
      username: 'SuperAdmin',
      callsign: 'ADMIN',
      email: 'admin@demo.it',
      avatar: undefined,
      role: 'admin',
      rank: mockRanks[4],
      stats: {
        gamesPlayed: 200,
        wins: 145,
        kills: 892,
        deaths: 234,
        accuracy: 85.2,
        xp: 15000,
      },
      createdAt: new Date('2022-01-01'),
    },
  },
];

export const getDemoUserByRole = (role: UserRole): DemoUser | undefined => {
  return DEMO_USERS.find(u => u.role === role);
};

export const getDemoUserById = (id: string): DemoUser | undefined => {
  return DEMO_USERS.find(u => u.id === id);
};
