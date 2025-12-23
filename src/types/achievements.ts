// Achievement Categories
export type AchievementCategory = 
  | 'combat' 
  | 'teamwork' 
  | 'strategy' 
  | 'social' 
  | 'exploration' 
  | 'special';

// Achievement Rarity
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

// Badge with special abilities
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  rarity: AchievementRarity;
  category: AchievementCategory;
  ability?: {
    name: string;
    description: string;
    cooldownMinutes?: number;
  };
  unlockedAt?: Date;
  isPurchasable: boolean;
  price?: number; // in-game currency
}

// Achievement with progress tracking
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  requirement: {
    type: 'count' | 'streak' | 'time' | 'single';
    target: number;
    current: number;
  };
  reward: {
    xp: number;
    badge?: Badge;
    chestId?: string;
  };
  unlockedAt?: Date;
  isSecret?: boolean;
}

// Chest types
export type ChestType = 'bronze' | 'silver' | 'gold' | 'legendary';

export interface ChestReward {
  type: 'xp' | 'badge' | 'cosmetic' | 'currency';
  value: number | string;
  rarity: AchievementRarity;
}

export interface Chest {
  id: string;
  type: ChestType;
  name: string;
  description: string;
  rewards: ChestReward[];
  openedAt?: Date;
  source: 'achievement' | 'match' | 'purchase' | 'event';
}

// Match celebration data
export interface MatchCelebration {
  matchId: string;
  playerId: string;
  achievements: Achievement[];
  xpGained: number;
  levelUp?: {
    from: number;
    to: number;
  };
  mvp?: boolean;
  highlights: {
    type: 'kill' | 'assist' | 'objective' | 'streak';
    value: number;
    label: string;
  }[];
}

// User achievement stats
export interface UserAchievementStats {
  totalAchievements: number;
  unlockedAchievements: number;
  totalXpFromAchievements: number;
  rarest: Achievement | null;
  recentUnlocks: Achievement[];
  categoryProgress: Record<AchievementCategory, { unlocked: number; total: number }>;
}
