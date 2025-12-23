import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Plus, Pause, Megaphone, Flag, Check, AlertTriangle, Target, Skull } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GlowButton } from '@/components/ui/GlowButton';
import { SpectatorMap, ResolveConflictModal } from '@/components/gameplay';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  MOCK_SPECTATOR_PLAYERS,
  MOCK_SPECTATOR_GAME_STATE,
  MOCK_KILL_EVENTS,
  MOCK_TEAM_SCORES,
  MOCK_CONFLICTS,
  type KillEvent,
} from '@/mocks/spectator';

const RefereeView: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState(MOCK_KILL_EVENTS);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [selectedConflict, setSelectedConflict] = useState(MOCK_CONFLICTS[0]);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0a0a0f';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const gameState = MOCK_SPECTATOR_GAME_STATE;
  const scorePercentage = {
    alpha: (gameState.score.alpha / gameState.totalRounds) * 100,
    bravo: (gameState.score.bravo / gameState.totalRounds) * 100,
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const handleConfirmEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, confirmed: true } : e))
    );
    toast({ title: '✓ Evento confermato' });
  };

  const handleResolveConflict = (resolution: 'assign' | 'assist' | 'invalidate', playerId?: string) => {
    const resolutionText = {
      assign: `Kill assegnata a ${MOCK_CONFLICTS[0].claimants.find((c) => c.playerId === playerId)?.playerName}`,
      assist: 'Assist assegnato a entrambi',
      invalidate: 'Kill invalidata',
    };
    toast({ title: resolutionText[resolution] });
    setEvents((prev) => prev.filter((e) => e.type !== 'conflict'));
  };

  const handleQuickAction = (action: string) => {
    const messages = {
      kill: '➕ Registra kill manualmente',
      pause: '⏸️ Partita in pausa',
      announce: '📢 Annuncio inviato',
      end: '🏁 Partita terminata',
    };
    toast({ title: messages[action as keyof typeof messages] || action });
  };

  const pendingEvents = events.filter((e) => !e.confirmed && e.type !== 'conflict');
  const conflicts = events.filter((e) => e.type === 'conflict');

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* TOP BAR */}
      <div className="bg-black/80 border-b border-gray-800 p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="h-8 w-8 flex items-center justify-center rounded-sm bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            
            <div className="flex items-center gap-1.5 bg-secondary/20 px-2 py-1 rounded-sm border border-secondary/50">
              <Shield className="h-3 w-3 text-secondary" />
              <span className="text-xs font-bold text-secondary">REFEREE</span>
            </div>

            <span className="text-sm font-medium text-primary">{gameState.mode}</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">R{gameState.round}/{gameState.totalRounds}</span>
            <span className="font-mono text-lg font-bold text-white">{gameState.timeRemaining}</span>
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-blue-400 w-16">ALPHA</span>
          <div className="flex-1 flex items-center gap-1 h-4">
            <div className="flex-1 h-full bg-gray-800 rounded-sm overflow-hidden">
              <div className="h-full bg-blue-500 transition-all" style={{ width: `${scorePercentage.alpha}%` }} />
            </div>
            <span className="text-sm font-bold text-white px-2">
              {gameState.score.alpha} - {gameState.score.bravo}
            </span>
            <div className="flex-1 h-full bg-gray-800 rounded-sm overflow-hidden">
              <div className="h-full bg-red-500 transition-all ml-auto" style={{ width: `${scorePercentage.bravo}%` }} />
            </div>
          </div>
          <span className="text-xs font-bold text-red-400 w-16 text-right">BRAVO</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* MAP */}
        <div className="flex-1 p-2">
          <SpectatorMap
            players={MOCK_SPECTATOR_PLAYERS}
            gameState={gameState}
            showAllNames={true}
            className="h-full rounded-sm border border-gray-800"
          />
        </div>

        {/* SIDEBAR */}
        <div className="w-72 bg-black/60 border-l border-gray-800 flex flex-col overflow-hidden">
          {/* Quick Actions */}
          <div className="p-3 border-b border-gray-800">
            <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">Azioni Rapide</span>
            <div className="grid grid-cols-2 gap-2">
              <GlowButton
                variant="ghost"
                size="sm"
                className="border border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20"
                onClick={() => handleQuickAction('kill')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Kill
              </GlowButton>
              <GlowButton
                variant="ghost"
                size="sm"
                className="border border-yellow-500/50 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                onClick={() => handleQuickAction('pause')}
              >
                <Pause className="h-4 w-4 mr-1" />
                Pausa
              </GlowButton>
              <GlowButton
                variant="ghost"
                size="sm"
                className="border border-blue-500/50 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                onClick={() => handleQuickAction('announce')}
              >
                <Megaphone className="h-4 w-4 mr-1" />
                Annuncio
              </GlowButton>
              <GlowButton
                variant="ghost"
                size="sm"
                className="border border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                onClick={() => handleQuickAction('end')}
              >
                <Flag className="h-4 w-4 mr-1" />
                Termina
              </GlowButton>
            </div>
          </div>

          {/* Conflicts */}
          {conflicts.length > 0 && (
            <div className="p-3 border-b border-gray-800 bg-accent/5">
              <span className="text-xs font-bold text-accent uppercase mb-2 block">
                ⚠️ Conflitti ({conflicts.length})
              </span>
              <div className="space-y-2">
                {conflicts.map((conflict) => (
                  <button
                    key={conflict.id}
                    onClick={() => {
                      setSelectedConflict(MOCK_CONFLICTS[0]);
                      setConflictModalOpen(true);
                    }}
                    className="w-full text-left p-2 rounded-sm bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors"
                  >
                    <p className="text-xs text-accent font-medium">{conflict.message}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{formatTimestamp(conflict.timestamp)}</p>
                    <span className="text-xs text-accent mt-1 inline-flex items-center gap-1">
                      Risolvi →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Scoreboard */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-800">
              <span className="text-xs font-bold text-gray-400 uppercase">Scoreboard</span>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-4">
                {/* Alpha */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-blue-400">ALPHA</span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-green-400">{MOCK_TEAM_SCORES.alpha.kills} <Target className="inline h-3 w-3" /></span>
                      <span className="text-red-400">{MOCK_TEAM_SCORES.alpha.deaths} <Skull className="inline h-3 w-3" /></span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {MOCK_TEAM_SCORES.alpha.players.map((p) => (
                      <div key={p.id} className={cn(
                        "flex items-center justify-between text-xs py-1.5 px-2 rounded-sm",
                        p.isAlive ? "bg-blue-500/10" : "bg-gray-800/50 opacity-50"
                      )}>
                        <span className={cn(!p.isAlive && "line-through")}>{p.name}</span>
                        <span className="text-gray-400 font-mono">{p.kills}/{p.deaths}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bravo */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-red-400">BRAVO</span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-green-400">{MOCK_TEAM_SCORES.bravo.kills} <Target className="inline h-3 w-3" /></span>
                      <span className="text-red-400">{MOCK_TEAM_SCORES.bravo.deaths} <Skull className="inline h-3 w-3" /></span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {MOCK_TEAM_SCORES.bravo.players.map((p) => (
                      <div key={p.id} className={cn(
                        "flex items-center justify-between text-xs py-1.5 px-2 rounded-sm",
                        p.isAlive ? "bg-red-500/10" : "bg-gray-800/50 opacity-50"
                      )}>
                        <span className={cn(!p.isAlive && "line-through")}>{p.name}</span>
                        <span className="text-gray-400 font-mono">{p.kills}/{p.deaths}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* EVENT FEED */}
      <div className="h-36 bg-black/80 border-t border-gray-800">
        <div className="px-3 py-2 border-b border-gray-800 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400 uppercase">Feed Eventi</span>
          {pendingEvents.length > 0 && (
            <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-sm">
              {pendingEvents.length} da confermare
            </span>
          )}
        </div>
        <ScrollArea className="h-[calc(100%-36px)]">
          <div className="p-2 space-y-1">
            {events.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "text-xs py-2 px-3 rounded-sm flex items-center justify-between",
                  event.type === 'kill' && !event.confirmed && "bg-yellow-500/10 border border-yellow-500/30",
                  event.type === 'kill' && event.confirmed && "bg-gray-800/50",
                  event.type === 'conflict' && "bg-accent/20 border border-accent/50",
                  event.type === 'objective' && "bg-yellow-500/10",
                  event.type === 'round' && "bg-primary/10"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-mono">{formatTimestamp(event.timestamp)}</span>
                  {event.type === 'kill' ? (
                    <span>
                      <span className="text-blue-400">{event.killerName}</span>
                      <span className="text-gray-500"> → </span>
                      <span className="text-red-400">{event.victimName}</span>
                    </span>
                  ) : event.type === 'conflict' ? (
                    <span className="text-accent">⚠️ {event.message}</span>
                  ) : (
                    <span className="text-gray-300">{event.message}</span>
                  )}
                </div>

                {/* Actions */}
                {event.type === 'kill' && !event.confirmed && (
                  <button
                    onClick={() => handleConfirmEvent(event.id)}
                    className="h-6 w-6 rounded-sm bg-green-500/20 hover:bg-green-500/30 flex items-center justify-center border border-green-500/50 transition-colors"
                  >
                    <Check className="h-3 w-3 text-green-400" />
                  </button>
                )}
                {event.type === 'kill' && event.confirmed && (
                  <span className="text-green-400 text-[10px]">✓</span>
                )}
                {event.type === 'conflict' && (
                  <button
                    onClick={() => {
                      setSelectedConflict(MOCK_CONFLICTS[0]);
                      setConflictModalOpen(true);
                    }}
                    className="text-[10px] text-accent hover:underline"
                  >
                    Risolvi →
                  </button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Conflict Modal */}
      <ResolveConflictModal
        open={conflictModalOpen}
        onOpenChange={setConflictModalOpen}
        conflict={selectedConflict}
        onResolve={handleResolveConflict}
      />
    </div>
  );
};

export default RefereeView;
