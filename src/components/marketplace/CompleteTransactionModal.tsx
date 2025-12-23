import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowRightLeft, Check, Euro } from 'lucide-react';
import { MarketplaceListing } from '@/types/marketplace';
import { useMarketplaceTransactionStore } from '@/stores/marketplaceTransactionStore';
import { useToast } from '@/hooks/use-toast';

interface CompleteTransactionModalProps {
  listing: MarketplaceListing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CURRENT_USER = {
  id: 'current-user',
  name: 'Tu',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
};

export function CompleteTransactionModal({
  listing,
  open,
  onOpenChange,
}: CompleteTransactionModalProps) {
  const { toast } = useToast();
  const { createTransaction, completeTransaction } = useMarketplaceTransactionStore();
  const [step, setStep] = useState<'type' | 'details' | 'confirm'>('type');
  const [transactionType, setTransactionType] = useState<'purchase' | 'exchange'>('purchase');
  const [agreedPrice, setAgreedPrice] = useState(listing.price.toString());
  const [exchangeItems, setExchangeItems] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const transaction = createTransaction({
      listingId: listing.id,
      listingTitle: listing.title,
      listingImage: listing.images[0] || '/placeholder.svg',
      sellerId: listing.sellerId,
      sellerName: listing.sellerName,
      sellerAvatar: listing.sellerAvatar,
      buyerId: CURRENT_USER.id,
      buyerName: CURRENT_USER.name,
      buyerAvatar: CURRENT_USER.avatar,
      type: transactionType,
      price: transactionType === 'purchase' ? parseFloat(agreedPrice) : undefined,
      exchangeItems: transactionType === 'exchange' ? exchangeItems : undefined,
    });

    // Auto-complete for demo
    completeTransaction(transaction.id);

    setSubmitting(false);
    toast({
      title: 'Transazione completata!',
      description: 'Ora puoi lasciare una recensione al venditore.',
    });

    onOpenChange(false);
    setStep('type');
  };

  const canProceed = () => {
    if (step === 'type') return true;
    if (step === 'details') {
      if (transactionType === 'purchase') {
        return parseFloat(agreedPrice) > 0;
      }
      return exchangeItems.trim().length >= 10;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 'type') setStep('details');
    else if (step === 'details') setStep('confirm');
  };

  const handleBack = () => {
    if (step === 'details') setStep('type');
    else if (step === 'confirm') setStep('details');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Completa transazione</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Listing Preview */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <img
              src={listing.images[0] || '/placeholder.svg'}
              alt=""
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{listing.title}</p>
              <p className="text-lg font-bold text-primary">€{listing.price}</p>
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={listing.sellerAvatar} />
                  <AvatarFallback className="text-xs">{listing.sellerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{listing.sellerName}</span>
              </div>
            </div>
          </div>

          {/* Step 1: Transaction Type */}
          {step === 'type' && (
            <div className="space-y-4">
              <Label>Tipo di transazione</Label>
              <RadioGroup
                value={transactionType}
                onValueChange={(v) => setTransactionType(v as 'purchase' | 'exchange')}
                className="grid grid-cols-2 gap-3"
              >
                <div
                  className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    transactionType === 'purchase'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setTransactionType('purchase')}
                >
                  <RadioGroupItem value="purchase" className="sr-only" />
                  <ShoppingBag className="h-8 w-8 text-primary mb-2" />
                  <span className="font-medium">Acquisto</span>
                  <span className="text-xs text-muted-foreground">Pagamento in denaro</span>
                  {transactionType === 'purchase' && (
                    <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                  )}
                </div>
                <div
                  className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    transactionType === 'exchange'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setTransactionType('exchange')}
                >
                  <RadioGroupItem value="exchange" className="sr-only" />
                  <ArrowRightLeft className="h-8 w-8 text-purple-500 mb-2" />
                  <span className="font-medium">Scambio</span>
                  <span className="text-xs text-muted-foreground">Con altri articoli</span>
                  {transactionType === 'exchange' && (
                    <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                  )}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 'details' && (
            <div className="space-y-4">
              {transactionType === 'purchase' ? (
                <div className="space-y-2">
                  <Label htmlFor="price">Prezzo concordato</Label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      value={agreedPrice}
                      onChange={(e) => setAgreedPrice(e.target.value)}
                      className="pl-10"
                      min="1"
                    />
                  </div>
                  {listing.negotiable && (
                    <p className="text-xs text-muted-foreground">
                      Prezzo originale: €{listing.price} (trattabile)
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="exchange">Articoli offerti in scambio</Label>
                  <Textarea
                    id="exchange"
                    value={exchangeItems}
                    onChange={(e) => setExchangeItems(e.target.value)}
                    placeholder="Descrivi gli articoli che offri in cambio..."
                    rows={4}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 'confirm' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">Riepilogo transazione</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo:</span>
                    <Badge variant="outline">
                      {transactionType === 'purchase' ? 'Acquisto' : 'Scambio'}
                    </Badge>
                  </div>
                  {transactionType === 'purchase' && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prezzo:</span>
                      <span className="font-bold">€{agreedPrice}</span>
                    </div>
                  )}
                  {transactionType === 'exchange' && (
                    <div>
                      <span className="text-muted-foreground">Articoli offerti:</span>
                      <p className="mt-1">{exchangeItems}</p>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Confermando, dichiari di aver completato la transazione con il venditore.
                Potrai lasciare una recensione dopo la conferma.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {step !== 'type' && (
            <Button variant="outline" onClick={handleBack}>
              Indietro
            </Button>
          )}
          {step === 'confirm' ? (
            <Button onClick={handleConfirm} disabled={submitting}>
              {submitting ? 'Conferma...' : 'Conferma transazione'}
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Avanti
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
