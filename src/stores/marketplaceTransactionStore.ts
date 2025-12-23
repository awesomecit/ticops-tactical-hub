import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MarketplaceReview {
  id: string;
  transactionId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  revieweeId: string;
  revieweeName: string;
  type: 'buyer_to_seller' | 'seller_to_buyer';
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  listingId: string;
  listingTitle: string;
}

export interface MarketplaceTransaction {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar?: string;
  type: 'purchase' | 'exchange';
  price?: number;
  exchangeItems?: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
  sellerReview?: MarketplaceReview;
  buyerReview?: MarketplaceReview;
}

export interface UserMarketplaceStats {
  userId: string;
  totalSales: number;
  totalPurchases: number;
  totalExchanges: number;
  averageRating: number;
  totalReviews: number;
  positiveReviews: number;
  neutralReviews: number;
  negativeReviews: number;
  responseTime: string;
  memberSince: Date;
}

interface MarketplaceTransactionState {
  transactions: MarketplaceTransaction[];
  reviews: MarketplaceReview[];
  
  // Actions
  createTransaction: (transaction: Omit<MarketplaceTransaction, 'id' | 'createdAt' | 'status'>) => MarketplaceTransaction;
  completeTransaction: (transactionId: string) => void;
  cancelTransaction: (transactionId: string) => void;
  addReview: (review: Omit<MarketplaceReview, 'id' | 'createdAt'>) => void;
  
  // Getters
  getTransactionsByUser: (userId: string) => MarketplaceTransaction[];
  getReviewsByUser: (userId: string) => MarketplaceReview[];
  getReviewsForUser: (userId: string) => MarketplaceReview[];
  getUserStats: (userId: string) => UserMarketplaceStats;
  getTransactionById: (id: string) => MarketplaceTransaction | undefined;
}

// Mock initial transactions
const mockTransactions: MarketplaceTransaction[] = [
  {
    id: 'tx-1',
    listingId: 'listing-1',
    listingTitle: 'Tokyo Marui MK18 Mod 1 - Perfette condizioni',
    listingImage: '/placeholder.svg',
    sellerId: 'user-1',
    sellerName: 'Marco Tactical',
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marco',
    buyerId: 'current-user',
    buyerName: 'Tu',
    buyerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
    type: 'purchase',
    price: 350,
    status: 'completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: 'tx-2',
    listingId: 'listing-3',
    listingTitle: 'Ottica Vector Optics 3-9x40 + Anelli',
    listingImage: '/placeholder.svg',
    sellerId: 'current-user',
    sellerName: 'Tu',
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
    buyerId: 'user-3',
    buyerName: 'Luca Sniper',
    buyerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luca',
    type: 'purchase',
    price: 85,
    status: 'completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
];

const mockReviews: MarketplaceReview[] = [
  {
    id: 'rev-1',
    transactionId: 'tx-1',
    reviewerId: 'current-user',
    reviewerName: 'Tu',
    revieweeId: 'user-1',
    revieweeName: 'Marco Tactical',
    type: 'buyer_to_seller',
    rating: 5,
    comment: 'Venditore eccellente! Prodotto come descritto, spedizione velocissima.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    listingId: 'listing-1',
    listingTitle: 'Tokyo Marui MK18 Mod 1',
  },
  {
    id: 'rev-2',
    transactionId: 'tx-1',
    reviewerId: 'user-1',
    reviewerName: 'Marco Tactical',
    reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marco',
    revieweeId: 'current-user',
    revieweeName: 'Tu',
    type: 'seller_to_buyer',
    rating: 5,
    comment: 'Acquirente affidabile, pagamento immediato. Consigliato!',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    listingId: 'listing-1',
    listingTitle: 'Tokyo Marui MK18 Mod 1',
  },
  {
    id: 'rev-3',
    transactionId: 'tx-2',
    reviewerId: 'user-3',
    reviewerName: 'Luca Sniper',
    reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luca',
    revieweeId: 'current-user',
    revieweeName: 'Tu',
    type: 'buyer_to_seller',
    rating: 4,
    comment: 'Buon venditore, prodotto ok. Un po\' lento nella spedizione.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11),
    listingId: 'listing-3',
    listingTitle: 'Ottica Vector Optics 3-9x40',
  },
];

export const useMarketplaceTransactionStore = create<MarketplaceTransactionState>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      reviews: mockReviews,

      createTransaction: (transaction) => {
        const newTransaction: MarketplaceTransaction = {
          ...transaction,
          id: `tx-${Date.now()}`,
          createdAt: new Date(),
          status: 'pending',
        };
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }));
        return newTransaction;
      },

      completeTransaction: (transactionId) => {
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === transactionId
              ? { ...tx, status: 'completed', completedAt: new Date() }
              : tx
          ),
        }));
      },

      cancelTransaction: (transactionId) => {
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === transactionId ? { ...tx, status: 'cancelled' } : tx
          ),
        }));
      },

      addReview: (review) => {
        const newReview: MarketplaceReview = {
          ...review,
          id: `rev-${Date.now()}`,
          createdAt: new Date(),
        };
        set((state) => ({
          reviews: [...state.reviews, newReview],
        }));
      },

      getTransactionsByUser: (userId) => {
        return get().transactions.filter(
          (tx) => tx.buyerId === userId || tx.sellerId === userId
        );
      },

      getReviewsByUser: (userId) => {
        return get().reviews.filter((r) => r.reviewerId === userId);
      },

      getReviewsForUser: (userId) => {
        return get().reviews.filter((r) => r.revieweeId === userId);
      },

      getUserStats: (userId) => {
        const transactions = get().transactions.filter(
          (tx) => (tx.buyerId === userId || tx.sellerId === userId) && tx.status === 'completed'
        );
        const reviewsForUser = get().reviews.filter((r) => r.revieweeId === userId);

        const sales = transactions.filter((tx) => tx.sellerId === userId);
        const purchases = transactions.filter((tx) => tx.buyerId === userId);
        const exchanges = transactions.filter((tx) => tx.type === 'exchange');

        const totalRating = reviewsForUser.reduce((acc, r) => acc + r.rating, 0);
        const avgRating = reviewsForUser.length > 0 ? totalRating / reviewsForUser.length : 0;

        const positiveReviews = reviewsForUser.filter((r) => r.rating >= 4).length;
        const neutralReviews = reviewsForUser.filter((r) => r.rating === 3).length;
        const negativeReviews = reviewsForUser.filter((r) => r.rating <= 2).length;

        return {
          userId,
          totalSales: sales.length,
          totalPurchases: purchases.length,
          totalExchanges: exchanges.length,
          averageRating: avgRating,
          totalReviews: reviewsForUser.length,
          positiveReviews,
          neutralReviews,
          negativeReviews,
          responseTime: '< 1 ora',
          memberSince: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
        };
      },

      getTransactionById: (id) => {
        return get().transactions.find((tx) => tx.id === id);
      },
    }),
    {
      name: 'marketplace-transactions',
    }
  )
);
