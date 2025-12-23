import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  UserAvailability, 
  MatchRequest, 
  TimeSlot, 
  DayOfWeek,
  InterestedPlayer 
} from '@/types/availability';
import { addDays, format, isSameDay } from 'date-fns';

interface AvailabilityState {
  userAvailabilities: UserAvailability[];
  matchRequests: MatchRequest[];
  myAvailability: UserAvailability[];
  
  // Actions
  addAvailability: (availability: Omit<UserAvailability, 'id' | 'createdAt'>) => void;
  removeAvailability: (id: string) => void;
  updateAvailability: (id: string, updates: Partial<UserAvailability>) => void;
  getAvailabilityForDate: (date: Date) => UserAvailability[];
  
  // Match Requests
  createMatchRequest: (request: Omit<MatchRequest, 'id' | 'createdAt' | 'interestedPlayers' | 'status'>) => void;
  joinMatchRequest: (requestId: string, player: Omit<InterestedPlayer, 'joinedAt' | 'status'>) => void;
  leaveMatchRequest: (requestId: string, playerId: string) => void;
  confirmMatchRequest: (requestId: string, fieldId: string, date: Date, timeSlot: TimeSlot) => void;
  cancelMatchRequest: (requestId: string) => void;
  getOpenMatchRequests: () => MatchRequest[];
  getMyMatchRequests: (userId: string) => MatchRequest[];
}

// Generate mock user availabilities
const generateMockAvailabilities = (): UserAvailability[] => {
  const users = [
    { id: 'user_001', name: 'Marco Rossi', avatar: '/placeholder.svg' },
    { id: 'user_002', name: 'Luca Bianchi', avatar: '/placeholder.svg' },
    { id: 'user_003', name: 'Giovanni Verdi', avatar: '/placeholder.svg' },
    { id: 'user_004', name: 'Alessandro Neri', avatar: '/placeholder.svg' },
    { id: 'user_005', name: 'Davide Costa', avatar: '/placeholder.svg' },
    { id: 'user_006', name: 'Matteo Ferrari', avatar: '/placeholder.svg' },
    { id: 'user_007', name: 'Simone Romano', avatar: '/placeholder.svg' },
    { id: 'user_008', name: 'Andrea Colombo', avatar: '/placeholder.svg' },
  ];

  const availabilities: UserAvailability[] = [];
  const today = new Date();

  users.forEach((user, userIndex) => {
    // Each user has 2-4 available days in the next 14 days
    const numDays = 2 + Math.floor(Math.random() * 3);
    const selectedDays = new Set<number>();
    
    while (selectedDays.size < numDays) {
      selectedDays.add(Math.floor(Math.random() * 14));
    }

    selectedDays.forEach((dayOffset) => {
      const date = addDays(today, dayOffset);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      const possibleSlots: TimeSlot[] = isWeekend
        ? [
            { id: `slot_${userIndex}_${dayOffset}_1`, startTime: '09:00', endTime: '12:00' },
            { id: `slot_${userIndex}_${dayOffset}_2`, startTime: '14:00', endTime: '17:00' },
            { id: `slot_${userIndex}_${dayOffset}_3`, startTime: '17:00', endTime: '20:00' },
          ]
        : [
            { id: `slot_${userIndex}_${dayOffset}_1`, startTime: '18:00', endTime: '21:00' },
            { id: `slot_${userIndex}_${dayOffset}_2`, startTime: '20:00', endTime: '23:00' },
          ];

      // Pick 1-2 random slots
      const numSlots = 1 + Math.floor(Math.random() * 2);
      const selectedSlots = possibleSlots.slice(0, numSlots);

      availabilities.push({
        id: `avail_${user.id}_${dayOffset}`,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        date,
        timeSlots: selectedSlots,
        isRecurring: false,
        preferredFields: ['field_001', 'field_002', 'field_003'].slice(0, 1 + Math.floor(Math.random() * 2)),
        maxDistance: 30 + Math.floor(Math.random() * 50),
        createdAt: new Date(),
      });
    });
  });

  return availabilities;
};

