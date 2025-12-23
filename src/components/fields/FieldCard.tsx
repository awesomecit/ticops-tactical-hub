import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Users, Euro, MessageCircle } from 'lucide-react';
import { Field } from '@/types';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FieldCardProps {
  field: Field;
  compact?: boolean;
  className?: string;
}

const typeLabels: Record<string, string> = {
  outdoor: 'Outdoor',
  indoor: 'Indoor',
  mixed: 'Misto',
};

const typeColors: Record<string, string> = {
  outdoor: 'bg-green-500/20 text-green-400 border-green-500/30',
  indoor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  mixed: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

export const FieldCard: React.FC<FieldCardProps> = ({ field, compact = false, className }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/locations/${field.slug}`);
  };

  const characteristics = Object.entries(field.characteristics)
    .filter(([_, value]) => value === true)
    .map(([key]) => {
      const labels: Record<string, string> = {
        hasParking: 'Parcheggio',
        hasLockers: 'Spogliatoi',
        hasRental: 'Noleggio',
        hasShop: 'Negozio',
        hasBar: 'Bar',
        hasWifi: 'WiFi',
        hasFirstAid: 'Primo Soccorso',
        hasNightLights: 'Notturno',
        hasSyntheticGrass: 'Erba Sintetica',
        hasBunkers: 'Bunker',
        hasTrenches: 'Trincee',
        hasUrbanStructures: 'Urban',
        isClimateControlled: 'Climatizzato',
      };
      return labels[key] || key;
    })
    .slice(0, compact ? 3 : 6);

  if (compact) {
    return (
      <TacticalCard
        variant="default"
        glow="primary"
        interactive
        onClick={handleViewDetails}
        className={cn('cursor-pointer', className)}
      >
        <TacticalCardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm uppercase truncate">{field.name}</h3>
                <Badge variant="outline" className={cn('text-xs', typeColors[field.type])}>
                  {typeLabels[field.type]}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{field.city}, {field.province}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 text-accent fill-accent" />
                  {field.rating.toFixed(1)}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Euro className="h-3 w-3" />
                  {field.pricePerHour}/h
                </span>
              </div>
            </div>
          </div>
        </TacticalCardContent>
      </TacticalCard>
    );
  }

  return (
    <TacticalCard
      variant="large"
      glow="primary"
      interactive
      className={cn('animate-slide-in-up', className)}
    >
      <TacticalCardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image */}
          <div className="lg:w-64 h-40 lg:h-auto flex-shrink-0 bg-muted clip-tactical flex items-center justify-center border border-border overflow-hidden">
            {field.images[0] ? (
              <img src={field.images[0]} alt={field.name} className="w-full h-full object-cover" />
            ) : (
              <MapPin className="h-12 w-12 text-muted-foreground" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl uppercase text-foreground">{field.name}</h3>
                <Badge variant="outline" className={cn(typeColors[field.type])}>
                  {typeLabels[field.type]}
                </Badge>
                <div className="flex items-center gap-1 text-accent">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-mono text-sm">{field.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">({field.reviewCount} recensioni)</span>
                </div>
              </div>
              
              <p className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                {field.address}, {field.city} ({field.province})
              </p>
            </div>

            <p className="text-muted-foreground line-clamp-2">{field.description}</p>

            {/* Characteristics */}
            <div className="flex flex-wrap gap-2">
              {characteristics.map((char, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs font-display uppercase border border-primary/30 clip-tactical-sm"
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                Max {field.maxPlayers} giocatori
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Euro className="h-4 w-4 text-accent" />
                €{field.pricePerHour}/ora
              </span>
              <span className="text-muted-foreground">
                {field.sizeSquareMeters.toLocaleString()} m²
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 lg:items-end justify-center">
            <GlowButton variant="primary" onClick={handleViewDetails}>
              Vedi Dettagli
            </GlowButton>
            <GlowButton variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contatta
            </GlowButton>
          </div>
        </div>
      </TacticalCardContent>
    </TacticalCard>
  );
};

export default FieldCard;