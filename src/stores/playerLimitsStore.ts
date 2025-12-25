import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PlayerLimits {
  maxGamesPerDay: number;
  gameCooldownMinutes: number;
  maxMarketplaceListings: number;
  maxChatMessagesPerHour: number;
  maxPendingTeamRequests: number;
}

export interface PlayerUsage {
  gamesToday: number;
  lastGameTime: string | null;
  activeListings: number;
  chatMessagesThisHour: number;
  pendingTeamRequests: number;
  lastChatReset: string;
  lastDayReset: string;
}

interface PlayerLimitsState {
  limits: PlayerLimits;
  usage: PlayerUsage;
  
  // Check functions
  canJoinGame: () => { allowed: boolean; reason?: string };
  canCreateListing: () => { allowed: boolean; reason?: string };
  canSendMessage: () => { allowed: boolean; reason?: string };
  canRequestTeam: () => { allowed: boolean; reason?: string };
  getCooldownRemaining: () => number; // minutes remaining
  
  // Usage functions
  recordGameJoin: () => void;
  recordListingCreated: () => void;
  recordListingRemoved: () => void;
  recordMessageSent: () => void;
  recordTeamRequest: () => void;
  recordTeamRequestResolved: () => void;
  
  // Reset functions
  resetDailyUsage: () => void;
  resetHourlyUsage: () => void;
  checkAndResetUsage: () => void;
}

const DEFAULT_LIMITS: PlayerLimits = {
  maxGamesPerDay: 3,
  gameCooldownMinutes: 30,
  maxMarketplaceListings: 5,
  maxChatMessagesPerHour: 100,
  maxPendingTeamRequests: 3,
};

const getInitialUsage = (): PlayerUsage => ({
  gamesToday: 0,
  lastGameTime: null,
  activeListings: 0,
  chatMessagesThisHour: 0,
  pendingTeamRequests: 0,
  lastChatReset: new Date().toISOString(),
  lastDayReset: new Date().toDateString(),
});

export const usePlayerLimitsStore = create<PlayerLimitsState>()(
  persist(
    (set, get) => ({
      limits: DEFAULT_LIMITS,
      usage: getInitialUsage(),

      canJoinGame: () => {
        const { limits, usage, getCooldownRemaining, checkAndResetUsage } = get();
        checkAndResetUsage();
        
        if (usage.gamesToday >= limits.maxGamesPerDay) {
          return { 
            allowed: false, 
            reason: `Hai raggiunto il limite di ${limits.maxGamesPerDay} partite giornaliere` 
          };
        }
        
        const cooldown = getCooldownRemaining();
        if (cooldown > 0) {
          return { 
            allowed: false, 
            reason: `Devi attendere ${cooldown} minuti prima della prossima partita` 
          };
        }
        
        return { allowed: true };
      },

      canCreateListing: () => {
        const { limits, usage } = get();
        
        if (usage.activeListings >= limits.maxMarketplaceListings) {
          return { 
            allowed: false, 
            reason: `Hai raggiunto il limite di ${limits.maxMarketplaceListings} annunci attivi` 
          };
        }
        
        return { allowed: true };
      },

      canSendMessage: () => {
        const { limits, usage, checkAndResetUsage } = get();
        checkAndResetUsage();
        
        if (usage.chatMessagesThisHour >= limits.maxChatMessagesPerHour) {
          return { 
            allowed: false, 
            reason: `Hai raggiunto il limite di ${limits.maxChatMessagesPerHour} messaggi all'ora` 
          };
        }
        
        return { allowed: true };
      },

      canRequestTeam: () => {
        const { limits, usage } = get();
        
        if (usage.pendingTeamRequests >= limits.maxPendingTeamRequests) {
          return { 
            allowed: false, 
            reason: `Hai raggiunto il limite di ${limits.maxPendingTeamRequests} richieste team pendenti` 
          };
        }
        
        return { allowed: true };
      },

      getCooldownRemaining: () => {
        const { limits, usage } = get();
        
        if (!usage.lastGameTime) return 0;
        
        const lastGame = new Date(usage.lastGameTime);
        const now = new Date();
        const diffMinutes = Math.floor((now.getTime() - lastGame.getTime()) / (1000 * 60));
        const remaining = limits.gameCooldownMinutes - diffMinutes;
        
        return Math.max(0, remaining);
      },

      recordGameJoin: () => {
        set((state) => ({
          usage: {
            ...state.usage,
            gamesToday: state.usage.gamesToday + 1,
            lastGameTime: new Date().toISOString(),
          },
        }));
      },

      recordListingCreated: () => {
        set((state) => ({
          usage: {
            ...state.usage,
            activeListings: state.usage.activeListings + 1,
          },
        }));
      },

      recordListingRemoved: () => {
        set((state) => ({
          usage: {
            ...state.usage,
            activeListings: Math.max(0, state.usage.activeListings - 1),
          },
        }));
      },

      recordMessageSent: () => {
        set((state) => ({
          usage: {
            ...state.usage,
            chatMessagesThisHour: state.usage.chatMessagesThisHour + 1,
          },
        }));
      },

      recordTeamRequest: () => {
        set((state) => ({
          usage: {
            ...state.usage,
            pendingTeamRequests: state.usage.pendingTeamRequests + 1,
          },
        }));
      },

      recordTeamRequestResolved: () => {
        set((state) => ({
          usage: {
            ...state.usage,
            pendingTeamRequests: Math.max(0, state.usage.pendingTeamRequests - 1),
          },
        }));
      },

      resetDailyUsage: () => {
        set((state) => ({
          usage: {
            ...state.usage,
            gamesToday: 0,
            lastDayReset: new Date().toDateString(),
          },
        }));
      },

      resetHourlyUsage: () => {
        set((state) => ({
          usage: {
            ...state.usage,
            chatMessagesThisHour: 0,
            lastChatReset: new Date().toISOString(),
          },
        }));
      },

      checkAndResetUsage: () => {
        const { usage, resetDailyUsage, resetHourlyUsage } = get();
        
        // Check daily reset
        const today = new Date().toDateString();
        if (usage.lastDayReset !== today) {
          resetDailyUsage();
        }
        
        // Check hourly reset
        const lastReset = new Date(usage.lastChatReset);
        const now = new Date();
        const hourDiff = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);
        if (hourDiff >= 1) {
          resetHourlyUsage();
        }
      },
    }),
    {
      name: 'player-limits-storage',
    }
  )
);
