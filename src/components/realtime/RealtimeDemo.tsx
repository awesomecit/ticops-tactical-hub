import React from 'react';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import { usePresence } from '@/hooks/usePresence';
import { Bell, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OnlineUsersIndicator } from './OnlineUsersIndicator';
import { Badge } from '@/components/ui/badge';

interface RealtimeDemoProps {
  className?: string;
}

/**
 * Demo component to showcase real-time features
 */
export const RealtimeDemo: React.FC<RealtimeDemoProps> = ({ className }) => {
  const { triggerDemoNotification } = useRealtimeNotifications();
  const { onlineCount, updateStatus } = usePresence();

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Real-Time Demo
            </CardTitle>
            <CardDescription>
              Testa le funzionalità in tempo reale (mockate)
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-green-500 border-green-500/30">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
            Connesso
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Online Users */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <span className="text-sm font-medium">Utenti Online</span>
          <OnlineUsersIndicator compact />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={triggerDemoNotification}
            className="w-full"
          >
            <Bell className="h-4 w-4 mr-2" />
            Simula Notifica
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateStatus('away')}
            className="w-full"
          >
            Stato: Away
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Queste funzionalità usano un client mock. Con Lovable Cloud attivo, useranno Supabase Realtime.
        </p>
      </CardContent>
    </Card>
  );
};
