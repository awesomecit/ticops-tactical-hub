import { Heart, MapPin, Eye, Truck, MessageSquare, Star, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MarketplaceListing } from '@/types/marketplace';
import { categoryLabels, conditionLabels, statusLabels } from '@/mocks/marketplace';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

interface ListingCardProps {
  listing: MarketplaceListing;
  onFavorite?: (id: string) => void;
  onContact?: (id: string) => void;
  onClick?: (id: string) => void;
  isFavorited?: boolean;
}

const conditionColors: Record<string, string> = {
  new: 'bg-green-500/20 text-green-400 border-green-500/30',
  like_new: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  good: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  fair: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  poor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const statusColors: Record<string, string> = {
  active: 'bg-primary/20 text-primary border-primary/30',
  sold: 'bg-muted text-muted-foreground border-border',
  reserved: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  expired: 'bg-destructive/20 text-destructive border-destructive/30',
};

export function ListingCard({
  listing,
  onFavorite,
  onContact,
  onClick,
  isFavorited = false,
}: ListingCardProps) {
  const discount = listing.originalPrice
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : null;

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
      onClick={() => onClick?.(listing.id)}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        
        {/* Status Badge */}
        {listing.status !== 'active' && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <Badge className={`${statusColors[listing.status]} text-sm font-semibold`}>
              {statusLabels[listing.status]}
            </Badge>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          <Badge className={conditionColors[listing.condition]}>
            {conditionLabels[listing.condition]}
          </Badge>
          {listing.shippingAvailable && (
            <Badge className="bg-background/80 text-foreground backdrop-blur-sm">
              <Truck className="mr-1 h-3 w-3" />
              Spedizione
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm ${
            isFavorited ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(listing.id);
          }}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>

        {/* Discount Badge */}
        {discount && discount > 0 && (
          <Badge className="absolute bottom-2 right-2 bg-destructive text-destructive-foreground">
            -{discount}%
          </Badge>
        )}
      </div>

      <CardContent className="space-y-3 p-4">
        {/* Category */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <Tag className="mr-1 h-3 w-3" />
            {categoryLabels[listing.category]}
          </Badge>
          {listing.negotiable && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              Trattabile
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 font-semibold leading-tight text-foreground group-hover:text-primary">
          {listing.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-primary">
            €{listing.price.toLocaleString()}
          </span>
          {listing.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              €{listing.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Location & Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {listing.location}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {listing.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {listing.favorites}
            </span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between border-t border-border/50 pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={listing.sellerAvatar} />
              <AvatarFallback className="text-xs">
                {listing.sellerName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground">
                {listing.sellerName}
              </span>
              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {listing.sellerRating.toFixed(1)}
              </span>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onContact?.(listing.id);
            }}
          >
            <MessageSquare className="h-3 w-3" />
            Contatta
          </Button>
        </div>

        {/* Time */}
        <p className="text-xs text-muted-foreground">
          Pubblicato {formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true, locale: it })}
        </p>
      </CardContent>
    </Card>
  );
}
