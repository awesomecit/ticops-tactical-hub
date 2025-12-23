import React, { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { FieldCard, FieldFiltersComponent } from '@/components/fields';
import { MOCK_FIELDS, filterFields, getUniqueCities, FieldFilters } from '@/mocks/fields';

const Locations: React.FC = () => {
  const [filters, setFilters] = useState<FieldFilters>({});
  const cities = useMemo(() => getUniqueCities(), []);
  const filteredFields = useMemo(() => filterFields(filters), [filters]);

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-glow-primary">Campi</h1>
          <p className="text-muted-foreground mt-1">
            Scopri i {MOCK_FIELDS.length} campi disponibili
          </p>
        </div>
        <GlowButton variant="primary">
          <MapPin className="h-4 w-4 mr-2" />
          Cerca Vicino a Me
        </GlowButton>
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