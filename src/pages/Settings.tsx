import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Smartphone,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Save
} from 'lucide-react';
import { TacticalCard } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    matchReminders: true,
    teamMessages: true,
    killConfirmations: true,
    rankUpdates: true,
    
    // Privacy
    showOnlineStatus: true,
    showStats: true,
    allowTeamInvites: true,
    
    // Appearance
    darkMode: true,
    compactMode: false,
    
    // Profile
    email: user?.callsign ? `${user.callsign.toLowerCase()}@email.com` : '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast({
      title: "Impostazioni salvate",
      description: "Le tue preferenze sono state aggiornate."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Impostazioni</h1>
        <p className="text-muted-foreground">Gestisci il tuo account e le preferenze</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profilo</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifiche</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Sicurezza</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Aspetto</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">Informazioni Profilo</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 bg-card clip-tactical border border-border flex items-center justify-center">
                  <span className="font-display font-bold text-3xl text-primary">
                    {user?.callsign?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <GlowButton variant="outline" size="sm">Cambia Avatar</GlowButton>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG max 2MB</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="callsign">Callsign</Label>
                  <Input id="callsign" value={user?.callsign || ''} disabled />
                  <p className="text-xs text-muted-foreground">Il callsign non può essere modificato</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email"
                      className="pl-10"
                      value={settings.email}
                      onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rank">Rank</Label>
                  <Input id="rank" value={user?.rank?.name || 'Recruit'} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="games">Partite Giocate</Label>
                  <Input id="games" value={user?.stats?.gamesPlayed || 0} disabled />
                </div>
              </div>

              <div className="flex justify-end">
                <GlowButton onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Salva Modifiche
                </GlowButton>
              </div>
            </div>
          </TacticalCard>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">Preferenze Notifiche</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifiche Email</Label>
                  <p className="text-xs text-muted-foreground">Ricevi aggiornamenti via email</p>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notifiche Push</Label>
                  <p className="text-xs text-muted-foreground">Notifiche sul dispositivo</p>
                </div>
                <Switch 
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleToggle('pushNotifications')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Promemoria Partite</Label>
                  <p className="text-xs text-muted-foreground">Notifica prima dell'inizio partita</p>
                </div>
                <Switch 
                  checked={settings.matchReminders}
                  onCheckedChange={() => handleToggle('matchReminders')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Messaggi Team</Label>
                  <p className="text-xs text-muted-foreground">Nuovi messaggi dal tuo team</p>
                </div>
                <Switch 
                  checked={settings.teamMessages}
                  onCheckedChange={() => handleToggle('teamMessages')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Conferme Kill</Label>
                  <p className="text-xs text-muted-foreground">Quando una kill viene confermata</p>
                </div>
                <Switch 
                  checked={settings.killConfirmations}
                  onCheckedChange={() => handleToggle('killConfirmations')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Aggiornamenti Rank</Label>
                  <p className="text-xs text-muted-foreground">Cambi di ELO e tier</p>
                </div>
                <Switch 
                  checked={settings.rankUpdates}
                  onCheckedChange={() => handleToggle('rankUpdates')}
                />
              </div>
            </div>
          </TacticalCard>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">Impostazioni Privacy</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mostra Stato Online</Label>
                  <p className="text-xs text-muted-foreground">Altri possono vedere quando sei online</p>
                </div>
                <Switch 
                  checked={settings.showOnlineStatus}
                  onCheckedChange={() => handleToggle('showOnlineStatus')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mostra Statistiche</Label>
                  <p className="text-xs text-muted-foreground">Le tue stats sono visibili pubblicamente</p>
                </div>
                <Switch 
                  checked={settings.showStats}
                  onCheckedChange={() => handleToggle('showStats')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Consenti Inviti Team</Label>
                  <p className="text-xs text-muted-foreground">Ricevi inviti da altri team</p>
                </div>
                <Switch 
                  checked={settings.allowTeamInvites}
                  onCheckedChange={() => handleToggle('allowTeamInvites')}
                />
              </div>
            </div>
          </TacticalCard>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">Sicurezza Account</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Password Attuale</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="currentPassword" 
                    type={showPassword ? 'text' : 'password'}
                    className="pl-10 pr-10"
                    value={settings.currentPassword}
                    onChange={(e) => setSettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nuova Password</Label>
                <Input 
                  id="newPassword" 
                  type="password"
                  value={settings.newPassword}
                  onChange={(e) => setSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Conferma Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  value={settings.confirmPassword}
                  onChange={(e) => setSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>

              <div className="flex justify-end">
                <GlowButton onClick={handleSave}>
                  <Lock className="h-4 w-4 mr-2" />
                  Aggiorna Password
                </GlowButton>
              </div>
            </div>
          </TacticalCard>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">Personalizzazione</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tema Scuro</Label>
                  <p className="text-xs text-muted-foreground">Usa il tema scuro di default</p>
                </div>
                <Switch 
                  checked={settings.darkMode}
                  onCheckedChange={() => handleToggle('darkMode')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modalità Compatta</Label>
                  <p className="text-xs text-muted-foreground">Riduci spaziature per più contenuto</p>
                </div>
                <Switch 
                  checked={settings.compactMode}
                  onCheckedChange={() => handleToggle('compactMode')}
                />
              </div>
            </div>
          </TacticalCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
