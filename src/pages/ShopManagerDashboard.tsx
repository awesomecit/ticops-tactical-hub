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
  Eye
} from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/authStore';
import { ProductEditModal, InventoryManager, OrdersManager, ShopAnalytics } from '@/components/shop';

// Mock data for shop manager
const mockProducts = [
  {
    id: '1',
    name: 'Replica M4A1 Full Metal',
    description: 'Replica full metal alta qualità',
    price: 299,
    stock: 5,
    sold: 12,
    views: 234,
    status: 'active' as const,
    category: 'replicas',
    featured: true,
  },
  {
    id: '2',
    name: 'Red Dot Sight T1',
    description: 'Red dot professionale',
    price: 89,
    stock: 15,
    sold: 28,
    views: 456,
    status: 'active' as const,
    category: 'accessories',
    featured: false,
  },
  {
    id: '3',
    name: 'Tactical Vest Plate Carrier',
    description: 'Gilet tattico modulare',
    price: 129,
    stock: 0,
    sold: 8,
    views: 189,
    status: 'out_of_stock' as const,
    category: 'protection',
    featured: false,
  },
];

const ShopManagerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [products, setProducts] = useState(mockProducts);
  const [editingProduct, setEditingProduct] = useState<typeof mockProducts[0] | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const totalRevenue = 2847;
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock <= 5 && p.stock > 0).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Attivo</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Esaurito</Badge>;
      case 'draft':
        return <Badge className="bg-muted text-muted-foreground">Bozza</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleSaveProduct = (product: any) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    } else {
      setProducts(prev => [...prev, product]);
    }
    setEditingProduct(null);
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
            Gestisci prodotti, ordini e inventario
          </p>
        </div>
        <GlowButton 
          variant="primary" 
          className="gap-2"
          onClick={() => {
            setEditingProduct(null);
            setShowProductModal(true);
          }}
        >
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Prodotti</TabsTrigger>
          <TabsTrigger value="orders">Ordini</TabsTrigger>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <ShopAnalytics />
        </TabsContent>

        <TabsContent value="products" className="mt-4 space-y-4">
          {products.map((product) => (
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
                        {product.featured && (
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                            <Star className="h-3 w-3 mr-1" />
                            In Evidenza
                          </Badge>
                        )}
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
                  <GlowButton 
                    variant="secondary" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => {
                      setEditingProduct(product);
                      setShowProductModal(true);
                    }}
                  >
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

        <TabsContent value="orders" className="mt-4">
          <OrdersManager />
        </TabsContent>

        <TabsContent value="inventory" className="mt-4">
          <InventoryManager />
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <ShopAnalytics />
        </TabsContent>
      </Tabs>

      {/* Product Edit Modal */}
      <ProductEditModal
        open={showProductModal}
        onOpenChange={setShowProductModal}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default ShopManagerDashboard;
