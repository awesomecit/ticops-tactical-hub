import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingBag, 
  Package, 
  DollarSign, 
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
  Star,
  Clock,
  CheckCircle,
  Truck,
  Eye
} from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/authStore';
import { getRoleLabel } from '@/lib/auth';

// Mock data for shop manager
const mockProducts = [
  {
    id: '1',
    name: 'Replica M4A1 Full Metal',
    price: 299,
    stock: 5,
    sold: 12,
    views: 234,
    status: 'active',
  },
  {
    id: '2',
    name: 'Red Dot Sight T1',
    price: 89,
    stock: 15,
    sold: 28,
    views: 456,
    status: 'active',
  },
  {
    id: '3',
    name: 'Tactical Vest Plate Carrier',
    price: 129,
    stock: 0,
    sold: 8,
    views: 189,
    status: 'out_of_stock',
  },
];

const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'Marco R.',
    items: 2,
    total: 388,
    status: 'pending',
    date: '2025-12-25',
  },
  {
    id: 'ORD-002',
    customer: 'Luca B.',
    items: 1,
    total: 89,
    status: 'shipped',
    date: '2025-12-24',
  },
  {
    id: 'ORD-003',
    customer: 'Andrea M.',
    items: 3,
    total: 456,
    status: 'delivered',
    date: '2025-12-23',
  },
];

const ShopManagerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState('products');

  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const totalProducts = mockProducts.length;
  const lowStock = mockProducts.filter(p => p.stock <= 5 && p.stock > 0).length;
  const outOfStock = mockProducts.filter(p => p.stock === 0).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Attivo</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Esaurito</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Da spedire</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Spedito</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Consegnato</Badge>;
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
            Il Mio Negozio
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Bentornato, {user?.username} • {getRoleLabel(user?.role || 'player')}
          </p>
        </div>
        <GlowButton variant="primary" className="gap-2">
          <Plus className="h-4 w-4" />
          Nuovo Prodotto
        </GlowButton>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <DollarSign className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">€{totalRevenue}</p>
                <p className="text-xs text-muted-foreground">Ricavi Mese</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalProducts}</p>
                <p className="text-xs text-muted-foreground">Prodotti</p>
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
                <p className="text-2xl font-bold">{lowStock}</p>
                <p className="text-xs text-muted-foreground">Stock Basso</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <TrendingUp className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{outOfStock}</p>
                <p className="text-xs text-muted-foreground">Esauriti</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Prodotti</TabsTrigger>
          <TabsTrigger value="orders">Ordini</TabsTrigger>
          <TabsTrigger value="stats">Statistiche</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-4 space-y-4">
          {mockProducts.map((product) => (
            <TacticalCard key={product.id}>
              <TacticalCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display uppercase tracking-wider text-sm">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(product.status)}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {product.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">€{product.price}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.stock} in stock • {product.sold} venduti
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <GlowButton variant="secondary" size="sm" className="flex-1 gap-2">
                    <Settings className="h-4 w-4" />
                    Modifica
                  </GlowButton>
                  <GlowButton variant="secondary" size="sm" className="flex-1 gap-2">
                    <Package className="h-4 w-4" />
                    Rifornisci
                  </GlowButton>
                </div>
              </TacticalCardContent>
            </TacticalCard>
          ))}
        </TabsContent>

        <TabsContent value="orders" className="mt-4 space-y-4">
          {mockOrders.map((order) => (
            <TacticalCard key={order.id}>
              <TacticalCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display uppercase tracking-wider">{order.id}</h3>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.customer} • {order.items} articoli
                    </p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">€{order.total}</p>
                    {order.status === 'pending' && (
                      <GlowButton variant="primary" size="sm" className="mt-2 gap-1">
                        <Truck className="h-3 w-3" />
                        Spedisci
                      </GlowButton>
                    )}
                  </div>
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
                Performance Mensile
              </TacticalCardTitle>
            </TacticalCardHeader>
            <TacticalCardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Conversione Visite</span>
                  <span className="font-bold">12%</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Soddisfazione Clienti</span>
                  <span className="font-bold">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Ordini Completati</span>
                  <span className="font-bold">28/30</span>
                </div>
                <Progress value={93} className="h-2" />
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating Negozio</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} 
                      />
                    ))}
                    <span className="ml-2 font-bold">4.8</span>
                  </div>
                </div>
              </div>
            </TacticalCardContent>
          </TacticalCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopManagerDashboard;
