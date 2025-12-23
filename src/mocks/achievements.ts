import { Achievement, Badge, Chest, AchievementCategory, AchievementRarity } from '@/types/achievements';

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: 'badge_sharpshooter',
    name: 'Cecchino',
    description: 'Precisione letale a lunga distanza',
    icon: 'Crosshair',
    rarity: 'rare',
    category: 'combat',
    isPurchasable: false,
  },
  {
    id: 'badge_medic',
    name: 'Medico da Campo',
    description: 'Specialista nel supporto alla squadra',
    icon: 'Heart',
    rarity: 'common',
    category: 'teamwork',
    isPurchasable: true,
    price: 500,
  },
  {
    id: 'badge_engineer',
    name: 'Ingegnere',
    description: 'Maestro delle comunicazioni radio',
    icon: 'Radio',
    rarity: 'epic',
    category: 'special',
    ability: {
      name: 'Scanner Frequenze',
      description: 'Può intercettare le comunicazioni nemiche per 30 secondi',
      cooldownMinutes: 10,
    },
    isPurchasable: false,
  },
  {
    id: 'badge_ghost',
    name: 'Fantasma',
    description: 'Maestro del movimento silenzioso',
    icon: 'Ghost',
    rarity: 'legendary',
    category: 'strategy',
    ability: {
      name: 'Invisibilità Tattica',
      description: 'Non appari sulla mappa per 60 secondi',
      cooldownMinutes: 15,
    },
    isPurchasable: false,
  },
  {
    id: 'badge_captain',
    name: 'Capitano',
    description: 'Leader naturale della squadra',
    icon: 'Crown',
    rarity: 'epic',
    category: 'teamwork',
    isPurchasable: false,
  },
  {
    id: 'badge_veteran',
    name: 'Veterano',
    description: '100+ partite giocate',
    icon: 'Medal',
    rarity: 'rare',
    category: 'exploration',
    isPurchasable: false,
  },
  {
    id: 'badge_social',
    name: 'Ambasciatore',
    description: 'Connesso con 50+ giocatori',
    icon: 'Users',
    rarity: 'common',
    category: 'social',
    isPurchasable: false,
  },
  {
    id: 'badge_first_blood',
    name: 'Prima Eliminazione',
    description: 'Primo sangue in 10 partite',
    icon: 'Sword',
    rarity: 'rare',
    category: 'combat',
    isPurchasable: false,
  },
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'ach_first_game',
    name: 'Battesimo del Fuoco',
    description: 'Completa la tua prima partita',
    icon: 'Flame',
    category: 'exploration',
    rarity: 'common',
    requirement: { type: 'single', target: 1, current: 1 },
    reward: { xp: 100 },
    unlockedAt: new Date('2024-01-15'),
  },
  {
    id: 'ach_10_games',
    name: 'Soldato',
    description: 'Completa 10 partite',
    icon: 'Shield',
    category: 'exploration',
    rarity: 'common',
    requirement: { type: 'count', target: 10, current: 10 },
    reward: { xp: 250 },
    unlockedAt: new Date('2024-02-20'),
  },
  {
    id: 'ach_50_games',
    name: 'Guerriero',
    description: 'Completa 50 partite',
    icon: 'Swords',
    category: 'exploration',
    rarity: 'rare',
    requirement: { type: 'count', target: 50, current: 32 },
    reward: { xp: 500, badge: mockBadges.find(b => b.id === 'badge_veteran') },
  },
  {
    id: 'ach_first_kill',
    name: 'Primo Sangue',
    description: 'Ottieni la tua prima eliminazione',
    icon: 'Target',
    category: 'combat',
    rarity: 'common',
    requirement: { type: 'single', target: 1, current: 1 },
    reward: { xp: 50 },
    unlockedAt: new Date('2024-01-15'),
  },
  {
    id: 'ach_100_kills',
    name: 'Centurione',
    description: 'Ottieni 100 eliminazioni totali',
    icon: 'Skull',
    category: 'combat',
    rarity: 'rare',
    requirement: { type: 'count', target: 100, current: 67 },
    reward: { xp: 750 },
  },
  {
    id: 'ach_5_streak',
    name: 'Inarrestabile',
    description: 'Ottieni 5 eliminazioni senza morire',
    icon: 'Zap',
    category: 'combat',
    rarity: 'epic',
    requirement: { type: 'streak', target: 5, current: 3 },
    reward: { xp: 500, badge: mockBadges.find(b => b.id === 'badge_sharpshooter') },
  },
  {
    id: 'ach_team_player',
    name: 'Giocatore di Squadra',
    description: 'Ottieni 50 assistenze totali',
    icon: 'Handshake',
    category: 'teamwork',
    rarity: 'common',
    requirement: { type: 'count', target: 50, current: 50 },
    reward: { xp: 300 },
    unlockedAt: new Date('2024-03-01'),
  },
  {
    id: 'ach_mvp',
    name: 'MVP',
    description: 'Diventa MVP in 5 partite',
    icon: 'Trophy',
    category: 'special',
    rarity: 'epic',
    requirement: { type: 'count', target: 5, current: 2 },
    reward: { xp: 1000, chestId: 'chest_gold_1' },
  },
  {
    id: 'ach_win_streak',
    name: 'Invincibile',
    description: 'Vinci 5 partite consecutive',
    icon: 'TrendingUp',
    category: 'strategy',
    rarity: 'legendary',
    requirement: { type: 'streak', target: 5, current: 2 },
    reward: { xp: 1500, badge: mockBadges.find(b => b.id === 'badge_ghost') },
  },
  {
    id: 'ach_social_butterfly',
    name: 'Farfalla Sociale',
    description: 'Aggiungi 20 amici',
    icon: 'Heart',
    category: 'social',
    rarity: 'common',
    requirement: { type: 'count', target: 20, current: 12 },
    reward: { xp: 200 },
  },
  {
    id: 'ach_secret_spot',
    name: '???',
    description: 'Scopri un segreto nascosto',
    icon: 'HelpCircle',
    category: 'exploration',
    rarity: 'legendary',
    requirement: { type: 'single', target: 1, current: 0 },
    reward: { xp: 2000 },
    isSecret: true,
  },
];

