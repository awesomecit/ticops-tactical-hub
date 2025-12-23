import { useEffect, useRef } from 'react';
import { useAchievementStore } from '@/stores/achievementStore';
import { toast } from 'sonner';
import { Achievement } from '@/types/achievements';

/**
 * Hook that watches for achievement unlocks and shows toast notifications
 * Should be used in MainLayout for global notifications
 */
export const useAchievementNotifications = () => {
  const { recentUnlock, clearRecentUnlock } = useAchievementStore();
  const shownAchievements = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (recentUnlock && !shownAchievements.current.has(recentUnlock.id)) {
      shownAchievements.current.add(recentUnlock.id);
      
      // Show toast notification
      showAchievementToast(recentUnlock);
      
      // Clear after showing (with delay for animation)
      setTimeout(() => {
        clearRecentUnlock();
      }, 100);
    }
  }, [recentUnlock, clearRecentUnlock]);
};

const getRarityEmoji = (rarity: Achievement['rarity']): string => {
  const emojis: Record<Achievement['rarity'], string> = {
    common: '⭐',
    rare: '💎',
    epic: '🔮',
    legendary: '👑',
  };
  return emojis[rarity];
};

const showAchievementToast = (achievement: Achievement) => {
  const emoji = getRarityEmoji(achievement.rarity);
  
  toast.success(`${emoji} Achievement: ${achievement.name}`, {
    description: `${achievement.description} (+${achievement.reward.xp} XP)`,
    duration: 5000,
  });
};
