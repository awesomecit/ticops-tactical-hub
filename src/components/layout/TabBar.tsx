import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Crosshair,
  Users,
  MessageSquare,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

const tabItems: TabItem[] = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: Crosshair, label: 'Partite', path: '/games' },
  { icon: Users, label: 'Team', path: '/team' },
  { icon: MessageSquare, label: 'Chat', path: '/chat', badge: 3 },
  { icon: Trophy, label: 'Rank', path: '/leaderboard' },
];

export const TabBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-secondary/95 backdrop-blur-sm border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {tabItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full" />
              )}
              
              <div className="relative">
                <item.icon className={cn(
                  "h-5 w-5 transition-transform",
                  isActive && "scale-110"
                )} />
                
                {item.badge && (
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              
              <span className={cn(
                "text-[10px] font-display uppercase tracking-wider",
                isActive && "text-glow-primary"
              )}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
