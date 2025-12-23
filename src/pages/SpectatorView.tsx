import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Target, Skull } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SpectatorMap } from '@/components/gameplay';
import { cn } from '@/lib/utils';
import {
  MOCK_SPECTATOR_PLAYERS,
  MOCK_SPECTATOR_GAME_STATE,
  MOCK_KILL_EVENTS,
  MOCK_TEAM_SCORES,
} from '@/mocks/spectator';

const SpectatorView: React.FC = () => {
  const navigate = useNavigate();

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
            
            <div className="flex items-center gap-1.5 bg-purple-500/20 px-2 py-1 rounded-sm border border-purple-500/50">
              <Eye className="h-3 w-3 text-purple-400" />
              <span className="text-xs font-bold text-purple-400">SPECTATOR</span>
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
        <div className="w-64 bg-black/60 border-l border-gray-800 flex flex-col">
          {/* Team Alpha */}
          <div className="p-3 border-b border-gray-800">
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
                  "flex items-center justify-between text-xs py-1 px-2 rounded-sm",
                  p.isAlive ? "bg-blue-500/10" : "bg-gray-800/50 opacity-50"
                )}>
                  <span className={cn(!p.isAlive && "line-through")}>{p.name}</span>
                  <span className="text-gray-400">{p.kills}/{p.deaths}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Bravo */}
          <div className="p-3 border-b border-gray-800">
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
                  "flex items-center justify-between text-xs py-1 px-2 rounded-sm",
                  p.isAlive ? "bg-red-500/10" : "bg-gray-800/50 opacity-50"
                )}>
                  <span className={cn(!p.isAlive && "line-through")}>{p.name}</span>
                  <span className="text-gray-400">{p.kills}/{p.deaths}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EVENT FEED */}
      <div className="h-32 bg-black/80 border-t border-gray-800">
        <div className="px-3 py-2 border-b border-gray-800">
          <span className="text-xs font-bold text-gray-400 uppercase">Eventi Live</span>
        </div>
        <ScrollArea className="h-[calc(100%-32px)]">
          <div className="p-2 space-y-1">
            {MOCK_KILL_EVENTS.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "text-xs py-1.5 px-2 rounded-sm flex items-center gap-2",
                  event.type === 'kill' && "bg-gray-800/50",
                  event.type === 'conflict' && "bg-accent/20 border border-accent/50",
                  event.type === 'objective' && "bg-yellow-500/10",
                  event.type === 'round' && "bg-primary/10"
                )}
              >
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
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SpectatorView;
