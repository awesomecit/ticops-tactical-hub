import { useState } from 'react';
import { 
  X, Heart, Share2, MapPin, Eye, Truck, Star, Calendar, 
  ChevronLeft, ChevronRight, MessageSquare, Send, Tag, Shield
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MarketplaceListing } from '@/types/marketplace';
import { categoryLabels, conditionLabels, statusLabels } from '@/mocks/marketplace';
import { formatDistanceToNow, format } from 'date-fns';
import { it } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

interface ListingDetailModalProps {
  listing: MarketplaceListing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
  onOpenChat?: () => void;
}

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Il nome è obbligatorio').max(100, 'Nome troppo lungo'),
  email: z.string().trim().email('Email non valida').max(255, 'Email troppo lunga'),
  message: z.string().trim().min(10, 'Messaggio troppo corto').max(1000, 'Messaggio troppo lungo'),
});

const conditionColors: Record<string, string> = {
  new: 'bg-green-500/20 text-green-400 border-green-500/30',
  like_new: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  good: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  fair: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  poor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export function ListingDetailModal({
  listing,
  open,
  onOpenChange,
  onFavorite,
  isFavorited = false,
  onOpenChat,
}: ListingDetailModalProps) {
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  if (!listing) return null;

  const images = listing.images.length > 0 ? listing.images : ['/placeholder.svg'];
  const discount = listing.originalPrice
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleContactSubmit = async () => {
    setFormErrors({});
    
    const result = contactSchema.safeParse(contactForm);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) errors[err.path[0] as string] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    setSending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false);

    toast({
      title: 'Messaggio inviato',
      description: `Il tuo messaggio è stato inviato a ${listing.sellerName}.`,
    });

    setContactForm({ name: '', email: '', message: '' });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/marketplace/${listing.id}`;
    if (navigator.share) {
      await navigator.share({ title: listing.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copiato', description: 'Il link è stato copiato negli appunti.' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl gap-0 overflow-hidden p-0">
        <div className="grid md:grid-cols-2">
          {/* Image Gallery */}
          <div className="relative aspect-square bg-muted md:aspect-auto">
            <img
              src={images[currentImageIndex]}
              alt={`${listing.title} - Immagine ${currentImageIndex + 1}`}
              className="h-full w-full object-cover"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-sm backdrop-blur-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-12 w-12 overflow-hidden rounded border-2 transition-all ${
                      idx === currentImageIndex
                        ? 'border-primary'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute right-2 top-2 flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className={`h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm ${
                  isFavorited ? 'text-red-500' : 'text-foreground hover:text-red-500'
                }`}
                onClick={() => onFavorite?.(listing.id)}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Close Button (Mobile) */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-2 top-2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <ScrollArea className="max-h-[90vh] md:max-h-[80vh]">
            <div className="space-y-6 p-6">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className={conditionColors[listing.condition]}>
                    {conditionLabels[listing.condition]}
                  </Badge>
                  <Badge variant="outline">
                    <Tag className="mr-1 h-3 w-3" />
                    {categoryLabels[listing.category]}
                  </Badge>
                  {listing.shippingAvailable && (
                    <Badge variant="outline">
                      <Truck className="mr-1 h-3 w-3" />
                      Spedizione
                    </Badge>
                  )}
                  {listing.negotiable && (
                    <Badge variant="outline">Trattabile</Badge>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-foreground">{listing.title}</h2>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    €{listing.price.toLocaleString()}
                  </span>
                  {listing.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        €{listing.originalPrice.toLocaleString()}
                      </span>
                      <Badge className="bg-destructive text-destructive-foreground">
                        -{discount}%
                      </Badge>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {listing.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {listing.views} visualizzazioni
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {listing.favorites} preferiti
                  </span>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Descrizione</h3>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {listing.description}
                </p>
              </div>

              {/* Tags */}
              {listing.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator />

              {/* Seller Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Venditore</h3>
                <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/30 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={listing.sellerAvatar} />
                      <AvatarFallback>{listing.sellerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{listing.sellerName}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          {listing.sellerRating.toFixed(1)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-4 w-4 text-green-500" />
                          Verificato
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Vedi profilo
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Contact Form */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold text-foreground">
                    <MessageSquare className="h-5 w-5" />
                    Contatta il venditore
                  </h3>
                  {onOpenChat && (
                    <Button variant="default" size="sm" onClick={onOpenChat} className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Apri Chat
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">Nome</Label>
                      <Input
                        id="contact-name"
                        placeholder="Il tuo nome"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        maxLength={100}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-destructive">{formErrors.name}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="La tua email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        maxLength={255}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-destructive">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">Messaggio</Label>
                    <Textarea
                      id="contact-message"
                      placeholder={`Ciao ${listing.sellerName}, sono interessato a "${listing.title}"...`}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={4}
                      maxLength={1000}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {formErrors.message ? (
                        <p className="text-destructive">{formErrors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span>{contactForm.message.length}/1000</span>
                    </div>
                  </div>

                  <Button
                    className="w-full gap-2"
                    onClick={handleContactSubmit}
                    disabled={sending}
                  >
                    <Send className="h-4 w-4" />
                    {sending ? 'Invio in corso...' : 'Invia messaggio'}
                  </Button>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Pubblicato {formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true, locale: it })}
                </span>
                {listing.updatedAt !== listing.createdAt && (
                  <span>
                    Aggiornato {format(new Date(listing.updatedAt), 'dd/MM/yyyy', { locale: it })}
                  </span>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
