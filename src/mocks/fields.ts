import { Field, FieldReview, FieldAvailabilitySlot, FieldCharacteristics, FieldType } from '@/types';

export type FieldStatus = 'active' | 'inactive' | 'pending' | 'maintenance';
export type FieldRequestStatus = 'pending' | 'approved' | 'rejected' | 'requires_info';

// Helper to create default characteristics
const createCharacteristics = (overrides: Partial<FieldCharacteristics> = {}): FieldCharacteristics => ({
  hasParking: false,
  hasLockers: false,
  hasRental: false,
  hasShop: false,
  hasBar: false,
  hasWifi: false,
  hasFirstAid: false,
  hasNightLights: false,
  hasSyntheticGrass: false,
  hasBunkers: false,
  hasTrenches: false,
  hasUrbanStructures: false,
  isClimateControlled: false,
  ...overrides,
});

export const MOCK_FIELDS: Field[] = [
  {
    id: 'field_001',
    name: 'Campo Alpha',
    slug: 'campo-alpha',
    description: 'Il campo più grande della Lombardia con 15.000mq di terreno boschivo. Scenario militare con bunker, trincee e torrette. Ideale per partite tattiche e MilSim.',
    type: 'outdoor',
    address: 'Via dei Colli 45',
    city: 'Bergamo',
    province: 'BG',
    region: 'Lombardia',
    coordinates: { lat: 45.6983, lng: 9.6773 },
    images: ['/placeholder.svg'],
    rating: 4.8,
    reviewCount: 234,
    characteristics: createCharacteristics({
      hasParking: true,
      hasLockers: true,
      hasRental: true,
      hasBar: true,
      hasFirstAid: true,
      hasBunkers: true,
      hasTrenches: true,
    }),
    pricePerHour: 15,
    maxPlayers: 60,
    sizeSquareMeters: 15000,
    ownerId: 'user_007',
    ownerName: 'Marco Bianchi',
    phone: '+39 035 123456',
    email: 'info@campoalpha.it',
    website: 'https://campoalpha.it',
  },
  {
    id: 'field_002',
    name: 'Arena Tactix',
    slug: 'arena-tactix',
    description: 'Arena indoor climatizzata nel cuore di Milano. CQB professionale con strutture modulari riconfigurabile. Perfetto per allenamenti e tornei tutto l\'anno.',
    type: 'indoor',
    address: 'Via Mecenate 84',
    city: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    coordinates: { lat: 45.4509, lng: 9.2421 },
    images: ['/placeholder.svg'],
    rating: 4.6,
    reviewCount: 189,
    characteristics: createCharacteristics({
      hasParking: true,
      hasLockers: true,
      hasRental: true,
      hasShop: true,
      hasBar: true,
      hasWifi: true,
      hasFirstAid: true,
      hasUrbanStructures: true,
      isClimateControlled: true,
    }),
    pricePerHour: 20,
    maxPlayers: 30,
    sizeSquareMeters: 2500,
    ownerId: 'user_011',
    ownerName: 'Luca Rossi',
    phone: '+39 02 987654',
    email: 'booking@arenatactix.it',
  },
  {
    id: 'field_003',
    name: 'Bunker Zone',
    slug: 'bunker-zone',
    description: 'Ex area industriale riconvertita in campo softair. Strutture in cemento autentiche, scenario post-apocalittico. Esperienza unica per giocatori esperti.',
    type: 'outdoor',
    address: 'Via dell\'Industria 12',
    city: 'Brescia',
    province: 'BS',
    region: 'Lombardia',
    coordinates: { lat: 45.5416, lng: 10.2118 },
    images: ['/placeholder.svg'],
    rating: 4.4,
    reviewCount: 156,
    characteristics: createCharacteristics({
      hasParking: true,
      hasLockers: true,
      hasFirstAid: true,
      hasNightLights: true,
      hasBunkers: true,
      hasUrbanStructures: true,
    }),
    pricePerHour: 12,
    maxPlayers: 40,
    sizeSquareMeters: 8000,
    ownerId: 'user_012',
    ownerName: 'Andrea Verdi',
    phone: '+39 030 456789',
  },
  {
    id: 'field_004',
    name: 'Forest Ops',
    slug: 'forest-ops',
    description: 'Campo immerso nella natura con percorsi boschivi e radure. Ideale per scenari di guerriglia e infiltrazione. Atmosfera immersiva garantita.',
    type: 'outdoor',
    address: 'Strada Provinciale 15',
    city: 'Como',
    province: 'CO',
    region: 'Lombardia',
    coordinates: { lat: 45.8103, lng: 9.0852 },
    images: ['/placeholder.svg'],
    rating: 4.7,
    reviewCount: 98,
    characteristics: createCharacteristics({
      hasParking: true,
      hasFirstAid: true,
      hasTrenches: true,
    }),
    pricePerHour: 10,
    maxPlayers: 50,
    sizeSquareMeters: 20000,
    ownerId: 'user_015',
    ownerName: 'Paolo Neri',
    email: 'forestops@email.it',
  },
  {
    id: 'field_005',
    name: 'Urban Combat Center',
    slug: 'urban-combat-center',
    description: 'Struttura urbana simulata con edifici multipiano, strade e veicoli. Il più avanzato centro CQB del Nord Italia.',
    type: 'mixed',
    address: 'Via Industriale 45',
    city: 'Torino',
    province: 'TO',
    region: 'Piemonte',
    coordinates: { lat: 45.0703, lng: 7.6869 },
    images: ['/placeholder.svg'],
    rating: 4.9,
    reviewCount: 312,
    characteristics: createCharacteristics({
      hasParking: true,
      hasLockers: true,
      hasRental: true,
      hasShop: true,
      hasBar: true,
      hasWifi: true,
      hasFirstAid: true,
      hasNightLights: true,
      hasUrbanStructures: true,
    }),
    pricePerHour: 25,
    maxPlayers: 80,
    sizeSquareMeters: 12000,
    ownerId: 'user_020',
    ownerName: 'Giovanni Russo',
    phone: '+39 011 234567',
    email: 'info@urbancombat.it',
    website: 'https://urbancombatcenter.it',
  },
];

