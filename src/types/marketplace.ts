export type ListingCondition = 'new' | 'like_new' | 'good' | 'fair' | 'poor';
export type ListingStatus = 'active' | 'sold' | 'reserved' | 'expired';
export type ListingCategory = 'replica' | 'gear' | 'accessories' | 'clothing' | 'optics' | 'other';

export interface MarketplaceListing {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  sellerRating: number;
  title: string;
  description: string;
  category: ListingCategory;
  condition: ListingCondition;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  location: string;
  status: ListingStatus;
  views: number;
  favorites: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  shippingAvailable: boolean;
  negotiable: boolean;
}

export interface MarketplaceFilters {
  category?: ListingCategory;
  condition?: ListingCondition;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  shippingOnly?: boolean;
  searchQuery?: string;
}
