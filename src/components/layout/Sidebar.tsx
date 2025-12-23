import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Crosshair,
  Users,
  MessageSquare,
  Trophy,
  MapPin,
  Shield,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Crosshair, label: 'Partite', path: '/games' },
  { icon: Users, label: 'Team', path: '/team' },
  { icon: MessageSquare, label: 'Chat', path: '/chat', badge: 3 },
  { icon: Trophy, label: 'Classifiche', path: '/leaderboard' },
  { icon: MapPin, label: 'Campi', path: '/locations' },
];

const adminItems: NavItem[] = [
  { icon: Shield, label: 'Admin', path: '/admin' },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Toggle button (desktop) */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex absolute -right-3 top-6 h-6 w-6 items-center justify-center bg-sidebar-accent border border-sidebar-border rounded-full text-sidebar-foreground hover:text-sidebar-primary transition-colors"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !sidebarOpen && "rotate-180")} />
          </button>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            <div className="mb-4">
              <span className="px-3 text-xs font-display uppercase tracking-wider text-muted-foreground">
                Menu
              </span>
            </div>
            
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-sm font-display uppercase tracking-wider text-sm transition-all duration-200 group",
                    isActive
                      ? "bg-sidebar-primary/10 text-sidebar-primary border-l-2 border-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="flex-1">{item.label}</span>
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
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-sm font-display uppercase tracking-wider text-sm transition-all duration-200 group",
                    isActive
                      ? "bg-sidebar-primary/10 text-sidebar-primary border-l-2 border-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="flex-1">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-sidebar-border">
            <button
              onClick={() => logout()}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-sm font-display uppercase tracking-wider text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
