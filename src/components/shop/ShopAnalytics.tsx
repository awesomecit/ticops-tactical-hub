import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Eye,
  Star,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MetricCard {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

const metrics: MetricCard[] = [
  { label: 'Ricavi Mese', value: '€2,847', change: 12.5, icon: DollarSign, color: 'text-emerald-400' },
  { label: 'Ordini', value: '34', change: 8.2, icon: ShoppingCart, color: 'text-blue-400' },
  { label: 'Clienti Unici', value: '28', change: -3.1, icon: Users, color: 'text-purple-400' },
  { label: 'Visite Negozio', value: '1,234', change: 24.8, icon: Eye, color: 'text-amber-400' },
];

const topProducts = [
  { name: 'Red Dot Sight T1', sales: 28, revenue: 2492, trend: 'up' },
  { name: 'Replica M4A1 Full Metal', sales: 12, revenue: 3588, trend: 'up' },
  { name: 'BB 0.25g 5000pz', sales: 45, revenue: 675, trend: 'stable' },
  { name: 'Maschera Full Face', sales: 8, revenue: 392, trend: 'down' },
];

const performanceMetrics = [
  { label: 'Tasso Conversione', value: 12, target: 15 },
  { label: 'Soddisfazione Clienti', value: 95, target: 90 },
  { label: 'Ordini Completati', value: 93, target: 95 },
  { label: 'Tempo Medio Spedizione', value: 85, target: 100 },
];

export const ShopAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.change >= 0;

          return (
            <TacticalCard key={metric.label}>
              <TacticalCardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div className={cn("p-2 rounded-lg", `${metric.color}/20`)}>
                    <Icon className={cn("h-5 w-5", metric.color)} />
                  </div>
                </div>
                <div className={cn(
                  "flex items-center gap-1 mt-2 text-xs",
                  isPositive ? "text-green-400" : "text-red-400"
                )}>
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{Math.abs(metric.change)}% vs mese scorso</span>
                </div>
              </TacticalCardContent>
            </TacticalCard>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <TacticalCard>
          <TacticalCardHeader>
            <TacticalCardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Prodotti più Venduti
            </TacticalCardTitle>
          </TacticalCardHeader>
          <TacticalCardContent className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={product.name} className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display uppercase tracking-wider text-sm truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.sales} venduti • €{product.revenue}
                  </p>
                </div>
                <Badge className={cn(
                  product.trend === 'up' && 'bg-green-500/20 text-green-400',
                  product.trend === 'down' && 'bg-red-500/20 text-red-400',
                  product.trend === 'stable' && 'bg-muted text-muted-foreground',
                )}>
                  {product.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                  {product.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                  {product.trend === 'stable' && '—'}
                </Badge>
              </div>
            ))}
          </TacticalCardContent>
        </TacticalCard>

        {/* Performance */}
        <TacticalCard>
          <TacticalCardHeader>
            <TacticalCardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance
            </TacticalCardTitle>
          </TacticalCardHeader>
          <TacticalCardContent className="space-y-6">
            {performanceMetrics.map((metric) => {
              const isAboveTarget = metric.value >= metric.target;

              return (
                <div key={metric.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{metric.label}</span>
                    <span className={cn(
                      "font-bold",
                      isAboveTarget ? "text-green-400" : "text-amber-400"
                    )}>
                      {metric.value}%
                      <span className="text-xs text-muted-foreground ml-1">
                        / {metric.target}%
                      </span>
                    </span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </TacticalCardContent>
        </TacticalCard>
      </div>

      {/* Rating Overview */}
      <TacticalCard>
        <TacticalCardHeader>
          <TacticalCardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Valutazioni Clienti
          </TacticalCardTitle>
        </TacticalCardHeader>
        <TacticalCardContent>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={cn(
                      "h-6 w-6",
                      star <= 4 ? "text-amber-400 fill-amber-400" : "text-muted"
                    )} 
                  />
                ))}
              </div>
              <p className="text-3xl font-bold">4.8</p>
              <p className="text-xs text-muted-foreground">Media su 47 recensioni</p>
            </div>

            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const counts = { 5: 32, 4: 10, 3: 3, 2: 1, 1: 1 };
                const percentage = (counts[stars as keyof typeof counts] / 47) * 100;

                return (
                  <div key={stars} className="flex items-center gap-2 text-sm">
                    <span className="w-4">{stars}</span>
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    <Progress value={percentage} className="h-2 flex-1" />
                    <span className="w-8 text-right text-muted-foreground">
                      {counts[stars as keyof typeof counts]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </TacticalCardContent>
      </TacticalCard>
    </div>
  );
};
