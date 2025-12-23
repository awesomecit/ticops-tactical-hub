import React, { useEffect, useState } from 'react';
import { Achievement } from '@/types/achievements';
import { getRarityColor, getRarityGlow } from '@/mocks/achievements';
import { useAchievementStore } from '@/stores/achievementStore';
import { Award, Star, BadgeCheck, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementUnlockAnimationProps {
  achievement?: Achievement;
  onComplete?: () => void;
  autoHide?: boolean;
  hideDelay?: number;
}

export const AchievementUnlockAnimation: React.FC<AchievementUnlockAnimationProps> = ({
  achievement: propAchievement,
  onComplete,
  autoHide = true,
  hideDelay = 4000,
}) => {
  const { recentUnlock, clearRecentUnlock } = useAchievementStore();
  const achievement = propAchievement || recentUnlock;
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      setIsExiting(false);

      if (autoHide) {
        const timer = setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
            clearRecentUnlock();
            onComplete?.();
          }, 500);
        }, hideDelay);

        return () => clearTimeout(timer);
      }
    }
  }, [achievement, autoHide, hideDelay, clearRecentUnlock, onComplete]);

  if (!isVisible || !achievement) return null;

  // Get icon component
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  const IconComponent = icons[achievement.icon] || Award;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-500",
          isExiting ? "opacity-0" : "opacity-100"
        )}
      />
      
      {/* Achievement Card */}
      <div
        className={cn(
          "relative flex flex-col items-center gap-4 p-8 rounded-lg border-2 bg-card/95 backdrop-blur",
          "transition-all duration-500 transform",
          getRarityColor(achievement.rarity),
          getRarityGlow(achievement.rarity),
          isExiting 
            ? "opacity-0 scale-75 translate-y-8" 
            : "opacity-100 scale-100 translate-y-0 animate-[bounce_0.5s_ease-out]"
        )}
      >
        {/* Glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-lg blur-xl opacity-30",
          achievement.rarity === 'legendary' && "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 animate-pulse",
          achievement.rarity === 'epic' && "bg-purple-500",
          achievement.rarity === 'rare' && "bg-blue-500"
        )} />

        {/* Header */}
        <div className="relative z-10 text-xs font-display uppercase tracking-widest text-muted-foreground">
          Achievement Sbloccato!
        </div>

        {/* Icon with animation */}
        <div className={cn(
          "relative z-10 w-20 h-20 rounded-full flex items-center justify-center",
          "border-2 bg-background/50",
          getRarityColor(achievement.rarity),
          "animate-[pulse_1s_ease-in-out_2]"
        )}>
          <IconComponent className="h-10 w-10" />
          
          {/* Sparkle effects for legendary */}
          {achievement.rarity === 'legendary' && (
            <>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-150" />
            </>
          )}
        </div>

        {/* Title */}
        <h3 className={cn(
          "relative z-10 text-xl font-display font-bold text-center",
          achievement.rarity === 'legendary' && "text-amber-400",
          achievement.rarity === 'epic' && "text-purple-400",
          achievement.rarity === 'rare' && "text-blue-400"
        )}>
          {achievement.name}
        </h3>

        {/* Description */}
        <p className="relative z-10 text-sm text-muted-foreground text-center max-w-xs">
          {achievement.description}
        </p>

        {/* XP Reward */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary">
          <Star className="h-4 w-4" />
          <span className="font-bold">+{achievement.reward.xp} XP</span>
        </div>

        {/* Badge reward indicator */}
        {achievement.reward.badge && (
          <div className="relative z-10 flex items-center gap-2 text-xs text-muted-foreground">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <span>Badge "{achievement.reward.badge.name}" sbloccato!</span>
          </div>
        )}
      </div>
    </div>
  );
};