// Generate mock match requests
const generateMockMatchRequests = (): MatchRequest[] => {
  const today = new Date();
  
  return [
    {
      id: 'match_req_001',
      creatorId: 'user_001',
      creatorName: 'Marco Rossi',
      title: 'Partita domenica mattina - Campo Alpha',
      description: 'Cerco giocatori per partita casual domenica mattina. Tutti i livelli benvenuti!',
      preferredDates: [addDays(today, 3), addDays(today, 4)],
      preferredTimeSlots: [
        { id: 'ts1', startTime: '09:00', endTime: '12:00' },
        { id: 'ts2', startTime: '10:00', endTime: '13:00' },
      ],
      preferredFields: ['field_001'],
      gameMode: 'Team Deathmatch',
      minPlayers: 10,
      maxPlayers: 20,
      skillLevel: 'mixed',
      isOpen: true,
      interestedPlayers: [
        { id: 'user_002', name: 'Luca Bianchi', avatar: '/placeholder.svg', joinedAt: new Date(), status: 'confirmed' },
        { id: 'user_003', name: 'Giovanni Verdi', avatar: '/placeholder.svg', joinedAt: new Date(), status: 'interested' },
        { id: 'user_004', name: 'Alessandro Neri', avatar: '/placeholder.svg', joinedAt: new Date(), status: 'confirmed' },
      ],
      status: 'open',
      createdAt: addDays(today, -2),
    },
    {
      id: 'match_req_002',
      creatorId: 'user_005',
      creatorName: 'Davide Costa',
      title: 'MilSim serale - Arena Tactix',
      description: 'Organizzazione MilSim indoor serale. Richiesta esperienza base.',
      preferredDates: [addDays(today, 5)],
      preferredTimeSlots: [
        { id: 'ts3', startTime: '20:00', endTime: '23:00' },
      ],
      preferredFields: ['field_002'],
      gameMode: 'MilSim',
      minPlayers: 16,
      maxPlayers: 30,
      skillLevel: 'intermediate',
      isOpen: true,
      interestedPlayers: [
        { id: 'user_006', name: 'Matteo Ferrari', avatar: '/placeholder.svg', joinedAt: new Date(), status: 'confirmed' },
        { id: 'user_007', name: 'Simone Romano', avatar: '/placeholder.svg', joinedAt: new Date(), status: 'confirmed' },
      ],
      status: 'open',
      createdAt: addDays(today, -1),
    },
    {
      id: 'match_req_003',
      creatorId: 'user_008',
      creatorName: 'Andrea Colombo',
      title: 'Quick Match sabato pomeriggio',
      description: 'Partita veloce per il weekend. Cerco altri 6-8 giocatori.',
      preferredDates: [addDays(today, 2)],
      preferredTimeSlots: [
        { id: 'ts4', startTime: '15:00', endTime: '18:00' },
      ],
      minPlayers: 8,
      maxPlayers: 16,
      skillLevel: 'beginner',
      isOpen: true,
      interestedPlayers: [],
      status: 'open',
      createdAt: today,
    },
  ];
};

export const useAvailabilityStore = create<AvailabilityState>()(
  persist(
    (set, get) => ({
      userAvailabilities: generateMockAvailabilities(),
      matchRequests: generateMockMatchRequests(),
      myAvailability: [],

      addAvailability: (availability) => {
        const newAvailability: UserAvailability = {
          ...availability,
          id: `avail_${Date.now()}`,
          createdAt: new Date(),
        };
        set((state) => ({
          myAvailability: [...state.myAvailability, newAvailability],
          userAvailabilities: [...state.userAvailabilities, newAvailability],
        }));
      },

      removeAvailability: (id) => {
        set((state) => ({
          myAvailability: state.myAvailability.filter((a) => a.id !== id),
          userAvailabilities: state.userAvailabilities.filter((a) => a.id !== id),
        }));
      },

      updateAvailability: (id, updates) => {
        set((state) => ({
          myAvailability: state.myAvailability.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
          userAvailabilities: state.userAvailabilities.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        }));
      },

      getAvailabilityForDate: (date) => {
        return get().userAvailabilities.filter((a) => isSameDay(a.date, date));
      },

      createMatchRequest: (request) => {
        const newRequest: MatchRequest = {
          ...request,
          id: `match_req_${Date.now()}`,
          interestedPlayers: [],
          status: 'open',
          createdAt: new Date(),
        };
        set((state) => ({
          matchRequests: [...state.matchRequests, newRequest],
        }));
      },

      joinMatchRequest: (requestId, player) => {
        set((state) => ({
          matchRequests: state.matchRequests.map((req) =>
            req.id === requestId
              ? {
                  ...req,
                  interestedPlayers: [
                    ...req.interestedPlayers,
                    { ...player, joinedAt: new Date(), status: 'interested' as const },
                  ],
                }
              : req
          ),
        }));
      },

      leaveMatchRequest: (requestId, playerId) => {
        set((state) => ({
          matchRequests: state.matchRequests.map((req) =>
            req.id === requestId
              ? {
                  ...req,
                  interestedPlayers: req.interestedPlayers.filter((p) => p.id !== playerId),
                }
              : req
          ),
        }));
      },

      confirmMatchRequest: (requestId, fieldId, date, timeSlot) => {
        set((state) => ({
          matchRequests: state.matchRequests.map((req) =>
            req.id === requestId
              ? {
                  ...req,
                  status: 'confirmed' as const,
                  confirmedFieldId: fieldId,
                  confirmedDate: date,
                  confirmedTimeSlot: timeSlot,
                }
              : req
          ),
        }));
      },

      cancelMatchRequest: (requestId) => {
        set((state) => ({
          matchRequests: state.matchRequests.map((req) =>
            req.id === requestId ? { ...req, status: 'cancelled' as const } : req
          ),
        }));
      },

      getOpenMatchRequests: () => {
        return get().matchRequests.filter((req) => req.status === 'open');
      },

      getMyMatchRequests: (userId) => {
        return get().matchRequests.filter(
          (req) => req.creatorId === userId || req.interestedPlayers.some((p) => p.id === userId)
        );
      },
    }),
    {
      name: 'availability-storage',
    }
  )
);
