import { create } from 'zustand';
import { Achievement, Badge, Chest, MatchCelebration, UserAchievementStats, AchievementCategory } from '@/types/achievements';
import { mockAchievements, mockBadges, mockChests } from '@/mocks/achievements';

interface AchievementState {
  achievements: Achievement[];
  badges: Badge[];
  chests: Chest[];
  userBadges: Badge[];
  pendingCelebration: MatchCelebration | null;
  recentUnlock: Achievement | null;
  recentChest: Chest | null;
  
  // Actions
  unlockAchievement: (achievementId: string) => void;
  updateProgress: (achievementId: string, progress: number) => void;
  openChest: (chestId: string) => void;
  equipBadge: (badgeId: string) => void;
  purchaseBadge: (badgeId: string) => boolean;
  setCelebration: (celebration: MatchCelebration | null) => void;
  clearRecentUnlock: () => void;
  clearRecentChest: () => void;
  
  // Getters
  getUnlockedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
  getAchievementsByCategory: (category: AchievementCategory) => Achievement[];
  getUserStats: () => UserAchievementStats;
  getProgress: (achievementId: string) => number;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  achievements: mockAchievements,
  badges: mockBadges,
  chests: mockChests,
  userBadges: mockBadges.filter(b => b.unlockedAt || b.id === 'badge_medic'),
  pendingCelebration: null,
  recentUnlock: null,
  recentChest: null,

  unlockAchievement: (achievementId: string) => {
    set(state => {
      const achievement = state.achievements.find(a => a.id === achievementId);
      if (!achievement || achievement.unlockedAt) return state;

      const updatedAchievements = state.achievements.map(a =>
        a.id === achievementId
          ? { ...a, unlockedAt: new Date(), requirement: { ...a.requirement, current: a.requirement.target } }
          : a
      );

      // Add badge reward if exists
      let updatedUserBadges = [...state.userBadges];
      if (achievement.reward.badge && !state.userBadges.find(b => b.id === achievement.reward.badge?.id)) {
        updatedUserBadges.push({
          ...achievement.reward.badge,
          unlockedAt: new Date(),
        });
      }

      return {
        achievements: updatedAchievements,
        userBadges: updatedUserBadges,
        recentUnlock: { ...achievement, unlockedAt: new Date() },
      };
    });
  },

  updateProgress: (achievementId: string, progress: number) => {
    set(state => {
      const achievement = state.achievements.find(a => a.id === achievementId);
      if (!achievement || achievement.unlockedAt) return state;

      const newProgress = Math.min(progress, achievement.requirement.target);
      const isUnlocked = newProgress >= achievement.requirement.target;

      const updatedAchievements = state.achievements.map(a =>
        a.id === achievementId
          ? {
              ...a,
              requirement: { ...a.requirement, current: newProgress },
              unlockedAt: isUnlocked ? new Date() : undefined,
            }
          : a
      );

      const unlockedAchievement = isUnlocked
        ? { ...achievement, requirement: { ...achievement.requirement, current: newProgress }, unlockedAt: new Date() }
        : null;

      // Add badge reward if unlocked
      let updatedUserBadges = [...state.userBadges];
      if (isUnlocked && achievement.reward.badge && !state.userBadges.find(b => b.id === achievement.reward.badge?.id)) {
        updatedUserBadges.push({
          ...achievement.reward.badge,
          unlockedAt: new Date(),
        });
      }

      return {
        achievements: updatedAchievements,
        userBadges: updatedUserBadges,
        recentUnlock: unlockedAchievement,
      };
    });
  },

  openChest: (chestId: string) => {
    set(state => {
      const chest = state.chests.find(c => c.id === chestId);
      if (!chest || chest.openedAt) return state;

      const updatedChests = state.chests.map(c =>
        c.id === chestId ? { ...c, openedAt: new Date() } : c
      );

      return {
        chests: updatedChests,
        recentChest: { ...chest, openedAt: new Date() },
      };
    });
  },

  equipBadge: (badgeId: string) => {
    // Logic to equip badge to profile
    console.log('Equipping badge:', badgeId);
  },

  purchaseBadge: (badgeId: string) => {
    const badge = get().badges.find(b => b.id === badgeId);
    if (!badge || !badge.isPurchasable || get().userBadges.find(b => b.id === badgeId)) {
      return false;
    }

    set(state => ({
      userBadges: [...state.userBadges, { ...badge, unlockedAt: new Date() }],
    }));

    return true;
  },

  setCelebration: (celebration: MatchCelebration | null) => {
    set({ pendingCelebration: celebration });
  },

  clearRecentUnlock: () => {
    set({ recentUnlock: null });
  },

  clearRecentChest: () => {
    set({ recentChest: null });
  },

  getUnlockedAchievements: () => {
    return get().achievements.filter(a => a.unlockedAt);
  },

  getLockedAchievements: () => {
    return get().achievements.filter(a => !a.unlockedAt && !a.isSecret);
  },

  getAchievementsByCategory: (category: AchievementCategory) => {
    return get().achievements.filter(a => a.category === category);
  },

  getUserStats: (): UserAchievementStats => {
    const achievements = get().achievements;
    const unlocked = achievements.filter(a => a.unlockedAt);

    const categoryProgress = (['combat', 'teamwork', 'strategy', 'social', 'exploration', 'special'] as AchievementCategory[])
      .reduce((acc, cat) => {
        const catAchievements = achievements.filter(a => a.category === cat);
        acc[cat] = {
          unlocked: catAchievements.filter(a => a.unlockedAt).length,
          total: catAchievements.filter(a => !a.isSecret).length,
        };
        return acc;
      }, {} as Record<AchievementCategory, { unlocked: number; total: number }>);

    const rarest = unlocked
      .filter(a => a.rarity === 'legendary' || a.rarity === 'epic')
      .sort((a, b) => {
        const order = { legendary: 0, epic: 1, rare: 2, common: 3 };
        return order[a.rarity] - order[b.rarity];
      })[0] || null;

    return {
      totalAchievements: achievements.filter(a => !a.isSecret).length,
      unlockedAchievements: unlocked.length,
      totalXpFromAchievements: unlocked.reduce((sum, a) => sum + a.reward.xp, 0),
      rarest,
      recentUnlocks: unlocked
        .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
        .slice(0, 3),
      categoryProgress,
    };
  },

  getProgress: (achievementId: string) => {
    const achievement = get().achievements.find(a => a.id === achievementId);
    if (!achievement) return 0;
    return (achievement.requirement.current / achievement.requirement.target) * 100;
  },
}));
