import React, { useState } from 'react';
import { UserRole } from '@/types';
import { ROLE_CONFIGS, getRoleCapabilities } from '@/lib/roleConfig';
import { TacticalCard } from '@/components/ui/TacticalCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Shield,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserRoleManagerProps {
  userRoles: UserRole[];
  primaryRole: UserRole;
  onPrimaryRoleChange?: (role: UserRole) => void;
  onRoleVisibilityChange?: (role: UserRole, visible: boolean) => void;
  className?: string;
}

export const UserRoleManager: React.FC<UserRoleManagerProps> = ({
  userRoles,
  primaryRole,
  onPrimaryRoleChange,
  onRoleVisibilityChange,
  className
}) => {
  const [expandedRole, setExpandedRole] = useState<UserRole | null>(null);
  
  // Visibilità ruoli individuali (persistente in localStorage)
  const [roleVisibility, setRoleVisibility] = useState<Record<UserRole, boolean>>(() => {
    const stored = localStorage.getItem('role-visibility');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // Fallback: tutti i ruoli visibili
      }
    }
    // Default: tutti visibili
    const defaultVisibility: Partial<Record<UserRole, boolean>> = {};
    userRoles.forEach(role => {
      defaultVisibility[role] = true;
    });
    return defaultVisibility as Record<UserRole, boolean>;
  });

  const toggleRoleVisibility = (role: UserRole) => {
    const newVisibility = {
      ...roleVisibility,
      [role]: !roleVisibility[role]
    };
    setRoleVisibility(newVisibility);
    localStorage.setItem('role-visibility', JSON.stringify(newVisibility));
    
    if (onRoleVisibilityChange) {
      onRoleVisibilityChange(role, newVisibility[role]);
    }
  };

  const [visibilityFilters, setVisibilityFilters] = useState<Record<string, boolean>>({
    gameplay: true,
    management: true,
    commerce: true,
    admin: true
  });

  const toggleCategory = (category: string) => {
    setVisibilityFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      gameplay: 'Gameplay',
      management: 'Gestione',
      commerce: 'Commercio',
      admin: 'Amministrazione'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      gameplay: 'bg-blue-500/20 text-blue-400',
      management: 'bg-yellow-500/20 text-yellow-400',
      commerce: 'bg-green-500/20 text-green-400',
      admin: 'bg-red-500/20 text-red-400'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400';
  };

  // Raggruppa tutte le capabilities per categoria
  const allCapabilitiesByCategory = React.useMemo(() => {
    const grouped: Record<string, Set<string>> = {
      gameplay: new Set(),
      management: new Set(),
      commerce: new Set(),
      admin: new Set()
    };

    userRoles.forEach(role => {
      const capabilities = getRoleCapabilities(role);
      capabilities.forEach(cap => {
        grouped[cap.category].add(cap.id);
      });
    });

    return grouped;
  }, [userRoles]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header con info ruoli */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            I Tuoi Ruoli
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Hai {userRoles.length} {userRoles.length === 1 ? 'ruolo attivo' : 'ruoli attivi'} nella piattaforma
          </p>
        </div>
        
        {userRoles.length > 1 && (
          <Badge variant="secondary" className="text-xs">
            Multi-Ruolo
          </Badge>
        )}
      </div>

      {/* Filtri Visibilità per Categoria */}
      <TacticalCard className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-display font-semibold text-foreground">
            Filtri Visibilità
          </h4>
          <AlertCircle className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Nascondi le funzionalità che non ti servono per semplificare l'interfaccia
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(visibilityFilters).map(category => (
            <div
              key={category}
              className="flex items-center justify-between p-2 rounded-lg border border-border/50"
            >
              <span className="text-sm text-foreground flex items-center gap-2">
                {visibilityFilters[category] ? (
                  <Eye className="w-4 h-4 text-primary" />
                ) : (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                )}
                {getCategoryLabel(category)}
              </span>
              <Switch
                checked={visibilityFilters[category]}
                onCheckedChange={() => toggleCategory(category)}
              />
            </div>
          ))}
        </div>
      </TacticalCard>

      <Separator />

      {/* Lista Ruoli */}
      <div className="space-y-3">
        {userRoles.map(role => {
          const config = ROLE_CONFIGS[role];
          const capabilities = getRoleCapabilities(role);
          const isExpanded = expandedRole === role;
          const isPrimary = primaryRole === role;
          const isVisible = roleVisibility[role] !== false;

          return (
            <TacticalCard
              key={role}
              className={cn(
                'p-4 transition-all',
                isPrimary && 'border-primary/70 bg-primary/5',
                isExpanded && 'ring-2 ring-primary/30'
              )}
            >
              {/* Header Ruolo */}
              <div className="flex items-start justify-between mb-3">
                <div 
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                  onClick={() => setExpandedRole(isExpanded ? null : role)}
                >
                  <span className="text-2xl">{config.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={cn(
                        'text-base font-display font-bold',
                        config.color
                      )}>
                        {config.label}
                      </h4>
                      {isPrimary && (
                        <Badge variant="default" className="text-xs">
                          Primario
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {config.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Toggle Visibilità */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleRoleVisibility(role)}
                    className="gap-1.5 h-8"
                  >
                    {isVisible ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs hidden sm:inline">Visibile</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs hidden sm:inline">Nascosto</span>
                      </>
                    )}
                  </Button>

                  {!isPrimary && onPrimaryRoleChange && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPrimaryRoleChange(role);
                      }}
                      className="text-xs"
                    >
                      Imposta Primario
                    </Button>
                  )}
                </div>
              </div>

              {/* Capabilities Badge (sempre visibile) */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {capabilities.slice(0, isExpanded ? undefined : 4).map(cap => (
                  <Badge
                    key={cap.id}
                    variant="secondary"
                    className={cn(
                      'text-xs',
                      getCategoryColor(cap.category),
                      !visibilityFilters[cap.category] && 'opacity-50'
                    )}
                  >
                    {cap.name}
                  </Badge>
                ))}
                {!isExpanded && capabilities.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{capabilities.length - 4}
                  </Badge>
                )}
              </div>

              {/* Dettagli Espansi */}
              {isExpanded && (
                <div className="pt-3 border-t border-border/50 space-y-3">
                  {/* Capabilities Dettagliate per Categoria */}
                  {['gameplay', 'management', 'commerce', 'admin'].map(category => {
                    const categoryCapabilities = capabilities.filter(
                      cap => cap.category === category
                    );
                    
                    if (categoryCapabilities.length === 0) return null;

                    return (
                      <div key={category}>
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className={cn(
                            'text-xs font-display font-semibold uppercase tracking-wide',
                            getCategoryColor(category)
                          )}>
                            {getCategoryLabel(category)}
                          </h5>
                          {!visibilityFilters[category] && (
                            <EyeOff className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-2 pl-3">
                          {categoryCapabilities.map(cap => (
                            <div
                              key={cap.id}
                              className={cn(
                                'flex items-start gap-2 text-xs transition-opacity',
                                !visibilityFilters[category] && 'opacity-40'
                              )}
                            >
                              <Check className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-foreground font-medium">
                                  {cap.name}
                                </span>
                                <p className="text-muted-foreground text-xs">
                                  {cap.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Rotte Accessibili */}
                  <div className="pt-2">
                    <h5 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Pagine Accessibili
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {config.routes.map(route => (
                        <Badge
                          key={route}
                          variant="outline"
                          className="text-xs font-mono"
                        >
                          {route}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </TacticalCard>
          );
        })}
      </div>

      {/* Riepilogo Capabilities Totali */}
      <TacticalCard className="p-4 bg-muted/20">
        <h4 className="text-sm font-display font-semibold text-foreground mb-3">
          Riepilogo Funzionalità
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(allCapabilitiesByCategory).map(([category, capIds]) => (
            <div
              key={category}
              className={cn(
                'p-3 rounded-lg border transition-opacity',
                visibilityFilters[category]
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-border/30 opacity-50'
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={cn(
                  'text-xs font-display font-semibold uppercase tracking-wide',
                  getCategoryColor(category)
                )}>
                  {getCategoryLabel(category)}
                </span>
                {!visibilityFilters[category] && (
                  <EyeOff className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
              <p className="text-xl font-bold text-foreground">
                {capIds.size}
              </p>
              <p className="text-xs text-muted-foreground">
                funzionalità disponibili
              </p>
            </div>
          ))}
        </div>
      </TacticalCard>
    </div>
  );
};
