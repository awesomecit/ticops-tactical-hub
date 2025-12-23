import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, BellOff, Trash2, MapPin, ShoppingBag, Package, Clock } from 'lucide-react';
import { Alert, AlertNotification } from '@/types';
import { useAlertStore } from '@/stores/alertStore';
import { ALERT_CATEGORY_CONFIG, ALERT_FREQUENCY_CONFIG } from '@/mocks/alerts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const EntityIcon: React.FC<{ type: 'field' | 'shop' | 'product'; className?: string }> = ({ 
  type, 
  className 
}) => {
  const icons = {
    field: MapPin,
    shop: ShoppingBag,
    product: Package,
  };
  const Icon = icons[type];
  return <Icon className={className} />;
};

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
  const navigate = useNavigate();
  const { toggleAlert, deleteAlert } = useAlertStore();
  const categoryConfig = ALERT_CATEGORY_CONFIG[alert.category];
  const frequencyConfig = ALERT_FREQUENCY_CONFIG[alert.frequency];

  const handleDelete = () => {
    deleteAlert(alert.id);
    toast({
      title: 'Alert Eliminato',
      description: `Alert per ${alert.entityName} rimosso`,
    });
  };

  const getEntityUrl = () => {
    if (alert.entityType === 'field') {
      return `/locations/${alert.entityId.replace('field_', 'campo-')}`;
    }
    return '/shop';
  };

  return (
    <div className={cn(
      'flex items-center justify-between p-4 border rounded-lg transition-colors',
      alert.isActive ? 'border-border' : 'border-muted bg-muted/50 opacity-60'
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center text-xl',
          alert.isActive ? 'bg-primary/10' : 'bg-muted'
        )}>
          {categoryConfig.icon}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{alert.entityName}</span>
            <Badge variant="outline" className="text-xs">
              {categoryConfig.label}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <EntityIcon type={alert.entityType} className="h-3 w-3" />
              {alert.entityType === 'field' ? 'Campo' : alert.entityType === 'shop' ? 'Shop' : 'Prodotto'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {frequencyConfig.label}
            </span>
            {alert.triggerCount > 0 && (
              <span>• {alert.triggerCount} notifiche</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          checked={alert.isActive}
          onCheckedChange={() => toggleAlert(alert.id)}
        />
        <Button variant="ghost" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </Button>
      </div>
    </div>
  );
};

const NotificationItem: React.FC<{ notification: AlertNotification }> = ({ notification }) => {
  const navigate = useNavigate();
  const { markNotificationRead } = useAlertStore();

  const handleClick = () => {
    markNotificationRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50',
        !notification.isRead && 'bg-primary/5 border-primary/20'
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <EntityIcon type={notification.entityType} className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">{notification.title}</p>
          {!notification.isRead && (
            <Badge className="h-2 w-2 p-0 rounded-full" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: it })}
        </p>
      </div>
    </div>
  );
};

export const AlertsList: React.FC = () => {
  const { alerts, notifications, markAllNotificationsRead, getUnreadNotificationCount } = useAlertStore();
  const unreadCount = getUnreadNotificationCount();

  const activeAlerts = alerts.filter(a => a.isActive);
  const inactiveAlerts = alerts.filter(a => !a.isActive);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="alerts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="alerts">
            Alert Attivi ({activeAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="notifications" className="relative">
            Notifiche
            {unreadCount > 0 && (
              <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4 mt-4">
          {alerts.length > 0 ? (
            <>
              {activeAlerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
              {inactiveAlerts.length > 0 && (
                <>
                  <div className="text-sm text-muted-foreground pt-4">Alert Disattivati</div>
                  {inactiveAlerts.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Nessun alert configurato</p>
              <p className="text-sm">Vai su un campo o shop e attiva le notifiche</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          {notifications.length > 0 && unreadCount > 0 && (
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={markAllNotificationsRead}>
                Segna tutte come lette
              </Button>
            </div>
          )}
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BellOff className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Nessuna notifica</p>
              <p className="text-sm">Le notifiche degli alert appariranno qui</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsList;