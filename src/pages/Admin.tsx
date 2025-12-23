import React from 'react';
import { Shield, Users, Crosshair, MapPin, Settings, BarChart3 } from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { StatDisplay } from '@/components/ui/StatDisplay';

const adminStats = [
  { label: 'Utenti Totali', value: '1,247', icon: Users, trend: 'up' as const, trendValue: '+23' },
  { label: 'Partite Attive', value: '12', icon: Crosshair, trend: 'up' as const, trendValue: '+3' },
  { label: 'Campi Registrati', value: '8', icon: MapPin, trend: 'neutral' as const, trendValue: '' },
  { label: 'Team Attivi', value: '45', icon: Shield, trend: 'up' as const, trendValue: '+5' },
];

const quickActions = [
  { label: 'Crea Partita', icon: Crosshair, variant: 'primary' as const },
  { label: 'Gestisci Utenti', icon: Users, variant: 'tactical' as const },
  { label: 'Aggiungi Campo', icon: MapPin, variant: 'tactical' as const },
  { label: 'Impostazioni', icon: Settings, variant: 'tactical' as const },
];

const Admin: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-glow-primary">Pannello Admin</h1>
          <p className="text-muted-foreground mt-1">
            Gestione della piattaforma TicOps
          </p>
        </div>
        <GlowButton variant="primary">
          <BarChart3 className="h-4 w-4 mr-2" />
          Report Completo
        </GlowButton>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => (
          <TacticalCard
            key={stat.label}
            glow="primary"
            interactive
            className="animate-slide-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TacticalCardContent>
              <StatDisplay
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                trend={stat.trend}
                trendValue={stat.trendValue}
              />
            </TacticalCardContent>
          </TacticalCard>
        ))}
      </div>

      {/* Quick Actions */}
      <TacticalCard>
        <TacticalCardHeader>
          <TacticalCardTitle>Azioni Rapide</TacticalCardTitle>
        </TacticalCardHeader>
        <TacticalCardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <GlowButton
                key={action.label}
                variant={action.variant}
                className="h-auto py-6 flex-col gap-3"
              >
                <action.icon className="h-8 w-8" />
                <span>{action.label}</span>
              </GlowButton>
            ))}
          </div>
        </TacticalCardContent>
      </TacticalCard>

      {/* Recent Activity Placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <TacticalCard>
          <TacticalCardHeader>
            <TacticalCardTitle>Attività Recente</TacticalCardTitle>
          </TacticalCardHeader>
          <TacticalCardContent>
            <div className="space-y-3">
              {[
                'Nuovo utente registrato: PHOENIX_RED',
                'Partita creata: Night Ops - Raid Notturno',
                'Team creato: Shadow Company',
                'Campo aggiornato: Urban Warfare Center',
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-sm border-l-2 border-primary animate-slide-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm text-muted-foreground">{activity}</span>
                </div>
              ))}
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardHeader>
            <TacticalCardTitle>Sistema</TacticalCardTitle>
          </TacticalCardHeader>
          <TacticalCardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Server Status</span>
                <span className="flex items-center gap-2 text-secondary">
                  <span className="h-2 w-2 bg-secondary rounded-full animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database</span>
                <span className="text-foreground font-mono text-sm">98.5% capacity</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Requests (24h)</span>
                <span className="text-foreground font-mono text-sm">12,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Versione</span>
                <span className="text-primary font-mono text-sm">v1.0.0-alpha</span>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>
      </div>
    </div>
  );
};

export default Admin;
