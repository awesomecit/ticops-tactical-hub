import React, { useState } from 'react';
import {
  Star,
  Flag,
  MessageSquare,
  ThumbsUp,
  MoreHorizontal,
  AlertTriangle,
  Check,
  X,
  Eye,
} from 'lucide-react';
import {
  TacticalCard,
  TacticalCardHeader,
  TacticalCardTitle,
  TacticalCardContent,
} from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  visitDate: Date;
  createdAt: Date;
  helpfulCount: number;
  status: 'published' | 'reported' | 'hidden';
  reportReason?: string;
}

interface FieldReviewsManagerProps {
  fieldId: string;
  fieldName: string;
}

// Mock reviews data
const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev_001',
    userId: 'user_001',
    userName: 'TacticalMike',
    rating: 5,
    title: 'Campo eccezionale!',
    content: 'Strutture perfette, staff gentilissimo. Tornerò sicuramente!',
    pros: ['Ottimi bunker', 'Staff professionale', 'Pulizia'],
    cons: [],
    visitDate: new Date('2024-12-15'),
    createdAt: new Date('2024-12-16'),
    helpfulCount: 12,
    status: 'published',
  },
  {
    id: 'rev_002',
    userId: 'user_002',
    userName: 'ShadowSniper',
    rating: 4,
    title: 'Buon campo, parcheggio limitato',
    content: 'Il campo è ben curato ma il parcheggio è piccolo per eventi grandi.',
    pros: ['Varietà strutture', 'Illuminazione'],
    cons: ['Parcheggio piccolo'],
    visitDate: new Date('2024-12-10'),
    createdAt: new Date('2024-12-12'),
    helpfulCount: 8,
    status: 'published',
  },
  {
    id: 'rev_003',
    userId: 'user_003',
    userName: 'Anonymous123',
    rating: 1,
    title: 'Recensione falsa spam',
    content: 'bla bla bla contenuto spam...',
    pros: [],
    cons: [],
    visitDate: new Date('2024-12-01'),
    createdAt: new Date('2024-12-02'),
    helpfulCount: 0,
    status: 'reported',
    reportReason: 'Contenuto spam/falso',
  },
];

const REPORT_REASONS = [
  { value: 'spam', label: 'Spam / Contenuto falso' },
  { value: 'offensive', label: 'Linguaggio offensivo' },
  { value: 'fake', label: 'Recensione non veritiera' },
  { value: 'competitor', label: 'Possibile competitor' },
  { value: 'other', label: 'Altro' },
];

