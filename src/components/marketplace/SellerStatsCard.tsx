import React from 'react';
import { Star, ThumbsUp, ThumbsDown, Minus, Clock, ShoppingBag, Package, ArrowRightLeft, Shield, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserMarketplaceStats, MarketplaceReview } from '@/stores/marketplaceTransactionStore';
import { formatDistanceToNow, format } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface SellerStatsCardProps {
  userId: string;
  userName: string;
  userAvatar?: string;
  stats: UserMarketplaceStats;
  reviews: MarketplaceReview[];
  compact?: boolean;
}

export function SellerStatsCard({
  userId,
  userName,
  userAvatar,
  stats,
  reviews,
  compact = false,
}: SellerStatsCardProps) {
  const positivePercent = stats.totalReviews > 0 
    ? Math.round((stats.positiveReviews / stats.totalReviews) * 100) 
    : 0;

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 3.5) return 'text-amber-500';
    if (rating >= 2.5) return 'text-orange-500';
    return 'text-red-500';
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 4.5) return { label: 'Top Venditore', variant: 'default' as const };
    if (rating >= 4) return { label: 'Affidabile', variant: 'secondary' as const };
    if (rating >= 3) return { label: 'Nella media', variant: 'outline' as const };
    return { label: 'Da verificare', variant: 'destructive' as const };
  };

  const badge = stats.totalReviews > 0 ? getRatingBadge(stats.averageRating) : null;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/30">
        <Avatar className="h-10 w-10">
          <AvatarImage src={userAvatar} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{userName}</span>
            {badge && <Badge variant={badge.variant} className="text-xs">{badge.label}</Badge>}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className={cn('h-3 w-3', getRatingColor(stats.averageRating), stats.totalReviews > 0 && 'fill-current')} />
              {stats.averageRating.toFixed(1)} ({stats.totalReviews})
            </span>
            <span className="flex items-center gap-1">
              <Package className="h-3 w-3" />
              {stats.totalSales} vendite
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={userAvatar} />
              <AvatarFallback className="text-lg">{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{userName}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
                <span className="flex items-center gap-1 text-sm">
                  <Shield className="h-4 w-4 text-green-500" />
                  Verificato
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={cn('text-3xl font-bold', getRatingColor(stats.averageRating))}>
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-end gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'h-4 w-4',
                    star <= Math.round(stats.averageRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.totalReviews} recensioni
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="p-2 rounded-lg bg-muted/50">
            <Package className="h-5 w-5 mx-auto text-primary mb-1" />
            <p className="text-lg font-bold">{stats.totalSales}</p>
            <p className="text-xs text-muted-foreground">Vendite</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <ShoppingBag className="h-5 w-5 mx-auto text-blue-500 mb-1" />
            <p className="text-lg font-bold">{stats.totalPurchases}</p>
            <p className="text-xs text-muted-foreground">Acquisti</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <ArrowRightLeft className="h-5 w-5 mx-auto text-purple-500 mb-1" />
            <p className="text-lg font-bold">{stats.totalExchanges}</p>
            <p className="text-xs text-muted-foreground">Scambi</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <Clock className="h-5 w-5 mx-auto text-amber-500 mb-1" />
            <p className="text-lg font-bold">{stats.responseTime}</p>
            <p className="text-xs text-muted-foreground">Risposta</p>
          </div>
        </div>

        {/* Review Breakdown */}
        {stats.totalReviews > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Distribuzione recensioni</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-500" />
                  <Progress value={positivePercent} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {stats.positiveReviews} ({positivePercent}%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Minus className="h-4 w-4 text-amber-500" />
                  <Progress 
                    value={stats.totalReviews > 0 ? (stats.neutralReviews / stats.totalReviews) * 100 : 0} 
                    className="flex-1 h-2" 
                  />
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {stats.neutralReviews}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown className="h-4 w-4 text-red-500" />
                  <Progress 
                    value={stats.totalReviews > 0 ? (stats.negativeReviews / stats.totalReviews) * 100 : 0} 
                    className="flex-1 h-2" 
                  />
                  <span className="text-xs text-muted-foreground w-12 text-right">
                    {stats.negativeReviews}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Member Since */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
          <Calendar className="h-4 w-4" />
          Membro dal {format(new Date(stats.memberSince), 'MMMM yyyy', { locale: it })}
        </div>

        {/* Recent Reviews */}
        {reviews.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">Recensioni recenti</p>
              <ScrollArea className="max-h-[200px]">
                <div className="space-y-3">
                  {reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="p-3 rounded-lg bg-muted/30 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={review.reviewerAvatar} />
                            <AvatarFallback className="text-xs">
                              {review.reviewerName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{review.reviewerName}</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                'h-3 w-3',
                                star <= review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-muted-foreground'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: it })}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
