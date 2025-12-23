import type { AdminStat, PendingAction, ActivityLog, LiveMatch } from './admin';

// ==================== FIELDS ====================
export interface AdminField {
  id: string;
  name: string;
  city: string;
  type: 'indoor' | 'outdoor' | 'mixed';
  rating: number;
  status: 'active' | 'pending' | 'suspended';
  address: string;
  phone: string;
  email: string;
  capacity: number;
  documents?: string[];
  submittedAt?: string;
  suspendedReason?: string;
}

export const MOCK_ADMIN_FIELDS: AdminField[] = [
  {
    id: 'f-1',
    name: 'Urban Warfare Center',
    city: 'Milano',
    type: 'indoor',
    rating: 4.8,
    status: 'active',
    address: 'Via Tactical 123',
    phone: '+39 02 1234567',
    email: 'info@urbanwarfare.it',
    capacity: 40,
  },
  {
    id: 'f-2',
    name: 'Green Zone Outdoor',
    city: 'Roma',
    type: 'outdoor',
    rating: 4.5,
    status: 'active',
    address: 'Via Verde 45',
    phone: '+39 06 7654321',
    email: 'info@greenzone.it',
    capacity: 60,
  },
  {
    id: 'f-3',
    name: 'Bunker Zone Milano',
    city: 'Milano',
    type: 'indoor',
    rating: 0,
    status: 'pending',
    address: 'Via Bunker 10',
    phone: '+39 02 9876543',
    email: 'bunkerzone@mail.it',
    capacity: 30,
    documents: ['licenza.pdf', 'assicurazione.pdf', 'planimetria.pdf'],
    submittedAt: '2024-01-14T10:00:00',
  },
  {
    id: 'f-4',
    name: 'Desert Storm Arena',
    city: 'Napoli',
    type: 'outdoor',
    rating: 0,
    status: 'pending',
    address: 'Via Sabbia 88',
    phone: '+39 081 1112233',
    email: 'desert@arena.it',
    capacity: 50,
    documents: ['licenza.pdf', 'assicurazione.pdf'],
    submittedAt: '2024-01-15T08:30:00',
  },
  {
    id: 'f-5',
    name: 'Night Ops Facility',
    city: 'Torino',
    type: 'mixed',
    rating: 3.2,
    status: 'suspended',
    address: 'Via Notte 7',
    phone: '+39 011 4445566',
    email: 'nightops@mail.it',
    capacity: 35,
    suspendedReason: 'Mancato rinnovo assicurazione',
  },
];

// ==================== REFEREES ====================
export interface AdminReferee {
  id: string;
  name: string;
  avatar: string;
  level: 'junior' | 'senior' | 'master';
  matchesRefereed: number;
  rating: number;
  status: 'active' | 'pending' | 'exam';
  experience?: string;
  motivation?: string;
  availability?: string[];
  examDate?: string;
  appliedAt?: string;
}

export const MOCK_ADMIN_REFEREES: AdminReferee[] = [
  {
    id: 'r-1',
    name: 'Marco Rossi',
    avatar: '/placeholder.svg',
    level: 'master',
    matchesRefereed: 156,
    rating: 4.9,
    status: 'active',
  },
  {
    id: 'r-2',
    name: 'Luigi Verdi',
    avatar: '/placeholder.svg',
    level: 'senior',
    matchesRefereed: 87,
    rating: 4.7,
    status: 'active',
  },
  {
    id: 'r-3',
    name: 'Anna Bianchi',
    avatar: '/placeholder.svg',
    level: 'junior',
    matchesRefereed: 23,
    rating: 4.4,
    status: 'active',
  },
  {
    id: 'r-4',
    name: 'Giuseppe Neri',
    avatar: '/placeholder.svg',
    level: 'junior',
    matchesRefereed: 0,
    rating: 0,
    status: 'pending',
    experience: '5 anni di esperienza come giocatore competitivo. Ho partecipato a 3 tornei nazionali.',
    motivation: 'Voglio contribuire alla community e garantire partite fair-play.',
    availability: ['Sabato', 'Domenica', 'Festivi'],
    appliedAt: '2024-01-15T09:00:00',
  },
  {
    id: 'r-5',
    name: 'Francesca Russo',
    avatar: '/placeholder.svg',
    level: 'junior',
    matchesRefereed: 0,
    rating: 0,
    status: 'pending',
    experience: '3 anni di softair, ruolo support. Ottima conoscenza regolamenti.',
    motivation: 'Mi piacerebbe essere parte attiva nell\'organizzazione degli eventi.',
    availability: ['Venerdì sera', 'Sabato', 'Domenica'],
    appliedAt: '2024-01-14T16:30:00',
  },
  {
    id: 'r-6',
    name: 'Paolo Gialli',
    avatar: '/placeholder.svg',
    level: 'junior',
    matchesRefereed: 0,
    rating: 0,
    status: 'exam',
    examDate: '2024-01-20T10:00:00',
  },
  {
    id: 'r-7',
    name: 'Sara Blu',
    avatar: '/placeholder.svg',
    level: 'junior',
    matchesRefereed: 0,
    rating: 0,
    status: 'exam',
    examDate: '2024-01-22T14:00:00',
  },
];

