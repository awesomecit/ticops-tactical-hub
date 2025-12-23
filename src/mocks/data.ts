import { User, Team, Game, Rank, ChatMessage, Notification } from '@/types';

export const mockRanks: Rank[] = [
  { id: '1', name: 'Recluta', level: 1, icon: '🎖️', minXP: 0 },
  { id: '2', name: 'Soldato', level: 2, icon: '⭐', minXP: 500 },
  { id: '3', name: 'Caporale', level: 3, icon: '⭐⭐', minXP: 1500 },
  { id: '4', name: 'Sergente', level: 4, icon: '🏅', minXP: 3000 },
  { id: '5', name: 'Tenente', level: 5, icon: '🎗️', minXP: 6000 },
  { id: '6', name: 'Capitano', level: 6, icon: '👑', minXP: 10000 },
];

export const mockUser: User = {
  id: '1',
  username: 'ghost_recon',
  callsign: 'GHOST',
  email: 'ghost@ticops.it',
  avatar: undefined,
  rank: mockRanks[3],
  stats: {
    gamesPlayed: 47,
    wins: 32,
    kills: 156,
    deaths: 89,
    accuracy: 67.5,
    xp: 4250,
  },
  createdAt: new Date('2024-01-15'),
};

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Delta Force',
    tag: 'DF',
    color: 'alpha',
    members: [],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Red Legion',
    tag: 'RL',
    color: 'bravo',
    members: [],
    createdAt: new Date('2024-02-01'),
  },
];

export const mockGames: Game[] = [
  {
    id: '1',
    name: 'Operazione Tempesta',
    description: 'Missione di conquista territorio. Due squadre si scontrano per il controllo di 5 checkpoint strategici.',
    date: new Date('2024-12-28T14:00:00'),
    location: {
      id: '1',
      name: 'Campo Alfa',
      address: 'Via Roma 123, Milano',
    },
    gameMode: {
      id: '1',
      name: 'Domination',
      description: 'Conquista e mantieni i checkpoint',
      icon: '🎯',
      rules: ['5 checkpoint', '30 minuti', 'Respawn illimitato'],
    },
    status: 'upcoming',
    maxPlayers: 40,
    registeredPlayers: [],
    teams: [],
  },
  {
    id: '2',
    name: 'Night Ops - Raid Notturno',
    description: 'Operazione speciale in notturna. Equipaggiamento NVG consigliato.',
    date: new Date('2024-12-30T21:00:00'),
    location: {
      id: '2',
      name: 'Bosco Nero',
      address: 'SP42, Bergamo',
    },
    gameMode: {
      id: '2',
      name: 'Search & Destroy',
      description: 'Trova e distruggi l\'obiettivo nemico',
      icon: '💣',
      rules: ['No respawn', '2 round', 'Tempo limite 15 min'],
    },
    status: 'upcoming',
    maxPlayers: 24,
    registeredPlayers: [],
    teams: [],
  },
  {
    id: '3',
    name: 'Training Day',
    description: 'Sessione di allenamento aperta a tutti i livelli.',
    date: new Date('2024-12-25T10:00:00'),
    location: {
      id: '1',
      name: 'Campo Alfa',
      address: 'Via Roma 123, Milano',
    },
    gameMode: {
      id: '3',
      name: 'Team Deathmatch',
      description: 'Elimina più nemici possibile',
      icon: '⚔️',
      rules: ['Respawn 30s', 'Tempo 20 min'],
    },
    status: 'live',
    maxPlayers: 30,
    registeredPlayers: [],
    teams: [],
  },
];

export const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: '2',
    sender: { ...mockUser, id: '2', username: 'viper_one', callsign: 'VIPER' },
    content: 'Pronti per domenica? Ho controllato il campo, condizioni perfette.',
    type: 'text',
    channelId: 'global',
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '2',
    senderId: '3',
    sender: { ...mockUser, id: '3', username: 'shadow_wolf', callsign: 'SHADOW' },
    content: 'Confermo presenza. Porto anche 2 nuove reclute.',
    type: 'text',
    channelId: 'global',
    createdAt: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: '3',
    senderId: '1',
    sender: mockUser,
    content: 'Ottimo! Ci vediamo alle 13:30 per briefing.',
    type: 'text',
    channelId: 'global',
    createdAt: new Date(Date.now() - 1000 * 60 * 1),
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Nuova Partita',
    message: 'Operazione Tempesta inizia tra 3 giorni',
    type: 'game',
    read: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    userId: '1',
    title: 'Promozione!',
    message: 'Hai raggiunto il grado di Sergente',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
  },
];
