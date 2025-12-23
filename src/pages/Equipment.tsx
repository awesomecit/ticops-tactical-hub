import React, { useState } from 'react';
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
  Zap
} from 'lucide-react';
import { TacticalCard, TacticalCardContent, TacticalCardHeader, TacticalCardTitle } from '@/components/ui/TacticalCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioBox } from '@/components/radio';
import { useRadioStore } from '@/stores/radioStore';
import { cn } from '@/lib/utils';

// Mock equipment data
interface Equipment {
  id: string;
  name: string;
  type: 'radio' | 'optics' | 'protection' | 'lighting' | 'accessory';
  status: 'active' | 'inactive' | 'charging' | 'error';
  battery: number;
  isConnected: boolean;
  icon: React.ElementType;
  description: string;
}

const mockEquipment: Equipment[] = [
  {
    id: 'radio_1',
    name: 'Radio Tattica RT-500',
    type: 'radio',
    status: 'active',
    battery: 85,
    isConnected: true,
    icon: Radio,
    description: 'Radio VHF/UHF dual-band con crittografia',
  },
  {
    id: 'headset_1',
    name: 'Headset Comtac III',
    type: 'radio',
    status: 'active',
    battery: 72,
    isConnected: true,
    icon: Headphones,
    description: 'Cuffie tattiche con cancellazione rumore',
  },
  {
    id: 'optic_1',
    name: 'Red Dot Holosun 510C',
    type: 'optics',
    status: 'active',
    battery: 95,
    isConnected: false,
    icon: Eye,
    description: 'Mirino olografico con solar failsafe',
  },
  {
    id: 'light_1',
    name: 'Torcia Streamlight TLR-1',
    type: 'lighting',
    status: 'inactive',
    battery: 60,
    isConnected: false,
    icon: Flashlight,
    description: 'Torcia tattica 1000 lumen',
  },
  {
    id: 'protection_1',
    name: 'Gilet Tattico Condor',
    type: 'protection',
    status: 'active',
    battery: 100,
    isConnected: false,
    icon: Shield,
    description: 'Plate carrier con MOLLE integrato',
  },
];

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
  const [activeTab, setActiveTab] = useState('all');
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  
  const { status: radioStatus, channels, activateRadio } = useRadioStore();

  const filteredEquipment = activeTab === 'all' 
    ? equipment 
    : equipment.filter(e => e.type === activeTab);

  const toggleEquipment = (id: string) => {
    setEquipment(prev => prev.map(e => 
      e.id === id 
        ? { ...e, status: e.status === 'active' ? 'inactive' : 'active' }
        : e
    ));
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
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configura
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
                filteredEquipment.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-sm border transition-all",
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
                      <item.icon className={cn(
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

                    {/* Status & Toggle */}
                    <div className="flex items-center gap-4">
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
                        onCheckedChange={() => toggleEquipment(item.id)}
                      />
                    </div>
                  </div>
                ))
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
    </div>
  );
};

export default Equipment;
