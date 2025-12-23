import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  Package,
  Camera,
  Euro,
  Send,
  X,
  ImagePlus,
  Check,
  MapPin,
  Truck,
  MessageSquare,
  Tag,
} from 'lucide-react';
import { ListingCategory, ListingCondition, MarketplaceListing } from '@/types/marketplace';
import { categoryLabels, conditionLabels } from '@/mocks/marketplace';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const infoSchema = z.object({
  title: z.string().min(5, 'Il titolo deve avere almeno 5 caratteri').max(100),
  category: z.string().min(1, 'Seleziona una categoria'),
  condition: z.string().min(1, 'Seleziona la condizione'),
  description: z.string().min(20, 'La descrizione deve avere almeno 20 caratteri').max(2000),
  tags: z.string().optional(),
});

const priceSchema = z.object({
  price: z.number().min(1, 'Il prezzo deve essere almeno 1€'),
  originalPrice: z.number().optional(),
  negotiable: z.boolean(),
  location: z.string().min(3, 'Inserisci una località valida'),
  shippingAvailable: z.boolean(),
});

interface CreateListingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (listing: Omit<MarketplaceListing, 'id' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerRating' | 'status' | 'views' | 'favorites' | 'createdAt' | 'updatedAt'>) => void;
}

type Step = 'info' | 'photos' | 'price' | 'publish';

const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
  { key: 'info', label: 'Informazioni', icon: <Package className="w-4 h-4" /> },
  { key: 'photos', label: 'Foto', icon: <Camera className="w-4 h-4" /> },
  { key: 'price', label: 'Prezzo', icon: <Euro className="w-4 h-4" /> },
  { key: 'publish', label: 'Pubblica', icon: <Send className="w-4 h-4" /> },
];

