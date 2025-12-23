// User & Auth Types
export type UserRole = 'player' | 'team_leader' | 'referee' | 'field_manager' | 'shop_owner' | 'admin';

export interface User {
  id: string;
  username: string;
  callsign: string;
  email: string;
  avatar?: string;
  role: UserRole;
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
