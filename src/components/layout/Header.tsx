import React from 'react';
import { Menu, Bell, MessageSquare, Settings } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { RankBadge } from '@/components/ui/RankBadge';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const { user } = useAuthStore();
  const { toggleSidebar, notifications } = useUIStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background-secondary/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 text-muted-foreground hover:text-primary transition-colors lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="font-display text-2xl font-bold tracking-wider text-primary">
                TIC
              </span>
              <span className="font-display text-2xl font-bold tracking-wider text-foreground">
                OPS
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <MessageSquare className="h-5 w-5" />
          </button>
          
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="h-5 w-5" />
          </button>

          {/* User profile */}
          {user && (
            <div className="hidden sm:flex items-center gap-3 ml-2 pl-4 border-l border-border">
              <div className="text-right">
                <div className="font-display text-sm font-bold uppercase text-foreground">
                  {user.callsign}
                </div>
                <RankBadge rank={user.rank} size="sm" />
              </div>
              
              <div className="h-10 w-10 bg-card clip-tactical-sm border border-border flex items-center justify-center">
                <span className="font-display font-bold text-primary">
                  {user.callsign.charAt(0)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
