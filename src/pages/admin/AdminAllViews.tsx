import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  MessageSquare, 
  Backpack, 
  MapPin, 
  Crosshair,
  Users,
  Store,
  Medal,
  Settings,
  Radio,
  Eye,
  Shield,
  Inbox,
  Calendar,
  Gamepad2,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ViewItem {
  title: string;
  description: string;
  url: string;
  icon: React.ElementType;
  category: 'main' | 'gameplay' | 'social' | 'commerce' | 'admin';
}

const allViews: ViewItem[] = [
  // Main
  { title: 'Dashboard', description: 'Panoramica principale', url: '/dashboard', icon: LayoutDashboard, category: 'main' },
  { title: 'Profilo', description: 'Gestione profilo utente', url: '/profile', icon: Users, category: 'main' },
  { title: 'Impostazioni', description: 'Configurazioni app', url: '/settings', icon: Settings, category: 'main' },
  { title: 'About', description: 'Informazioni sull\'app', url: '/about', icon: Info, category: 'main' },
  
  // Gameplay
  { title: 'Partite', description: 'Lista partite disponibili', url: '/games', icon: Crosshair, category: 'gameplay' },
  { title: 'Gameplay View', description: 'Vista in-game tattica', url: '/gameplay', icon: Gamepad2, category: 'gameplay' },
  { title: 'Spectator View', description: 'Vista spettatore live', url: '/spectator', icon: Eye, category: 'gameplay' },
  { title: 'Referee View', description: 'Vista arbitro', url: '/referee', icon: Shield, category: 'gameplay' },
  { title: 'Organizza', description: 'Organizza nuove partite', url: '/organize', icon: Calendar, category: 'gameplay' },
  
  // Social
  { title: 'Team', description: 'Gestione squadra', url: '/team', icon: Users, category: 'social' },
  { title: 'Chat', description: 'Messaggistica', url: '/chat', icon: MessageSquare, category: 'social' },
  { title: 'Team Inbox', description: 'Comunicazioni team', url: '/team-inbox', icon: Inbox, category: 'social' },
  { title: 'Leaderboard', description: 'Classifiche globali', url: '/leaderboard', icon: Medal, category: 'social' },
  { title: 'Achievements', description: 'Traguardi e badge', url: '/achievements', icon: Trophy, category: 'social' },
  
  // Commerce
  { title: 'Marketplace', description: 'Mercatino equipaggiamento', url: '/marketplace', icon: Store, category: 'commerce' },
  { title: 'Shop', description: 'Negozi partner', url: '/shop', icon: Store, category: 'commerce' },
  { title: 'Equipaggiamento', description: 'Gestione gear', url: '/equipment', icon: Backpack, category: 'commerce' },
  { title: 'Locations', description: 'Campi da gioco', url: '/locations', icon: MapPin, category: 'commerce' },
  
  // Admin
  { title: 'Admin Dashboard', description: 'Overview amministratore', url: '/admin', icon: LayoutDashboard, category: 'admin' },
  { title: 'Admin Utenti', description: 'Gestione utenti', url: '/admin/users', icon: Users, category: 'admin' },
  { title: 'Admin Campi', description: 'Gestione campi', url: '/admin/fields', icon: MapPin, category: 'admin' },
  { title: 'Admin Arbitri', description: 'Gestione arbitri', url: '/admin/referees', icon: Shield, category: 'admin' },
  { title: 'Admin Partite', description: 'Gestione partite', url: '/admin/matches', icon: Crosshair, category: 'admin' },
  { title: 'Admin Radio', description: 'Gestione frequenze radio', url: '/admin/radio', icon: Radio, category: 'admin' },
  { title: 'Admin Analytics', description: 'Statistiche e metriche', url: '/admin/analytics', icon: Trophy, category: 'admin' },
];

const categoryLabels: Record<string, { label: string; color: string }> = {
  main: { label: 'Principale', color: 'bg-primary/20 text-primary' },
  gameplay: { label: 'Gameplay', color: 'bg-destructive/20 text-destructive' },
  social: { label: 'Social', color: 'bg-blue-500/20 text-blue-500' },
  commerce: { label: 'Commerce', color: 'bg-green-500/20 text-green-500' },
  admin: { label: 'Admin', color: 'bg-orange-500/20 text-orange-500' },
};

const AdminAllViews: React.FC = () => {
  const categories = ['main', 'gameplay', 'social', 'commerce', 'admin'] as const;

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Tutte le Viste</h1>
        <p className="text-muted-foreground">
          Accesso rapido a tutte le pagine dell'applicazione
        </p>
      </div>

      {categories.map((category) => {
        const views = allViews.filter((v) => v.category === category);
        const { label, color } = categoryLabels[category];

        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className={cn('text-xs', color)}>{label}</Badge>
              <span className="text-sm text-muted-foreground">
                {views.length} viste
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {views.map((view) => (
                <Link key={view.url} to={view.url}>
                  <Card className="h-full hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <view.icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-base">{view.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{view.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminAllViews;
