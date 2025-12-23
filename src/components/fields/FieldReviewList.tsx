import React, { useState } from 'react';
import { Star, ThumbsUp, ChevronDown, ChevronUp, User } from 'lucide-react';
import { FieldReview } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface FieldReviewListProps {
  reviews: FieldReview[];
  averageRating: number;
  totalReviews: number;
}

const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({ rating, size = 'md' }) => {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizes[size],
            star <= rating ? 'text-accent fill-accent' : 'text-muted-foreground'
          )}
        />
      ))}
    </div>
  );
};

const ReviewCard: React.FC<{ review: FieldReview }> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const [helpful, setHelpful] = useState(false);

  return (
    <div className="border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.userAvatar} />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{review.userName}</p>
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-xs text-muted-foreground">
                {format(review.createdAt, 'dd MMM yyyy', { locale: it })}
              </span>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          Visita: {format(review.visitDate, 'MMM yyyy', { locale: it })}
        </Badge>
      </div>

      <div>
        <h4 className="font-semibold text-sm">{review.title}</h4>
        <p className={cn(
          'text-sm text-muted-foreground mt-1',
          !expanded && 'line-clamp-2'
        )}>
          {review.content}
        </p>
        {review.content.length > 150 && (
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto text-primary text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>Mostra meno <ChevronUp className="h-3 w-3 ml-1" /></>
            ) : (
              <>Leggi tutto <ChevronDown className="h-3 w-3 ml-1" /></>
            )}
          </Button>
        )}
      </div>

      {(review.pros.length > 0 || review.cons.length > 0) && (
        <div className="grid grid-cols-2 gap-4 text-xs">
          {review.pros.length > 0 && (
            <div>
              <p className="font-medium text-green-500 mb-1">Pro</p>
              <ul className="space-y-0.5">
                {review.pros.map((pro, i) => (
                  <li key={i} className="text-muted-foreground">+ {pro}</li>
                ))}
              </ul>
            </div>
          )}
          {review.cons.length > 0 && (
            <div>
              <p className="font-medium text-red-500 mb-1">Contro</p>
              <ul className="space-y-0.5">
                {review.cons.map((con, i) => (
                  <li key={i} className="text-muted-foreground">- {con}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className={cn('text-xs', helpful && 'text-primary')}
          onClick={() => setHelpful(!helpful)}
        >
          <ThumbsUp className={cn('h-3 w-3 mr-1', helpful && 'fill-current')} />
          Utile ({review.helpfulCount + (helpful ? 1 : 0)})
        </Button>
      </div>
    </div>
  );
};

export const FieldReviewList: React.FC<FieldReviewListProps> = ({
  reviews,
  averageRating,
  totalReviews,
}) => {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => Math.round(r.rating) === rating).length;
    return { rating, count, percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0 };
  });

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpfulCount - a.helpfulCount;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-4xl font-bold">{averageRating.toFixed(1)}</p>
            <StarRating rating={averageRating} size="md" />
            <p className="text-xs text-muted-foreground mt-1">{totalReviews} recensioni</p>
          </div>
        </div>
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-2 text-sm">
              <span className="w-8 text-right">{rating} ★</span>
              <Progress value={percentage} className="h-2 flex-1" />
              <span className="w-8 text-muted-foreground text-xs">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Ordina per:</span>
        <div className="flex gap-1">
          {[
            { value: 'recent', label: 'Più recenti' },
            { value: 'helpful', label: 'Più utili' },
            { value: 'rating', label: 'Rating' },
          ].map((option) => (
            <Button
              key={option.value}
              variant={sortBy === option.value ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSortBy(option.value as typeof sortBy)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Star className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nessuna recensione ancora</p>
            <p className="text-sm">Sii il primo a lasciare una recensione!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldReviewList;