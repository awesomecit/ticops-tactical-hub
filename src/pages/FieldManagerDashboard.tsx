import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  Star,
  Plus,
  Settings,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/authStore';
import { getRoleLabel } from '@/lib/auth';

// Mock data for field manager
const mockFields = [
  {
    id: '1',
    name: 'Zona Alpha',
    status: 'active',
    bookingsToday: 3,
    capacity: 40,
    rating: 4.8,
    revenue: 450,
  },
  {
    id: '2',
    name: 'Arena Bravo',
    status: 'maintenance',
    bookingsToday: 0,
    capacity: 30,
    rating: 4.5,
    revenue: 0,
  },
];

const mockBookings = [
  {
    id: '1',
    fieldName: 'Zona Alpha',
    teamName: 'Alpha Strike',
    date: '2025-12-26',
    time: '10:00 - 12:00',
    status: 'confirmed',
    players: 16,
  },
  {
    id: '2',
    fieldName: 'Zona Alpha',
    teamName: 'Shadow Ops',
    date: '2025-12-26',
    time: '14:00 - 16:00',
    status: 'pending',
    players: 12,
  },
  {
    id: '3',
    fieldName: 'Zona Alpha',
    teamName: 'Delta Force',
    date: '2025-12-27',
    time: '09:00 - 11:00',
    status: 'confirmed',
    players: 20,
  },
];

const FieldManagerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState('overview');

  const totalRevenue = mockFields.reduce((sum, f) => sum + f.revenue, 0);
  const totalBookings = mockBookings.filter(b => b.status === 'confirmed').length;
  const pendingBookings = mockBookings.filter(b => b.status === 'pending').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Attivo</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Manutenzione</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Confermata</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">In attesa</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display uppercase tracking-wider text-foreground">
            Gestione Campi
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Bentornato, {user?.username} • {getRoleLabel(user?.role || 'player')}
          </p>
        </div>
        <GlowButton variant="primary" className="gap-2">
          <Plus className="h-4 w-4" />
          Nuovo Campo
        </GlowButton>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockFields.length}</p>
                <p className="text-xs text-muted-foreground">Campi Gestiti</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Calendar className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalBookings}</p>
                <p className="text-xs text-muted-foreground">Prenotazioni</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingBookings}</p>
                <p className="text-xs text-muted-foreground">In Attesa</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <DollarSign className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">€{totalRevenue}</p>
                <p className="text-xs text-muted-foreground">Oggi</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">I Miei Campi</TabsTrigger>
          <TabsTrigger value="bookings">Prenotazioni</TabsTrigger>
          <TabsTrigger value="stats">Statistiche</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          {mockFields.map((field) => (
            <TacticalCard key={field.id}>
              <TacticalCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display uppercase tracking-wider">{field.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(field.status)}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-400" />
                          {field.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Oggi</p>
                    <p className="font-bold">{field.bookingsToday} partite</p>
                    <p className="text-xs text-emerald-400">€{field.revenue}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <GlowButton variant="secondary" size="sm" className="flex-1 gap-2">
                    <Calendar className="h-4 w-4" />
                    Calendario
                  </GlowButton>
                  <GlowButton variant="secondary" size="sm" className="flex-1 gap-2">
                    <Settings className="h-4 w-4" />
                    Impostazioni
                  </GlowButton>
                </div>
              </TacticalCardContent>
            </TacticalCard>
          ))}
        </TabsContent>

        <TabsContent value="bookings" className="mt-4 space-y-4">
          {mockBookings.map((booking) => (
            <TacticalCard key={booking.id}>
              <TacticalCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display uppercase tracking-wider">{booking.teamName}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {booking.fieldName} • {booking.date}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.time} • {booking.players} giocatori
                    </p>
                  </div>
                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <GlowButton variant="primary" size="sm">
                        <CheckCircle className="h-4 w-4" />
                      </GlowButton>
                      <GlowButton variant="secondary" size="sm">
                        <XCircle className="h-4 w-4" />
                      </GlowButton>
                    </div>
                  )}
                </div>
              </TacticalCardContent>
            </TacticalCard>
          ))}
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <TacticalCard>
            <TacticalCardHeader>
              <TacticalCardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Statistiche Mensili
              </TacticalCardTitle>
            </TacticalCardHeader>
            <TacticalCardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Occupazione Media</span>
                  <span className="font-bold">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Soddisfazione Clienti</span>
                  <span className="font-bold">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Prenotazioni Completate</span>
                  <span className="font-bold">45/50</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </TacticalCardContent>
          </TacticalCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FieldManagerDashboard;
