import React from 'react';
import { Flag, Circle, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GamePlayer, GameState } from '@/mocks/gameplay';

interface TacticalMapProps {
  players: GamePlayer[];
  gameState: GameState;
  className?: string;
}

export const TacticalMap: React.FC<TacticalMapProps> = ({ players, gameState, className }) => {
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

        {/* Terrain elements (decorative) */}
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
          <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center border-2 border-yellow-500">
            <ObjectiveIcon className="h-4 w-4 text-yellow-500" />
          </div>
          <span className="text-[10px] text-yellow-500 mt-1 whitespace-nowrap">
            {gameState.objective.label}
          </span>
        </div>

        {/* Players */}
        {players.map((player) => {
          const isAlly = player.team === 'alpha';
          const isUser = player.isUser;

          return (
            <div
              key={player.id}
              className={cn(
                "absolute transition-all duration-500",
                !player.isAlive && "opacity-40"
              )}
              style={{
                left: `${player.position.x}%`,
                top: `${player.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Player dot */}
              <div
                className={cn(
                  "relative flex items-center justify-center",
                  isUser && "z-10"
                )}
              >
                {/* Glow effect for user */}
                {isUser && player.isAlive && (
                  <div className="absolute h-8 w-8 rounded-full bg-blue-500/30 animate-ping" />
                )}
                
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2",
                    isAlly
                      ? player.isAlive
                        ? "bg-blue-500 border-blue-300"
                        : "bg-blue-500/50 border-blue-300/50"
                      : player.isAlive
                        ? "bg-red-500 border-red-300"
                        : "bg-red-500/50 border-red-300/50",
                    isUser && "h-5 w-5 ring-2 ring-white/50"
                  )}
                />
                
                {/* Player name */}
                <span
                  className={cn(
                    "absolute -bottom-4 text-[9px] whitespace-nowrap",
                    isAlly ? "text-blue-400" : "text-red-400",
                    !player.isAlive && "line-through opacity-50"
                  )}
                >
                  {isUser ? 'TU' : player.name.slice(0, 8)}
                </span>

                {/* Dead marker */}
                {!player.isAlive && (
                  <span className="absolute -top-1 -right-1 text-[10px]">💀</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex items-center gap-4 bg-black/60 px-3 py-1.5 rounded-sm text-[10px]">
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          <span className="text-blue-400">Alleati</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-red-400">Nemici</span>
        </div>
        <div className="flex items-center gap-1">
          <Flag className="h-2.5 w-2.5 text-yellow-500" />
          <span className="text-yellow-400">Obiettivo</span>
        </div>
      </div>
    </div>
  );
};
