import React, { useState, useEffect, useMemo } from 'react';
import { 
  Radio, 
  Headphones, 
  Shield, 
  Flashlight, 
  Eye, 
  Battery, 
  Wifi, 
  WifiOff,
  Volume2,
  VolumeX,
  Settings,
  CheckCircle,
  AlertCircle,
  Zap,
  Edit2,
  Trash2,
  Plus
} from 'lucide-react';
import { TacticalCard, TacticalCardContent, TacticalCardHeader, TacticalCardTitle } from '@/components/ui/TacticalCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioBox } from '@/components/radio';
import { EquipmentEditModal, PreferencesModal } from '@/components/equipment';
import { useRadioStore } from '@/stores/radioStore';
import { useEquipmentStore, Equipment as EquipmentType } from '@/stores/equipmentStore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Radio,
  Headphones,
  Shield,
  Flashlight,
  Eye,
};

const getIcon = (iconType: string): React.ElementType => {
  return iconMap[iconType] || Radio;
};

const statusColors = {
  active: 'text-green-500',
  inactive: 'text-muted-foreground',
  charging: 'text-yellow-500',
  error: 'text-destructive',
};

const statusLabels = {
  active: 'Attivo',
  inactive: 'Spento',
  charging: 'In carica',
  error: 'Errore',
};

