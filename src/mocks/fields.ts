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
    id: 'field_it_001',
    name: 'Lost Camp Varese',
    slug: 'lost-camp-varese',
    description: '150 ettari di boschi e colline tra Varese e lago Maggiore. Il campo più grande del Nord Italia con scenari naturali immersivi, perfetto per MilSim e grandi eventi.',
    type: 'outdoor',
    address: 'SP62, 21020 Varese VA',
    city: 'Varese',
    province: 'VA',
    region: 'Lombardia',
    coordinates: { lat: 45.8333, lng: 8.8333 },
    images: ['https://www.lostcamp.it/wp-content/uploads/mappa-campo.jpg'],
    rating: 4.7,
    reviewCount: 156,
    characteristics: createCharacteristics({
      hasParking: true,
      hasLockers: true,
      hasRental: true,
      hasBar: true,
      hasFirstAid: true,
      hasBunkers: true,
      hasTrenches: true,
    }),
    pricePerHour: 18,
    maxPlayers: 120,
    sizeSquareMeters: 1500000,
    ownerId: 'asd_lostcamp',
    ownerName: 'ASD Lost Camp',
    phone: '+39 0332 123456',
    email: 'info@lostcamp.it',
    website: 'https://www.lostcamp.it',
  },
  {
    id: 'field_it_002',
    name: 'Ranger Softair Milano',
    slug: 'ranger-softair-milano',
    description: '12.000 mq bosco/urban ovest Milano. Noleggio completo, ideale squadre medie.',
    type: 'outdoor',
    address: 'Via Cascina Nuova 45, 20090 Trezzano sul Naviglio MI',
    city: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    coordinates: { lat: 45.4150, lng: 9.0700 },
    images: ['https://www.rangersoftairmilano.it/images/campo.jpg'],
    rating: 4.5,
    reviewCount: 89,
    characteristics: createCharacteristics({
      hasParking: true,
      hasLockers: true,
      hasRental: true,
      hasShop: true,
      hasBar: true,
      hasFirstAid: true,
      hasBunkers: true,
      hasUrbanStructures: true,
    }),
    pricePerHour: 20,
    maxPlayers: 40,
    sizeSquareMeters: 12000,
    ownerId: 'asd_ranger',
    ownerName: 'ASD Ranger Softair',
    phone: '+39 02 36578901',
    email: 'booking@rangersoftairmilano.it',
    website: 'https://www.rangersoftairmilano.it',
  },
  {
    id: 'field_it_003',
    name: 'Area137 Airsoft Park',
    slug: 'area137-verona',
    description: 'Parco tematico CQB/bosco Ronco all\'Adige. Noleggio, pizza/grigliate post-partita.',
    type: 'mixed',
    address: 'Via Ronco 137, 37050 Ronco all\'Adige VR',
    city: 'Ronco all\'Adige',
    province: 'VR',
    region: 'Veneto',
    coordinates: { lat: 45.3167, lng: 11.1667 },
    images: ['https://www.area137.com/images/parco.jpg'],
    rating: 4.6,
    reviewCount: 123,
    characteristics: createCharacteristics({
      hasParking: true,
      hasLockers: true,
      hasRental: true,
      hasBar: true,
      hasWifi: true,
      hasFirstAid: true,
      hasNightLights: true,
      hasBunkers: true,
      hasTrenches: true,
      hasUrbanStructures: true,
    }),
    pricePerHour: 27,
    maxPlayers: 80,
    sizeSquareMeters: 50000,
    ownerId: 'asd_area137',
    ownerName: 'ASD Area137',
    phone: '+39 045 9876543',
    email: 'info@area137.com',
    website: 'http://www.area137.com',
  },
  {
    id: 'field_it_004',
    name: 'Aviator Park Roma',
    slug: 'aviator-park-roma',
    description: 'Campo urban 1 ettaro Velletri con edifici/container. Softair+paintball.',
    type: 'outdoor',
    address: 'Via Velletri km 15, 00049 Velletri RM',
    city: 'Velletri',
    province: 'RM',
    region: 'Lazio',
    coordinates: { lat: 41.7000, lng: 12.7833 },
    images: ['https://aviatorpark.it/mappa/campo-urban.jpg'],
    rating: 4.4,
    reviewCount: 67,
    characteristics: createCharacteristics({
      hasParking: true,
      hasRental: true,
      hasBar: true,
      hasFirstAid: true,
      hasBunkers: true,
      hasUrbanStructures: true,
    }),
    pricePerHour: 15,
    maxPlayers: 50,
    sizeSquareMeters: 10000,
    ownerId: 'asd_aviator',
    ownerName: 'ASD Aviator Park',
    phone: '+39 06 98765432',
    email: 'info@aviatorpark.it',
    website: 'https://aviatorpark.it',
  },
  {
    id: 'field_it_005',
    name: 'Corsari Softair Genova',
    slug: 'corsari-softair-genova',
    description: 'Forte Sperone storico 34.000 mq. Scenari autentici in fortezza del \'700.',
    type: 'outdoor',
    address: 'Forte Sperone, 16038 Santa Margherita Ligure GE',
    city: 'Santa Margherita Ligure',
    province: 'GE',
    region: 'Liguria',
    coordinates: { lat: 44.4167, lng: 8.9333 },
    images: ['https://www.corsari.eu/images/forte-sperone.jpg'],
    rating: 4.8,
    reviewCount: 45,
    characteristics: createCharacteristics({
      hasParking: true,
      hasLockers: true,
      hasRental: true,
      hasBar: true,
      hasFirstAid: true,
      hasNightLights: true,
      hasBunkers: true,
      hasTrenches: true,
      hasUrbanStructures: true,
    }),
    pricePerHour: 22,
    maxPlayers: 60,
    sizeSquareMeters: 34000,
    ownerId: 'asd_corsari',
    ownerName: 'ASD Corsari Softair',
    phone: '+39 0185 289123',
    email: 'info@corsari.eu',
    website: 'https://www.corsari.eu',
  },
  {
    id: 'field_it_006',
    name: 'Dead City Brescia',
    slug: 'dead-city-brescia',
    description: '42.000 mq scenografato Torbole Casaglia. Aperto domeniche, noleggio in loco.',
    type: 'outdoor',
    address: 'Via Torbole, 25030 Torbole Casaglia BS',
    city: 'Torbole Casaglia',
    province: 'BS',
    region: 'Lombardia',
    coordinates: { lat: 45.5416, lng: 10.2118 },
    images: ['https://www.deadcity.it/images/campo-scenografico.jpg'],
    rating: 4.5,
    reviewCount: 78,
    characteristics: createCharacteristics({
      hasParking: true,
      hasLockers: true,
      hasRental: true,
      hasBar: true,
      hasFirstAid: true,
      hasBunkers: true,
      hasTrenches: true,
      hasUrbanStructures: true,
    }),
    pricePerHour: 16,
    maxPlayers: 70,
    sizeSquareMeters: 42000,
    ownerId: 'asd_deadcity',
    ownerName: 'ASD Dead City',
    phone: '+39 030 9876543',
    email: 'info@deadcity.it',
    website: 'https://www.deadcity.it',
  },
  {
    id: 'field_it_007',
    name: 'Softair Camp Chivasso',
    slug: 'softair-camp-chivasso',
    description: 'Partite 4-6h vicino Torino. Pacchetti con pranzo da 53-71€.',
    type: 'outdoor',
    address: 'Zona Industriale, 10034 Chivasso TO',
    city: 'Chivasso',
    province: 'TO',
    region: 'Piemonte',
    coordinates: { lat: 45.1890, lng: 7.8670 },
    images: ['https://www.yumping.com/images/softair-chivasso.jpg'],
    rating: 4.6,
    reviewCount: 45,
    characteristics: createCharacteristics({
      hasParking: true,
      hasLockers: true,
      hasRental: true,
      hasBar: true,
      hasFirstAid: true,
      hasBunkers: true,
    }),
    pricePerHour: 18,
    maxPlayers: 50,
    sizeSquareMeters: 30000,
    ownerId: 'asd_chivasso',
    ownerName: 'ASD Softair Camp',
    phone: '+39 011 4567890',
    email: 'booking@softaircamp.to',
    website: 'https://www.yumping.com/it/softair/torino',
  },
  {
    id: 'field_it_008',
    name: 'Stinger Besozzo',
    slug: 'stinger-besozzo',
    description: 'ASD Varese con campo boschivo locale. Eventi settimanali.',
    type: 'outdoor',
    address: 'Via per Laveno, 21023 Besozzo VA',
    city: 'Besozzo',
    province: 'VA',
    region: 'Lombardia',
    coordinates: { lat: 45.8000, lng: 8.6333 },
    images: ['/placeholder.svg'],
    rating: 4.3,
    reviewCount: 34,
    characteristics: createCharacteristics({
      hasParking: true,
      hasRental: true,
      hasFirstAid: true,
      hasTrenches: true,
    }),
    pricePerHour: 12,
    maxPlayers: 35,
    sizeSquareMeters: 15000,
    ownerId: 'asd_stinger',
    ownerName: 'ASD Stinger Besozzo',
    phone: '+39 0332 987654',
    email: 'info@stingerbesozzo.it',
    website: 'https://stingerbesozzo.it',
  },
];

