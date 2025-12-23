import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  Shield, 
  Crosshair, 
  Flag, 
  BarChart3,
  Radio,
  LayoutGrid
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { title: 'Overview', url: '/admin', icon: LayoutDashboard },
  { title: 'Utenti', url: '/admin/users', icon: Users },
  { title: 'Campi', url: '/admin/fields', icon: MapPin },
  { title: 'Arbitri', url: '/admin/referees', icon: Shield },
  { title: 'Partite', url: '/admin/matches', icon: Crosshair },
  { title: 'Radio', url: '/admin/radio', icon: Radio },
  { title: 'Report', url: '/admin/reports', icon: Flag },
  { title: 'Analytics', url: '/admin/analytics', icon: BarChart3 },
  { title: 'Tutte le Viste', url: '/admin/views', icon: LayoutGrid },
];

export const AdminSidebar: React.FC = () => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  return (
    <Sidebar
      className={cn(
        "border-r border-border/50 bg-card/50 backdrop-blur-sm",
        collapsed ? "w-14" : "w-56"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border/30 p-3">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-bold text-sm text-glow-primary">ADMIN</span>
            </div>
          )}
          <SidebarTrigger className="h-8 w-8" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider">
              Gestione
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => {
                const isActive = location.pathname === item.url || 
                  (item.url !== '/admin' && location.pathname.startsWith(item.url));
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={collapsed ? item.title : undefined}
                    >
                      <NavLink
                        to={item.url}
                        end={item.url === '/admin'}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-sm transition-all",
                          "hover:bg-muted/50"
                        )}
                        activeClassName="bg-primary/10 text-primary border-l-2 border-primary"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
