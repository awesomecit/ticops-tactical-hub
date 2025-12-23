import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Trophy, 
  Medal, 
  Shield, 
  Target, 
  Users, 
  Compass, 
  Sparkles,
  Lock,
  Star,
  Filter,
  Sword,
  LucideIcon
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAchievementStore } from '@/stores/achievementStore';
import { BadgeDisplay, BadgeCollection } from '@/components/achievements/BadgeDisplay';
import { AchievementUnlockAnimation } from '@/components/achievements/AchievementUnlockAnimation';
import { ChestOpenAnimation } from '@/components/achievements/ChestOpenAnimation';
import { getRarityColor, getCategoryLabel } from '@/mocks/achievements';
import { AchievementCategory } from '@/types/achievements';
import { cn } from '@/lib/utils';

const categoryIcons: Record<AchievementCategory, React.ComponentType<{ className?: string }>> = {
  combat: Target,
  teamwork: Users,
  strategy: Shield,
  social: Users,
  exploration: Compass,
  special: Sparkles,
};

const Achievements: React.FC = () => {
  const { t } = useTranslation();
  const { 
    achievements, 
    badges, 
    userBadges, 
    chests,
    recentUnlock,
    recentChest,
    getUserStats,
    openChest,
    unlockAchievement
  } = useAchievementStore();
  
  const [categoryFilter, setCategoryFilter] = useState<AchievementCategory | 'all'>('all');
  const stats = getUserStats();

  const filteredAchievements = categoryFilter === 'all' 
    ? achievements.filter(a => !a.isSecret || a.unlockedAt)
    : achievements.filter(a => a.category === categoryFilter && (!a.isSecret || a.unlockedAt));

  const unopenedChests = chests.filter(c => !c.openedAt);

  // Demo function to trigger achievement
  const triggerDemoAchievement = () => {
    const locked = achievements.find(a => !a.unlockedAt && !a.isSecret);
    if (locked) {
      unlockAchievement(locked.id);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 space-y-6">
      {/* Animations */}
      <AchievementUnlockAnimation />
      <ChestOpenAnimation />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            Achievement
          </h1>
          <p className="text-muted-foreground">
            {stats.unlockedAchievements}/{stats.totalAchievements} sbloccati
          </p>
        </div>

        {/* Demo button */}
        <Button onClick={triggerDemoAchievement} variant="outline" size="sm">
          <Sparkles className="h-4 w-4 mr-2" />
          Demo Sblocco
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur border-primary/20">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold">{stats.unlockedAchievements}</p>
            <p className="text-xs text-muted-foreground">Achievement</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-amber-500/20">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto text-amber-400 mb-2" />
            <p className="text-2xl font-bold">{stats.totalXpFromAchievements.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">XP Totali</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-purple-500/20">
          <CardContent className="p-4 text-center">
            <Medal className="h-8 w-8 mx-auto text-purple-400 mb-2" />
            <p className="text-2xl font-bold">{userBadges.length}</p>
            <p className="text-xs text-muted-foreground">Badge</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-blue-500/20">
          <CardContent className="p-4 text-center">
            <Sword className="h-8 w-8 mx-auto text-blue-400 mb-2" />
            <p className="text-2xl font-bold">{unopenedChests.length}</p>
            <p className="text-xs text-muted-foreground">Bauli</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Achievement</TabsTrigger>
          <TabsTrigger value="badges">Badge</TabsTrigger>
          <TabsTrigger value="chests">Bauli</TabsTrigger>
        </TabsList>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={categoryFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setCategoryFilter('all')}
            >
              <Filter className="h-4 w-4 mr-1" />
              Tutti
            </Button>
            {(['combat', 'teamwork', 'strategy', 'social', 'exploration', 'special'] as AchievementCategory[]).map(cat => {
              const Icon = categoryIcons[cat];
              const progress = stats.categoryProgress[cat];
              return (
                <Button
                  key={cat}
                  size="sm"
                  variant={categoryFilter === cat ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter(cat)}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {getCategoryLabel(cat)}
                  <span className="ml-1 text-xs opacity-70">
                    ({progress.unlocked}/{progress.total})
                  </span>
                </Button>
              );
            })}
          </div>

          {/* Achievements Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredAchievements.map(achievement => {
              const icons = LucideIcons as unknown as Record<string, LucideIcon>;
              const Icon = icons[achievement.icon] || Trophy;
              const progress = (achievement.requirement.current / achievement.requirement.target) * 100;
              const isUnlocked = !!achievement.unlockedAt;

              return (
                <Card
                  key={achievement.id}
                  className={cn(
                    "transition-all duration-300 hover:scale-[1.02]",
                    isUnlocked 
                      ? cn("border-2", getRarityColor(achievement.rarity))
                      : "opacity-80 hover:opacity-100"
                  )}
                >
                  <CardContent className="p-4 flex gap-4">
                    {/* Icon */}
                    <div className={cn(
                      "w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0",
                      isUnlocked 
                        ? getRarityColor(achievement.rarity)
                        : "bg-muted text-muted-foreground"
                    )}>
                      {isUnlocked ? (
                        <Icon className="h-7 w-7" />
                      ) : (
                        <Lock className="h-6 w-6" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={cn(
                            "font-display font-bold",
                            achievement.rarity === 'legendary' && isUnlocked && "text-amber-400",
                            achievement.rarity === 'epic' && isUnlocked && "text-purple-400"
                          )}>
                            {achievement.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                        <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                          +{achievement.reward.xp} XP
                        </Badge>
                      </div>

                      {/* Progress */}
                      {!isUnlocked && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progresso</span>
                            <span>{achievement.requirement.current}/{achievement.requirement.target}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                      {/* Unlocked date */}
                      {isUnlocked && (
                        <p className="text-xs text-muted-foreground">
                          Sbloccato il {new Date(achievement.unlockedAt!).toLocaleDateString('it-IT')}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">I Miei Badge</CardTitle>
            </CardHeader>
            <CardContent>
              <BadgeCollection
                badges={badges}
                userBadges={userBadges}
                size="lg"
              />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {badges.map(badge => {
              const isUnlocked = userBadges.some(ub => ub.id === badge.id);
              return (
                <Card
                  key={badge.id}
                  className={cn(
                    "transition-all",
                    isUnlocked && "border-2",
                    isUnlocked && getRarityColor(badge.rarity)
                  )}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <BadgeDisplay
                      badge={badge}
                      size="lg"
                      isLocked={!isUnlocked}
                      showTooltip={false}
                    />
                    <div className="flex-1">
                      <h3 className="font-display font-bold">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                      {badge.ability && (
                        <p className="text-xs text-primary mt-1">
                          ⚡ {badge.ability.name}
                        </p>
                      )}
                      {!isUnlocked && badge.isPurchasable && badge.price && (
                        <Button size="sm" variant="outline" className="mt-2">
                          Acquista ({badge.price} monete)
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Chests Tab */}
        <TabsContent value="chests" className="space-y-4">
          {unopenedChests.length === 0 ? (
            <Card className="bg-card/50">
              <CardContent className="p-8 text-center text-muted-foreground">
                <Sword className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nessun baule da aprire</p>
                <p className="text-sm">Completa achievement per ottenere bauli!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {unopenedChests.map(chest => (
                <Card key={chest.id} className="overflow-hidden">
                  <div className={cn(
                    "h-24 bg-gradient-to-br flex items-center justify-center",
                    chest.type === 'bronze' && "from-orange-700 to-orange-900",
                    chest.type === 'silver' && "from-slate-300 to-slate-500",
                    chest.type === 'gold' && "from-yellow-400 to-yellow-600",
                    chest.type === 'legendary' && "from-purple-500 via-pink-500 to-amber-500"
                  )}>
                    <Sword className="h-12 w-12 text-white drop-shadow-lg" />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-display font-bold">{chest.name}</h3>
                    <p className="text-sm text-muted-foreground">{chest.description}</p>
                    <Button 
                      className="w-full" 
                      onClick={() => openChest(chest.id)}
                    >
                      Apri Baule
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Achievements;
