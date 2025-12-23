import React from 'react';
import { Search, SlidersHorizontal, X, Star, MapPin, Euro } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { FieldType, FieldCharacteristics } from '@/types';
import { FieldFilters as IFieldFilters } from '@/mocks/fields';
import { cn } from '@/lib/utils';

interface FieldFiltersProps {
  filters: IFieldFilters;
  onFiltersChange: (filters: IFieldFilters) => void;
  cities: string[];
}

const characteristicOptions: { key: keyof FieldCharacteristics; label: string; icon: string }[] = [
  { key: 'hasParking', label: 'Parcheggio', icon: '🅿️' },
  { key: 'hasLockers', label: 'Spogliatoi', icon: '🚿' },
  { key: 'hasRental', label: 'Noleggio', icon: '🔫' },
  { key: 'hasShop', label: 'Negozio', icon: '🛒' },
  { key: 'hasBar', label: 'Bar/Ristoro', icon: '☕' },
  { key: 'hasWifi', label: 'WiFi', icon: '📶' },
  { key: 'hasFirstAid', label: 'Primo Soccorso', icon: '🏥' },
  { key: 'hasNightLights', label: 'Illuminazione Notturna', icon: '💡' },
  { key: 'hasBunkers', label: 'Bunker', icon: '🏰' },
  { key: 'hasTrenches', label: 'Trincee', icon: '⛏️' },
  { key: 'hasUrbanStructures', label: 'Strutture Urban', icon: '🏢' },
  { key: 'isClimateControlled', label: 'Climatizzato', icon: '❄️' },
];