// Mock Reviews
export const MOCK_FIELD_REVIEWS: FieldReview[] = [
  {
    id: 'review_001',
    fieldId: 'field_it_001',
    userId: 'user_001',
    userName: 'Shadow_Wolf',
    userAvatar: '/placeholder.svg',
    rating: 5,
    title: 'Il miglior campo del Nord Italia!',
    content: '150 ettari di puro divertimento! Lost Camp è enorme, con scenari naturali perfetti per MilSim. Le grigliate post-partita sono fantastiche. Noleggio completo disponibile.',
    pros: ['Dimensioni immense', 'Scenari naturali', 'Grigliate', 'Noleggio completo', 'Staff professionale'],
    cons: ['Distanza da Milano', 'Servono scarpe da trekking'],
    visitDate: new Date('2024-11-15'),
    createdAt: new Date('2024-11-16'),
    helpfulCount: 89,
  },
  {
    id: 'review_002',
    fieldId: 'field_it_002',
    userId: 'user_002',
    userName: 'TacticalEagle',
    rating: 4,
    title: 'Ottimo per partite brevi',
    content: 'Campo perfetto per chi sta a Milano. 12.000 mq ben organizzati, mix bosco/urban interessante. Prezzo onesto, noleggio disponibile. Ideale per 3-4 ore di gioco.',
    pros: ['Vicinanza Milano', 'Noleggio completo', 'Bar/ristoro', 'Scenario variegato'],
    cons: ['Capienza limitata weekend', 'Parcheggio piccolo'],
    visitDate: new Date('2024-12-10'),
    createdAt: new Date('2024-12-11'),
    helpfulCount: 45,
  },
  {
    id: 'review_003',
    fieldId: 'field_it_003',
    userId: 'user_003',
    userName: 'NightStalker',
    userAvatar: '/placeholder.svg',
    rating: 5,
    title: 'Parco tematico fantastico',
    content: 'Area137 è molto più di un campo softair. CQB + bosco + zona grigliate. Le luci notturne permettono eventi serali epici. Pizza post-partita inclusa nei pacchetti!',
    pros: ['Illuminazione notturna', 'Pizza/grigliate', 'WiFi disponibile', 'Parco ben curato'],
    cons: ['Prezzo leggermente alto', 'Prenotazione obbligatoria'],
    visitDate: new Date('2024-12-01'),
    createdAt: new Date('2024-12-02'),
    helpfulCount: 67,
  },
  {
    id: 'review_004',
    fieldId: 'field_it_004',
    userId: 'user_004',
    userName: 'GhostRecon',
    rating: 4,
    title: 'Buon campo urban Roma',
    content: 'Aviator Park è l\'unico campo decente vicino Roma. Urban ben fatto con container e edifici. Anche paintball disponibile. Da 10€ è accessibile a tutti.',
    pros: ['Prezzo basso', 'Urban autentico', 'Paintball hybrid', 'Parcheggio ampio'],
    cons: ['Nessun negozio', 'Solo bar base'],
    visitDate: new Date('2024-11-20'),
    createdAt: new Date('2024-11-21'),
    helpfulCount: 34,
  },
  {
    id: 'review_005',
    fieldId: 'field_it_005',
    userId: 'user_005',
    userName: 'BunkerBuster',
    rating: 5,
    title: 'Fortezza storica unica!',
    content: 'Giocare in un forte del 1700 è un\'esperienza incredibile. Forte Sperone è autentico, con mura storiche e tunnel sotterranei. I Corsari hanno fatto un lavoro eccezionale.',
    pros: ['Ambientazione storica', 'Strutture autentiche', 'Luci notturne', 'Eventi organizzati'],
    cons: ['Accesso ripido', 'Non adatto principianti assoluti'],
    visitDate: new Date('2024-10-25'),
    createdAt: new Date('2024-10-26'),
    helpfulCount: 78,
  },
  {
    id: 'review_006',
    fieldId: 'field_it_006',
    userId: 'user_006',
    userName: 'UrbanWarrior',
    userAvatar: '/placeholder.svg',
    rating: 5,
    title: 'Dead City fantastica!',
    content: '42.000 mq scenografati come città abbandonata. Atmosfera post-apocalittica curata nei dettagli. Domeniche sempre partite organizzate. Noleggio comodo in loco.',
    pros: ['Scenografia curata', 'Grande superficie', 'Noleggio disponibile', 'Eventi regolari'],
    cons: ['Solo domeniche', 'Distanza da Brescia centro'],
    visitDate: new Date('2024-12-08'),
    createdAt: new Date('2024-12-09'),
    helpfulCount: 56,
  },
  {
    id: 'review_007',
    fieldId: 'field_it_007',
    userId: 'user_007',
    userName: 'AlpineSniper',
    rating: 5,
    title: 'Pacchetti completi ottimi',
    content: 'Partite lunghe 4-6h con pranzo incluso sono perfette per giornate full immersion. Campo Chivasso ben organizzato, vicino Torino. Pacchetto da 53€ vale ogni centesimo.',
    pros: ['Pranzo incluso', 'Partite lunghe', 'Vicino Torino', 'Organizzazione top'],
    cons: ['Prenotazione richiesta', 'Solo weekend'],
    visitDate: new Date('2024-11-30'),
    createdAt: new Date('2024-12-01'),
    helpfulCount: 41,
  },
  {
    id: 'review_008',
    fieldId: 'field_it_008',
    userId: 'user_008',
    userName: 'ForestRunner',
    rating: 4,
    title: 'Buon campo locale',
    content: 'Stinger è un campo ASD ben gestito. Bosco naturale senza troppe strutture artificiose. Eventi settimanali per associati. Prezzo accessibile.',
    pros: ['Prezzo basso', 'Eventi regolari', 'Atmosfera familiare', 'Bosco naturale'],
    cons: ['Pochi servizi', 'Noleggio limitato'],
    visitDate: new Date('2024-12-15'),
    createdAt: new Date('2024-12-16'),
    helpfulCount: 23,
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
  ...generateAvailabilitySlots('field_it_001', 18, 120),
  ...generateAvailabilitySlots('field_it_002', 20, 40),
  ...generateAvailabilitySlots('field_it_003', 27, 80),
  ...generateAvailabilitySlots('field_it_004', 15, 50),
  ...generateAvailabilitySlots('field_it_005', 22, 60),
  ...generateAvailabilitySlots('field_it_006', 16, 70),
  ...generateAvailabilitySlots('field_it_007', 18, 50),
  ...generateAvailabilitySlots('field_it_008', 12, 35),
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
