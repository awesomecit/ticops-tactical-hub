import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Crosshair,
  Users,
  MessageSquare,
  Trophy,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabItem {
  icon: React.ElementType;
  labelKey: string;
  path: string;
  badge?: number;
}

const tabItems: TabItem[] = [
  { icon: LayoutDashboard, labelKey: 'nav.home', path: '/' },
  { icon: Crosshair, labelKey: 'nav.games', path: '/games' },
  { icon: Users, labelKey: 'nav.team', path: '/team' },
  { icon: MessageSquare, labelKey: 'nav.chat', path: '/chat', badge: 3 },
  { icon: Trophy, labelKey: 'nav.leaderboard', path: '/leaderboard' },
  { icon: Info, labelKey: 'nav.about', path: '/about' },
];

export const TabBar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-secondary/95 backdrop-blur-sm border-t border-border lg:hidden fixed-bottom-safe">
      {/* Touch-friendly tab bar with proper tap targets (min 44px) */}
      <div className="flex items-stretch h-16 px-1">
        {tabItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                // Mobile-first: flex item takes equal space, touch-friendly min height
                "flex flex-col items-center justify-center gap-0.5 flex-1 min-h-[44px] py-1 transition-colors relative touch-card no-select",
                isActive ? "text-primary" : "text-muted-foreground active:text-primary/70"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full" />
              )}
              
              <div className="relative">
                <item.icon className={cn(
                  "h-5 w-5 transition-transform gpu-accelerated",
                  isActive && "scale-110"
                )} />
                
                {item.badge && (
                  <span className="absolute -top-1 -right-2 h-4 min-w-4 px-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              
              <span className={cn(
                "text-[10px] font-display uppercase tracking-wider",
                isActive && "text-glow-primary"
              )}>
                {t(item.labelKey)}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
