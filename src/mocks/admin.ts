export interface AdminStat {
  label: string;
  value: number;
  todayValue?: number;
  growth?: number;
  pending?: number;
  icon: string;
}

export interface PendingAction {
  id: string;
  type: 'user' | 'field' | 'match' | 'referee' | 'report';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
  link: string;
}

export interface ActivityLog {
  id: string;
  adminName: string;
  adminAvatar: string;
  action: string;
  target: string;
  targetType: 'user' | 'field' | 'match' | 'referee' | 'system';
  timestamp: string;
}

export interface LiveMatch {
  id: string;
  name: string;
  field: string;
  mode: string;
  players: number;
  maxPlayers: number;
  startedAt: string;
  status: 'live' | 'paused';
}

export const MOCK_ADMIN_STATS: AdminStat[] = [
  {
    label: 'Utenti',
    value: 1247,
    todayValue: 23,
    growth: 12.5,
    icon: 'users',
  },
  {
    label: 'Campi',
    value: 8,
    pending: 2,
    icon: 'map-pin',
  },
  {
    label: 'Partite',
    value: 3,
    todayValue: 7,
    icon: 'crosshair',
  },
  {
    label: 'Arbitri',
    value: 15,
    pending: 4,
    icon: 'shield',
  },
];

export const MOCK_ADMIN_PENDING_ACTIONS: PendingAction[] = [
  {
    id: 'pa-1',
    type: 'report',
    priority: 'critical',
    title: 'Segnalazione Comportamento',
    description: 'Utente VIPER_X segnalato per comportamento antisportivo',
    timestamp: '2024-01-15T10:30:00',
    link: '/admin/reports/1',
  },
  {
    id: 'pa-2',
    type: 'field',
    priority: 'high',
    title: 'Approvazione Campo',
    description: 'Nuovo campo "Bunker Zone Milano" in attesa di approvazione',
    timestamp: '2024-01-15T09:15:00',
    link: '/admin/fields/pending/1',
  },
  {
    id: 'pa-3',
    type: 'referee',
    priority: 'high',
    title: 'Richiesta Arbitro',
    description: 'Marco Rossi ha richiesto di diventare arbitro',
    timestamp: '2024-01-15T08:45:00',
    link: '/admin/referees/pending/1',
  },
  {
    id: 'pa-4',
    type: 'user',
    priority: 'medium',
    title: 'Verifica Identità',
    description: 'Utente GHOST_ALPHA richiede verifica account',
    timestamp: '2024-01-14T18:20:00',
    link: '/admin/users/verify/1',
  },
  {
    id: 'pa-5',
    type: 'match',
    priority: 'low',
    title: 'Contestazione Risultato',
    description: 'Team Bravo contesta il risultato della partita #245',
    timestamp: '2024-01-14T16:00:00',
    link: '/admin/matches/dispute/1',
  },
];

export const MOCK_ADMIN_ACTIVITY_LOG: ActivityLog[] = [
  {
    id: 'al-1',
    adminName: 'Admin_Chief',
    adminAvatar: '/placeholder.svg',
    action: 'ha approvato',
    target: 'Campo Tactical Arena',
    targetType: 'field',
    timestamp: '2024-01-15T10:45:00',
  },
  {
    id: 'al-2',
    adminName: 'Admin_Chief',
    adminAvatar: '/placeholder.svg',
    action: 'ha bannato',
    target: 'TOXIC_PLAYER',
    targetType: 'user',
    timestamp: '2024-01-15T10:30:00',
  },
  {
    id: 'al-3',
    adminName: 'Mod_Alpha',
    adminAvatar: '/placeholder.svg',
    action: 'ha creato',
    target: 'Torneo Invernale 2024',
    targetType: 'match',
    timestamp: '2024-01-15T09:20:00',
  },
  {
    id: 'al-4',
    adminName: 'Admin_Chief',
    adminAvatar: '/placeholder.svg',
    action: 'ha promosso ad arbitro',
    target: 'REF_Marco',
    targetType: 'referee',
    timestamp: '2024-01-15T08:50:00',
  },
  {
    id: 'al-5',
    adminName: 'Mod_Alpha',
    adminAvatar: '/placeholder.svg',
    action: 'ha risolto segnalazione',
    target: 'Report #789',
    targetType: 'system',
    timestamp: '2024-01-14T18:30:00',
  },
  {
    id: 'al-6',
    adminName: 'Admin_Chief',
    adminAvatar: '/placeholder.svg',
    action: 'ha modificato',
    target: 'Regolamento Partite',
    targetType: 'system',
    timestamp: '2024-01-14T17:00:00',
  },
  {
    id: 'al-7',
    adminName: 'Mod_Beta',
    adminAvatar: '/placeholder.svg',
    action: 'ha verificato',
    target: 'SNIPER_PRO',
    targetType: 'user',
    timestamp: '2024-01-14T15:45:00',
  },
  {
    id: 'al-8',
    adminName: 'Admin_Chief',
    adminAvatar: '/placeholder.svg',
    action: 'ha aggiornato',
    target: 'ELO System',
    targetType: 'system',
    timestamp: '2024-01-14T14:20:00',
  },
  {
    id: 'al-9',
    adminName: 'Mod_Alpha',
    adminAvatar: '/placeholder.svg',
    action: 'ha sospeso',
    target: 'Partita #234',
    targetType: 'match',
    timestamp: '2024-01-14T12:00:00',
  },
  {
    id: 'al-10',
    adminName: 'Mod_Beta',
    adminAvatar: '/placeholder.svg',
    action: 'ha approvato',
    target: 'REF_Luigi',
    targetType: 'referee',
    timestamp: '2024-01-14T10:30:00',
  },
];

export const MOCK_LIVE_MATCHES: LiveMatch[] = [
  {
    id: 'lm-1',
    name: 'Night Ops: Raid Notturno',
    field: 'Urban Warfare Center',
    mode: 'Conquest',
    players: 24,
    maxPlayers: 30,
    startedAt: '2024-01-15T20:00:00',
    status: 'live',
  },
  {
    id: 'lm-2',
    name: 'Forest Strike Alpha',
    field: 'Green Zone Outdoor',
    mode: 'Team Deathmatch',
    players: 16,
    maxPlayers: 20,
    startedAt: '2024-01-15T19:30:00',
    status: 'live',
  },
  {
    id: 'lm-3',
    name: 'CQB Training Session',
    field: 'Bunker Zone Milano',
    mode: 'Domination',
    players: 12,
    maxPlayers: 16,
    startedAt: '2024-01-15T21:00:00',
    status: 'paused',
  },
];

export const MOCK_USERS_CHART_DATA = [
  { day: 'Lun', users: 145 },
  { day: 'Mar', users: 178 },
  { day: 'Mer', users: 156 },
  { day: 'Gio', users: 189 },
  { day: 'Ven', users: 234 },
  { day: 'Sab', users: 312 },
  { day: 'Dom', users: 287 },
];
