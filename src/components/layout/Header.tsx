import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MessageSquare, Settings, LogOut, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { RankBadge } from '@/components/ui/RankBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getRoleVisibility } from '@/lib/roleConfig';
import { cn } from '@/lib/utils';
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
    <header className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 bg-background-secondary/95 backdrop-blur-sm border-b border-border fixed-top-safe">
      <div className="flex items-center justify-between h-full px-3 sm:px-4">
        {/* Left section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Menu button - larger touch target on mobile */}
          <button
            onClick={toggleSidebar}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-primary active:text-primary/70 transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Logo - link to About */}
          <Link 
            to="/about" 
            className="flex items-center gap-2 min-h-[44px] hover:opacity-80 active:opacity-60 transition-opacity"
          >
            <div className="relative">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-primary">
                TIC
              </span>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-foreground">
                OPS
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            </div>
          </Link>
        </div>

        {/* Right section - touch-friendly buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Chat - hidden on mobile (in tab bar) */}
          <button 
            onClick={() => navigate('/chat')}
            className="hidden sm:flex relative p-2 min-h-[44px] min-w-[44px] items-center justify-center text-muted-foreground hover:text-foreground active:text-foreground/70 transition-colors"
            aria-label={t('nav.chat')}
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          
          {/* Notifications Dropdown */}
          <NotificationsDropdown />
          
          {/* Settings */}
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground active:text-foreground/70 transition-colors"
            aria-label={t('settings.title')}
          >
            <Settings className="h-5 w-5" />
          </button>

          {/* User profile with dropdown - only on larger screens */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2 pl-2 sm:pl-4 border-l border-border hover:opacity-80 active:opacity-60 transition-opacity min-h-[44px]">
                  <div className="text-right hidden lg:block">
                    <div className="font-display text-sm font-bold uppercase text-foreground">
                      {user.callsign}
                    </div>
                    <RankBadge rank={user.rank} size="sm" />
                  </div>
                  
                  <div className="h-9 w-9 sm:h-10 sm:w-10 bg-card clip-tactical-sm border border-border flex items-center justify-center">
                    <span className="font-display font-bold text-primary">
                      {user.callsign.charAt(0)}
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {/* User Info with Role Badges */}
                <div className="px-2 py-3 border-b border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-bold text-primary text-sm">
                        {user?.callsign?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-sm text-foreground truncate">
                        {user?.username || user?.callsign}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </div>
                  
                  {/* Role Badges */}
                  {user?.roles && user.roles.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {/* Ordine fisso: player, team_leader, referee, field_manager, shop_owner, admin */}
                      {['player', 'team_leader', 'referee', 'field_manager', 'shop_owner', 'admin']
                        .filter(r => user.roles?.includes(r as typeof user.roles[number]))
                        .map((role) => {
                          const isVisible = getRoleVisibility(role as typeof user.roles[number]);
                          const isPrimary = role === user.primaryRole || role === user.role;
                          const roleColors: Record<string, string> = {
                            player: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                            team_leader: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                            referee: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                            field_manager: 'bg-green-500/20 text-green-400 border-green-500/30',
                            shop_owner: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
                            admin: 'bg-red-500/20 text-red-400 border-red-500/30',
                          };
                          return (
                            <Badge
                              key={role}
                              variant="outline"
                              className={cn(
                                'text-[10px] px-1.5 py-0.5 h-5 gap-1 border',
                                roleColors[role],
                                isPrimary && 'ring-1 ring-primary/50',
                                !isVisible && 'opacity-50'
                              )}
                            >
                              {isVisible ? (
                                <Eye className="h-2.5 w-2.5" />
                              ) : (
                                <EyeOff className="h-2.5 w-2.5" />
                              )}
                              {role.replace('_', ' ')}
                            </Badge>
                          );
                        })}
                    </div>
                  )}
                </div>
                
                <DropdownMenuItem onClick={() => navigate("/profile")} className="min-h-[44px] md:min-h-0">
                  <User className="w-4 h-4 mr-2" />
                  {t('nav.profile')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")} className="min-h-[44px] md:min-h-0">
                  <Settings className="w-4 h-4 mr-2" />
                  {t('settings.title')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive min-h-[44px] md:min-h-0">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('auth.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/login")}
              className="min-h-[44px] sm:min-h-0"
            >
              {t('auth.login')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