// Mock Reviews
export const MOCK_FIELD_REVIEWS: FieldReview[] = [
  {
    id: 'review_001',
    fieldId: 'field_001',
    userId: 'user_001',
    userName: 'Shadow_Wolf',
    userAvatar: '/placeholder.svg',
    rating: 5,
    title: 'Il miglior campo della zona!',
    content: 'Ho giocato in molti campi ma Campo Alpha è decisamente il migliore. Le strutture sono curate, il terreno variegato offre molte opportunità tattiche. Lo staff è super disponibile.',
    pros: ['Terreno variegato', 'Strutture curate', 'Staff gentile', 'Buon rapporto qualità/prezzo'],
    cons: ['Parcheggio limitato nei weekend'],
    visitDate: new Date('2024-11-15'),
    createdAt: new Date('2024-11-16'),
    helpfulCount: 45,
  },
  {
    id: 'review_002',
    fieldId: 'field_001',
    userId: 'user_002',
    userName: 'TacticalEagle',
    rating: 4,
    title: 'Ottimo per MilSim',
    content: 'Campo molto grande, perfetto per eventi MilSim. I bunker sono realistici e le trincee aggiungono profondità tattica. Unica pecca: il bar chiude troppo presto.',
    pros: ['Grande superficie', 'Bunker realistici', 'Perfetto per MilSim'],
    cons: ['Bar chiude presto', 'Alcune zone fangose dopo pioggia'],
    visitDate: new Date('2024-10-20'),
    createdAt: new Date('2024-10-22'),
    helpfulCount: 32,
  },
  {
    id: 'review_003',
    fieldId: 'field_002',
    userId: 'user_003',
    userName: 'NightStalker',
    userAvatar: '/placeholder.svg',
    rating: 5,
    title: 'CQB al top!',
    content: 'Arena indoor perfetta per chi ama il close quarter. Climatizzata, pulita, professionale. Il negozio interno ha tutto il necessario. Prezzi onesti.',
    pros: ['Climatizzato', 'Sempre pulito', 'Negozio ben fornito', 'Strutture modulari'],
    cons: ['Capienza limitata'],
    visitDate: new Date('2024-12-01'),
    createdAt: new Date('2024-12-02'),
    helpfulCount: 28,
  },
  {
    id: 'review_004',
    fieldId: 'field_002',
    userId: 'user_004',
    userName: 'GhostRecon',
    rating: 4,
    title: 'Perfetto per allenamenti',
    content: 'Uso questa arena per allenamenti settimanali con il mio team. Le strutture modulari permettono di variare gli scenari. WiFi utile per streaming.',
    pros: ['Ideale per training', 'WiFi veloce', 'Sempre disponibile'],
    cons: ['Può essere affollato il sabato'],
    visitDate: new Date('2024-11-28'),
    createdAt: new Date('2024-11-29'),
    helpfulCount: 15,
  },
  {
    id: 'review_005',
    fieldId: 'field_003',
    userId: 'user_005',
    userName: 'BunkerBuster',
    rating: 5,
    title: 'Atmosfera unica!',
    content: 'L\'ambientazione post-apocalittica è incredibile. Le strutture in cemento danno un realismo che altri campi non hanno. Illuminazione notturna ottima per eventi serali.',
    pros: ['Atmosfera immersiva', 'Strutture realistiche', 'Ottima illuminazione notturna'],
    cons: ['Nessun negozio', 'Zona un po\' isolata'],
    visitDate: new Date('2024-11-10'),
    createdAt: new Date('2024-11-12'),
    helpfulCount: 52,
  },
  {
    id: 'review_006',
    fieldId: 'field_005',
    userId: 'user_006',
    userName: 'UrbanWarrior',
    userAvatar: '/placeholder.svg',
    rating: 5,
    title: 'Il futuro del softair!',
    content: 'Urban Combat Center è qualcosa di mai visto. Edifici multipiano, strade, veicoli... sembra di essere in un videogioco! Vale ogni centesimo del prezzo più alto.',
    pros: ['Strutture incredibili', 'Multipiano realistici', 'Servizi eccellenti'],
    cons: ['Prezzo più alto della media'],
    visitDate: new Date('2024-12-10'),
    createdAt: new Date('2024-12-11'),
    helpfulCount: 78,
  },
];

