import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { useMarketplaceTransactionStore, MarketplaceTransaction } from '@/stores/marketplaceTransactionStore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ReviewModalProps {
  transaction: MarketplaceTransaction;
  reviewType: 'buyer_to_seller' | 'seller_to_buyer';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CURRENT_USER_ID = 'current-user';

export function ReviewModal({ transaction, reviewType, open, onOpenChange }: ReviewModalProps) {
  const { toast } = useToast();
  const { addReview } = useMarketplaceTransactionStore();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isReviewingBuyer = reviewType === 'seller_to_buyer';
  const reviewee = isReviewingBuyer
    ? { id: transaction.buyerId, name: transaction.buyerName, avatar: transaction.buyerAvatar }
    : { id: transaction.sellerId, name: transaction.sellerName, avatar: transaction.sellerAvatar };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: 'Seleziona un rating',
        description: 'Devi assegnare almeno 1 stella.',
        variant: 'destructive',
      });
      return;
    }

    if (comment.trim().length < 10) {
      toast({
        title: 'Commento troppo corto',
        description: 'Scrivi almeno 10 caratteri.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    addReview({
      transactionId: transaction.id,
      reviewerId: CURRENT_USER_ID,
      reviewerName: 'Tu',
      revieweeId: reviewee.id,
      revieweeName: reviewee.name,
      type: reviewType,
      rating,
      comment: comment.trim(),
      listingId: transaction.listingId,
      listingTitle: transaction.listingTitle,
    });

    setSubmitting(false);
    toast({
      title: 'Recensione inviata',
      description: `Hai recensito ${reviewee.name}.`,
    });

    setRating(0);
    setComment('');
    onOpenChange(false);
  };

  const getRatingLabel = (r: number) => {
    switch (r) {
      case 1: return 'Pessimo';
      case 2: return 'Scarso';
      case 3: return 'Nella media';
      case 4: return 'Buono';
      case 5: return 'Eccellente';
      default: return 'Seleziona';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Recensisci {isReviewingBuyer ? 'l\'acquirente' : 'il venditore'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Reviewee Info */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Avatar className="h-12 w-12">
              <AvatarImage src={reviewee.avatar} />
              <AvatarFallback>{reviewee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{reviewee.name}</p>
              <p className="text-sm text-muted-foreground">{transaction.listingTitle}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="space-y-2">
            <Label>Valutazione</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      'w-8 h-8 transition-colors',
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground'
                    )}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm text-muted-foreground">
                {getRatingLabel(hoverRating || rating)}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="review-comment">Commento</Label>
            <Textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Descrivi la tua esperienza..."
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {comment.length}/500 caratteri
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Invio...' : 'Invia recensione'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
