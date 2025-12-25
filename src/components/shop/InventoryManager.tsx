import React, { useState } from 'react';
import { Package, AlertTriangle, Plus, Minus, History } from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  maxStock: number;
  lastRestock: string;
}

const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Replica M4A1 Full Metal', sku: 'REP-M4A1-FM', stock: 5, minStock: 3, maxStock: 20, lastRestock: '2025-12-20' },
  { id: '2', name: 'Red Dot Sight T1', sku: 'ACC-RDS-T1', stock: 15, minStock: 5, maxStock: 30, lastRestock: '2025-12-18' },
  { id: '3', name: 'Tactical Vest Plate Carrier', sku: 'PRO-VEST-PC', stock: 0, minStock: 2, maxStock: 15, lastRestock: '2025-12-10' },
  { id: '4', name: 'BB 0.25g 5000pz', sku: 'AMM-BB-025', stock: 45, minStock: 20, maxStock: 100, lastRestock: '2025-12-22' },
  { id: '5', name: 'Maschera Full Face', sku: 'PRO-MASK-FF', stock: 8, minStock: 5, maxStock: 25, lastRestock: '2025-12-15' },
];

export const InventoryManager: React.FC = () => {
  const [inventory, setInventory] = useState(mockInventory);
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});

  const getStockStatus = (item: InventoryItem) => {
    if (item.stock === 0) return { label: 'Esaurito', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
    if (item.stock <= item.minStock) return { label: 'Stock Basso', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    return { label: 'Disponibile', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
  };

  const handleAdjustStock = (itemId: string, delta: number) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    const newStock = Math.max(0, Math.min(item.maxStock, item.stock + delta));
    
    setInventory(prev => prev.map(i => 
      i.id === itemId ? { ...i, stock: newStock, lastRestock: new Date().toISOString().split('T')[0] } : i
    ));
    
    toast.success(`Stock ${item.name}: ${newStock} unità`);
  };

  const handleQuickAdjust = (itemId: string) => {
    const amount = adjustments[itemId] || 0;
    if (amount === 0) return;
    
    handleAdjustStock(itemId, amount);
    setAdjustments(prev => ({ ...prev, [itemId]: 0 }));
  };

  const lowStockItems = inventory.filter(i => i.stock <= i.minStock);
  const totalValue = inventory.reduce((sum, i) => sum + i.stock, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalValue}</p>
                <p className="text-xs text-muted-foreground">Unità Totali</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lowStockItems.length}</p>
                <p className="text-xs text-muted-foreground">Da Rifornire</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>

        <TacticalCard>
          <TacticalCardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <History className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inventory.length}</p>
                <p className="text-xs text-muted-foreground">Prodotti Tracciati</p>
              </div>
            </div>
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Inventory List */}
      <TacticalCard>
        <TacticalCardHeader>
          <TacticalCardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Gestione Inventario
          </TacticalCardTitle>
        </TacticalCardHeader>
        <TacticalCardContent className="space-y-4">
          {inventory.map((item) => {
            const status = getStockStatus(item);
            const stockPercentage = (item.stock / item.maxStock) * 100;

            return (
              <div key={item.id} className="p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-display uppercase tracking-wider text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground font-mono">{item.sku}</p>
                  </div>
                  <Badge className={status.color}>{status.label}</Badge>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Stock: {item.stock} / {item.maxStock}</span>
                    <span>Min: {item.minStock}</span>
                  </div>
                  <Progress 
                    value={stockPercentage} 
                    className={cn(
                      "h-2",
                      item.stock <= item.minStock && "bg-amber-500/20"
                    )}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <GlowButton
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAdjustStock(item.id, -1)}
                    disabled={item.stock === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </GlowButton>

                  <div className="flex items-center gap-1 flex-1">
                    <Input
                      type="number"
                      placeholder="±"
                      value={adjustments[item.id] || ''}
                      onChange={(e) => setAdjustments(prev => ({
                        ...prev,
                        [item.id]: parseInt(e.target.value) || 0
                      }))}
                      className="h-8 w-20 text-center text-sm"
                    />
                    <GlowButton
                      variant="secondary"
                      size="sm"
                      onClick={() => handleQuickAdjust(item.id)}
                      disabled={!adjustments[item.id]}
                    >
                      Applica
                    </GlowButton>
                  </div>

                  <GlowButton
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAdjustStock(item.id, 1)}
                    disabled={item.stock >= item.maxStock}
                  >
                    <Plus className="h-4 w-4" />
                  </GlowButton>
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  Ultimo rifornimento: {item.lastRestock}
                </p>
              </div>
            );
          })}
        </TacticalCardContent>
      </TacticalCard>
    </div>
  );
};
