// Availability & Match Organizer Types

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface TimeSlot {
  id: string;
  startTime: string; // "09:00"
  endTime: string;   // "12:00"
}

export interface UserAvailability {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  date: Date;
  timeSlots: TimeSlot[];
  isRecurring: boolean;
  recurringDays?: DayOfWeek[];
  preferredFields?: string[];
  preferredGameModes?: string[];
  maxDistance?: number; // km
  createdAt: Date;
}

export interface FieldSlot {
  id: string;
  fieldId: string;
  fieldName: string;
  fieldCity: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  price: number;
  maxPlayers: number;
  currentPlayers: number;
}

export interface MatchRequest {
  id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  description?: string;
  preferredDates: Date[];
  preferredTimeSlots: TimeSlot[];
  preferredFields?: string[];
  gameMode?: string;
  minPlayers: number;
  maxPlayers: number;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  isOpen: boolean; // true = open to strangers
  interestedPlayers: InterestedPlayer[];
  status: 'open' | 'confirmed' | 'cancelled' | 'completed';
  confirmedFieldId?: string;
  confirmedDate?: Date;
  confirmedTimeSlot?: TimeSlot;
  createdAt: Date;
}

export interface InterestedPlayer {
  id: string;
  name: string;
  avatar?: string;
  joinedAt: Date;
  status: 'interested' | 'confirmed' | 'declined';
}

export interface MatchSuggestion {
  id: string;
  field: FieldSlot;
  availablePlayers: UserAvailability[];
  matchScore: number; // 0-100 compatibility score
  estimatedPlayers: number;
  suggestedDate: Date;
  suggestedTimeSlot: TimeSlot;
  reasons: string[];
}

export interface QuickMatchResult {
  id: string;
  field: FieldSlot;
  hostPlayer: {
    id: string;
    name: string;
    avatar?: string;
  };
  confirmedPlayers: number;
  maxPlayers: number;
  gameMode?: string;
  distance?: number; // km from user
  startsIn: string; // "2 ore", "domani"
}
