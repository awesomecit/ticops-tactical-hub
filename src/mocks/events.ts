import { UserEvent, UserSummary, UserAchievement, UserActivityItem, UserRole } from '@/types';

// Mock Events for current user
export const MOCK_USER_EVENTS: UserEvent[] = [
  {
    id: 'event_001',
    userId: 'current_user',
    type: 'match',
    title: 'Torneo Regionale - Semifinale',
    description: 'Semifinale del torneo regionale Lombardia',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // In 2 days
    location: {
      name: 'Campo Alpha Zone',
      address: 'Via Roma 123, Milano',
    },
    status: 'upcoming',
    teamId: 'team_001',
    teamName: 'Shadow Wolves',
    participants: 48,
    isOrganizer: false,
  },
  {
    id: 'event_002',
    userId: 'current_user',
    type: 'training',
    title: 'Allenamento Team - Tattiche CQB',
    description: 'Sessione di allenamento focalizzata su tattiche CQB',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // In 5 days
    location: {
      name: 'Indoor Arena Milano',
      address: 'Via Industria 45, Milano',
    },
    status: 'upcoming',
    teamId: 'team_001',
    teamName: 'Shadow Wolves',
    participants: 12,
    isOrganizer: true,
  },
  {
    id: 'event_003',
    userId: 'current_user',
    type: 'match',
    title: 'Match Amichevole vs Red Devils',
    description: 'Partita amichevole contro il team Red Devils',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    location: {
      name: 'Battleground Milano',
      address: 'Via Tito Livio 10, Milano',
    },
    status: 'completed',
    teamId: 'team_001',
    teamName: 'Shadow Wolves',
    result: {
      won: true,
      score: '3-1',
      kills: 12,
      deaths: 4,
    },
    participants: 24,
  },
  {
    id: 'event_004',
    userId: 'current_user',
    type: 'tournament',
    title: 'Campionato Italiano - Fase Eliminatoria',
    description: 'Prima fase del campionato nazionale',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 2 weeks ago
    location: {
      name: 'Arena Nazionale',
      address: 'Via dello Sport 1, Roma',
    },
    status: 'completed',
    teamId: 'team_001',
    teamName: 'Shadow Wolves',
    result: {
      won: true,
      score: '5-2',
      kills: 18,
      deaths: 6,
    },
    participants: 96,
  },
  {
    id: 'event_005',
    userId: 'current_user',
    type: 'social',
    title: 'Meetup Community Airsoft Milano',
    description: 'Evento sociale per la community airsoft',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // In 10 days
    location: {
      name: 'Pub The Bunker',
      address: 'Corso Buenos Aires 89, Milano',
    },
    status: 'upcoming',
    participants: 35,
  },
  {
    id: 'event_006',
    userId: 'current_user',
    type: 'match',
    title: 'Domination Night Game',
    description: 'Partita notturna modalità Domination',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    location: {
      name: 'Night Ops Arena',
      address: 'Via Notturna 22, Bergamo',
    },
    status: 'completed',
    result: {
      won: false,
      score: '1-2',
      kills: 8,
      deaths: 9,
    },
    participants: 32,
  },
];

// Mock Achievements
export const MOCK_USER_ACHIEVEMENTS: UserAchievement[] = [
  {
    id: 'ach_001',
    name: 'First Blood',
    description: 'Ottieni la prima eliminazione in una partita',
    icon: '🎯',
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    rarity: 'common',
  },
  {
    id: 'ach_002',
    name: 'Sharpshooter',
    description: 'Mantieni una precisione del 75%+ in 10 partite',
    icon: '🔫',
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    rarity: 'rare',
  },
  {
    id: 'ach_003',
    name: 'Team Player',
    description: 'Partecipa a 50 partite con il tuo team',
    icon: '🤝',
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    rarity: 'rare',
  },
  {
    id: 'ach_004',
    name: 'Unstoppable',
    description: 'Vinci 10 partite consecutive',
    icon: '🔥',
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    rarity: 'epic',
  },
  {
    id: 'ach_005',
    name: 'Legend',
    description: 'Raggiungi il rango Diamond',
    icon: '💎',
    unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    rarity: 'legendary',
  },
];