// Generate availability slots for next 14 days
const generateAvailabilitySlots = (fieldId: string, basePrice: number, maxPlayers: number): FieldAvailabilitySlot[] => {
  const slots: FieldAvailabilitySlot[] = [];
  const today = new Date();
  
  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() + dayOffset);
    
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const timeSlots = isWeekend 
      ? [
          { start: '09:00', end: '12:00' },
          { start: '12:00', end: '15:00' },
          { start: '15:00', end: '18:00' },
          { start: '18:00', end: '21:00' },
        ]
      : [
          { start: '14:00', end: '17:00' },
          { start: '17:00', end: '20:00' },
          { start: '20:00', end: '23:00' },
        ];
    
    timeSlots.forEach((slot, index) => {
      const isAvailable = Math.random() > 0.3;
      const currentPlayers = isAvailable ? 0 : Math.floor(Math.random() * maxPlayers);
      
      slots.push({
        id: `${fieldId}_${dayOffset}_${index}`,
        fieldId,
        date: new Date(date),
        startTime: slot.start,
        endTime: slot.end,
        isAvailable,
        price: isWeekend ? basePrice * 1.2 : basePrice,
        maxPlayers,
        currentPlayers,
        eventName: !isAvailable ? ['Partita Aperta', 'Torneo Team', 'MilSim Event', 'Training Session'][Math.floor(Math.random() * 4)] : undefined,
        bookedBy: !isAvailable ? 'Team Alpha' : undefined,
      });
    });
  }
  
  return slots;
};

export const MOCK_AVAILABILITY: FieldAvailabilitySlot[] = [
  ...generateAvailabilitySlots('field_001', 15, 60),
  ...generateAvailabilitySlots('field_002', 20, 30),
  ...generateAvailabilitySlots('field_003', 12, 40),
  ...generateAvailabilitySlots('field_004', 10, 50),
  ...generateAvailabilitySlots('field_005', 25, 80),
];

// Utility functions
export const getFieldById = (id: string): Field | undefined => {
  return MOCK_FIELDS.find(f => f.id === id);
};

export const getFieldBySlug = (slug: string): Field | undefined => {
  return MOCK_FIELDS.find(f => f.slug === slug);
};

export const getFieldReviews = (fieldId: string): FieldReview[] => {
  return MOCK_FIELD_REVIEWS.filter(r => r.fieldId === fieldId);
};

export const getFieldAvailability = (fieldId: string, startDate?: Date, endDate?: Date): FieldAvailabilitySlot[] => {
  let slots = MOCK_AVAILABILITY.filter(s => s.fieldId === fieldId);
  
  if (startDate) {
    slots = slots.filter(s => s.date >= startDate);
  }
  if (endDate) {
    slots = slots.filter(s => s.date <= endDate);
  }
  
  return slots;
};

export const getAvailableSlotsForDate = (fieldId: string, date: Date): FieldAvailabilitySlot[] => {
  return MOCK_AVAILABILITY.filter(s => 
    s.fieldId === fieldId && 
    s.date.toDateString() === date.toDateString() && 
    s.isAvailable
  );
};

// Filter functions
export interface FieldFilters {
  search?: string;
  type?: FieldType;
  city?: string;
  minRating?: number;
  maxPrice?: number;
  characteristics?: Partial<FieldCharacteristics>;
  hasAvailability?: boolean;
  availabilityDate?: Date;
}

export const filterFields = (filters: FieldFilters): Field[] => {
  let results = [...MOCK_FIELDS];
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    results = results.filter(f => 
      f.name.toLowerCase().includes(searchLower) ||
      f.city.toLowerCase().includes(searchLower) ||
      f.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters.type) {
    results = results.filter(f => f.type === filters.type);
  }
  
  if (filters.city) {
    results = results.filter(f => f.city.toLowerCase() === filters.city!.toLowerCase());
  }
  
  if (filters.minRating) {
    results = results.filter(f => f.rating >= filters.minRating!);
  }
  
  if (filters.maxPrice) {
    results = results.filter(f => f.pricePerHour <= filters.maxPrice!);
  }
  
  if (filters.characteristics) {
    results = results.filter(f => {
      for (const [key, value] of Object.entries(filters.characteristics!)) {
        if (value === true && !f.characteristics[key as keyof FieldCharacteristics]) {
          return false;
        }
      }
      return true;
    });
  }
  
  if (filters.hasAvailability && filters.availabilityDate) {
    const dateStr = filters.availabilityDate.toDateString();
    results = results.filter(f => 
      MOCK_AVAILABILITY.some(s => 
        s.fieldId === f.id && 
        s.date.toDateString() === dateStr && 
        s.isAvailable
      )
    );
  }
  
  return results;
};

export const getUniqueCities = (): string[] => {
  return [...new Set(MOCK_FIELDS.map(f => f.city))];
};

export const getAverageRating = (fieldId: string): number => {
  const reviews = getFieldReviews(fieldId);
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
};
