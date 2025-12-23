import React, { useState, useMemo, useCallback } from 'react';
import { MapPin, Loader2, Navigation } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { FieldCard, FieldFiltersComponent } from '@/components/fields';
import { MOCK_FIELDS, filterFields, getUniqueCities, FieldFilters } from '@/mocks/fields';
import { Field } from '@/types';
import { toast } from '@/hooks/use-toast';

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Locations: React.FC = () => {
  const [filters, setFilters] = useState<FieldFilters>({});
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);
  
  const cities = useMemo(() => getUniqueCities(), []);
  
  const filteredFields = useMemo(() => {
    let results = filterFields(filters);
    
    // Sort by distance if user location is available
    if (sortByDistance && userLocation) {
      results = [...results].sort((a, b) => {
        const distA = calculateDistance(
          userLocation.lat, userLocation.lng,
          a.coordinates.lat, a.coordinates.lng
        );
        const distB = calculateDistance(
          userLocation.lat, userLocation.lng,
          b.coordinates.lat, b.coordinates.lng
        );
        return distA - distB;
      });
    }
    
    return results;
  }, [filters, userLocation, sortByDistance]);

  // Calculate distance for each field
  const getFieldDistance = useCallback((field: Field): string | null => {
    if (!userLocation) return null;
    const dist = calculateDistance(
      userLocation.lat, userLocation.lng,
      field.coordinates.lat, field.coordinates.lng
    );
    return dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`;
  }, [userLocation]);

  const handleSearchNearby = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Geolocalizzazione non supportata',
        description: 'Il tuo browser non supporta la geolocalizzazione.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setSortByDistance(true);
        setIsLoadingLocation(false);
        
        toast({
          title: 'Posizione trovata!',
          description: 'I campi sono ora ordinati per distanza.',
        });
      },
      (error) => {
        setIsLoadingLocation(false);
        let errorMessage = 'Impossibile ottenere la posizione.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permesso di geolocalizzazione negato. Abilita la posizione nelle impostazioni del browser.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Informazioni sulla posizione non disponibili.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Richiesta di posizione scaduta.';
            break;
        }
        
        toast({
          title: 'Errore Posizione',
          description: errorMessage,
          variant: 'destructive',
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  };

  const handleClearLocation = () => {
    setUserLocation(null);
    setSortByDistance(false);
    toast({
      title: 'Ordinamento ripristinato',
      description: 'I campi non sono più ordinati per distanza.',
    });
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-glow-primary">Campi</h1>
          <p className="text-muted-foreground mt-1">
            {sortByDistance 
              ? `${filteredFields.length} campi ordinati per distanza`
              : `Scopri i ${MOCK_FIELDS.length} campi disponibili`
            }
          </p>
        </div>
        <div className="flex gap-2">
          {sortByDistance ? (
            <GlowButton variant="secondary" onClick={handleClearLocation}>
              <Navigation className="h-4 w-4 mr-2" />
              Posizione Attiva
            </GlowButton>
          ) : (
            <GlowButton 
              variant="primary" 
              onClick={handleSearchNearby}
              disabled={isLoadingLocation}
            >
              {isLoadingLocation ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4 mr-2" />
              )}
              {isLoadingLocation ? 'Ricerca...' : 'Cerca Vicino a Me'}
            </GlowButton>
          )}
        </div>
      </div>

      <FieldFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        cities={cities}
      />

      <div className="grid gap-6">
        {filteredFields.length > 0 ? (
          filteredFields.map((field, index) => (
            <FieldCard
              key={field.id}
              field={field}
              distance={getFieldDistance(field)}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Nessun campo trovato</p>
            <p className="text-sm">Prova a modificare i filtri di ricerca</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Locations;