// Mock Chests
export const mockChests: Chest[] = [
  {
    id: 'chest_bronze_1',
    type: 'bronze',
    name: 'Baule di Bronzo',
    description: 'Contiene ricompense base',
    rewards: [
      { type: 'xp', value: 100, rarity: 'common' },
      { type: 'currency', value: 50, rarity: 'common' },
    ],
    source: 'match',
  },
  {
    id: 'chest_silver_1',
    type: 'silver',
    name: 'Baule d\'Argento',
    description: 'Contiene ricompense migliori',
    rewards: [
      { type: 'xp', value: 250, rarity: 'rare' },
      { type: 'currency', value: 150, rarity: 'rare' },
    ],
    source: 'achievement',
  },
  {
    id: 'chest_gold_1',
    type: 'gold',
    name: 'Baule d\'Oro',
    description: 'Contiene ricompense preziose',
    rewards: [
      { type: 'xp', value: 500, rarity: 'epic' },
      { type: 'badge', value: 'badge_captain', rarity: 'epic' },
    ],
    source: 'achievement',
  },
  {
    id: 'chest_legendary_1',
    type: 'legendary',
    name: 'Baule Leggendario',
    description: 'Contiene ricompense estremamente rare',
    rewards: [
      { type: 'xp', value: 1000, rarity: 'legendary' },
      { type: 'badge', value: 'badge_engineer', rarity: 'legendary' },
    ],
    source: 'event',
  },
];

// Helper to get rarity color
export const getRarityColor = (rarity: AchievementRarity): string => {
  const colors: Record<AchievementRarity, string> = {
    common: 'text-slate-400 border-slate-500/30 bg-slate-500/10',
    rare: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    epic: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    legendary: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  };
  return colors[rarity];
};

export const getRarityGlow = (rarity: AchievementRarity): string => {
  const glows: Record<AchievementRarity, string> = {
    common: '',
    rare: 'shadow-blue-500/20',
    epic: 'shadow-purple-500/30',
    legendary: 'shadow-amber-500/40 shadow-lg',
  };
  return glows[rarity];
};

export const getCategoryLabel = (category: AchievementCategory): string => {
  const labels: Record<AchievementCategory, string> = {
    combat: 'Combattimento',
    teamwork: 'Lavoro di Squadra',
    strategy: 'Strategia',
    social: 'Social',
    exploration: 'Esplorazione',
    special: 'Speciale',
  };
  return labels[category];
};

export const getChestColor = (type: Chest['type']): string => {
  const colors: Record<Chest['type'], string> = {
    bronze: 'from-orange-700 to-orange-900',
    silver: 'from-slate-300 to-slate-500',
    gold: 'from-yellow-400 to-yellow-600',
    legendary: 'from-purple-500 via-pink-500 to-amber-500',
  };
  return colors[type];
};