export const FieldReviewsManager: React.FC<FieldReviewsManagerProps> = ({
  fieldId,
  fieldName,
}) => {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [filter, setFilter] = useState<'all' | 'published' | 'reported'>('all');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');

  const filteredReviews = reviews.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const handleReport = (review: Review) => {
    setSelectedReview(review);
    setReportDialogOpen(true);
  };

  const handleSubmitReport = () => {
    if (!reportReason) {
      toast.error('Seleziona un motivo');
      return;
    }

    setReviews(reviews.map(r =>
      r.id === selectedReview?.id
        ? { ...r, status: 'reported' as const, reportReason }
        : r
    ));

    toast.success('Segnalazione inviata', {
      description: 'La recensione verrà esaminata dal team',
    });

    setReportDialogOpen(false);
    setReportReason('');
    setReportDetails('');
  };

  const handleResolveReport = (reviewId: string, action: 'publish' | 'hide') => {
    setReviews(reviews.map(r =>
      r.id === reviewId
        ? { ...r, status: action === 'publish' ? 'published' : 'hidden' }
        : r
    ));

    toast.success(action === 'publish' ? 'Recensione ripristinata' : 'Recensione nascosta');
  };

  const handleReply = (review: Review) => {
    toast.info('Rispondi alla recensione', {
      description: `Apertura form risposta a ${review.userName}...`,
    });
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4',
            star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
          )}
        />
      ))}
    </div>
  );

  const getStatusBadge = (status: Review['status']) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Pubblicata</Badge>;
      case 'reported':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Segnalata</Badge>;
      case 'hidden':
        return <Badge className="bg-muted text-muted-foreground">Nascosta</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display uppercase tracking-wider">Recensioni</h3>
          <div className="flex items-center gap-2 mt-1">
            {renderStars(parseFloat(avgRating))}
            <span className="font-bold">{avgRating}</span>
            <span className="text-muted-foreground">({reviews.length} recensioni)</span>
          </div>
        </div>
        <div className="flex gap-2">
          {(['all', 'published', 'reported'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 text-xs font-display uppercase rounded-sm border transition-colors',
                filter === f
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/30 border-border hover:border-primary/50'
              )}
            >
              {f === 'all' && 'Tutte'}
              {f === 'published' && 'Pubblicate'}
              {f === 'reported' && `Segnalate (${reviews.filter(r => r.status === 'reported').length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <TacticalCard
            key={review.id}
            className={cn(
              review.status === 'reported' && 'border-amber-500/30',
              review.status === 'hidden' && 'opacity-50'
            )}
          >
            <TacticalCardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-display text-lg">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display text-sm">{review.userName}</span>
                      {renderStars(review.rating)}
                      {getStatusBadge(review.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Visitato: {format(review.visitDate, 'd MMM yyyy', { locale: it })}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleReply(review)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Rispondi
                    </DropdownMenuItem>
                    {review.status === 'published' && (
                      <DropdownMenuItem onClick={() => handleReport(review)}>
                        <Flag className="h-4 w-4 mr-2" />
                        Segnala
                      </DropdownMenuItem>
                    )}
                    {review.status === 'reported' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleResolveReport(review.id, 'publish')}>
                          <Check className="h-4 w-4 mr-2 text-green-400" />
                          Ripristina
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleResolveReport(review.id, 'hide')}
                          className="text-destructive focus:text-destructive"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Nascondi
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Report Warning */}
              {review.status === 'reported' && review.reportReason && (
                <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/30 rounded-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-amber-400">
                    Segnalata per: {review.reportReason}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="mt-3">
                <h4 className="font-medium">{review.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{review.content}</p>
              </div>

              {/* Pros & Cons */}
              {(review.pros.length > 0 || review.cons.length > 0) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {review.pros.map((pro, idx) => (
                    <Badge key={idx} className="bg-green-500/10 text-green-400 border-green-500/30">
                      + {pro}
                    </Badge>
                  ))}
                  {review.cons.map((con, idx) => (
                    <Badge key={idx} className="bg-red-500/10 text-red-400 border-red-500/30">
                      - {con}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {review.helpfulCount} utili
                </span>
                <span>
                  {format(review.createdAt, 'd MMM yyyy', { locale: it })}
                </span>
              </div>
            </TacticalCardContent>
          </TacticalCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <TacticalCard>
          <TacticalCardContent className="p-8 text-center">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display uppercase mb-2">Nessuna Recensione</h3>
            <p className="text-sm text-muted-foreground">
              {filter === 'reported'
                ? 'Non ci sono recensioni segnalate'
                : 'Il campo non ha ancora recensioni'}
            </p>
          </TacticalCardContent>
        </TacticalCard>
      )}

      {/* Report Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Flag className="h-5 w-5 text-amber-400" />
              Segnala Recensione
            </DialogTitle>
            <DialogDescription>
              Segnala questa recensione per violazione delle linee guida
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-muted/30 rounded-sm border border-border">
              <p className="text-sm font-medium">{selectedReview?.title}</p>
              <p className="text-xs text-muted-foreground">di {selectedReview?.userName}</p>
            </div>

            <div className="space-y-2">
              <Label className="font-display uppercase text-xs">Motivo Segnalazione *</Label>
              <Select value={reportReason} onValueChange={setReportReason}>
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue placeholder="Seleziona motivo" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_REASONS.map((reason) => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-display uppercase text-xs">Dettagli (opzionale)</Label>
              <Textarea
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                placeholder="Fornisci dettagli aggiuntivi..."
                className="bg-muted border-border resize-none"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <GlowButton variant="ghost" onClick={() => setReportDialogOpen(false)}>
              Annulla
            </GlowButton>
            <GlowButton variant="primary" onClick={handleSubmitReport}>
              Invia Segnalazione
            </GlowButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