const Equipment: React.FC = () => {
  const { toast } = useToast();
  const { 
    equipment, 
    preferences, 
    toggleEquipmentStatus, 
    updateEquipment,
    removeEquipment,
    setPreferences,
    resetToDefaults 
  } = useEquipmentStore();
  
  const { status: radioStatus, channels, activateRadio } = useRadioStore();
  
  const [activeTab, setActiveTab] = useState(preferences.defaultTab);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | null>(null);

  // Apply default tab from preferences on mount
  useEffect(() => {
    setActiveTab(preferences.defaultTab);
  }, [preferences.defaultTab]);

  // Auto-connect radio if preference is enabled
  useEffect(() => {
    if (preferences.autoConnectRadio && !radioStatus.isConnected && channels.length === 0) {
      activateRadio('team_1');
    }
  }, [preferences.autoConnectRadio, radioStatus.isConnected, channels.length, activateRadio]);

  // Check for low battery alerts
  useEffect(() => {
    if (preferences.showLowBatteryAlerts) {
      const lowBatteryItems = equipment.filter(e => e.battery < 20 && e.status === 'active');
      if (lowBatteryItems.length > 0) {
        toast({
          title: 'Batteria bassa',
          description: `${lowBatteryItems.length} equipaggiamenti hanno batteria sotto il 20%`,
          variant: 'destructive',
        });
      }
    }
  }, [equipment, preferences.showLowBatteryAlerts, toast]);

  // Filter and sort equipment
  const filteredEquipment = useMemo(() => {
    let result = activeTab === 'all' 
      ? equipment 
      : equipment.filter(e => e.type === activeTab);
    
    // Sort based on preference
    return result.sort((a, b) => {
      switch (preferences.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'battery':
          return b.battery - a.battery;
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });
  }, [equipment, activeTab, preferences.sortBy]);

  const handleEditClick = (item: EquipmentType) => {
    setSelectedEquipment(item);
    setEditModalOpen(true);
  };

  const handleSaveEquipment = (id: string, updates: Partial<EquipmentType>) => {
    updateEquipment(id, updates);
    toast({
      title: 'Salvato',
      description: 'Equipaggiamento aggiornato con successo',
    });
  };

  const handleDeleteEquipment = (id: string, name: string) => {
    removeEquipment(id);
    toast({
      title: 'Rimosso',
      description: `${name} è stato rimosso`,
    });
  };

  const handleToggleStatus = (id: string) => {
    toggleEquipmentStatus(id);
    toast({
      title: 'Stato aggiornato',
      description: 'Lo stato dell\'equipaggiamento è stato modificato',
    });
  };

  const handleResetPreferences = () => {
    resetToDefaults();
    setActiveTab('all');
    toast({
      title: 'Ripristinato',
      description: 'Preferenze e equipaggiamento ripristinati ai valori predefiniti',
    });
  };

  const getEquipmentStats = () => {
    const active = equipment.filter(e => e.status === 'active').length;
    const connected = equipment.filter(e => e.isConnected).length;
    const lowBattery = equipment.filter(e => e.battery < 30).length;
    return { active, connected, lowBattery, total: equipment.length };
  };

  const stats = getEquipmentStats();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display uppercase text-foreground">
            Equipaggiamento
          </h1>
          <p className="text-muted-foreground text-sm">
            Gestisci il tuo equipaggiamento tattico e radio
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setPreferencesModalOpen(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Preferenze
          </Button>
          <Button 
            size="sm"
            onClick={() => {
              if (channels.length === 0) {
                activateRadio('team_1');
              }
            }}
          >
            <Radio className="h-4 w-4 mr-2" />
            {channels.length > 0 ? 'Radio Attiva' : 'Attiva Radio'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TacticalCard>
          <TacticalCardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-display">{stats.active}</p>
                <p className="text-xs text-muted-foreground uppercase">Attivi</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-primary/10">
                <Wifi className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display">{stats.connected}</p>
                <p className="text-xs text-muted-foreground uppercase">Connessi</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-yellow-500/10">
                <Battery className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-display">{stats.lowBattery}</p>
                <p className="text-xs text-muted-foreground uppercase">Batteria Bassa</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-muted">
                <Zap className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-display">{stats.total}</p>
                <p className="text-xs text-muted-foreground uppercase">Totale</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Equipment List */}
        <div className="lg:col-span-2">
          <TacticalCard>
            <TacticalCardHeader className="pb-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-5">
                  <TabsTrigger value="all" className="text-xs">Tutti</TabsTrigger>
                  <TabsTrigger value="radio" className="text-xs">
                    <Radio className="h-3 w-3" />
                  </TabsTrigger>
                  <TabsTrigger value="optics" className="text-xs">
                    <Eye className="h-3 w-3" />
                  </TabsTrigger>
                  <TabsTrigger value="lighting" className="text-xs">
                    <Flashlight className="h-3 w-3" />
                  </TabsTrigger>
                  <TabsTrigger value="protection" className="text-xs">
                    <Shield className="h-3 w-3" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </TacticalCardHeader>

            <TacticalCardContent className="p-4 space-y-3">
              {filteredEquipment.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nessun equipaggiamento in questa categoria
                </div>
              ) : (
                filteredEquipment.map((item) => {
                  const IconComponent = getIcon(item.iconType);
                  
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-sm border transition-all group",
                        item.status === 'active' 
                          ? "bg-card border-border" 
                          : "bg-muted/30 border-transparent"
                      )}
                    >
                      {/* Icon */}
                      <div className={cn(
                        "p-3 rounded-sm",
                        item.status === 'active' ? "bg-primary/10" : "bg-muted"
                      )}>
                        <IconComponent className={cn(
                          "h-6 w-6",
                          item.status === 'active' ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display uppercase text-sm truncate">
                            {item.name}
                          </span>
                          {item.isConnected && (
                            <Badge variant="outline" className="text-[10px] px-1.5">
                              <Wifi className="h-2.5 w-2.5 mr-1" />
                              Connesso
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.description}
                        </p>
                        {item.notes && (
                          <p className="text-xs text-primary/80 truncate mt-1">
                            📝 {item.notes}
                          </p>
                        )}
                        
                        {/* Battery */}
                        <div className="flex items-center gap-2 mt-2">
                          <Battery className={cn(
                            "h-3 w-3",
                            item.battery > 50 ? "text-green-500" :
                            item.battery > 20 ? "text-yellow-500" : "text-destructive"
                          )} />
                          <Progress 
                            value={item.battery} 
                            className="h-1.5 flex-1 max-w-24"
                          />
                          <span className="text-[10px] text-muted-foreground">
                            {item.battery}%
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {/* Edit & Delete buttons - visible on hover */}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEditClick(item)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteEquipment(item.id, item.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Status & Toggle */}
                        <div className="text-right">
                          <span className={cn(
                            "text-xs font-medium",
                            statusColors[item.status]
                          )}>
                            {statusLabels[item.status]}
                          </span>
                        </div>
                        <Switch
                          checked={item.status === 'active'}
                          onCheckedChange={() => handleToggleStatus(item.id)}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </TacticalCardContent>
          </TacticalCard>
        </div>

        {/* Radio Panel */}
        <div className="space-y-4">
          {/* Quick Radio Status */}
          <TacticalCard>
            <TacticalCardHeader>
              <TacticalCardTitle className="flex items-center gap-2">
                <Radio className="h-4 w-4" />
                Radio Status
              </TacticalCardTitle>
            </TacticalCardHeader>
            <TacticalCardContent className="p-4">
              {radioStatus.isConnected ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stato</span>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                      <Wifi className="h-3 w-3 mr-1" />
                      Connesso
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Canali</span>
                    <span className="font-display">{channels.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Volume</span>
                    <div className="flex items-center gap-2">
                      {radioStatus.isMuted ? (
                        <VolumeX className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                      <span className="font-display">{radioStatus.volume}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <WifiOff className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Radio non attiva</p>
                  <Button 
                    size="sm" 
                    className="mt-3"
                    onClick={() => activateRadio('team_1')}
                  >
                    Attiva Radio
                  </Button>
                </div>
              )}
            </TacticalCardContent>
          </TacticalCard>

          {/* Radio Box (if active) */}
          {radioStatus.isConnected && <RadioBox compact={false} />}

          {/* Equipment Tips */}
          <TacticalCard>
            <TacticalCardHeader>
              <TacticalCardTitle className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                Consigli
              </TacticalCardTitle>
            </TacticalCardHeader>
            <TacticalCardContent className="p-4">
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  Controlla le batterie prima di ogni partita
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  Testa la connessione radio con il team
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500">•</span>
                  Assicurati che le protezioni siano allacciate
                </li>
              </ul>
            </TacticalCardContent>
          </TacticalCard>
        </div>
      </div>

      {/* Modals */}
      <EquipmentEditModal
        equipment={selectedEquipment}
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedEquipment(null);
        }}
        onSave={handleSaveEquipment}
      />

      <PreferencesModal
        preferences={preferences}
        open={preferencesModalOpen}
        onClose={() => setPreferencesModalOpen(false)}
        onSave={setPreferences}
        onReset={handleResetPreferences}
      />
    </div>
  );
};

export default Equipment;
