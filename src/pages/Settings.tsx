import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Lock,
  Mail,
  Eye,
  EyeOff,
  Save,
  Check,
  BellRing,
  Crown,
  Target,
  Gavel,
  Building2,
  Store as StoreIcon,
  UserCog
} from 'lucide-react';
import { TacticalCard } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { useAlertStore } from '@/stores/alertStore';
import { useToast } from '@/hooks/use-toast';
import { supportedLanguages, changeLanguage } from '@/i18n';
import { AlertsList } from '@/components/alerts';
import { UserRoleManager } from '@/components/profile/UserRoleManager';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const { getUnreadNotificationCount, preferences, updatePreferences } = useAlertStore();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const alertUnreadCount = getUnreadNotificationCount();

  const getRoleIcon = (role: UserRole) => {
    const icons = {
      player: Target,
      team_leader: Crown,
      referee: Gavel,
      field_manager: Building2,
      shop_owner: StoreIcon,
      admin: UserCog,
    };
    return icons[role];
  };

  const getRoleLabel = (role: UserRole) => {
    const labels = {
      player: 'Giocatore',
      team_leader: 'Team Leader',
      referee: 'Arbitro',
      field_manager: 'Gestore Campo',
      shop_owner: 'Negoziante',
      admin: 'Admin',
    };
    return labels[role];
  };

  const getRoleColor = (role: UserRole) => {
    const colors = {
      player: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      team_leader: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      referee: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      field_manager: 'bg-green-500/20 text-green-400 border-green-500/30',
      shop_owner: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      admin: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[role];
  };
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    matchReminders: true,
    teamMessages: true,
    killConfirmations: true,
    rankUpdates: true,
    showOnlineStatus: true,
    showStats: true,
    allowTeamInvites: true,
    darkMode: true,
    compactMode: false,
    email: user?.callsign ? `${user.callsign.toLowerCase()}@email.com` : '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    toast({
      title: t('settings.saved'),
      description: t('settings.language')
    });
  };

  const handleSave = () => {
    toast({
      title: t('settings.saved'),
      description: t('settings.saved')
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">{t('settings.title')}</h1>
        <p className="text-muted-foreground">{t('common.settings')}</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-8 w-full">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.profile')}</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Ruoli</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="gap-2 relative">
            <BellRing className="h-4 w-4" />
            <span className="hidden sm:inline">Alert</span>
            {alertUnreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {alertUnreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.notifications')}</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.privacy')}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.account')}</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.appearance')}</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.language')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Roles Tab - NEW */}
        <TabsContent value="roles">
          <UserRoleManager
            userRoles={user?.roles || (user?.role ? [user.role] : [])}
            primaryRole={user?.primaryRole || user?.role || 'player'}
            onPrimaryRoleChange={(role) => {
              toast({
                title: 'Ruolo Primario Aggiornato',
                description: `Hai impostato "${role}" come ruolo principale`
              });
            }}
          />
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">I Miei Alert</h2>
            <AlertsList />
          </TacticalCard>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">{t('settings.profile')}</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 bg-card clip-tactical border border-border flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-3xl text-primary">
                    {user?.callsign?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <h3 className="font-display font-bold text-lg">{user?.username || user?.callsign}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  {user?.roles && user.roles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {/* Ordine fisso: player, team_leader, referee, field_manager, shop_owner, admin */}
                      {['player', 'team_leader', 'referee', 'field_manager', 'shop_owner', 'admin']
                        .filter(r => user.roles?.includes(r as typeof user.roles[number]))
                        .map((role) => {
                          const Icon = getRoleIcon(role as typeof user.roles[number]);
                          const isPrimary = role === user.primaryRole || role === user.role;
                          return (
                            <Badge
                              key={role}
                              variant="outline"
                              className={cn(
                                'gap-1.5 border',
                                getRoleColor(role as typeof user.roles[number]),
                                isPrimary && 'ring-2 ring-primary/50'
                              )}
                            >
                              <Icon className="h-3 w-3" />
                              {getRoleLabel(role as typeof user.roles[number])}
                            </Badge>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="callsign">{t('auth.username')}</Label>
                  <Input id="callsign" value={user?.callsign || ''} disabled />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.email')}</Label>
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
                  <Label htmlFor="rank">{t('common.rank')}</Label>
                  <Input id="rank" value={user?.rank?.name || 'Recruit'} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="games">{t('dashboard.gamesPlayed')}</Label>
                  <Input id="games" value={user?.stats?.gamesPlayed || 0} disabled />
                </div>
              </div>

              <div className="flex justify-end">
                <GlowButton onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  {t('settings.save')}
                </GlowButton>
              </div>
            </div>
          </TacticalCard>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">{t('settings.notifications')}</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.emailNotifications')}</Label>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.pushNotifications')}</Label>
                </div>
                <Switch 
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleToggle('pushNotifications')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.matchReminders')}</Label>
                </div>
                <Switch 
                  checked={settings.matchReminders}
                  onCheckedChange={() => handleToggle('matchReminders')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.teamUpdates')}</Label>
                </div>
                <Switch 
                  checked={settings.teamMessages}
                  onCheckedChange={() => handleToggle('teamMessages')}
                />
              </div>
            </div>
          </TacticalCard>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">{t('settings.privacy')}</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.showOnlineStatus')}</Label>
                </div>
                <Switch 
                  checked={settings.showOnlineStatus}
                  onCheckedChange={() => handleToggle('showOnlineStatus')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.showStats')}</Label>
                </div>
                <Switch 
                  checked={settings.showStats}
                  onCheckedChange={() => handleToggle('showStats')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.allowTeamInvites')}</Label>
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
            <h2 className="text-lg font-display font-bold text-foreground mb-4">{t('settings.changePassword')}</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{t('auth.password')}</Label>
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
                <Label htmlFor="newPassword">{t('settings.changePassword')}</Label>
                <Input 
                  id="newPassword" 
                  type="password"
                  value={settings.newPassword}
                  onChange={(e) => setSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
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
                  {t('settings.save')}
                </GlowButton>
              </div>
            </div>
          </TacticalCard>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">{t('settings.appearance')}</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('settings.darkMode')}</Label>
                </div>
                <Switch 
                  checked={settings.darkMode}
                  onCheckedChange={() => handleToggle('darkMode')}
                />
              </div>
            </div>
          </TacticalCard>
        </TabsContent>

        {/* Language Tab */}
        <TabsContent value="language">
          <TacticalCard className="p-6">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">{t('settings.language')}</h2>
            
            <div className="grid gap-3">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                    i18n.language === lang.code || (i18n.language.startsWith(lang.code))
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">{lang.nativeName}</p>
                      <p className="text-sm text-muted-foreground">{lang.name}</p>
                    </div>
                  </div>
                  {(i18n.language === lang.code || i18n.language.startsWith(lang.code)) && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </TacticalCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
