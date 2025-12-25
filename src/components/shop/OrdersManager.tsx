import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, XCircle, MessageSquare, Eye } from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
  trackingCode?: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'Marco Rossi',
    email: 'marco.r@email.com',
    items: [
      { name: 'Replica M4A1 Full Metal', quantity: 1, price: 299 },
      { name: 'Red Dot Sight T1', quantity: 1, price: 89 },
    ],
    total: 388,
    status: 'pending',
    date: '2025-12-25',
    address: 'Via Roma 123, Milano',
  },
  {
    id: 'ORD-002',
    customer: 'Luca Bianchi',
    email: 'luca.b@email.com',
    items: [
      { name: 'Red Dot Sight T1', quantity: 1, price: 89 },
    ],
    total: 89,
    status: 'shipped',
    date: '2025-12-24',
    address: 'Via Dante 45, Roma',
    trackingCode: 'IT123456789',
  },
  {
    id: 'ORD-003',
    customer: 'Andrea Marino',
    email: 'andrea.m@email.com',
    items: [
      { name: 'Tactical Vest Plate Carrier', quantity: 1, price: 129 },
      { name: 'Maschera Full Face', quantity: 2, price: 98 },
    ],
    total: 227,
    status: 'delivered',
    date: '2025-12-23',
    address: 'Corso Italia 78, Napoli',
    trackingCode: 'IT987654321',
  },
  {
    id: 'ORD-004',
    customer: 'Giuseppe Verdi',
    email: 'giuseppe.v@email.com',
    items: [
      { name: 'BB 0.25g 5000pz', quantity: 3, price: 45 },
    ],
    total: 45,
    status: 'processing',
    date: '2025-12-24',
    address: 'Via Garibaldi 12, Torino',
  },
];

const statusConfig = {
  pending: { label: 'Da Elaborare', icon: Clock, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  processing: { label: 'In Lavorazione', icon: Package, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  shipped: { label: 'Spedito', icon: Truck, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  delivered: { label: 'Consegnato', icon: CheckCircle, color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  cancelled: { label: 'Annullato', icon: XCircle, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

export const OrdersManager: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'shipped' | 'delivered'>('all');

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    toast.success(`Ordine ${orderId} aggiornato a: ${statusConfig[newStatus].label}`);
  };

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const processingCount = orders.filter(o => o.status === 'processing').length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <TacticalCard 
          className={cn("cursor-pointer", filter === 'all' && "border-primary")}
          onClick={() => setFilter('all')}
        >
          <TacticalCardContent className="pt-4 text-center">
            <p className="text-2xl font-bold">{orders.length}</p>
            <p className="text-xs text-muted-foreground">Totali</p>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard 
          className={cn("cursor-pointer", filter === 'pending' && "border-amber-500")}
          onClick={() => setFilter('pending')}
        >
          <TacticalCardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
            <p className="text-xs text-muted-foreground">Da Elaborare</p>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard 
          className={cn("cursor-pointer", filter === 'processing' && "border-blue-500")}
          onClick={() => setFilter('processing')}
        >
          <TacticalCardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{processingCount}</p>
            <p className="text-xs text-muted-foreground">In Lavorazione</p>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard 
          className={cn("cursor-pointer", filter === 'shipped' && "border-purple-500")}
          onClick={() => setFilter('shipped')}
        >
          <TacticalCardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-purple-400">
              {orders.filter(o => o.status === 'shipped').length}
            </p>
            <p className="text-xs text-muted-foreground">Spediti</p>
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;

          return (
            <TacticalCard key={order.id}>
              <TacticalCardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-display uppercase tracking-wider">{order.id}</h4>
                      <Badge className={status.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-sm">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">€{order.total}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>

                <div className="mb-4 p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">Articoli:</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>€{item.price}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground mb-4">
                  📍 {order.address}
                  {order.trackingCode && (
                    <span className="ml-2 font-mono">• Tracking: {order.trackingCode}</span>
                  )}
                </p>

                <div className="flex gap-2 flex-wrap">
                  {order.status === 'pending' && (
                    <>
                      <GlowButton
                        variant="primary"
                        size="sm"
                        onClick={() => handleUpdateStatus(order.id, 'processing')}
                        className="gap-1"
                      >
                        <Package className="h-3 w-3" />
                        Elabora
                      </GlowButton>
                      <GlowButton
                        variant="secondary"
                        size="sm"
                        onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                        className="gap-1"
                      >
                        <XCircle className="h-3 w-3" />
                        Annulla
                      </GlowButton>
                    </>
                  )}
                  {order.status === 'processing' && (
                    <GlowButton
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdateStatus(order.id, 'shipped')}
                      className="gap-1"
                    >
                      <Truck className="h-3 w-3" />
                      Segna Spedito
                    </GlowButton>
                  )}
                  {order.status === 'shipped' && (
                    <GlowButton
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdateStatus(order.id, 'delivered')}
                      className="gap-1"
                    >
                      <CheckCircle className="h-3 w-3" />
                      Conferma Consegna
                    </GlowButton>
                  )}
                  <GlowButton variant="secondary" size="sm" className="gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Contatta
                  </GlowButton>
                </div>
              </TacticalCardContent>
            </TacticalCard>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nessun ordine trovato per questo filtro
          </div>
        )}
      </div>
    </div>
  );
};
