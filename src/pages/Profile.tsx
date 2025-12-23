import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Edit2, 
  Share2, 
  Shield, 
  Users, 
  Calendar,
  Activity,
  Award,
  ChevronRight,
  LogOut,
  UserCog
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserSummaryCard, EventsList, RoleSummary } from '@/components/profile';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { SocialContactsForm, SocialLinks } from '@/components/social';
import { getCurrentUser } from '@/mocks/users';
import { getUserEvents, getUserSummary, MOCK_USER_ACTIVITY } from '@/mocks/events';
import { getSocialContactsByEntity } from '@/mocks/social';
import { SocialContact } from '@/types/social';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const roleLabels: Record<string, string> = {
  player: 'Giocatore',
  team_leader: 'Team Leader',
  referee: 'Arbitro',
  field_manager: 'Gestore Campo',
  shop_owner: 'Proprietario Shop',
  admin: 'Amministratore',
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const summary = getUserSummary(user.id);
  const upcomingEvents = getUserEvents(user.id, 'upcoming');
  const completedEvents = getUserEvents(user.id, 'completed');
  const [activeTab, setActiveTab] = useState('overview');
  const [userSocials, setUserSocials] = useState<SocialContact[]>(
    getSocialContactsByEntity(user.id, 'user')
  );

  return (
    <div className="space-y-6 pb-20 animate-slide-in-up">
      {/* Profile Header */}
      <TacticalCard>
        <TacticalCardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-primary/30">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="text-2xl font-display bg-primary/20 text-primary">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-display font-bold uppercase">{user.username}</h1>
                <p className="text-muted-foreground">@{user.username.toLowerCase()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{roleLabels[user.role]}</Badge>
                  {user.teamId && (
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" />
                      Team {user.teamId}
                    </Badge>
                  )}
                </div>
                {/* Social Links */}
                {userSocials.length > 0 && (
                  <SocialLinks contacts={userSocials} size="sm" className="mt-2" />
                )}
              </div>
            </div>

            {/* Rank & Actions */}
            <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-end gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{user.tier[0].toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-display font-bold capitalize">{user.tier} {user.tierLevel}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.elo.toLocaleString()} ELO
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigate('/settings')}>
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <Separator className="my-6" />
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{user.stats.matches}</p>
              <p className="text-xs text-muted-foreground">Partite</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{user.stats.wins}</p>
              <p className="text-xs text-muted-foreground">Vittorie</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{user.stats.kills}</p>
              <p className="text-xs text-muted-foreground">Eliminazioni</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                {user.stats.kdRatio.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">K/D</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{user.stats.winRate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">Win Rate</p>
            </div>
          </div>
        </TacticalCardContent>
      </TacticalCard>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="overview" className="flex-1 md:flex-none gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Panoramica</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex-1 md:flex-none gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Eventi</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex-1 md:flex-none gap-2">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Achievement</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1 md:flex-none gap-2">
            <UserCog className="h-4 w-4" />
            <span className="hidden sm:inline">Impostazioni</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Role Summary */}
            <RoleSummary role={user.role} />
            
            {/* User Summary */}
            <UserSummaryCard summary={summary} />
          </div>

          {/* Upcoming Events Preview */}
          <EventsList 
            events={upcomingEvents} 
            title="Prossimi Eventi"
            maxItems={3}
            showViewAll
            onViewAll={() => setActiveTab('events')}
          />

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-primary" />
                Attività Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_USER_ACTIVITY.slice(0, 5).map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-xl">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: it })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EventsList 
              events={upcomingEvents} 
              title="Eventi in Programma"
            />
            <EventsList 
              events={completedEvents} 
              title="Eventi Passati"
            />
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                I Tuoi Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {summary.achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={cn(
                      'p-4 rounded-lg border-2 transition-all hover:scale-[1.02]',
                      achievement.rarity === 'legendary' && 'border-amber-500/50 bg-amber-500/10',
                      achievement.rarity === 'epic' && 'border-purple-500/50 bg-purple-500/10',
                      achievement.rarity === 'rare' && 'border-blue-500/50 bg-blue-500/10',
                      achievement.rarity === 'common' && 'border-border bg-muted/50'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{achievement.description}</p>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            'mt-2 text-[10px]',
                            achievement.rarity === 'legendary' && 'border-amber-500 text-amber-500',
                            achievement.rarity === 'epic' && 'border-purple-500 text-purple-500',
                            achievement.rarity === 'rare' && 'border-blue-500 text-blue-500',
                            achievement.rarity === 'common' && 'border-muted-foreground text-muted-foreground'
                          )}
                        >
                          {achievement.rarity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Social Contacts Form */}
            <SocialContactsForm
              contacts={userSocials}
              onSave={(contacts) => setUserSocials(contacts)}
              entityType="user"
            />

            {/* Other Settings Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Altre Impostazioni
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Altre impostazioni del profilo saranno disponibili presto.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/settings')}
                >
                  Vai alle Impostazioni Complete
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
