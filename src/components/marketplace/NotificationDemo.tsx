import React from 'react';
import { Bell, TrendingDown, ShoppingBag, Lock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useMarketplaceNotifications } from '@/hooks/useMarketplaceNotifications';
import { useToast } from '@/hooks/use-toast';

export function NotificationDemo() {
  const { favorites } = useFavoritesStore();
  const { triggerMockNotification } = useMarketplaceNotifications(true);
  const { toast } = useToast();

  const handleTrigger = (type: 'price_drop' | 'sold' | 'reserved' | 'updated') => {
    if (favorites.length === 0) {
      toast({
        title: 'Nessun preferito',
        description: 'Aggiungi prima degli annunci ai preferiti.',
        variant: 'destructive',
      });
      return;
    }
    
    triggerMockNotification(type);
    toast({
      title: 'Notifica inviata',
      description: 'Controlla le notifiche in alto a destra.',
    });
  };

  return (
    <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Bell className="h-4 w-4 text-primary" />
          Demo Notifiche
          <Badge variant="outline" className="ml-2 text-xs">
            Mock
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Simula notifiche per i tuoi {favorites.length} annunci preferiti.
          Le notifiche appariranno automaticamente ogni 30-60 secondi.
        </p>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => handleTrigger('price_drop')}
            disabled={favorites.length === 0}
          >
            <TrendingDown className="h-3 w-3 text-green-500" />
            Prezzo ribassato
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => handleTrigger('sold')}
            disabled={favorites.length === 0}
          >
            <ShoppingBag className="h-3 w-3 text-red-500" />
            Venduto
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => handleTrigger('reserved')}
            disabled={favorites.length === 0}
          >
            <Lock className="h-3 w-3 text-amber-500" />
            Riservato
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => handleTrigger('updated')}
            disabled={favorites.length === 0}
          >
            <RefreshCw className="h-3 w-3 text-blue-500" />
            Aggiornato
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
