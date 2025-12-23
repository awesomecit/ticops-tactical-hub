import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  MapPin, 
  ShoppingBag,
  X,
  ChevronDown,
  Store,
  Package
} from 'lucide-react';
import { 
  MOCK_SHOPS, 
  MOCK_PRODUCTS, 
  PRODUCT_CATEGORIES, 
  getAllBrands, 
  getAllCities,
  filterProducts,
  searchProducts 
} from '@/mocks/shops';
import { ProductCategory } from '@/types';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertToggle } from '@/components/alerts';

const Shop = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'shops'>('products');

  const brands = useMemo(() => getAllBrands(), []);
  const cities = useMemo(() => getAllCities(), []);

  const filteredProducts = useMemo(() => {
    let results = searchQuery ? searchProducts(searchQuery) : MOCK_PRODUCTS;
    
    results = results.filter(p => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (onlyInStock && !p.inStock) return false;
      return true;
    });

    if (selectedCity !== 'all') {
      const shopsInCity = MOCK_SHOPS.filter(s => s.city === selectedCity).map(s => s.id);
      results = results.filter(p => shopsInCity.includes(p.shopId));
    }

    return results;
  }, [searchQuery, selectedCategory, selectedCity, selectedBrand, priceRange, onlyInStock]);

  const filteredShops = useMemo(() => {
    let results = MOCK_SHOPS;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.city.toLowerCase().includes(query)
      );
    }

    if (selectedCity !== 'all') {
      results = results.filter(s => s.city === selectedCity);
    }

    if (selectedCategory !== 'all') {
      results = results.filter(s => s.categories.includes(selectedCategory));
    }

    return results;
  }, [searchQuery, selectedCity, selectedCategory]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedCity('all');
    setSelectedBrand('all');
    setPriceRange([0, 500]);
    setOnlyInStock(false);
  };

  const hasActiveFilters = selectedCategory !== 'all' || 
    selectedCity !== 'all' || 
    selectedBrand !== 'all' || 
    priceRange[0] > 0 || 
    priceRange[1] < 500 || 
    onlyInStock;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Categoria</label>
        <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as ProductCategory | 'all')}>
          <SelectTrigger>
            <SelectValue placeholder="Tutte le categorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le categorie</SelectItem>
            {PRODUCT_CATEGORIES.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Città</label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger>
            <SelectValue placeholder="Tutte le città" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le città</SelectItem>
            {cities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand - only for products */}
      {activeTab === 'products' && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Marca</label>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger>
              <SelectValue placeholder="Tutte le marche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le marche</SelectItem>
              {brands.map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Price Range - only for products */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <label className="text-sm font-medium">Prezzo</label>
          <Slider
            value={priceRange}
            onValueChange={(v) => setPriceRange(v as [number, number])}
            min={0}
            max={500}
            step={10}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>€{priceRange[0]}</span>
            <span>€{priceRange[1]}</span>
          </div>
        </div>
      )}

      {/* In Stock - only for products */}
      {activeTab === 'products' && (
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="inStock" 
            checked={onlyInStock}
            onCheckedChange={(checked) => setOnlyInStock(checked === true)}
          />
          <label htmlFor="inStock" className="text-sm font-medium cursor-pointer">
            Solo disponibili
          </label>
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="w-4 h-4 mr-2" />
          Rimuovi filtri
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Shop</h1>
        <p className="text-muted-foreground mt-1">
          Esplora negozi e prodotti airsoft
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cerca prodotti o negozi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden relative">
              <SlidersHorizontal className="w-4 h-4" />
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Filtri</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-100px)] mt-4">
              <FilterContent />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Category Pills - Mobile */}
      <ScrollArea className="w-full md:hidden">
        <div className="flex gap-2 pb-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="whitespace-nowrap"
          >
            Tutto
          </Button>
          {PRODUCT_CATEGORIES.map(cat => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="whitespace-nowrap"
            >
              {cat.icon} {cat.name}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'products' | 'shops')}>
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="products" className="flex-1 md:flex-none gap-2">
            <Package className="w-4 h-4" />
            Prodotti ({filteredProducts.length})
          </TabsTrigger>
          <TabsTrigger value="shops" className="flex-1 md:flex-none gap-2">
            <Store className="w-4 h-4" />
            Negozi ({filteredShops.length})
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {/* Desktop Filters */}
          <Card className="hidden md:block p-4 h-fit sticky top-4">
            <h3 className="font-semibold mb-4">Filtri</h3>
            <FilterContent />
          </Card>

          {/* Content */}
          <div className="md:col-span-3">
            <TabsContent value="products" className="m-0">
              {filteredProducts.length === 0 ? (
                <Card className="p-8 text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Nessun prodotto trovato</h3>
                  <p className="text-sm text-muted-foreground">
                    Prova a modificare i filtri di ricerca
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map(product => {
                    const shop = MOCK_SHOPS.find(s => s.id === product.shopId);
                    return (
                      <Card key={product.id} className="overflow-hidden group">
                        {/* Product Image Placeholder */}
                        <div className="aspect-square bg-muted flex items-center justify-center relative">
                          <Package className="w-16 h-16 text-muted-foreground/50" />
                          {product.originalPrice && (
                            <Badge className="absolute top-2 left-2 bg-destructive">
                              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </Badge>
                          )}
                          {!product.inStock && (
                            <Badge variant="secondary" className="absolute top-2 right-2">
                              Esaurito
                            </Badge>
                          )}
                          {product.tags.includes('nuovo') && (
                            <Badge className="absolute top-2 left-2 bg-primary">
                              Nuovo
                            </Badge>
                          )}
                          {/* Alert Toggle for price drop */}
                          <div className="absolute bottom-2 right-2">
                            <AlertToggle
                              entityType="product"
                              entityId={product.id}
                              entityName={product.name}
                              size="sm"
                            />
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-2">
                          {/* Category & Brand */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{PRODUCT_CATEGORIES.find(c => c.id === product.category)?.name}</span>
                            {product.brand && <span>{product.brand}</span>}
                          </div>
                          
                          {/* Name */}
                          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          
                          {/* Shop */}
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Store className="w-3 h-3" />
                            {shop?.name}
                          </p>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">
                              ({product.reviewCount})
                            </span>
                          </div>
                          
                          {/* Price */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-primary">
                              €{product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                €{product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="shops" className="m-0">
              {filteredShops.length === 0 ? (
                <Card className="p-8 text-center">
                  <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Nessun negozio trovato</h3>
                  <p className="text-sm text-muted-foreground">
                    Prova a modificare i filtri di ricerca
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredShops.map(shop => (
                    <Card key={shop.id} className="p-4 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex gap-4">
                        {/* Shop Logo Placeholder */}
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 relative">
                          <Store className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                        
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{shop.name}</h3>
                            {shop.isVerified && (
                              <Badge variant="secondary" className="shrink-0">
                                ✓ Verificato
                              </Badge>
                            )}
                            {/* Alert Toggle for shop discounts */}
                            <AlertToggle
                              entityType="shop"
                              entityId={shop.id}
                              entityName={shop.name}
                              size="sm"
                            />
                          </div>
                          
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {shop.city}
                          </p>
                          
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm font-medium">{shop.rating}</span>
                            <span className="text-xs text-muted-foreground">
                              ({shop.reviewCount} recensioni)
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {shop.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 pt-1">
                            {shop.categories.slice(0, 3).map(catId => {
                              const cat = PRODUCT_CATEGORIES.find(c => c.id === catId);
                              return cat ? (
                                <Badge key={catId} variant="outline" className="text-xs">
                                  {cat.icon} {cat.name}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Shop;
