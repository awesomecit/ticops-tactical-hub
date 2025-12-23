import { useEffect, useRef, useCallback } from 'react';
import { useAvailabilityStore } from '@/stores/availabilityStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { generateMatchSuggestions } from '@/lib/availabilityMatcher';
import { FieldSlot, MatchSuggestion } from '@/types/availability';
import { MOCK_FIELDS, MOCK_AVAILABILITY } from '@/mocks/fields';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { toast } from 'sonner';

interface UseMatchNotificationsOptions {
  enabled?: boolean;
  checkInterval?: number; // ms
  minMatchScore?: number;
  autoToast?: boolean;
}

export const useMatchNotifications = (options: UseMatchNotificationsOptions = {}) => {
  const {
    enabled = true,
    checkInterval = 60000, // Check every minute
    minMatchScore = 50,
    autoToast = true,
  } = options;

  const { userAvailabilities, myAvailability, matchRequests } = useAvailabilityStore();
  const { addNotification } = useNotificationStore();
  
  const lastNotifiedRef = useRef<Set<string>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Convert field availability to FieldSlot format
  const getFieldSlots = useCallback((): FieldSlot[] => {
    return MOCK_AVAILABILITY.map((slot) => {
      const field = MOCK_FIELDS.find((f) => f.id === slot.fieldId);
      return {
        id: slot.id,
        fieldId: slot.fieldId,
        fieldName: field?.name || 'Campo',
        fieldCity: field?.city || '',
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isAvailable: slot.isAvailable,
        price: slot.price,
        maxPlayers: slot.maxPlayers,
        currentPlayers: slot.currentPlayers,
      };
    });
  }, []);

  // Check for new compatible matches
  const checkForMatches = useCallback(() => {
    if (!enabled) return;

    const fieldSlots = getFieldSlots();
    const suggestions = generateMatchSuggestions(fieldSlots, userAvailabilities, {
      minPlayers: 6,
    });

    // Filter high-score suggestions not yet notified
    const newMatches = suggestions.filter(
      (s) => s.matchScore >= minMatchScore && !lastNotifiedRef.current.has(s.id)
    );

    if (newMatches.length > 0) {
      // Take the best match
      const bestMatch = newMatches[0];
      lastNotifiedRef.current.add(bestMatch.id);

      const dateStr = format(bestMatch.suggestedDate, 'EEEE d MMMM', { locale: it });
      const timeStr = `${bestMatch.suggestedTimeSlot.startTime}-${bestMatch.suggestedTimeSlot.endTime}`;

      // Add to notification store
      addNotification({
        type: 'match',
        title: '🎯 Match Trovato!',
        message: `${bestMatch.field.fieldName} - ${dateStr} ${timeStr} (${bestMatch.estimatedPlayers} giocatori)`,
        link: '/organize',
      });

      // Show toast
      if (autoToast) {
        toast.success('Match compatibile trovato!', {
          description: `${bestMatch.field.fieldName} - ${bestMatch.estimatedPlayers} giocatori disponibili`,
          action: {
            label: 'Vedi',
            onClick: () => window.location.href = '/organize?tab=suggestions',
          },
        });
      }
    }

    // Also check for new open match requests
    const openRequests = matchRequests.filter(
      (r) => r.status === 'open' && r.creatorId !== 'current_user'
    );

    openRequests.forEach((request) => {
      const notifId = `request_${request.id}`;
      if (!lastNotifiedRef.current.has(notifId)) {
        // Check if user's availability matches the request
        const hasMatchingAvailability = myAvailability.some((avail) =>
          request.preferredDates.some(
            (prefDate) =>
              format(avail.date, 'yyyy-MM-dd') === format(prefDate, 'yyyy-MM-dd')
          )
        );

        if (hasMatchingAvailability) {
          lastNotifiedRef.current.add(notifId);

          addNotification({
            type: 'match',
            title: '📢 Nuova Partita Aperta',
            message: `${request.title} - ${request.interestedPlayers.length}/${request.minPlayers} giocatori`,
            link: '/organize',
          });

          if (autoToast) {
            toast.info('Nuova partita compatibile!', {
              description: request.title,
            });
          }
        }
      }
    });
  }, [enabled, userAvailabilities, myAvailability, matchRequests, minMatchScore, autoToast, addNotification, getFieldSlots]);

  // Manual trigger for demo
  const triggerMatchNotification = useCallback(() => {
    const fieldSlots = getFieldSlots();
    const suggestions = generateMatchSuggestions(fieldSlots, userAvailabilities, {
      minPlayers: 4,
    });

    if (suggestions.length > 0) {
      const match = suggestions[Math.floor(Math.random() * Math.min(3, suggestions.length))];
      const dateStr = format(match.suggestedDate, 'EEEE d MMMM', { locale: it });

      addNotification({
        type: 'match',
        title: '🎯 Match Compatibile!',
        message: `${match.field.fieldName} - ${dateStr} (${match.estimatedPlayers} giocatori, ${match.matchScore}% compatibilità)`,
        link: '/organize',
      });

      toast.success('Match trovato!', {
        description: `${match.field.fieldName} - ${match.estimatedPlayers} giocatori`,
        action: {
          label: 'Organizza',
          onClick: () => window.location.href = '/organize',
        },
      });
    } else {
      toast.info('Nessun match disponibile', {
        description: 'Aggiungi le tue disponibilità per trovare match',
      });
    }
  }, [userAvailabilities, addNotification, getFieldSlots]);

  // Set up interval
  useEffect(() => {
    if (!enabled) return;

    // Initial check after a short delay
    const initialTimeout = setTimeout(checkForMatches, 5000);

    // Set up recurring check
    intervalRef.current = setInterval(checkForMatches, checkInterval);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, checkInterval, checkForMatches]);

  return {
    checkForMatches,
    triggerMatchNotification,
  };
};

export default useMatchNotifications;
