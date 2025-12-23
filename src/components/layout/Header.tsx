import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MessageSquare, Settings, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { RankBadge } from '@/components/ui/RankBadge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { NotificationsDropdown } from './NotificationsDropdown';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: t('auth.logoutSuccess'),
      description: "👋",
    });
    navigate("/login");
  };

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
          
          <Link to="/about" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <span className="font-display text-2xl font-bold tracking-wider text-primary">
                TIC
              </span>
              <span className="font-display text-2xl font-bold tracking-wider text-foreground">
                OPS
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            </div>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Chat */}
          <button 
            onClick={() => navigate('/chat')}
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          
          {/* Notifications Dropdown */}
          <NotificationsDropdown />
          
          {/* Settings */}
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>

          {/* User profile with dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden sm:flex items-center gap-3 ml-2 pl-4 border-l border-border hover:opacity-80 transition-opacity">
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
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  {t('settings.title')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('auth.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
              {t('auth.login')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
