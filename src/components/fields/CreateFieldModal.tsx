import React, { useState } from 'react';
import {
  MapPin,
  Upload,
  Plus,
  X,
  Wifi,
  Car,
  Lock,
  Coffee,
  Moon,
  Building,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GlowButton } from '@/components/ui/GlowButton';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FieldType, FieldCharacteristics } from '@/types';

interface CreateFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: FieldFormData) => void;
}

export interface FieldFormData {
  name: string;
  description: string;
  type: FieldType;
  address: string;
  city: string;
  province: string;
  region: string;
  pricePerHour: number;
  maxPlayers: number;
  sizeSquareMeters: number;
  phone: string;
  email: string;
  website: string;
  characteristics: FieldCharacteristics;
  images: string[];
}

const REGIONS = [
  'Lombardia',
  'Piemonte',
  'Veneto',
  'Emilia-Romagna',
  'Toscana',
  'Lazio',
  'Campania',
  'Sicilia',
  'Puglia',
  'Liguria',
];

const PROVINCES: Record<string, string[]> = {
  Lombardia: ['MI', 'BG', 'BS', 'CO', 'CR', 'LC', 'LO', 'MN', 'MB', 'PV', 'SO', 'VA'],
  Piemonte: ['TO', 'AL', 'AT', 'BI', 'CN', 'NO', 'VB', 'VC'],
  Veneto: ['VE', 'PD', 'VI', 'VR', 'TV', 'BL', 'RO'],
};

const FIELD_AMENITIES = [
  { key: 'hasParking', label: 'Parcheggio', icon: Car },
  { key: 'hasLockers', label: 'Spogliatoi', icon: Lock },
  { key: 'hasRental', label: 'Noleggio', icon: Layers },
  { key: 'hasShop', label: 'Shop', icon: Building },
  { key: 'hasBar', label: 'Bar/Ristoro', icon: Coffee },
  { key: 'hasWifi', label: 'WiFi', icon: Wifi },
  { key: 'hasFirstAid', label: 'Primo Soccorso', icon: ShieldCheck },
  { key: 'hasNightLights', label: 'Illuminazione Notturna', icon: Moon },
] as const;

const FIELD_FEATURES = [
  { key: 'hasBunkers', label: 'Bunker' },
  { key: 'hasTrenches', label: 'Trincee' },
  { key: 'hasUrbanStructures', label: 'Strutture Urbane' },
  { key: 'hasSyntheticGrass', label: 'Erba Sintetica' },
  { key: 'isClimateControlled', label: 'Climatizzato' },
] as const;

const initialCharacteristics: FieldCharacteristics = {
  hasParking: false,
  hasLockers: false,
  hasRental: false,
  hasShop: false,
  hasBar: false,
  hasWifi: false,
  hasFirstAid: false,
  hasNightLights: false,
  hasSyntheticGrass: false,
  hasBunkers: false,
  hasTrenches: false,
  hasUrbanStructures: false,
  isClimateControlled: false,
};

