import React from 'react';
import { Flag, Circle, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GamePlayer, GameState } from '@/mocks/gameplay';

interface SpectatorMapProps {
  players: GamePlayer[];
  gameState: GameState;
  showAllNames?: boolean;
  className?: string;
}

export const SpectatorMap: React.FC<SpectatorMapProps> = ({
  players,
  gameState,
  showAllNames = true,
  className,
}) => {
  const ObjectiveIcon = {
    flag: Flag,
    zone: Circle,
    target: Target,
  }[gameState.objective.type];

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-sm overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={i}>
              <div
                className="absolute w-full h-px bg-primary/30"
                style={{ top: `${(i + 1) * 10}%` }}
              />
              <div
                className="absolute h-full w-px bg-primary/30"
                style={{ left: `${(i + 1) * 10}%` }}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Terrain elements */}
        <div className="absolute top-[15%] left-[10%] w-16 h-16 bg-gray-700/50 rounded-sm border border-gray-600/30" />
        <div className="absolute top-[60%] left-[20%] w-12 h-20 bg-gray-700/50 rounded-sm border border-gray-600/30" />
        <div className="absolute top-[25%] right-[25%] w-20 h-14 bg-gray-700/50 rounded-sm border border-gray-600/30" />
        <div className="absolute bottom-[20%] right-[15%] w-14 h-14 bg-gray-700/50 rounded-sm border border-gray-600/30" />

        {/* Objective */}
        <div
          className="absolute flex flex-col items-center animate-pulse"
          style={{
            left: `${gameState.objective.position.x}%`,
            top: `${gameState.objective.position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center border-2 border-yellow-500">
            <ObjectiveIcon className="h-5 w-5 text-yellow-500" />
          </div>
          <span className="text-xs text-yellow-500 mt-1 whitespace-nowrap bg-black/50 px-1 rounded">
            {gameState.objective.label}
          </span>
        </div>

        {/* Players */}
        {players.map((player) => {
          const isAlly = player.team === 'alpha';

          return (
            <div
              key={player.id}
              className={cn(
                "absolute transition-all duration-500",
                !player.isAlive && "opacity-50"
              )}
              style={{
                left: `${player.position.x}%`,
                top: `${player.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative flex flex-col items-center">
                {/* Player name (always visible in spectator mode) */}
                {showAllNames && (
                  <span
                    className={cn(
                      "absolute -top-5 text-[10px] font-medium whitespace-nowrap px-1 rounded bg-black/60",
                      isAlly ? "text-blue-400" : "text-red-400",
                      !player.isAlive && "line-through"
                    )}
                  >
                    {player.name}
                  </span>
                )}

                {/* Player dot */}
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 transition-all",
                    isAlly
                      ? player.isAlive
                        ? "bg-blue-500 border-blue-300"
                        : "bg-blue-500/50 border-blue-300/50"
                      : player.isAlive
                        ? "bg-red-500 border-red-300"
                        : "bg-red-500/50 border-red-300/50"
                  )}
                />

                {/* Dead marker */}
                {!player.isAlive && (
                  <span className="absolute -bottom-3 text-[10px]">💀</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex items-center gap-4 bg-black/70 px-3 py-1.5 rounded-sm text-[10px]">
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          <span className="text-blue-400">ALPHA</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-red-400">BRAVO</span>
        </div>
        <div className="flex items-center gap-1">
          <ObjectiveIcon className="h-2.5 w-2.5 text-yellow-500" />
          <span className="text-yellow-400">Obiettivo</span>
        </div>
      </div>
    </div>
  );
};
