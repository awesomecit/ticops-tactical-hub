import React, { useEffect, useState } from 'react';
import { MatchCelebration } from '@/types/achievements';
import { useAchievementStore } from '@/stores/achievementStore';
import { Trophy, Star, Target, Users, TrendingUp, Swords, Award, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AchievementUnlockAnimation } from './AchievementUnlockAnimation';

interface MatchEndCelebrationProps {
  celebration?: MatchCelebration;
  onComplete?: () => void;
}

export const MatchEndCelebration: React.FC<MatchEndCelebrationProps> = ({
  celebration: propCelebration,
  onComplete,
}) => {
  const { pendingCelebration, setCelebration } = useAchievementStore();
  const celebration = propCelebration || pendingCelebration;
  const [phase, setPhase] = useState<'intro' | 'stats' | 'achievements' | 'done'>('intro');
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);

  useEffect(() => {
    if (celebration) {
      setPhase('intro');
      const timer1 = setTimeout(() => setPhase('stats'), 1500);
      return () => clearTimeout(timer1);
    }
  }, [celebration]);

  const handleContinue = () => {
    if (phase === 'stats') {
      if (celebration?.achievements.length) {
        setPhase('achievements');
      } else {
        handleClose();
      }
    } else if (phase === 'achievements') {
      if (currentAchievementIndex < (celebration?.achievements.length || 0) - 1) {
        setCurrentAchievementIndex(prev => prev + 1);
      } else {
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setPhase('done');
    setCelebration(null);
    onComplete?.();
  };

  if (!celebration) return null;

  const highlightIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    kill: Target,
    assist: Users,
    objective: Trophy,
    streak: TrendingUp,
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md">
      {/* Intro Phase */}
      {phase === 'intro' && (
        <div className="flex flex-col items-center gap-6 animate-scale-in">
          {celebration.mvp ? (
            <>
              <div className="relative">
                <Trophy className="h-24 w-24 text-yellow-400 animate-bounce" />
                <div className="absolute inset-0 blur-2xl bg-yellow-500/30" />
              </div>
              <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                MVP!
              </h1>
            </>
          ) : (
            <>
              <Award className="h-20 w-20 text-primary animate-pulse" />
              <h1 className="text-3xl font-display font-bold">Partita Completata!</h1>
            </>
          )}
        </div>
      )}

      {/* Stats Phase */}
      {phase === 'stats' && (
        <div className="flex flex-col items-center gap-8 max-w-md w-full px-4 animate-fade-in">
          <h2 className="text-2xl font-display font-bold">Risultati</h2>

          {/* XP Gained */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">XP Guadagnati</span>
              <span className="text-xl font-bold text-primary flex items-center gap-1">
                <Star className="h-5 w-5" />
                +{celebration.xpGained}
              </span>
            </div>
            <Progress value={75} className="h-2" />
          </div>

          {/* Level Up */}
          {celebration.levelUp && (
            <div className="flex items-center gap-3 px-6 py-4 rounded-lg bg-primary/20 border border-primary/30 animate-pulse">
              <ChevronUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Livello Aumentato!</p>
                <p className="text-xl font-display font-bold">
                  Lv. {celebration.levelUp.from} → Lv. {celebration.levelUp.to}
                </p>
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {celebration.highlights.map((highlight, i) => {
              const Icon = highlightIcons[highlight.type] || Swords;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{highlight.value}</p>
                    <p className="text-xs text-muted-foreground">{highlight.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Achievements Preview */}
          {celebration.achievements.length > 0 && (
            <div className="text-center text-muted-foreground">
              <p className="text-sm">
                🏆 {celebration.achievements.length} achievement sbloccati!
              </p>
            </div>
          )}

          <Button onClick={handleContinue} size="lg" className="px-8">
            {celebration.achievements.length > 0 ? 'Vedi Achievement' : 'Chiudi'}
          </Button>
        </div>
      )}

      {/* Achievements Phase */}
      {phase === 'achievements' && celebration.achievements[currentAchievementIndex] && (
        <div className="relative w-full h-full flex items-center justify-center">
          <AchievementUnlockAnimation
            achievement={celebration.achievements[currentAchievementIndex]}
            autoHide={false}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {currentAchievementIndex + 1} / {celebration.achievements.length}
            </p>
            <Button onClick={handleContinue} variant="outline">
              {currentAchievementIndex < celebration.achievements.length - 1 ? 'Prossimo' : 'Chiudi'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