export const CreateFieldModal: React.FC<CreateFieldModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = useState('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FieldFormData>({
    name: '',
    description: '',
    type: 'outdoor',
    address: '',
    city: '',
    province: '',
    region: '',
    pricePerHour: 15,
    maxPlayers: 30,
    sizeSquareMeters: 5000,
    phone: '',
    email: '',
    website: '',
    characteristics: { ...initialCharacteristics },
    images: [],
  });

  const updateCharacteristic = (key: keyof FieldCharacteristics, value: boolean) => {
    setFormData({
      ...formData,
      characteristics: { ...formData.characteristics, [key]: value },
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.city || !formData.address) {
      toast.error('Compila i campi obbligatori');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(formData);
    }

    toast.success('Campo creato con successo!', {
      description: formData.name,
    });

    setIsSubmitting(false);
    onClose();
    // Reset form
    setFormData({
      name: '',
      description: '',
      type: 'outdoor',
      address: '',
      city: '',
      province: '',
      region: '',
      pricePerHour: 15,
      maxPlayers: 30,
      sizeSquareMeters: 5000,
      phone: '',
      email: '',
      website: '',
      characteristics: { ...initialCharacteristics },
      images: [],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Nuovo Campo
          </DialogTitle>
          <DialogDescription>
            Aggiungi un nuovo campo di gioco alla piattaforma
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Info Base</TabsTrigger>
            <TabsTrigger value="features">Caratteristiche</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          {/* Tab: Info Base */}
          <TabsContent value="info" className="space-y-4 mt-4">
            {/* Nome */}
            <div className="space-y-2">
              <Label className="font-display uppercase text-xs">Nome Campo *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="es. Campo Alpha"
                className="bg-muted border-border"
              />
            </div>

            {/* Descrizione */}
            <div className="space-y-2">
              <Label className="font-display uppercase text-xs">Descrizione</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Descrivi il tuo campo..."
                className="bg-muted border-border resize-none"
                rows={3}
              />
            </div>

            {/* Tipo Campo */}
            <div className="space-y-2">
              <Label className="font-display uppercase text-xs">Tipo Campo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: FieldType) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outdoor">🌳 Outdoor</SelectItem>
                  <SelectItem value="indoor">🏢 Indoor</SelectItem>
                  <SelectItem value="mixed">🔀 Misto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Indirizzo */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-display uppercase text-xs">Indirizzo *</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Via Roma 123"
                  className="bg-muted border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-display uppercase text-xs">Città *</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Milano"
                  className="bg-muted border-border"
                />
              </div>
            </div>

            {/* Regione e Provincia */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-display uppercase text-xs">Regione</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) =>
                    setFormData({ ...formData, region: value, province: '' })
                  }
                >
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Seleziona" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-display uppercase text-xs">Provincia</Label>
                <Select
                  value={formData.province}
                  onValueChange={(value) =>
                    setFormData({ ...formData, province: value })
                  }
                  disabled={!formData.region || !PROVINCES[formData.region]}
                >
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Seleziona" />
                  </SelectTrigger>
                  <SelectContent>
                    {(PROVINCES[formData.region] || []).map((prov) => (
                      <SelectItem key={prov} value={prov}>
                        {prov}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dimensioni e Capacità */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="font-display uppercase text-xs">Prezzo/Ora (€)</Label>
                <Input
                  type="number"
                  value={formData.pricePerHour}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerHour: parseInt(e.target.value) || 0 })
                  }
                  className="bg-muted border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-display uppercase text-xs">Max Giocatori</Label>
                <Input
                  type="number"
                  value={formData.maxPlayers}
                  onChange={(e) =>
                    setFormData({ ...formData, maxPlayers: parseInt(e.target.value) || 0 })
                  }
                  className="bg-muted border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-display uppercase text-xs">Superficie (m²)</Label>
                <Input
                  type="number"
                  value={formData.sizeSquareMeters}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sizeSquareMeters: parseInt(e.target.value) || 0,
                    })
                  }
                  className="bg-muted border-border"
                />
              </div>
            </div>

            {/* Contatti */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="font-display uppercase text-xs">Telefono</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+39..."
                  className="bg-muted border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-display uppercase text-xs">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@campo.it"
                  className="bg-muted border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-display uppercase text-xs">Sito Web</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://..."
                  className="bg-muted border-border"
                />
              </div>
            </div>
          </TabsContent>

          {/* Tab: Caratteristiche */}
          <TabsContent value="features" className="space-y-6 mt-4">
            {/* Servizi */}
            <div className="space-y-3">
              <Label className="font-display uppercase text-xs">Servizi Disponibili</Label>
              <div className="grid grid-cols-2 gap-3">
                {FIELD_AMENITIES.map((amenity) => {
                  const Icon = amenity.icon;
                  const isActive =
                    formData.characteristics[amenity.key as keyof FieldCharacteristics];
                  return (
                    <button
                      key={amenity.key}
                      type="button"
                      onClick={() =>
                        updateCharacteristic(
                          amenity.key as keyof FieldCharacteristics,
                          !isActive
                        )
                      }
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-sm border transition-all',
                        isActive
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-muted/30 border-border text-muted-foreground hover:border-primary/50'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{amenity.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Strutture */}
            <div className="space-y-3">
              <Label className="font-display uppercase text-xs">Strutture Campo</Label>
              <div className="grid grid-cols-2 gap-3">
                {FIELD_FEATURES.map((feature) => {
                  const isActive =
                    formData.characteristics[feature.key as keyof FieldCharacteristics];
                  return (
                    <div
                      key={feature.key}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-sm border border-border"
                    >
                      <span className="text-sm">{feature.label}</span>
                      <Switch
                        checked={isActive}
                        onCheckedChange={(checked) =>
                          updateCharacteristic(
                            feature.key as keyof FieldCharacteristics,
                            checked
                          )
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Tab: Media */}
          <TabsContent value="media" className="space-y-4 mt-4">
            <div className="space-y-3">
              <Label className="font-display uppercase text-xs">Immagini Campo</Label>
              <div className="border-2 border-dashed border-border rounded-sm p-8 text-center">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">
                  Trascina le immagini qui o clicca per caricare
                </p>
                <GlowButton variant="secondary" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Carica Immagini
                </GlowButton>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-video bg-muted rounded-sm">
                      <img
                        src={img}
                        alt={`Campo ${idx + 1}`}
                        className="w-full h-full object-cover rounded-sm"
                      />
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            images: formData.images.filter((_, i) => i !== idx),
                          })
                        }
                        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-muted/30 rounded-sm border border-border">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Suggerimento:</strong> Carica almeno 3-5 foto del campo da diverse
                angolazioni. Includi foto delle strutture, zone di spawn, e servizi.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 pt-4">
          <GlowButton variant="ghost" onClick={onClose}>
            Annulla
          </GlowButton>
          <GlowButton
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creazione...' : 'Crea Campo'}
          </GlowButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
