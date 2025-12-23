import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Package, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { mockListings, categoryLabels, conditionLabels } from '@/mocks/marketplace';

export function FavoritesList() {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavoritesStore();

  const favoriteListings = mockListings.filter((listing) =>
    favorites.includes(listing.id)
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-red-500" />
          Annunci Preferiti
          {favorites.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {favorites.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {favoriteListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground mb-3">
              Non hai ancora salvato nessun annuncio
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/marketplace')}
            >
              Esplora il Mercatino
            </Button>
          </div>
        ) : (
          <ScrollArea className="max-h-[400px]">
            <div className="space-y-3">
              {favoriteListings.map((listing) => (
                <div
                  key={listing.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all group cursor-pointer"
                  onClick={() => navigate('/marketplace')}
                >
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {listing.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] py-0">
                        {categoryLabels[listing.category]}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] py-0">
                        {conditionLabels[listing.condition]}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold text-primary mt-1">
                      €{listing.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(listing.id);
                      }}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/marketplace');
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