// Mock Activity
export const MOCK_USER_ACTIVITY: UserActivityItem[] = [
  {
    id: 'act_001',
    type: 'match',
    title: 'Vittoria vs Red Devils',
    description: 'Match amichevole vinto 3-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    icon: '🏆',
  },
  {
    id: 'act_002',
    type: 'achievement',
    title: 'Achievement Sbloccato',
    description: 'Legend - Raggiungi il rango Diamond',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    icon: '💎',
  },
  {
    id: 'act_003',
    type: 'rank_up',
    title: 'Rank Up!',
    description: 'Sei salito a Diamond III',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    icon: '⬆️',
  },
  {
    id: 'act_004',
    type: 'event',
    title: 'Iscrizione Evento',
    description: 'Torneo Regionale - Semifinale',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    icon: '📅',
  },
  {
    id: 'act_005',
    type: 'match',
    title: 'Partita Completata',
    description: 'Domination Night Game - Sconfitta 1-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    icon: '🎮',
  },
];

// Mock Summary for current user
export const MOCK_USER_SUMMARY: UserSummary = {
  userId: 'current_user',
  role: 'player',
  totalEvents: 47,
  upcomingEvents: 3,
  completedEvents: 44,
  winRate: 68.5,
  avgKD: 2.4,
  totalKills: 892,
  totalDeaths: 372,
  hoursPlayed: 156,
  favoriteLocation: 'Campo Alpha Zone',
  currentStreak: 4,
  longestStreak: 12,
  achievements: MOCK_USER_ACHIEVEMENTS,
  recentActivity: MOCK_USER_ACTIVITY,
};

// Helper functions
export const getUserEvents = (userId: string, status?: 'upcoming' | 'completed'): UserEvent[] => {
  let events = MOCK_USER_EVENTS.filter(e => e.userId === userId || userId === 'current_user');
  
  if (status === 'upcoming') {
    events = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
  } else if (status === 'completed') {
    events = events.filter(e => e.status === 'completed' || e.status === 'cancelled');
  }
  
  return events.sort((a, b) => {
    if (status === 'upcoming') {
      return a.date.getTime() - b.date.getTime();
    }
    return b.date.getTime() - a.date.getTime();
  });
};

export const getUserSummary = (userId: string): UserSummary => {
  return MOCK_USER_SUMMARY;
};

// Role-specific summary data
export const getRoleSummaryData = (role: UserRole) => {
  switch (role) {
    case 'player':
      return {
        title: 'Sommario Giocatore',
        stats: [
          { label: 'Partite Giocate', value: '47', icon: '🎮' },
          { label: 'Win Rate', value: '68.5%', icon: '🏆' },
          { label: 'K/D Ratio', value: '2.4', icon: '🎯' },
          { label: 'Ore Giocate', value: '156h', icon: '⏱️' },
        ],
      };
    case 'team_leader':
      return {
        title: 'Sommario Team Leader',
        stats: [
          { label: 'Membri Team', value: '12', icon: '👥' },
          { label: 'Partite Team', value: '89', icon: '🎮' },
          { label: 'Win Rate Team', value: '72%', icon: '🏆' },
          { label: 'Eventi Organizzati', value: '15', icon: '📅' },
        ],
      };
    case 'referee':
      return {
        title: 'Sommario Arbitro',
        stats: [
          { label: 'Partite Arbitrate', value: '124', icon: '⚖️' },
          { label: 'Tornei', value: '8', icon: '🏅' },
          { label: 'Rating', value: '4.8/5', icon: '⭐' },
          { label: 'Ore Attive', value: '312h', icon: '⏱️' },
        ],
      };
    case 'field_manager':
      return {
        title: 'Sommario Gestore Campo',
        stats: [
          { label: 'Prenotazioni', value: '234', icon: '📋' },
          { label: 'Eventi Ospitati', value: '67', icon: '🎪' },
          { label: 'Rating Campo', value: '4.6/5', icon: '⭐' },
          { label: 'Giocatori Totali', value: '1.2k', icon: '👥' },
        ],
      };
    case 'shop_owner':
      return {
        title: 'Sommario Proprietario Shop',
        stats: [
          { label: 'Prodotti', value: '156', icon: '📦' },
          { label: 'Ordini', value: '892', icon: '🛒' },
          { label: 'Rating', value: '4.7/5', icon: '⭐' },
          { label: 'Clienti', value: '456', icon: '👥' },
        ],
      };
    default:
      return {
        title: 'Sommario',
        stats: [],
      };
  }
};
