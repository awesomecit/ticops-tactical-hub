// User & Auth Types
export type UserRole = 'player' | 'team_leader' | 'referee' | 'field_manager' | 'shop_owner' | 'admin';

export interface User {
  id: string;
  username: string;
  callsign: string;
  email: string;
  avatar?: string;
  role: UserRole; // Primary role (for backward compatibility)
  roles?: UserRole[]; // All active roles (optional for multi-role support)
  primaryRole?: UserRole; // Explicitly set primary role
  rank: Rank;
  team?: Team;
  stats: PlayerStats;
  createdAt: Date;
}

export interface Rank {
  id: string;
  name: string;
  level: number;
  icon: string;
  minXP: number;
}

export interface PlayerStats {
  gamesPlayed: number;
  wins: number;
  kills: number;
  deaths: number;
  accuracy: number;
  xp: number;
}

// Team Types
export interface Team {
  id: string;
  name: string;
  tag: string;
  logo?: string;
  color: 'alpha' | 'bravo';
  members: TeamMember[];
  createdAt: Date;
}

export interface TeamMember {
  userId: string;
  user: User;
  role: 'leader' | 'officer' | 'member';
  joinedAt: Date;
}

// Game Types
export interface Game {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: Location;
  gameMode: GameMode;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  maxPlayers: number;
  registeredPlayers: GamePlayer[];
  teams: GameTeam[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  mapUrl?: string;
}

export interface GameMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  rules: string[];
}

export interface GamePlayer {
  userId: string;
  user: User;
  teamId?: string;
  status: 'registered' | 'confirmed' | 'checked-in' | 'playing';
}

export interface GameTeam {
  teamId: string;
  team: Team;
  score: number;
}

// Chat Types
export interface ChatMessage {
  id: string;
  senderId: string;
  sender: User;
  content: string;
  type: 'text' | 'image' | 'system';
  channelId: string;
  createdAt: Date;
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'global' | 'team' | 'game' | 'private';
  participants: string[];
  lastMessage?: ChatMessage;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'game' | 'team';
  read: boolean;
  createdAt: Date;
}

// Shop Types
export interface Shop {
  id: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  isVerified: boolean;
  ownerId: string;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  subcategory?: string;
  brand?: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export type ProductCategory = 
  | 'repliche' 
  | 'accessori' 
  | 'abbigliamento' 
  | 'protezioni' 
  | 'ottiche' 
  | 'munizioni' 
  | 'upgrade' 
  | 'altro';

// Tutorial Types
export interface TutorialProgress {
  completedSteps: string[];
  skippedSteps: string[];
  isCompleted: boolean;
  lastStepSeen?: string;
}

// Field Types
export type FieldType = 'outdoor' | 'indoor' | 'mixed';

export interface FieldCharacteristics {
  hasParking: boolean;
  hasLockers: boolean;
  hasRental: boolean;
  hasShop: boolean;
  hasBar: boolean;
  hasWifi: boolean;
  hasFirstAid: boolean;
  hasNightLights: boolean;
  hasSyntheticGrass: boolean;
  hasBunkers: boolean;
  hasTrenches: boolean;
  hasUrbanStructures: boolean;
  isClimateControlled: boolean;
}

export interface FieldReview {
  id: string;
  fieldId: string;
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
  images?: string[];
}

export interface FieldAvailabilitySlot {
  id: string;
  fieldId: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price: number;
  bookedBy?: string;
  eventName?: string;
  maxPlayers: number;
  currentPlayers: number;
}

export interface Field {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: FieldType;
  address: string;
  city: string;
  province: string;
  region: string;
  coordinates: { lat: number; lng: number };
  images: string[];
  rating: number;
  reviewCount: number;
  characteristics: FieldCharacteristics;
  pricePerHour: number;
  maxPlayers: number;
  sizeSquareMeters: number;
  ownerId: string;
  ownerName: string;
  phone?: string;
  email?: string;
  website?: string;
}

// Alert Types
export type AlertCategory = 'field_availability' | 'shop_discount' | 'shop_new_product' | 'field_event' | 'price_drop';

export type AlertFrequency = 'instant' | 'daily' | 'weekly';

export interface Alert {
  id: string;
  userId: string;
  category: AlertCategory;
  entityType: 'field' | 'shop' | 'product';
  entityId: string;
  entityName: string;
  conditions: AlertConditions;
  frequency: AlertFrequency;
  isActive: boolean;
  createdAt: Date;
  lastTriggeredAt?: Date;
  triggerCount: number;
}

export interface AlertConditions {
  // Field availability conditions
  dayOfWeek?: number[];           // 0-6 (Sun-Sat)
  timeSlot?: 'morning' | 'afternoon' | 'evening';
  minPlayers?: number;
  