export const MOCK_EXAM_DATES = [
  { date: '2024-01-20T10:00:00', candidates: 3, location: 'Milano - Urban Warfare Center' },
  { date: '2024-01-22T14:00:00', candidates: 2, location: 'Roma - Green Zone' },
  { date: '2024-01-27T10:00:00', candidates: 0, location: 'Napoli - Desert Storm Arena' },
];

// ==================== USERS ====================
export type UserRole = 'user' | 'moderator' | 'admin';
export type UserTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
export type UserStatus = 'active' | 'warned' | 'banned' | 'suspended';

export interface AdminUser {
  id: string;
  username: string;
  avatar: string;
  email: string;
  role: UserRole;
  tier: UserTier;
  elo: number;
  status: UserStatus;
  registeredAt: string;
  lastActive: string;
  warnings: number;
  matchesPlayed: number;
}

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 'u-1',
    username: 'GHOST_ALPHA',
    avatar: '/placeholder.svg',
    email: 'ghost@mail.it',
    role: 'admin',
    tier: 'diamond',
    elo: 2450,
    status: 'active',
    registeredAt: '2023-06-15',
    lastActive: '2024-01-15T14:30:00',
    warnings: 0,
    matchesPlayed: 234,
  },
  {
    id: 'u-2',
    username: 'SNIPER_PRO',
    avatar: '/placeholder.svg',
    email: 'sniper@mail.it',
    role: 'user',
    tier: 'platinum',
    elo: 2100,
    status: 'active',
    registeredAt: '2023-08-20',
    lastActive: '2024-01-15T12:00:00',
    warnings: 0,
    matchesPlayed: 156,
  },
  {
    id: 'u-3',
    username: 'VIPER_X',
    avatar: '/placeholder.svg',
    email: 'viper@mail.it',
    role: 'user',
    tier: 'gold',
    elo: 1650,
    status: 'warned',
    registeredAt: '2023-09-10',
    lastActive: '2024-01-14T18:45:00',
    warnings: 2,
    matchesPlayed: 89,
  },
  {
    id: 'u-4',
    username: 'TOXIC_PLAYER',
    avatar: '/placeholder.svg',
    email: 'toxic@mail.it',
    role: 'user',
    tier: 'silver',
    elo: 1200,
    status: 'banned',
    registeredAt: '2023-10-05',
    lastActive: '2024-01-10T09:00:00',
    warnings: 5,
    matchesPlayed: 45,
  },
  {
    id: 'u-5',
    username: 'MOD_ALPHA',
    avatar: '/placeholder.svg',
    email: 'mod@ticops.it',
    role: 'moderator',
    tier: 'gold',
    elo: 1800,
    status: 'active',
    registeredAt: '2023-07-01',
    lastActive: '2024-01-15T16:00:00',
    warnings: 0,
    matchesPlayed: 112,
  },
  {
    id: 'u-6',
    username: 'ROOKIE_ONE',
    avatar: '/placeholder.svg',
    email: 'rookie@mail.it',
    role: 'user',
    tier: 'bronze',
    elo: 950,
    status: 'active',
    registeredAt: '2024-01-10',
    lastActive: '2024-01-15T10:30:00',
    warnings: 0,
    matchesPlayed: 8,
  },
  {
    id: 'u-7',
    username: 'SHADOW_OPS',
    avatar: '/placeholder.svg',
    email: 'shadow@mail.it',
    role: 'user',
    tier: 'gold',
    elo: 1720,
    status: 'suspended',
    registeredAt: '2023-08-15',
    lastActive: '2024-01-12T20:00:00',
    warnings: 1,
    matchesPlayed: 134,
  },
];
