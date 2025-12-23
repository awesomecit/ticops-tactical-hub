export type InboxItemType = 'team_join_request' | 'team_challenge' | 'match_result' | 'achievement' | 'announcement' | 'system';

export interface IMockInboxItem {
  id: string;
  type: InboxItemType;
  teamId: string;
  title: string;
  timestamp: Date;
  isRead: boolean;
  data: Record<string, any>;
}

export const MOCK_INBOX_ITEMS: IMockInboxItem[] = [
  // Join Requests
  {
    id: 'inbox_001',
    type: 'team_join_request',
    teamId: 'team_001',
    title: 'LoneWolf99 vuole unirsi',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: false,
    data: {
      userId: 'user_002',
      username: 'LoneWolf99',
      tier: 'silver',
      tierLevel: 3,
      elo: 1150,
      kdRatio: 1.24,
      matches: 28,
      winRate: 50.0,
      message: 'Ciao! Sono LoneWolf99, cerco un team competitivo. Ho esperienza in ruoli di supporto e sniper.',
    },
  },
  {
    id: 'inbox_002',
    type: 'team_join_request',
    teamId: 'team_001',
    title: 'NewRecruit vuole unirsi',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    isRead: false,
    data: {
      userId: 'user_001',
      username: 'NewRecruit',
      tier: 'bronze',
      tierLevel: 1,
      elo: 850,
      kdRatio: 0.53,
      matches: 3,
      winRate: 33.3,
      message: 'Salve, sono nuovo ma molto motivato. Vorrei imparare dai migliori!',
    },
  },

  // Team Challenges
  {
    id: 'inbox_003',
    type: 'team_challenge',
    teamId: 'team_001',
    title: 'Alpha Squad vi sfida',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    isRead: false,
    data: {
      challengerTeamId: 'team_002',
      challengerTeamName: 'Alpha Squad',
      challengerTeamTag: 'ASQ',
      challengerTeamRank: 15,
      proposedDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      fieldId: 'field_001',
      fieldName: 'Campo Alpha',
      gameMode: 'Team Deathmatch',
      message: 'Vi sfidiamo per il titolo regionale! Pronti?',
    },
  },

  // Match Results
  {
    id: 'inbox_004',
    type: 'match_result',
    teamId: 'team_001',
    title: 'Risultato: VITTORIA',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true,
    data: {
      result: 'victory',
      matchId: 'match_001',
      matchName: 'Torneo Regionale - Round 1',
      opponentTeam: 'Red Legion',
      score: { team: 3, opponent: 1 },
      eloChange: +25,
      mvpUserId: 'user_003',
      mvpUsername: 'GhostSniper92',
      mvpKills: 12,
    },
  },
  {
    id: 'inbox_005',
    type: 'match_result',
    teamId: 'team_001',
    title: 'Risultato: SCONFITTA',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    isRead: true,
    data: {
      result: 'defeat',
      matchId: 'match_002',
      matchName: 'Friendly Match',
      opponentTeam: 'Phantom Brigade',
      score: { team: 2, opponent: 3 },
      eloChange: -15,
      mvpUserId: 'user_004',
      mvpUsername: 'TacticalMike',
      mvpKills: 8,
    },
  },

  // Achievements
  {
    id: 'inbox_006',
    type: 'achievement',
    teamId: 'team_001',
    title: 'Nuovo badge: Winning Streak',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    isRead: true,
    data: {
      badgeId: 'badge_001',
      badgeName: 'Winning Streak',
      badgeIcon: '🔥',
      badgeDescription: '5 vittorie consecutive',
      xpReward: 500,
    },
  },
  {
    id: 'inbox_007',
    type: 'achievement',
    teamId: 'team_001',
    title: 'Nuovo badge: Top 25',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    isRead: true,
    data: {
      badgeId: 'badge_002',
      badgeName: 'Top 25',
      badgeIcon: '🏅',
      badgeDescription: 'Raggiunto il rank #25 nazionale',
      xpReward: 1000,
    },
  },

  // Announcements
  {
    id: 'inbox_008',
    type: 'announcement',
    teamId: 'team_001',
    title: 'GhostSniper92: Training obbligatorio',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    isRead: true,
    data: {
      authorId: 'user_003',
      authorName: 'GhostSniper92',
      authorRole: 'leader',
      message: 'Ragazzi, training obbligatorio venerdì alle 20:00. Dobbiamo preparare le strategie per il torneo. Confermate presenza!',
      eventDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      isPinned: true,
    },
  },

  // System
  {
    id: 'inbox_009',
    type: 'system',
    teamId: 'team_001',
    title: 'Aggiornamento regolamento torneo',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    isRead: true,
    data: {
      message: 'Il regolamento del Torneo Regionale è stato aggiornato. Consulta le nuove regole prima della prossima partita.',
      link: '/rules/tournament',
    },
  },
  {
    id: 'inbox_010',
    type: 'system',
    teamId: 'team_001',
    title: 'Manutenzione server programmata',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
    isRead: true,
    data: {
      message: 'Manutenzione programmata per giovedì 02:00-04:00. I servizi potrebbero essere temporaneamente non disponibili.',
      maintenanceDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
    },
  },
];

export const getInboxItemsByTeam = (teamId: string): IMockInboxItem[] => {
  return MOCK_INBOX_ITEMS
    .filter(item => item.teamId === teamId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const getInboxItemsByType = (teamId: string, type: InboxItemType): IMockInboxItem[] => {
  return getInboxItemsByTeam(teamId).filter(item => item.type === type);
};

export const getUnreadCountByType = (teamId: string, type?: InboxItemType): number => {
  const items = type
    ? getInboxItemsByType(teamId, type)
    : getInboxItemsByTeam(teamId);
  return items.filter(item => !item.isRead).length;
};