export function CreateListingModal({ open, onOpenChange, onSubmit }: CreateListingModalProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ListingCategory | ''>('');
  const [condition, setCondition] = useState<ListingCondition | ''>('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [location, setLocation] = useState('');
  const [shippingAvailable, setShippingAvailable] = useState(false);

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  const resetForm = () => {
    setCurrentStep('info');
    setTitle('');
    setCategory('');
    setCondition('');
    setDescription('');
    setTags('');
    setImages([]);
    setPrice('');
    setOriginalPrice('');
    setNegotiable(false);
    setLocation('');
    setShippingAvailable(false);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const validateStep = (step: Step): boolean => {
    setErrors({});
    
    if (step === 'info') {
      const result = infoSchema.safeParse({
        title,
        category,
        condition,
        description,
        tags,
      });
      
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
        return false;
      }
    }
    
    if (step === 'photos') {
      if (images.length === 0) {
        setErrors({ images: 'Aggiungi almeno una foto' });
        return false;
      }
    }
    
    if (step === 'price') {
      const result = priceSchema.safeParse({
        price: parseFloat(price) || 0,
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        negotiable,
        location,
        shippingAvailable,
      });
      
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
        return false;
      }
    }
    
    return true;
  };

  const goToNextStep = () => {
    if (!validateStep(currentStep)) return;
    
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  const handleAddImage = () => {
    // Simulate adding a placeholder image
    const newImage = `/placeholder.svg?${Date.now()}`;
    setImages([...images, newImage]);
    toast({
      title: 'Foto aggiunta',
      description: 'La foto è stata aggiunta all\'annuncio.',
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (!validateStep('price')) return;
    
    const newListing: Omit<MarketplaceListing, 'id' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerRating' | 'status' | 'views' | 'favorites' | 'createdAt' | 'updatedAt'> = {
      title,
      category: category as ListingCategory,
      condition: condition as ListingCondition,
      description,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      images,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      currency: 'EUR',
      negotiable,
      location,
      shippingAvailable,
    };
    
    onSubmit(newListing);
    handleClose();
  };

  const parsedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold">Crea nuovo annuncio</DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.key}>
                <div
                  className={`flex items-center gap-2 ${
                    index <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      index < currentStepIndex
                        ? 'bg-primary text-primary-foreground'
                        : index === currentStepIndex
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Separator />

        <ScrollArea className="max-h-[50vh]">
          <div className="p-6">
            {/* Step 1: Info */}
            {currentStep === 'info' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titolo annuncio *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="es. Tokyo Marui M4A1 - Ottime condizioni"
                    maxLength={100}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{title.length}/100 caratteri</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Categoria *</Label>
                    <Select value={category} onValueChange={(v) => setCategory(v as ListingCategory)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive">{errors.category}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Condizione *</Label>
                    <Select value={condition} onValueChange={(v) => setCondition(v as ListingCondition)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(conditionLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.condition && (
                      <p className="text-sm text-destructive">{errors.condition}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrizione *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrivi il tuo articolo in dettaglio: condizioni, accessori inclusi, motivo della vendita..."
                    rows={5}
                    maxLength={2000}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{description.length}/2000 caratteri</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">
                    <Tag className="w-4 h-4 inline mr-1" />
                    Tag (separati da virgola)
                  </Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="es. aeg, tokyo marui, m4, upgraded"
                  />
                  {parsedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {parsedTags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Photos */}
            {currentStep === 'photos' && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Aggiungi fino a 10 foto del tuo articolo. La prima foto sarà quella principale.
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg border border-border overflow-hidden group"
                    >
                      <img
                        src={img}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && (
                        <Badge className="absolute top-1 left-1 text-xs" variant="default">
                          Principale
                        </Badge>
                      )}
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {images.length < 10 && (
                    <button
                      onClick={handleAddImage}
                      className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                    >
                      <ImagePlus className="w-8 h-8" />
                      <span className="text-xs">Aggiungi</span>
                    </button>
                  )}
                </div>

                {errors.images && (
                  <p className="text-sm text-destructive">{errors.images}</p>
                )}

                <p className="text-xs text-muted-foreground">
                  {images.length}/10 foto caricate
                </p>
              </div>
            )}

            {/* Step 3: Price */}
            {currentStep === 'price' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      <Euro className="w-4 h-4 inline mr-1" />
                      Prezzo *
                    </Label>
                    <div className="relative">
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0"
                        min="1"
                        className="pr-10"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        €
                      </span>
                    </div>
                    {errors.price && (
                      <p className="text-sm text-destructive">{errors.price}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Prezzo originale (opzionale)</Label>
                    <div className="relative">
                      <Input
                        id="originalPrice"
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="0"
                        min="1"
                        className="pr-10"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        €
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Se indicato, mostrerà lo sconto
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="negotiable" className="cursor-pointer">
                      Prezzo trattabile
                    </Label>
                  </div>
                  <Switch
                    id="negotiable"
                    checked={negotiable}
                    onCheckedChange={setNegotiable}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Località *
                  </Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="es. Milano, IT"
                  />
                  {errors.location && (
                    <p className="text-sm text-destructive">{errors.location}</p>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="shipping" className="cursor-pointer">
                      Spedizione disponibile
                    </Label>
                  </div>
                  <Switch
                    id="shipping"
                    checked={shippingAvailable}
                    onCheckedChange={setShippingAvailable}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Publish */}
            {currentStep === 'publish' && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Riepilogo annuncio</h3>
                  <p className="text-sm text-muted-foreground">
                    Verifica i dati prima di pubblicare
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4 space-y-3">
                  <div className="flex gap-4">
                    {images[0] && (
                      <img
                        src={images[0]}
                        alt="Anteprima"
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{title}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {categoryLabels[category as ListingCategory]}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {conditionLabels[condition as ListingCondition]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {description}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Prezzo:</span>{' '}
                      <span className="font-semibold">{price}€</span>
                      {negotiable && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Trattabile
                        </Badge>
                      )}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Località:</span>{' '}
                      <span>{location}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Foto:</span>{' '}
                      <span>{images.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Spedizione:</span>{' '}
                      <span>{shippingAvailable ? 'Sì' : 'Solo ritiro'}</span>
                    </div>
                  </div>

                  {parsedTags.length > 0 && (
                    <>
                      <Separator />
                      <div className="flex flex-wrap gap-1">
                        {parsedTags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        {/* Navigation Buttons */}
        <div className="p-6 pt-4 flex justify-between">
          <Button
            variant="outline"
            onClick={currentStepIndex === 0 ? handleClose : goToPreviousStep}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {currentStepIndex === 0 ? 'Annulla' : 'Indietro'}
          </Button>

          {currentStep === 'publish' ? (
            <Button onClick={handlePublish} className="gap-2">
              <Send className="w-4 h-4" />
              Pubblica annuncio
            </Button>
          ) : (
            <Button onClick={goToNextStep}>
              Avanti
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