  // Shop/Product conditions
  maxPrice?: number;
  discountPercentage?: number;    // Minimum discount %
  categories?: string[];
  brands?: string[];
  keywords?: string[];
}

export interface AlertPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  quietHoursStart?: string;       // e.g., "22:00"
  quietHoursEnd?: string;         // e.g., "08:00"
  maxAlertsPerDay: number;
}

export interface AlertNotification {
  id: string;
  alertId: string;
  title: string;
  message: string;
  entityType: 'field' | 'shop' | 'product';
  entityId: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// User Event Types
export type UserEventType = 'match' | 'tournament' | 'training' | 'meeting' | 'social';
export type UserEventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface UserEvent {
  id: string;
  userId: string;
  type: UserEventType;
  title: string;
  description?: string;
  date: Date;
  endDate?: Date;
  location?: {
    name: string;
    address?: string;
  };
  status: UserEventStatus;
  teamId?: string;
  teamName?: string;
  result?: {
    won: boolean;
    score?: string;
    kills?: number;
    deaths?: number;
  };
  participants?: number;
  isOrganizer?: boolean;
}

// User Summary Types  
export interface UserSummary {
  userId: string;
  role: UserRole;
  totalEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  winRate: number;
  avgKD: number;
  totalKills: number;
  totalDeaths: number;
  hoursPlayed: number;
  favoriteLocation?: string;
  currentStreak: number;
  longestStreak: number;
  achievements: UserAchievement[];
  recentActivity: UserActivityItem[];
}

export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserActivityItem {
  id: string;
  type: 'match' | 'achievement' | 'rank_up' | 'team_join' | 'event';
  title: string;
  description: string;
  timestamp: Date;
  icon?: string;
}

// Multi-Organization Types
export interface Federation {
  id: string;
  name: string;
  code: string; // e.g., "FITAG"
  country: string;
  logo?: string;
  website?: string;
  email: string;
  phone?: string;
  regulations?: string; // URL to regulations document
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  settings: FederationSettings;
}

export interface FederationSettings {
  allowInterDivisionMatches: boolean;
  rankingSystem: 'elo' | 'points' | 'hybrid';
  defaultMatchDuration: number; // minutes
  maxPlayersPerTeam: number;
  minPlayersPerTeam: number;
}

export interface Organization {
  id: string;
  federationId: string;
  name: string;
  code: string; // e.g., "TICO-LOM"
  province?: string;
  region: string;
  address?: string;
  logo?: string;
  adminUserIds: string[]; // Array of user IDs with org admin rights
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Division {
  id: string;
  organizationId: string;
  name: string;
  code: string; // e.g., "MI-N"
  area?: string; // Geographic area description
  managerUserId?: string; // Division manager
  isDefault: boolean; // Default division for new users
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Extended existing types with org hierarchy
export interface UserWithOrg extends User {
  divisionId: string;
  organizationId: string;
  federationId: string;
}

export interface FieldWithOrg {
  id: string;
  name: string;
  address: string;
  divisionId: string;
  organizationId: string;
  federationId: string;
  ownerId: string; // Field manager user ID
  isActive: boolean;
  createdAt: Date;
}

export interface TeamWithOrg extends Team {
  divisionId: string;
  organizationId: string;
  federationId: string;
}

export interface MatchWithOrg {
  id: string;
  name: string;
  fieldId: string;
  divisionId: string;
  organizationId: string;
  federationId: string;
  date: Date;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  teams: GameTeam[];
}
