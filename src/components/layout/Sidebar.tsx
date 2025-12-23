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
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';
import { getTotalUnreadCount } from '@/mocks/chat';

interface NavItem {
  icon: React.ElementType;
  labelKey: string;
  path: string;
  badge?: number;
}

const getNavItems = (): NavItem[] => [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/' },
  { icon: Crosshair, labelKey: 'nav.games', path: '/games' },
  { icon: Users, labelKey: 'nav.team', path: '/team' },
  { icon: MessageSquare, labelKey: 'nav.chat', path: '/chat', badge: getTotalUnreadCount() },
  { icon: Trophy, labelKey: 'nav.leaderboard', path: '/leaderboard' },
  { icon: MapPin, labelKey: 'nav.locations', path: '/locations' },
];

const adminItems: NavItem[] = [
  { icon: Shield, labelKey: 'nav.admin', path: '/admin' },
];

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();
  const navItems = getNavItems();

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

      {/* Sidebar - hidden on mobile by default, always visible on lg+ */}
      <aside
        className={cn(
          // Mobile: slide in from left, touch-friendly width
          "fixed top-14 sm:top-16 left-0 bottom-0 z-40 w-[280px] bg-sidebar border-r border-sidebar-border transition-transform duration-300",
          // Desktop: always visible
          "lg:translate-x-0 lg:w-64",
          // Mobile: slide in/out
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full touch-scroll">
          {/* Toggle button (desktop only) */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex absolute -right-3 top-6 h-6 w-6 items-center justify-center bg-sidebar-accent border border-sidebar-border rounded-full text-sidebar-foreground hover:text-sidebar-primary transition-colors"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
          </button>

          {/* Navigation - touch-friendly spacing */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-hide">
            <div className="mb-4">
              <span className="px-3 text-xs font-display uppercase tracking-wider text-muted-foreground">
                Menu
              </span>
            </div>
            
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
                    "flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-sm font-display uppercase tracking-wider text-sm transition-all duration-200 group no-select",
                    isActive
                      ? "bg-sidebar-primary/10 text-sidebar-primary border-l-2 border-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent active:bg-sidebar-accent/80 hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5 transition-transform group-hover:scale-110 flex-shrink-0" />
                <span className="flex-1">{t(item.labelKey)}</span>
                {item.badge && (
                  <span className="h-5 min-w-5 px-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}

            <div className="my-4 border-t border-sidebar-border" />

            <div className="mb-4">
              <span className="px-3 text-xs font-display uppercase tracking-wider text-muted-foreground">
                Admin
              </span>
            </div>

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
                    "flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-sm font-display uppercase tracking-wider text-sm transition-all duration-200 group no-select",
                    isActive
                      ? "bg-sidebar-primary/10 text-sidebar-primary border-l-2 border-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent active:bg-sidebar-accent/80 hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5 transition-transform group-hover:scale-110 flex-shrink-0" />
                <span className="flex-1">{t(item.labelKey)}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer - touch-friendly logout */}
          <div className="p-3 border-t border-sidebar-border">
            <button
              onClick={() => logout()}
              className="flex items-center gap-3 w-full px-3 py-3 min-h-[44px] rounded-sm font-display uppercase tracking-wider text-sm text-destructive hover:bg-destructive/10 active:bg-destructive/20 transition-colors no-select"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span>{t('auth.logout')}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
