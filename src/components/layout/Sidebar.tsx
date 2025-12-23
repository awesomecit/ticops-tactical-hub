import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Crosshair,
  Users,
  MessageSquare,
  Trophy,
  MapPin,
  Shield,
  LogOut,
  ChevronLeft,
  User,
  Backpack,
  ShoppingBag,
  CalendarClock,
  Award,
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/stores/chatStore';
import { isAdmin, canManageTeam } from '@/lib/auth';
import { RadioWidget } from '@/components/radio/RadioWidget';

interface NavItem {
  icon: React.ElementType;
  labelKey: string;
  path: string;
  badge?: number;
}

const getNavItems = (unreadCount: number): NavItem[] => [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/' },
  { icon: Crosshair, labelKey: 'nav.games', path: '/games' },
  { icon: CalendarClock, labelKey: 'nav.organize', path: '/organize' },
  { icon: Users, labelKey: 'nav.team', path: '/team' },
  { icon: MessageSquare, labelKey: 'nav.chat', path: '/chat', badge: unreadCount },
  { icon: Trophy, labelKey: 'nav.leaderboard', path: '/leaderboard' },
  { icon: Award, labelKey: 'nav.achievements', path: '/achievements' },
  { icon: MapPin, labelKey: 'nav.locations', path: '/locations' },
  { icon: Backpack, labelKey: 'nav.equipment', path: '/equipment' },
  { icon: ShoppingBag, labelKey: 'nav.marketplace', path: '/marketplace' },
  { icon: User, labelKey: 'nav.profile', path: '/profile' },
];

const adminItems: NavItem[] = [
  { icon: Shield, labelKey: 'nav.admin', path: '/admin' },
];

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();
  const { getTotalUnreadCount } = useChatStore();
  const navItems = getNavItems(getTotalUnreadCount());
  
  const userRole = user?.role;
  const showAdminSection = isAdmin(userRole);
  const showRadioWidget = canManageTeam(userRole);

  return (
    <>
      {/* Overlay for mobile - full screen touch target to close */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar - responsive behavior */}
      <aside
        className={cn(
          // Base styling
          "fixed top-14 sm:top-16 left-0 bottom-0 z-40 bg-sidebar border-r border-sidebar-border transition-all duration-300",
          // Width based on state
          sidebarOpen ? "w-[280px] lg:w-64" : "w-0 lg:w-16",
          // Transform for mobile slide animation
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Overflow handling when collapsed
          !sidebarOpen && "lg:overflow-hidden"
        )}
      >
        <div className={cn("flex flex-col h-full touch-scroll", !sidebarOpen && "lg:items-center")}>
          {/* Toggle button (desktop only) */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex absolute -right-3 top-6 h-6 w-6 items-center justify-center bg-sidebar-accent border border-sidebar-border rounded-full text-sidebar-foreground hover:text-sidebar-primary transition-colors"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
          </button>

          {/* Navigation - touch-friendly spacing */}
          <nav className={cn(
            "flex-1 py-4 overflow-y-auto scrollbar-hide",
            sidebarOpen ? "px-3 space-y-1" : "lg:px-2 lg:space-y-2"
          )}>
            {sidebarOpen && (
              <div className="mb-4">
                <span className="px-3 text-xs font-display uppercase tracking-wider text-muted-foreground">
                  Menu
                </span>
              </div>
            )}
            
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }}
                className={({ isActive }) =>
                  cn(
                    // Touch-friendly: min height 44px, proper padding
                    "flex items-center gap-3 rounded-sm font-display uppercase tracking-wider text-sm transition-all duration-200 group no-select",
                    sidebarOpen ? "px-3 py-3 min-h-[44px]" : "lg:px-2 lg:py-2 lg:justify-center",
                    isActive
                      ? "bg-sidebar-primary/10 text-sidebar-primary border-l-2 border-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent active:bg-sidebar-accent/80 hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5 transition-transform group-hover:scale-110 flex-shrink-0" />
                {sidebarOpen && <span className="flex-1">{t(item.labelKey)}</span>}
                {sidebarOpen && item.badge && (
                  <span className="h-5 min-w-5 px-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                {!sidebarOpen && item.badge && (
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}

            {/* Radio Widget for team leaders */}
            {showRadioWidget && (
              <>
                <div className="my-4 border-t border-sidebar-border" />
                {sidebarOpen && (
                  <div className="mb-2 px-3">
                    <RadioWidget collapsed={false} />
                  </div>
                )}
                {!sidebarOpen && (
                  <div className="lg:flex lg:justify-center">
                    <RadioWidget collapsed={true} />
                  </div>
                )}
              </>
            )}

            {/* Admin section - only for admins */}
            {showAdminSection && (
              <>
                <div className="my-4 border-t border-sidebar-border" />

                {sidebarOpen && (
                  <div className="mb-4">
                    <span className="px-3 text-xs font-display uppercase tracking-wider text-muted-foreground">
                      Admin
                    </span>
                  </div>
                )}

                {adminItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        toggleSidebar();
                      }
                    }}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-sm font-display uppercase tracking-wider text-sm transition-all duration-200 group no-select",
                        sidebarOpen ? "px-3 py-3 min-h-[44px]" : "lg:px-2 lg:py-2 lg:justify-center",
                        isActive
                          ? "bg-sidebar-primary/10 text-sidebar-primary border-l-2 border-sidebar-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent active:bg-sidebar-accent/80 hover:text-foreground"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5 transition-transform group-hover:scale-110 flex-shrink-0" />
                    {sidebarOpen && <span className="flex-1">{t(item.labelKey)}</span>}
                  </NavLink>
                ))}
              </>
            )}
          </nav>

          {/* Footer - touch-friendly logout */}
          <div className="p-3 border-t border-sidebar-border">
            <button
              onClick={() => logout()}
              className={cn(
                "flex items-center gap-3 w-full rounded-sm font-display uppercase tracking-wider text-sm text-destructive hover:bg-destructive/10 active:bg-destructive/20 transition-colors no-select",
                sidebarOpen ? "px-3 py-3 min-h-[44px]" : "lg:px-2 lg:py-2 lg:justify-center"
              )}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>{t('auth.logout')}</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
