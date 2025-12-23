import React, { useEffect, useState } from 'react';
import { Chest } from '@/types/achievements';
import { getChestColor } from '@/mocks/achievements';
import { useAchievementStore } from '@/stores/achievementStore';
import { Package, Sparkles, Star, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ChestOpenAnimationProps {
  chest?: Chest;
  onComplete?: () => void;
}

export const ChestOpenAnimation: React.FC<ChestOpenAnimationProps> = ({
  chest: propChest,
  onComplete,
}) => {
  const { recentChest, clearRecentChest } = useAchievementStore();
  const chest = propChest || recentChest;
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open' | 'rewards'>('closed');

  useEffect(() => {
    if (chest && !chest.openedAt) {
      setPhase('closed');
    }
  }, [chest]);

  const handleOpen = () => {
    setPhase('opening');
    setTimeout(() => setPhase('open'), 800);
    setTimeout(() => setPhase('rewards'), 1500);
  };

  const handleClose = () => {
    clearRecentChest();
    onComplete?.();
  };

  if (!chest) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 p-8">
        {/* Chest */}
        <div className="relative">
          {/* Glow */}
          <div className={cn(
            "absolute inset-0 rounded-lg blur-3xl opacity-50 transition-all duration-1000",
            `bg-gradient-to-r ${getChestColor(chest.type)}`,
            phase === 'open' || phase === 'rewards' ? 'scale-150 opacity-30' : 'scale-100'
          )} />

          {/* Chest container */}
          <div className={cn(
            "relative w-40 h-40 flex items-center justify-center transition-all duration-500",
            phase === 'opening' && "animate-[shake_0.3s_ease-in-out_2]",
            phase === 'open' && "scale-110"
          )}>
            {/* Chest icon with gradient */}
            <div className={cn(
              "relative w-32 h-32 rounded-xl flex items-center justify-center",
              `bg-gradient-to-br ${getChestColor(chest.type)}`,
              "shadow-2xl border-4 border-white/20",
              "transition-transform duration-500",
              phase === 'opening' && "rotate-3",
              (phase === 'open' || phase === 'rewards') && "opacity-50 scale-90"
            )}>
              <Package className={cn(
                "h-16 w-16 text-white drop-shadow-lg transition-all duration-500",
                phase === 'opening' && "animate-pulse"
              )} />
            </div>

            {/* Particles on open */}
            {(phase === 'open' || phase === 'rewards') && (
              <>
                <Sparkles className="absolute -top-4 left-1/2 h-8 w-8 text-yellow-400 animate-bounce" />
                <Star className="absolute top-1/4 -right-4 h-6 w-6 text-amber-400 animate-ping" />
                <Star className="absolute top-1/4 -left-4 h-5 w-5 text-yellow-300 animate-ping delay-150" />
                <Sparkles className="absolute -bottom-2 left-1/4 h-6 w-6 text-orange-400 animate-pulse" />
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className={cn(
          "text-2xl font-display font-bold text-center transition-all duration-500",
          chest.type === 'legendary' && "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400",
          chest.type === 'gold' && "text-yellow-400",
          chest.type === 'silver' && "text-slate-300",
          chest.type === 'bronze' && "text-orange-400"
        )}>
          {chest.name}
        </h2>

        {/* Rewards list */}
        {phase === 'rewards' && (
          <div className="flex flex-col items-center gap-3 animate-fade-in">
            <p className="text-sm text-muted-foreground mb-2">Hai ottenuto:</p>
            {chest.rewards.map((reward, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-lg border bg-card/80",
                  "animate-scale-in",
                  reward.rarity === 'legendary' && "border-amber-500/50 text-amber-400",
                  reward.rarity === 'epic' && "border-purple-500/50 text-purple-400",
                  reward.rarity === 'rare' && "border-blue-500/50 text-blue-400",
                  reward.rarity === 'common' && "border-slate-500/50 text-slate-300"
                )}
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {reward.type === 'xp' && <Star className="h-5 w-5" />}
                {reward.type === 'currency' && <Gift className="h-5 w-5" />}
                {reward.type === 'badge' && <Sparkles className="h-5 w-5" />}
                <span className="font-medium">
                  {reward.type === 'xp' && `+${reward.value} XP`}
                  {reward.type === 'currency' && `+${reward.value} Monete`}
                  {reward.type === 'badge' && `Badge: ${reward.value}`}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {phase === 'closed' && (
          <Button
            onClick={handleOpen}
            size="lg"
            className={cn(
              "px-8 font-display animate-pulse",
              `bg-gradient-to-r ${getChestColor(chest.type)} hover:opacity-90`
            )}
          >
            Apri Baule
          </Button>
        )}

        {phase === 'rewards' && (
          <Button
            onClick={handleClose}
            variant="outline"
            size="lg"
            className="mt-4"
          >
            Continua
          </Button>
        )}
      </div>
    </div>
  );
};
