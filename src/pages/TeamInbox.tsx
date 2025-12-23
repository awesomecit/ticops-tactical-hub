import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Inbox, UserPlus, Swords, Megaphone, Settings, CheckCheck } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GlowButton } from '@/components/ui/GlowButton';
import { InboxItem } from '@/components/inbox';
import {
  getInboxItemsByTeam,
  getInboxItemsByType,
  getUnreadCountByType,
  InboxItemType,
  IMockInboxItem,
} from '@/mocks/inbox';
import { getCurrentUser } from '@/mocks';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type TabValue = 'all' | 'requests' | 'challenges' | 'announcements' | 'system';

const tabConfig: Record<TabValue, { label: string; types: InboxItemType[] | null; icon?: React.ElementType }> = {
  all: { label: 'Tutti', types: null },
  requests: { label: 'Richieste', types: ['team_join_request'], icon: UserPlus },
  challenges: { label: 'Sfide', types: ['team_challenge'], icon: Swords },
  announcements: { label: 'Annunci', types: ['announcement', 'achievement'], icon: Megaphone },
  system: { label: 'Sistema', types: ['system', 'match_result'], icon: Settings },
};

const TeamInbox: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const teamId = currentUser.teamId || 'team_001';

  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [items, setItems] = useState<IMockInboxItem[]>(getInboxItemsByTeam(teamId));

  // Filter items based on active tab
  const filteredItems = activeTab === 'all'
    ? items
    : items.filter(item => tabConfig[activeTab].types?.includes(item.type));

  // Get unread counts
  const getUnreadCount = (tab: TabValue): number => {
    if (tab === 'all') {
      return items.filter(i => !i.isRead).length;
    }
    const types = tabConfig[tab].types;
    if (!types) return 0;
    return items.filter(i => !i.isRead && types.includes(i.type)).length;
  };

  // Action handlers
  const handleAccept = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === 'team_join_request') {
      toast.success(`${item.data.username} è stato accettato nel team!`);
    } else if (item.type === 'team_challenge') {
      toast.success(`Sfida accettata! ${item.data.challengerTeamName} è stato notificato.`);
    }

    // Mark as read and remove
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handleReject = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    if (item.type === 'team_join_request') {
      toast.info(`Richiesta di ${item.data.username} rifiutata.`);
    } else if (item.type === 'team_challenge') {
      toast.info(`Sfida di ${item.data.challengerTeamName} rifiutata.`);
    }

    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handleViewProfile = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item?.data.userId) {
      toast.info(`Apertura profilo ${item.data.username}...`);
    }
  };

  const handleViewStats = (itemId: string) => {
    toast.info('Apertura statistiche partita...');
  };

  const handleShare = (itemId: string) => {
    toast.success('Link copiato negli appunti!');
  };

  const handleCounterProposal = (itemId: string) => {
    toast.info('Apertura form controproposta...');
  };

  const handleAddToCalendar = (itemId: string) => {
    toast.success('Evento aggiunto al calendario!');
  };

  const handleMarkAllRead = () => {
    setItems(prev => prev.map(item => ({ ...item, isRead: true })));
    toast.success('Tutti i messaggi segnati come letti');
  };

  const totalUnread = getUnreadCount('all');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/team')}
            className="p-2 hover:bg-muted rounded-sm transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display uppercase text-glow-primary">
                Team Inbox
              </h1>
              {totalUnread > 0 && (
                <span className="h-6 min-w-6 px-2 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalUnread}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm mt-0.5">
              Notifiche e richieste del team
            </p>
          </div>
        </div>

        {totalUnread > 0 && (
          <GlowButton variant="outline" size="sm" onClick={handleMarkAllRead}>
            <CheckCheck className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Segna tutti letti</span>
          </GlowButton>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
        <TabsList className="w-full grid grid-cols-5 bg-card border border-border">
          {(Object.keys(tabConfig) as TabValue[]).map((tab) => {
            const unread = getUnreadCount(tab);
            const IconComponent = tabConfig[tab].icon;
            return (
              <TabsTrigger
                key={tab}
                value={tab}
                className="relative data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <span className="hidden sm:inline">{tabConfig[tab].label}</span>
                <span className="sm:hidden">
                  {IconComponent ? (
                    <IconComponent className="h-4 w-4" />
                  ) : (
                    <Inbox className="h-4 w-4" />
                  )}
                </span>
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Content */}
        <div className="mt-6">
          {filteredItems.length > 0 ? (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <InboxItem
                  key={item.id}
                  item={item}
                  onAccept={() => handleAccept(item.id)}
                  onReject={() => handleReject(item.id)}
                  onViewProfile={() => handleViewProfile(item.id)}
                  onViewStats={() => handleViewStats(item.id)}
                  onShare={() => handleShare(item.id)}
                  onCounterProposal={() => handleCounterProposal(item.id)}
                  onAddToCalendar={() => handleAddToCalendar(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-display uppercase mb-2">
                Nessun messaggio
              </h3>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'all'
                  ? 'La tua inbox è vuota'
                  : `Nessun elemento in ${tabConfig[activeTab].label.toLowerCase()}`}
              </p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default TeamInbox;
