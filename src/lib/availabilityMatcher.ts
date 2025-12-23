import { UserAvailability, FieldSlot, MatchSuggestion, TimeSlot } from '@/types/availability';
import { isSameDay, format } from 'date-fns';
import { it } from 'date-fns/locale';

interface MatchingOptions {
  minPlayers?: number;
  maxDistance?: number;
  preferredFieldIds?: string[];
}

// Check if two time slots overlap
export const doTimeSlotsOverlap = (slot1: TimeSlot, slot2: { startTime: string; endTime: string }): boolean => {
  const s1Start = parseInt(slot1.startTime.replace(':', ''));
  const s1End = parseInt(slot1.endTime.replace(':', ''));
  const s2Start = parseInt(slot2.startTime.replace(':', ''));
  const s2End = parseInt(slot2.endTime.replace(':', ''));
  
  return s1Start < s2End && s2Start < s1End;
};

// Find matching players for a specific field slot
export const findMatchingPlayers = (
  fieldSlot: FieldSlot,
  userAvailabilities: UserAvailability[]
): UserAvailability[] => {
  return userAvailabilities.filter((availability) => {
    // Check if same day
    if (!isSameDay(availability.date, fieldSlot.date)) {
      return false;
    }
    
    // Check if any time slot overlaps with field slot
    const hasOverlappingSlot = availability.timeSlots.some((slot) =>
      doTimeSlotsOverlap(slot, fieldSlot)
    );
    
    if (!hasOverlappingSlot) {
      return false;
    }
    
    // Check field preference if set
    if (availability.preferredFields && availability.preferredFields.length > 0) {
      if (!availability.preferredFields.includes(fieldSlot.fieldId)) {
        return false;
      }
    }
    
    return true;
  });
};

// Calculate match score (0-100)
export const calculateMatchScore = (
  fieldSlot: FieldSlot,
  matchingPlayers: UserAvailability[],
  options: MatchingOptions = {}
): number => {
  let score = 0;
  
  // Player count score (up to 40 points)
  const targetPlayers = options.minPlayers || 10;
  const playerRatio = Math.min(matchingPlayers.length / targetPlayers, 1);
  score += playerRatio * 40;
  
  // Field preference score (up to 20 points)
  if (options.preferredFieldIds?.includes(fieldSlot.fieldId)) {
    score += 20;
  }
  
  // Availability strength (up to 20 points) - how many players have this as first choice
  const primaryChoiceCount = matchingPlayers.filter(
    (p) => p.preferredFields?.[0] === fieldSlot.fieldId
  ).length;
  score += Math.min((primaryChoiceCount / matchingPlayers.length) * 20, 20);
  
  // Price score (up to 10 points) - lower is better
  const priceScore = Math.max(0, 10 - fieldSlot.price / 5);
  score += priceScore;
  
  // Capacity utilization (up to 10 points)
  const capacityRatio = matchingPlayers.length / fieldSlot.maxPlayers;
  if (capacityRatio >= 0.5 && capacityRatio <= 1) {
    score += 10;
  } else if (capacityRatio > 0.3) {
    score += 5;
  }
  
  return Math.round(score);
};

// Generate match suggestions
export const generateMatchSuggestions = (
  fieldSlots: FieldSlot[],
  userAvailabilities: UserAvailability[],
  options: MatchingOptions = {}
): MatchSuggestion[] => {
  const suggestions: MatchSuggestion[] = [];
  
  // Only consider available slots
  const availableSlots = fieldSlots.filter((slot) => slot.isAvailable);
  
  availableSlots.forEach((fieldSlot) => {
    const matchingPlayers = findMatchingPlayers(fieldSlot, userAvailabilities);
    
    // Skip if not enough players
    if (matchingPlayers.length < (options.minPlayers || 4)) {
      return;
    }
    
    const score = calculateMatchScore(fieldSlot, matchingPlayers, options);
    
    // Generate reasons
    const reasons: string[] = [];
    
    if (matchingPlayers.length >= 10) {
      reasons.push(`${matchingPlayers.length} giocatori disponibili`);
    }
    
    if (options.preferredFieldIds?.includes(fieldSlot.fieldId)) {
      reasons.push('Campo preferito');
    }
    
    if (fieldSlot.price < 20) {
      reasons.push('Prezzo conveniente');
    }
    
    const weekend = fieldSlot.date.getDay() === 0 || fieldSlot.date.getDay() === 6;
    if (weekend) {
      reasons.push('Weekend');
    }
    
    suggestions.push({
      id: `suggestion_${fieldSlot.id}`,
      field: fieldSlot,
      availablePlayers: matchingPlayers,
      matchScore: score,
      estimatedPlayers: matchingPlayers.length,
      suggestedDate: fieldSlot.date,
      suggestedTimeSlot: {
        id: `ts_${fieldSlot.id}`,
        startTime: fieldSlot.startTime,
        endTime: fieldSlot.endTime,
      },
      reasons,
    });
  });
  
  // Sort by score descending
  return suggestions.sort((a, b) => b.matchScore - a.matchScore);
};

// Get formatted time range
export const formatTimeRange = (startTime: string, endTime: string): string => {
  return `${startTime} - ${endTime}`;
};

// Get formatted date for display
export const formatMatchDate = (date: Date): string => {
  return format(date, "EEEE d MMMM", { locale: it });
};

// Check if a suggestion is for today or tomorrow
export const getRelativeDay = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (isSameDay(date, today)) return 'Oggi';
  if (isSameDay(date, tomorrow)) return 'Domani';
  return format(date, 'EEEE', { locale: it });
};
