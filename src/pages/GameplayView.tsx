import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skull, Crosshair, MapPin, MessageCircle, ArrowLeft, Heart, Target, Footprints, Trophy, Radio, Scan } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { TacticalMap, KillDeclarationModal } from '@/components/gameplay';
import { RadioBox, RadioTransmitButton, FrequencyScanner, InterferenceEffect } from '@/components/radio';
import { AchievementUnlockAnimation, MatchEndCelebration } from '@/components/achievements';
import { useRadioStore } from '@/stores/radioStore';
import { useAchievementStore } from '@/stores/achievementStore';
import { useRadioCountermeasures } from '@/hooks/useRadioCountermeasures';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MatchCelebration } from '@/types/achievements';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  MOCK_GAME_STATE,
  MOCK_PLAYER_STATS,
  MOCK_GAME_PLAYERS,
  MOCK_NEARBY_ENEMIES,
} from '@/mocks/gameplay';

const GameplayView: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gameState] = useState(MOCK_GAME_STATE);
  const [playerStats, setPlayerStats] = useState(MOCK_PLAYER_STATS);
  const [killModalOpen, setKillModalOpen] = useState(false);
  const [matchEnded, setMatchEnded] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const { status: radioStatus, activateRadio, connect, channels } = useRadioStore();
  const { achievements, updateProgress, setCelebration, pendingCelebration } = useAchievementStore();
  
  // Radio countermeasures (for demo)
  const { 
    isBeingScanned, 
    isBeingJammed, 
    jammingIntensity,
    simulateScan,
    simulateJamming,
  } = useRadioCountermeasures({
    onScanned: () => toast({ title: '⚠️ Scansione rilevata!', description: 'Un ingegnere nemico sta cercando la tua frequenza.', variant: 'destructive' }),
    onJammed: () => toast({ title: '📡 Disturbo radio!', description: 'Le tue comunicazioni sono disturbate.', variant: 'destructive' }),
  });

  // Activate radio for gameplay
  useEffect(() => {
    if (!radioStatus.isConnected) {
      activateRadio('team_001');
      // Small delay then connect to main channel
      setTimeout(() => {
        const mainChannel = channels.find(c => c.type === 'team');
        if (mainChannel) {
          connect(mainChannel.id);
        }
      }, 100);
    }
  }, []);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0a0a0f';
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleDeclareKill = (enemyId: string) => {
    const enemy = MOCK_NEARBY_ENEMIES.find((e) => e.id === enemyId);
    const newKills = playerStats.kills + 1;
    setPlayerStats((prev) => ({ ...prev, kills: newKills }));
    
    // Update kill achievements progress
    updateProgress('ach_100_kills', newKills);
    updateProgress('ach_5_streak', newKills); // Simplified streak logic
    
    toast({
      title: '🎯 Kill Dichiarata!',
      description: `Hai eliminato ${enemy?.name}. In attesa di conferma.`,
    });
  };

  const handleDeclareDead = () => {
    setPlayerStats((prev) => ({ ...prev, isAlive: false, deaths: prev.deaths + 1 }));
    toast({
      title: '💀 Sei Morto',
      description: 'Attendi il respawn o la fine del round.',
      variant: 'destructive',
    });
  };

  const handlePing = () => {
    toast({
      title: '📍 Ping Inviato',
      description: 'Il tuo team ha ricevuto la tua posizione.',
    });
  };

  // End match and show celebration
  const handleEndMatch = () => {
    // Get unlocked achievements during this match (demo: pick some)
    const unlockedDuringMatch = achievements.filter(a => 
      a.unlockedAt && 
      new Date(a.unlockedAt).getTime() > Date.now() - 60000 // Last minute
    );

    const celebration: MatchCelebration = {
      matchId: 'match_demo_1',
      playerId: 'user_1',
      achievements: unlockedDuringMatch.slice(0, 2),
      xpGained: 450 + playerStats.kills * 50,
      levelUp: playerStats.kills >= 3 ? { from: 12, to: 13 } : undefined,
      mvp: playerStats.kills >= 5,
      highlights: [
        { type: 'kill', value: playerStats.kills, label: 'Eliminazioni' },
        { type: 'assist', value: 2, label: 'Assist' },
        { type: 'objective', value: 1, label: 'Obiettivi' },
        { type: 'streak', value: playerStats.kills > 2 ? playerStats.kills : 0, label: 'Streak Max' },
      ],
    };

    setCelebration(celebration);
    setMatchEnded(true);
  };

  const scorePercentage = {
    alpha: (gameState.score.alpha / gameState.totalRounds) * 100,
    bravo: (gameState.score.bravo / gameState.totalRounds) * 100,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Interference Effect Overlay */}
      <InterferenceEffect 
        isActive={isBeingScanned || isBeingJammed} 
        type={isBeingJammed ? 'jamming' : 'scanning'}
        intensity={isBeingJammed ? jammingIntensity : 'low'}
      />
      
      {/* Achievement animations */}
      <AchievementUnlockAnimation />
      
      {/* Match end celebration */}
      {pendingCelebration && (
        <MatchEndCelebration onComplete={() => navigate('/')} />
      )}
      {/* TOP BAR */}
      <div className="bg-black/80 border-b border-gray-800 p-3 space-y-3">
        {/* Row 1: Live badge, mode, round, timer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="h-8 w-8 flex items-center justify-center rounded-sm bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            
            <div className="flex items-center gap-1.5 bg-red-500/20 px-2 py-1 rounded-sm border border-red-500/50">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-red-400">LIVE</span>
            </div>

            <span className="text-sm font-medium text-primary">{gameState.mode}</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">
              R{gameState.round}/{gameState.totalRounds}
            </span>
            <span className="font-mono text-lg font-bold text-white">
              {gameState.timeRemaining}
            </span>
            {/* End Match Button (Demo) */}
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
              onClick={handleEndMatch}
            >
              <Trophy className="h-3 w-3 mr-1" />
              Fine
            </Button>
          </div>
        </div>

        {/* Row 2: Score */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-blue-400 w-16">ALPHA</span>
          
          <div className="flex-1 flex items-center gap-1 h-4">
            {/* Alpha progress */}
            <div className="flex-1 h-full bg-gray-800 rounded-sm overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${scorePercentage.alpha}%` }}
              />
            </div>
            
            {/* Score */}
            <span className="text-sm font-bold text-white px-2">
              {gameState.score.alpha} - {gameState.score.bravo}
            </span>
            
            {/* Bravo progress */}
            <div className="flex-1 h-full bg-gray-800 rounded-sm overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-500 ml-auto"
                style={{ width: `${scorePercentage.bravo}%` }}
              />
            </div>
          </div>
          
          <span className="text-xs font-bold text-red-400 w-16 text-right">BRAVO</span>
        </div>
      </div>

      {/* TACTICAL MAP */}
      <div className="flex-1 p-2 min-h-0" style={{ height: '50vh' }}>
        <TacticalMap
          players={MOCK_GAME_PLAYERS}
          gameState={gameState}
          className="h-full rounded-sm border border-gray-800"
        />
      </div>

      {/* STATUS BAR + RADIO */}
      <div className="bg-black/80 border-t border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Player Status */}
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-sm",
              playerStats.isAlive
                ? "bg-green-500/20 border border-green-500/50"
                : "bg-red-500/20 border border-red-500/50"
            )}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                playerStats.isAlive ? "text-green-500" : "text-red-500"
              )}
              fill={playerStats.isAlive ? "currentColor" : "none"}
            />
            <span
              className={cn(
                "text-xs font-bold",
                playerStats.isAlive ? "text-green-400" : "text-red-400"
              )}
            >
              {playerStats.isAlive ? 'ALIVE' : 'DEAD'}
            </span>
          </div>

          {/* Radio Box (Compact) */}
          <RadioBox compact />

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-green-500" />
              <span className="font-mono font-bold">{playerStats.kills}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Skull className="h-4 w-4 text-red-500" />
              <span className="font-mono font-bold">{playerStats.deaths}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Footprints className="h-4 w-4 text-gray-400" />
              <span className="font-mono text-gray-400">{playerStats.distance}km</span>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS + PTT */}
      <div className="bg-black/90 p-4 space-y-4">
        {/* Radio PTT Button - Prominente */}
        <div className="flex justify-center">
          <RadioTransmitButton size="lg" showWaveform />
        </div>
        
        {/* Action Grid */}
        <div className="grid grid-cols-4 gap-3">
          <GlowButton
            variant="ghost"
            className={cn(
              "flex-col gap-1 h-16 min-h-[64px] border-2",
              "border-red-500/50 bg-red-500/10 text-red-400",
              "hover:bg-red-500/20 hover:border-red-500",
              !playerStats.isAlive && "opacity-50 pointer-events-none"
            )}
            onClick={handleDeclareDead}
            disabled={!playerStats.isAlive}
          >
            <Skull className="h-6 w-6" />
            <span className="text-xs font-bold">MORTO</span>
          </GlowButton>

          <GlowButton
            variant="ghost"
            className={cn(
              "flex-col gap-1 h-16 min-h-[64px] border-2",
              "border-green-500/50 bg-green-500/10 text-green-400",
              "hover:bg-green-500/20 hover:border-green-500",
              !playerStats.isAlive && "opacity-50 pointer-events-none"
            )}
            onClick={() => setKillModalOpen(true)}
            disabled={!playerStats.isAlive}
          >
            <Crosshair className="h-6 w-6" />
            <span className="text-xs font-bold">KILL</span>
          </GlowButton>

          <GlowButton
            variant="ghost"
            className={cn(
              "flex-col gap-1 h-16 min-h-[64px] border-2",
              "border-blue-500/50 bg-blue-500/10 text-blue-400",
              "hover:bg-blue-500/20 hover:border-blue-500"
            )}
            onClick={handlePing}
          >
            <MapPin className="h-6 w-6" />
            <span className="text-xs font-bold">PING</span>
          </GlowButton>

          <Sheet open={scannerOpen} onOpenChange={setScannerOpen}>
            <SheetTrigger asChild>
              <GlowButton
                variant="ghost"
                className={cn(
                  "flex-col gap-1 h-16 min-h-[64px] border-2",
                  "border-amber-500/50 bg-amber-500/10 text-amber-400",
                  "hover:bg-amber-500/20 hover:border-amber-500"
                )}
              >
                <Scan className="h-6 w-6" />
                <span className="text-xs font-bold">SCANNER</span>
              </GlowButton>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card border-border">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-primary" />
                  Scanner Frequenze
                </SheetTitle>
                <SheetDescription>
                  Scansiona le frequenze nemiche (Abilità Ingegnere)
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <FrequencyScanner 
                  hasEngineerBadge={true}
                  onChannelDetected={(ch) => {
                    toast({
                      title: '📡 Frequenza Rilevata!',
                      description: `${ch.frequency} MHz - ${ch.isEncrypted ? 'Cifrata' : ch.teamName || 'Sconosciuta'}`,
                    });
                  }}
                />
                
                {/* Demo buttons for testing interference */}
                <div className="mt-6 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Demo Contromisure</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => simulateScan(3)}
                    >
                      Simula Scan
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      className="flex-1 text-xs"
                      onClick={() => simulateJamming('medium', 3)}
                    >
                      Simula Jamming
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Kill Declaration Modal */}
      <KillDeclarationModal
        open={killModalOpen}
        onOpenChange={setKillModalOpen}
        enemies={MOCK_NEARBY_ENEMIES}
        onConfirmKill={handleDeclareKill}
      />
    </div>
  );
};

export default GameplayView;
