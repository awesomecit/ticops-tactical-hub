import React, { useState, useRef } from 'react';
import { Flag, Circle, Target, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GamePlayer, GameState } from '@/mocks/gameplay';
import { SpawnZone, PathLine, TreeCluster, Building } from './map-elements';
import { MapScale } from './MapScale';

interface TacticalMapProps {
  players: GamePlayer[];
  gameState: GameState;
  /**
   * Enable pan/zoom controls
   */
  interactive?: boolean;
  /**
   * Show map elements (buildings, trees, etc.)
   */
  showMapElements?: boolean;
  className?: string;
}

export const TacticalMap: React.FC<TacticalMapProps> = ({ 
  players, 
  gameState, 
  interactive = true,
  showMapElements = true,
  className 
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const ObjectiveIcon = {
    flag: Flag,
    zone: Circle,
    target: Target,
  }[gameState.objective.type];

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (!interactive) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)));
  };

  // Handle pan start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  // Handle pan move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  // Handle pan end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset view
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Zoom controls
  const zoomIn = () => setZoom((prev) => Math.min(3, prev + 0.2));
  const zoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.2));

  return (
    <div 
      className={cn("relative w-full h-full overflow-hidden", className)}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : interactive ? 'grab' : 'default' }}
    >
      {/* Zoom Controls */}
      {interactive && (
        <div className="absolute top-2 right-2 z-30 flex flex-col gap-1 bg-black/60 rounded-sm p-1">
          <button
            onClick={zoomIn}
            className="p-1.5 hover:bg-primary/20 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4 text-primary" />
          </button>
          <button
            onClick={zoomOut}
            className="p-1.5 hover:bg-primary/20 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4 text-primary" />
          </button>
          <button
            onClick={resetView}
            className="p-1.5 hover:bg-primary/20 rounded transition-colors"
            title="Reset View"
          >
            <Maximize2 className="h-4 w-4 text-primary" />
          </button>
          <div className="text-[9px] text-center text-gray-400 mt-1">
            {Math.round(zoom * 100)}%
          </div>
        </div>
      )}

      {/* Map Container (scrollable/zoomable) */}
      <div
        ref={mapRef}
        className="absolute inset-0 transition-transform duration-100"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-sm">
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

          {/* Grid Labels - Letters (Top) */}
          <div className="absolute top-0 left-0 right-0 h-4 flex">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((letter) => (
              <div
                key={letter}
                className="flex-1 flex items-center justify-center text-[9px] text-primary/60 font-mono"
              >
                {letter}
              </div>
            ))}
          </div>

          {/* Grid Labels - Numbers (Left) */}
          <div className="absolute top-0 left-0 bottom-0 w-4 flex flex-col">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <div
                key={num}
                className="flex-1 flex items-center justify-center text-[9px] text-primary/60 font-mono"
              >
                {num}
              </div>
            ))}
          </div>

          {/* Map Elements */}
          {showMapElements && (
            <>
              {/* Spawn Zones */}
              <SpawnZone
                position={{ x: 15, y: 15 }}
                size={{ width: 10, height: 10 }}
                team="alpha"
                label="ALPHA SPAWN"
              />
              <SpawnZone
                position={{ x: 85, y: 85 }}
                size={{ width: 10, height: 10 }}
                team="bravo"
                label="BRAVO SPAWN"
              />

              {/* Buildings */}
              <Building
                position={{ x: 30, y: 40 }}
                size={{ width: 8, height: 12 }}
                type="warehouse"
                label="Magazzino A"
                rotation={15}
              />
              <Building
                position={{ x: 55, y: 25 }}
                size={{ width: 6, height: 8 }}
                type="shed"
                label="Capannone B"
              />
              <Building
                position={{ x: 70, y: 55 }}
                size={{ width: 7, height: 10 }}
                type="house"
                label="Edificio C"
                rotation={-20}
              />
              <Building
                position={{ x: 45, y: 70 }}
                size={{ width: 5, height: 7 }}
                type="container"
                label="Container"
                rotation={45}
              />

              {/* Tree Clusters */}
              <TreeCluster position={{ x: 20, y: 60 }} density="dense" size={8} />
              <TreeCluster position={{ x: 65, y: 35 }} density="medium" size={6} />
              <TreeCluster position={{ x: 80, y: 20 }} density="sparse" size={5} />
              <TreeCluster position={{ x: 35, y: 80 }} density="medium" size={7} />

              {/* Paths */}
              <PathLine
                type="main"
                points={[
                  { x: 10, y: 10 },
                  { x: 30, y: 35 },
                  { x: 50, y: 50 },
                  { x: 70, y: 60 },
                  { x: 90, y: 90 },
                ]}
              />
              <PathLine
                type="secondary"
                points={[
                  { x: 20, y: 90 },
                  { x: 45, y: 70 },
                  { x: 55, y: 40 },
                  { x: 80, y: 20 },
                ]}
              />
              <PathLine
                type="trail"
                points={[
                  { x: 10, y: 50 },
                  { x: 25, y: 45 },
                  { x: 40, y: 50 },
                  { x: 60, y: 55 },
                ]}
              />
            </>
          )}

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
      </div>

      {/* Map Scale */}
      <MapScale
        zoom={zoom}
        showCoordinates={true}
        className="absolute top-2 left-2 z-20"
      />

      {/* Legend */}
      <div className="absolute bottom-2 left-2 z-20 flex items-center gap-4 bg-black/60 px-3 py-1.5 rounded-sm text-[10px]">
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
