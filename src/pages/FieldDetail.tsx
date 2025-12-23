import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Star, Users, Euro, Phone, Mail, Globe, 
  MessageCircle, Bell, Calendar, Navigation, Share2 
} from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldReviewList, AvailabilityCalendar } from '@/components/fields';
import { getFieldBySlug, getFieldReviews, getFieldAvailability, getAverageRating } from '@/mocks/fields';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

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

const characteristicLabels: Record<string, { label: string; icon: string }> = {
  hasParking: { label: 'Parcheggio', icon: '🅿️' },
  hasLockers: { label: 'Spogliatoi', icon: '🚿' },
  hasRental: { label: 'Noleggio Attrezzatura', icon: '🔫' },
  hasShop: { label: 'Negozio', icon: '🛒' },
  hasBar: { label: 'Bar/Ristoro', icon: '☕' },
  hasWifi: { label: 'WiFi', icon: '📶' },
  hasFirstAid: { label: 'Primo Soccorso', icon: '🏥' },
  hasNightLights: { label: 'Illuminazione Notturna', icon: '💡' },
  hasSyntheticGrass: { label: 'Erba Sintetica', icon: '🌿' },
  hasBunkers: { label: 'Bunker', icon: '🏰' },
  hasTrenches: { label: 'Trincee', icon: '⛏️' },
  hasUrbanStructures: { label: 'Strutture Urban', icon: '🏢' },
  isClimateControlled: { label: 'Climatizzato', icon: '❄️' },
};

const FieldDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const field = getFieldBySlug(slug || '');

  if (!field) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <MapPin className="h-16 w-16 text-muted-foreground opacity-50" />
        <h1 className="text-2xl font-display">Campo non trovato</h1>
        <p className="text-muted-foreground">Il campo richiesto non esiste o è stato rimosso.</p>
        <GlowButton variant="primary" onClick={() => navigate('/locations')}>
          Torna ai Campi
        </GlowButton>
      </div>
    );
  }

  const reviews = getFieldReviews(field.id);
  const availability = getFieldAvailability(field.id);
  const averageRating = getAverageRating(field.id);

  const activeCharacteristics = Object.entries(field.characteristics)
    .filter(([_, value]) => value === true)
    .map(([key]) => ({ key, ...characteristicLabels[key] }));

  const handleContact = () => {
    toast({
      title: 'Contatta Campo',
      description: 'Funzionalità in arrivo! Potrai inviare messaggi diretti.',
    });
  };

  const handleSetAlert = () => {
    toast({
      title: 'Alert Impostato',
      description: 'Riceverai notifiche quando ci sono nuove disponibilità.',
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link Copiato',
      description: 'Il link è stato copiato negli appunti.',
    });
  };

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${field.coordinates.lat},${field.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 animate-slide-in-up">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/locations')} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Torna ai Campi
      </Button>

      {/* Header */}
      <div className="space-y-4">
        {/* Image Gallery */}
        <div className="h-48 md:h-64 bg-muted rounded-lg flex items-center justify-center border border-border overflow-hidden">
          {field.images[0] ? (
            <img src={field.images[0]} alt={field.name} className="w-full h-full object-cover" />
          ) : (
            <MapPin className="h-16 w-16 text-muted-foreground" />
          )}
        </div>

        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-display uppercase text-glow-primary">
                {field.name}
              </h1>
              <Badge variant="outline" className={cn(typeColors[field.type])}>
                {typeLabels[field.type]}
              </Badge>
            </div>
            
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {field.address}, {field.city} ({field.province})
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-accent">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-mono text-lg">{field.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">({field.reviewCount} recensioni)</span>
              </div>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                Max {field.maxPlayers}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Euro className="h-4 w-4" />
                €{field.pricePerHour}/h
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <GlowButton variant="primary" onClick={handleContact}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Contatta
            </GlowButton>
            <Button variant="outline" onClick={handleSetAlert}>
              <Bell className="h-4 w-4 mr-2" />
              Alert
            </Button>
            <Button variant="outline" onClick={handleDirections}>
              <Navigation className="h-4 w-4 mr-2" />
              Indicazioni
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="availability">Disponibilità</TabsTrigger>
          <TabsTrigger value="reviews">Recensioni ({field.reviewCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descrizione</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{field.description}</p>
            </CardContent>
          </Card>

          {/* Characteristics */}
          <Card>
            <CardHeader>
              <CardTitle>Caratteristiche</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {activeCharacteristics.map(({ key, label, icon }) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg"
                  >
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
              {activeCharacteristics.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  Nessuna caratteristica specificata
                </p>
              )}
            </CardContent>
          </Card>

          {/* Field Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Superficie</p>
                  <p className="font-medium">{field.sizeSquareMeters.toLocaleString()} m²</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capienza Massima</p>
                  <p className="font-medium">{field.maxPlayers} giocatori</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prezzo</p>
                  <p className="font-medium">€{field.pricePerHour}/ora</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gestito da</p>
                  <p className="font-medium">{field.ownerName}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contatti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {field.phone && (
                <a
                  href={`tel:${field.phone}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {field.phone}
                </a>
              )}
              {field.email && (
                <a
                  href={`mailto:${field.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {field.email}
                </a>
              )}
              {field.website && (
                <a
                  href={field.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {field.website}
                </a>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <AvailabilityCalendar
            slots={availability}
            onSlotSelect={(slot) => {
              toast({
                title: 'Slot Selezionato',
                description: `${slot.startTime} - ${slot.endTime} • €${slot.price}`,
              });
            }}
          />
        </TabsContent>

        <TabsContent value="reviews">
          <FieldReviewList
            reviews={reviews}
            averageRating={averageRating || field.rating}
            totalReviews={field.reviewCount}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FieldDetail;