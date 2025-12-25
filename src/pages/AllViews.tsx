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
  Info,
  User,
  ShoppingBag,
  CalendarClock,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ViewItem {
  title: string;
  description: string;
  url: string;
  icon: React.ElementType;
  category: 'main' | 'gameplay' | 'social' | 'commerce' | 'management' | 'admin';
}

const allViews: ViewItem[] = [
  // Main
  { title: 'Dashboard', description: 'Panoramica principale e statistiche', url: '/', icon: LayoutDashboard, category: 'main' },
  { title: 'Profilo', description: 'Gestione profilo utente', url: '/profile', icon: User, category: 'main' },
  { title: 'Impostazioni', description: 'Configurazioni app', url: '/settings', icon: Settings, category: 'main' },
  { title: 'About', description: 'Informazioni sull\'app', url: '/about', icon: Info, category: 'main' },
  
  // Gameplay
  { title: 'Partite', description: 'Lista partite disponibili', url: '/games', icon: Crosshair, category: 'gameplay' },
  { title: 'Gameplay View', description: 'Vista in-game tattica con mappa e radio', url: '/gameplay', icon: Gamepad2, category: 'gameplay' },
  { title: 'Spectator View', description: 'Vista spettatore partita live', url: '/spectator', icon: Eye, category: 'gameplay' },
  { title: 'Referee View', description: 'Vista arbitro con controlli partita', url: '/referee', icon: Shield, category: 'gameplay' },
  { title: 'Organizza', description: 'Organizza nuove partite e trova match', url: '/organize', icon: CalendarClock, category: 'gameplay' },
  
  // Social
  { title: 'Team', description: 'Gestione squadra e membri', url: '/team', icon: Users, category: 'social' },
  { title: 'Chat', description: 'Messaggistica privata e di gruppo', url: '/chat', icon: MessageSquare, category: 'social' },
  { title: 'Team Inbox', description: 'Comunicazioni e inviti team', url: '/team/inbox', icon: Inbox, category: 'social' },
  { title: 'Leaderboard', description: 'Classifiche globali e per tier', url: '/leaderboard', icon: Medal, category: 'social' },
  { title: 'Achievements', description: 'Traguardi, badge e progressi', url: '/achievements', icon: Award, category: 'social' },
  
  // Commerce
  { title: 'Marketplace', description: 'Compra e vendi equipaggiamento', url: '/marketplace', icon: Store, category: 'commerce' },
  { title: 'Shop', description: 'Negozi partner e offerte', url: '/shop', icon: ShoppingBag, category: 'commerce' },
  { title: 'Equipaggiamento', description: 'Gestione gear e loadout', url: '/equipment', icon: Backpack, category: 'commerce' },
  { title: 'Campi', description: 'Esplora campi da gioco', url: '/locations', icon: MapPin, category: 'commerce' },
  
  // Management
  { title: 'Gestione Campi', description: 'Dashboard gestore campo', url: '/field-manager/fields', icon: MapPin, category: 'management' },
  { title: 'Gestione Negozio', description: 'Dashboard shop owner', url: '/shop-manager/dashboard', icon: ShoppingBag, category: 'management' },
  { title: 'Incarichi Arbitro', description: 'Partite assegnate come arbitro', url: '/profile/referee-assignments', icon: Shield, category: 'management' },
  
  // Admin
  { title: 'Admin Dashboard', description: 'Overview amministratore', url: '/admin', icon: LayoutDashboard, category: 'admin' },
  { title: 'Admin Utenti', description: 'Gestione utenti piattaforma', url: '/admin/users', icon: Users, category: 'admin' },
  { title: 'Admin Campi', description: 'Gestione tutti i campi', url: '/admin/fields', icon: MapPin, category: 'admin' },
  { title: 'Admin Arbitri', description: 'Gestione arbitri certificati', url: '/admin/referees', icon: Shield, category: 'admin' },
  { title: 'Admin Partite', description: 'Gestione partite attive', url: '/admin/matches', icon: Crosshair, category: 'admin' },
  { title: 'Admin Radio', description: 'Gestione frequenze radio', url: '/admin/radio', icon: Radio, category: 'admin' },
  { title: 'Admin Analytics', description: 'Statistiche e metriche globali', url: '/admin/analytics', icon: Trophy, category: 'admin' },
];

const categoryConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  main: { label: 'Principale', color: 'text-primary', bgColor: 'bg-primary/20' },
  gameplay: { label: 'Gameplay', color: 'text-destructive', bgColor: 'bg-destructive/20' },
  social: { label: 'Social', color: 'text-blue-500', bgColor: 'bg-blue-500/20' },
  commerce: { label: 'Commerce', color: 'text-green-500', bgColor: 'bg-green-500/20' },
  management: { label: 'Gestione', color: 'text-amber-500', bgColor: 'bg-amber-500/20' },
  admin: { label: 'Admin', color: 'text-purple-500', bgColor: 'bg-purple-500/20' },
};

const AllViews: React.FC = () => {
  const categories = ['main', 'gameplay', 'social', 'commerce', 'management', 'admin'] as const;

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-display uppercase tracking-wider mb-2">Tutte le Viste</h1>
        <p className="text-muted-foreground">
          Accesso rapido a tutte le sezioni dell'applicazione
        </p>
      </div>

      {categories.map((category) => {
        const views = allViews.filter((v) => v.category === category);
        const { label, color, bgColor } = categoryConfig[category];

        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className={cn('text-xs font-display uppercase', bgColor, color)}>
                {label}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {views.length} {views.length === 1 ? 'vista' : 'viste'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {views.map((view) => (
                <Link key={view.url} to={view.url}>
                  <Card className="h-full hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer group">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg transition-colors",
                          bgColor,
                          color,
                          "group-hover:bg-primary group-hover:text-primary-foreground"
                        )}>
                          <view.icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-base font-display uppercase tracking-wider">
                          {view.title}
                        </CardTitle>
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

export default AllViews;
