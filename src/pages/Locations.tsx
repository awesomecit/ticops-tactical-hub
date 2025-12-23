import React from 'react';
import { MapPin, Navigation, Star, Calendar, Users } from 'lucide-react';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { cn } from '@/lib/utils';

const mockLocations = [
  {
    id: '1',
    name: 'Campo Alfa',
    address: 'Via Roma 123, Milano',
    description: 'Campo CQB indoor con strutture modulari. Ideale per scontri ravvicinati.',
    rating: 4.8,
    reviews: 127,
    upcomingGames: 3,
    features: ['Indoor', 'CQB', 'Notturno', 'Parcheggio'],
  },
  {
    id: '2',
    name: 'Bosco Nero',
    address: 'SP42, Bergamo',
    description: 'Area boschiva di 5 ettari con bunker e trincee. Perfetto per simulazioni tattiche.',
    rating: 4.6,
    reviews: 89,
    upcomingGames: 2,
    features: ['Outdoor', 'Bosco', 'Bunker', 'Trincee'],
  },
  {
    id: '3',
    name: 'Urban Warfare Center',
    address: 'Via Industriale 45, Brescia',
    description: 'Struttura urbana simulata con edifici multipiano, strade e veicoli.',
    rating: 4.9,
    reviews: 203,
    upcomingGames: 5,
    features: ['Urban', 'Multipiano', 'Veicoli', 'Pro'],
  },
];

const Locations: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-glow-primary">Campi</h1>
          <p className="text-muted-foreground mt-1">
            Scopri i campi da gioco nella tua zona
          </p>
        </div>
        <GlowButton variant="primary">
          <MapPin className="h-4 w-4 mr-2" />
          Cerca Vicino a Me
        </GlowButton>
      </div>

      <div className="grid gap-6">
        {mockLocations.map((location, index) => (
          <TacticalCard
            key={location.id}
            variant="large"
            glow="primary"
            interactive
            className="animate-slide-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <TacticalCardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Map Placeholder */}
                <div className="lg:w-64 h-40 lg:h-auto flex-shrink-0 bg-muted clip-tactical flex items-center justify-center border border-border">
                  <MapPin className="h-12 w-12 text-muted-foreground" />
                </div>

                {/* Location Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl uppercase text-foreground">
                        {location.name}
                      </h3>
                      <div className="flex items-center gap-1 text-accent">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-mono text-sm">{location.rating}</span>
                        <span className="text-xs text-muted-foreground">({location.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Navigation className="h-4 w-4" />
                      {location.address}
                    </p>
                  </div>

                  <p className="text-muted-foreground">
                    {location.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {location.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-display uppercase border border-primary/30 clip-tactical-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      {location.upcomingGames} partite in programma
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:items-end justify-center">
                  <GlowButton variant="primary" className="w-full lg:w-auto">
                    Vedi Partite
                  </GlowButton>
                  <GlowButton variant="ghost" size="sm" className="w-full lg:w-auto">
                    <Navigation className="h-4 w-4 mr-2" />
                    Indicazioni
                  </GlowButton>
                </div>
              </div>
            </TacticalCardContent>
          </TacticalCard>
        ))}
      </div>
    </div>
  );
};

export default Locations;