export const FieldFiltersComponent: React.FC<FieldFiltersProps> = ({
  filters,
  onFiltersChange,
  cities,
}) => {
  const activeFiltersCount = [
    filters.type,
    filters.city,
    filters.minRating,
    filters.maxPrice,
    filters.availabilityDate,
    filters.characteristics && Object.values(filters.characteristics).some(v => v),
  ].filter(Boolean).length;

  const clearFilters = () => {
    onFiltersChange({ search: filters.search });
  };

  const updateFilter = <K extends keyof IFieldFilters>(key: K, value: IFieldFilters[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleCharacteristic = (key: keyof FieldCharacteristics) => {
    const current = filters.characteristics || {};
    const newValue = !current[key];
    const updated = { ...current, [key]: newValue };
    
    // Remove false values
    Object.keys(updated).forEach(k => {
      if (!updated[k as keyof FieldCharacteristics]) {
        delete updated[k as keyof FieldCharacteristics];
      }
    });
    
    updateFilter('characteristics', Object.keys(updated).length > 0 ? updated : undefined);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca campi per nome, città..."
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value || undefined)}
            className="pl-10"
          />
        </div>
        
        {/* Mobile Filters Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden relative">
              <SlidersHorizontal className="h-4 w-4" />
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filtri</SheetTitle>
              <SheetDescription>Filtra i campi per caratteristiche</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-6 overflow-y-auto pb-20">
              <FilterContent
                filters={filters}
                cities={cities}
                updateFilter={updateFilter}
                toggleCharacteristic={toggleCharacteristic}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:flex flex-wrap gap-3 items-center">
        {/* Type Filter */}
        <Select
          value={filters.type || 'all'}
          onValueChange={(v) => updateFilter('type', v === 'all' ? undefined : v as FieldType)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Tipo campo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i tipi</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
            <SelectItem value="indoor">Indoor</SelectItem>
            <SelectItem value="mixed">Misto</SelectItem>
          </SelectContent>
        </Select>

        {/* City Filter */}
        <Select
          value={filters.city || 'all'}
          onValueChange={(v) => updateFilter('city', v === 'all' ? undefined : v)}
        >
          <SelectTrigger className="w-[140px]">
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Città" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le città</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Rating Filter */}
        <Select
          value={filters.minRating?.toString() || 'all'}
          onValueChange={(v) => updateFilter('minRating', v === 'all' ? undefined : parseFloat(v))}
        >
          <SelectTrigger className="w-[140px]">
            <Star className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualsiasi</SelectItem>
            <SelectItem value="4.5">4.5+ stelle</SelectItem>
            <SelectItem value="4">4+ stelle</SelectItem>
            <SelectItem value="3.5">3.5+ stelle</SelectItem>
          </SelectContent>
        </Select>

        {/* Price Filter */}
        <Select
          value={filters.maxPrice?.toString() || 'all'}
          onValueChange={(v) => updateFilter('maxPrice', v === 'all' ? undefined : parseInt(v))}
        >
          <SelectTrigger className="w-[140px]">
            <Euro className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Prezzo max" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualsiasi</SelectItem>
            <SelectItem value="10">Max €10/h</SelectItem>
            <SelectItem value="15">Max €15/h</SelectItem>
            <SelectItem value="20">Max €20/h</SelectItem>
            <SelectItem value="25">Max €25/h</SelectItem>
          </SelectContent>
        </Select>

        {/* Availability Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn(!filters.availabilityDate && 'text-muted-foreground')}>
              {filters.availabilityDate ? format(filters.availabilityDate, 'PPP', { locale: it }) : 'Data disponibilità'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={filters.availabilityDate}
              onSelect={(date) => {
                updateFilter('availabilityDate', date);
                updateFilter('hasAvailability', !!date);
              }}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* Characteristics Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Caratteristiche
              {filters.characteristics && Object.keys(filters.characteristics).length > 0 && (
                <Badge className="ml-2">{Object.keys(filters.characteristics).length}</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="grid grid-cols-2 gap-3">
              {characteristicOptions.map((opt) => (
                <div key={opt.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={opt.key}
                    checked={!!filters.characteristics?.[opt.key]}
                    onCheckedChange={() => toggleCharacteristic(opt.key)}
                  />
                  <Label htmlFor={opt.key} className="text-sm cursor-pointer">
                    <span className="mr-1">{opt.icon}</span>
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Pulisci filtri
          </Button>
        )}
      </div>

      {/* Active Filters Pills */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.type && (
            <Badge variant="secondary" className="gap-1">
              {filters.type}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('type', undefined)} />
            </Badge>
          )}
          {filters.city && (
            <Badge variant="secondary" className="gap-1">
              {filters.city}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('city', undefined)} />
            </Badge>
          )}
          {filters.minRating && (
            <Badge variant="secondary" className="gap-1">
              {filters.minRating}+ ★
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('minRating', undefined)} />
            </Badge>
          )}
          {filters.maxPrice && (
            <Badge variant="secondary" className="gap-1">
              Max €{filters.maxPrice}
              <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('maxPrice', undefined)} />
            </Badge>
          )}
          {filters.availabilityDate && (
            <Badge variant="secondary" className="gap-1">
              {format(filters.availabilityDate, 'dd/MM', { locale: it })}
              <X className="h-3 w-3 cursor-pointer" onClick={() => {
                updateFilter('availabilityDate', undefined);
                updateFilter('hasAvailability', undefined);
              }} />
            </Badge>
          )}
          {filters.characteristics && Object.entries(filters.characteristics).map(([key, value]) => {
            if (!value) return null;
            const opt = characteristicOptions.find(o => o.key === key);
            return (
              <Badge key={key} variant="secondary" className="gap-1">
                {opt?.icon} {opt?.label}
                <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCharacteristic(key as keyof FieldCharacteristics)} />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Extracted filter content for mobile sheet
const FilterContent: React.FC<{
  filters: IFieldFilters;
  cities: string[];
  updateFilter: <K extends keyof IFieldFilters>(key: K, value: IFieldFilters[K]) => void;
  toggleCharacteristic: (key: keyof FieldCharacteristics) => void;
}> = ({ filters, cities, updateFilter, toggleCharacteristic }) => (
  <>
    <div className="space-y-2">
      <Label>Tipo Campo</Label>
      <Select
        value={filters.type || 'all'}
        onValueChange={(v) => updateFilter('type', v === 'all' ? undefined : v as FieldType)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Tutti i tipi" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutti i tipi</SelectItem>
          <SelectItem value="outdoor">Outdoor</SelectItem>
          <SelectItem value="indoor">Indoor</SelectItem>
          <SelectItem value="mixed">Misto</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label>Città</Label>
      <Select
        value={filters.city || 'all'}
        onValueChange={(v) => updateFilter('city', v === 'all' ? undefined : v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Tutte le città" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutte le città</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>{city}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label>Rating Minimo</Label>
      <Select
        value={filters.minRating?.toString() || 'all'}
        onValueChange={(v) => updateFilter('minRating', v === 'all' ? undefined : parseFloat(v))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Qualsiasi" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Qualsiasi</SelectItem>
          <SelectItem value="4.5">4.5+ stelle</SelectItem>
          <SelectItem value="4">4+ stelle</SelectItem>
          <SelectItem value="3.5">3.5+ stelle</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label>Prezzo Massimo (€/h)</Label>
      <Slider
        value={[filters.maxPrice || 30]}
        min={5}
        max={30}
        step={5}
        onValueChange={([v]) => updateFilter('maxPrice', v === 30 ? undefined : v)}
      />
      <div className="text-sm text-muted-foreground text-center">
        {filters.maxPrice ? `Max €${filters.maxPrice}/h` : 'Qualsiasi prezzo'}
      </div>
    </div>

    <div className="space-y-2">
      <Label>Caratteristiche</Label>
      <div className="grid grid-cols-2 gap-3">
        {characteristicOptions.map((opt) => (
          <div key={opt.key} className="flex items-center space-x-2">
            <Checkbox
              id={`mobile-${opt.key}`}
              checked={!!filters.characteristics?.[opt.key]}
              onCheckedChange={() => toggleCharacteristic(opt.key)}
            />
            <Label htmlFor={`mobile-${opt.key}`} className="text-sm cursor-pointer">
              <span className="mr-1">{opt.icon}</span>
              {opt.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default FieldFiltersComponent;