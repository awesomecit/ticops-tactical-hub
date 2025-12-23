import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Search,
  SlidersHorizontal,
  Plus,
  Package,
  X,
  Truck,
} from 'lucide-react';
import { ListingCard, ListingDetailModal, CreateListingModal, NotificationDemo, ListingChatDrawer } from '@/components/marketplace';
import { mockListings, categoryLabels, conditionLabels } from '@/mocks/marketplace';
import { MarketplaceListing, ListingCategory, ListingCondition, MarketplaceFilters } from '@/types/marketplace';
import { useToast } from '@/hooks/use-toast';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useMarketplaceNotifications } from '@/hooks/useMarketplaceNotifications';

const Marketplace: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { favorites, toggleFavorite } = useFavoritesStore();
  
  // Enable mock notifications for demo
  useMarketplaceNotifications(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<MarketplaceFilters>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Calculate max price from listings
  const maxPrice = useMemo(() => {
    return Math.max(...mockListings.map((l) => l.price), 1000);
  }, []);

  // Filter listings
  const filteredListings = useMemo(() => {
    return mockListings.filter((listing) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          listing.title.toLowerCase().includes(query) ||
          listing.description.toLowerCase().includes(query) ||
          listing.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && listing.category !== filters.category) {
        return false;
      }

      // Condition filter
      if (filters.condition && listing.condition !== filters.condition) {
        return false;
      }

      // Price range filter
      if (listing.price < priceRange[0] || listing.price > priceRange[1]) {
        return false;
      }

      // Shipping only filter
      if (filters.shippingOnly && !listing.shippingAvailable) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters, priceRange]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.condition) count++;
    if (filters.shippingOnly) count++;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
    return count;
  }, [filters, priceRange, maxPrice]);

  const clearFilters = () => {
    setFilters({});
    setPriceRange([0, maxPrice]);
    setSearchQuery('');
  };

  const handleListingClick = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setDetailModalOpen(true);
  };

  const handleFavoriteToggle = (id: string) => {
    toggleFavorite(id);
    const isFav = !favorites.includes(id);
    toast({
      title: isFav ? 'Aggiunto ai preferiti' : 'Rimosso dai preferiti',
      description: isFav ? 'Puoi trovarlo nel tuo profilo.' : 'L\'annuncio è stato rimosso.',
    });
  };

  const handleCreateListing = (listingData: Omit<MarketplaceListing, 'id' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerRating' | 'status' | 'views' | 'favorites' | 'createdAt' | 'updatedAt'>) => {
    toast({
      title: 'Annuncio pubblicato!',
      description: `"${listingData.title}" è ora online.`,
    });
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div className="space-y-2">
        <Label>Categoria</Label>
        <Select
          value={filters.category || ''}
          onValueChange={(v) =>
            setFilters({ ...filters, category: v as ListingCategory || undefined })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Tutte le categorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le categorie</SelectItem>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <Label>Condizione</Label>
        <Select
          value={filters.condition || ''}
          onValueChange={(v) =>
            setFilters({ ...filters, condition: v as ListingCondition || undefined })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Tutte le condizioni" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le condizioni</SelectItem>
            {Object.entries(conditionLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Prezzo</Label>
          <span className="text-sm text-muted-foreground">
            {priceRange[0]}€ - {priceRange[1]}€
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          min={0}
          max={maxPrice}
          step={10}
          className="w-full"
        />
      </div>

      <Separator />

      {/* Shipping Only */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-muted-foreground" />
          <Label htmlFor="shipping" className="cursor-pointer">
            Solo con spedizione
          </Label>
        </div>
        <Switch
          id="shipping"
          checked={filters.shippingOnly || false}
          onCheckedChange={(v) => setFilters({ ...filters, shippingOnly: v })}
        />
      </div>

      <Separator />

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        <X className="w-4 h-4 mr-2" />
        Cancella filtri
      </Button>

      <Separator />

      {/* Notification Demo */}
      <NotificationDemo />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">Mercatino</h1>
          <p className="text-muted-foreground">
            Compra e vendi attrezzatura airsoft
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuovo annuncio
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca annunci..."
            className="pl-10"
          />
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:flex gap-2">
          <Select
            value={filters.category || ''}
            onValueChange={(v) =>
              setFilters({ ...filters, category: v === 'all' ? undefined : v as ListingCategory })
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte</SelectItem>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.condition || ''}
            onValueChange={(v) =>
              setFilters({ ...filters, condition: v === 'all' ? undefined : v as ListingCondition })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Condizione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte</SelectItem>
              {Object.entries(conditionLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="icon" onClick={clearFilters}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Mobile Filters Button */}
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filtri
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filtri</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-120px)] mt-6">
              <FiltersContent />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Badges */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {categoryLabels[filters.category]}
              <button
                onClick={() => setFilters({ ...filters, category: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.condition && (
            <Badge variant="secondary" className="gap-1">
              {conditionLabels[filters.condition]}
              <button
                onClick={() => setFilters({ ...filters, condition: undefined })}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {filters.shippingOnly && (
            <Badge variant="secondary" className="gap-1">
              Con spedizione
              <button
                onClick={() => setFilters({ ...filters, shippingOnly: false })}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <Badge variant="secondary" className="gap-1">
              {priceRange[0]}€ - {priceRange[1]}€
              <button
                onClick={() => setPriceRange([0, maxPrice])}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {filteredListings.length} annunci trovati
        </span>
      </div>

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onClick={() => handleListingClick(listing)}
              onFavorite={handleFavoriteToggle}
              isFavorited={favorites.includes(listing.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nessun annuncio trovato</h3>
          <p className="text-muted-foreground mb-4">
            Prova a modificare i filtri o la ricerca
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Cancella filtri
          </Button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedListing && (
        <>
          <ListingDetailModal
            listing={selectedListing}
            open={detailModalOpen}
            onOpenChange={setDetailModalOpen}
            onOpenChat={() => {
              setDetailModalOpen(false);
              setChatOpen(true);
            }}
          />
          <ListingChatDrawer
            listing={selectedListing}
            open={chatOpen}
            onOpenChange={setChatOpen}
          />
        </>
      )}

      {/* Create Listing Modal */}
      <CreateListingModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={handleCreateListing}
      />
    </div>
  );
};

export default Marketplace;
