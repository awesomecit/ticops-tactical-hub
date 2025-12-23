export type FieldType = 'outdoor' | 'indoor' | 'mixed';
export type FieldStatus = 'active' | 'inactive' | 'pending' | 'maintenance';
export type FieldRequestStatus = 'pending' | 'approved' | 'rejected' | 'requires_info';

export interface IMockFieldAmenity {
  id: string;
  name: string;
  icon: string;
}

export interface IMockFieldSchedule {
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export interface IMockField {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: FieldType;
  status: FieldStatus;
  ownerId: string;
  address: string;
  city: string;
  province: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  rating: number;
  reviewCount: number;
  amenities: IMockFieldAmenity[];
  schedule: IMockFieldSchedule[];
  pricePerHour: number;
  maxPlayers: number;
  sizeSquareMeters: number;
  createdAt: Date;
  lastEventAt?: Date;
}

export interface IMockFieldRequest {
  id: string;
  fieldId: string;
  ownerId: string;
  status: FieldRequestStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  notes?: string;
  requiredDocuments: {
    name: string;
    submitted: boolean;
    approved: boolean;
  }[];
}

const DEFAULT_AMENITIES: IMockFieldAmenity[] = [
  { id: 'parking', name: 'Parcheggio', icon: '🅿️' },
  { id: 'lockers', name: 'Spogliatoi', icon: '🚿' },
  { id: 'rental', name: 'Noleggio Attrezzatura', icon: '🔫' },
  { id: 'shop', name: 'Negozio', icon: '🛒' },
  { id: 'bar', name: 'Bar/Ristoro', icon: '☕' },
  { id: 'wifi', name: 'WiFi', icon: '📶' },
  { id: 'first_aid', name: 'Primo Soccorso', icon: '🏥' },
  { id: 'night_lights', name: 'Illuminazione Notturna', icon: '💡' },
];

const createDefaultSchedule = (weekdayOpen: boolean = true): IMockFieldSchedule[] => [
  { dayOfWeek: 0, openTime: '09:00', closeTime: '18:00', isOpen: true },
  { dayOfWeek: 1, openTime: '14:00', closeTime: '22:00', isOpen: weekdayOpen },
  { dayOfWeek: 2, openTime: '14:00', closeTime: '22:00', isOpen: weekdayOpen },
  { dayOfWeek: 3, openTime: '14:00', closeTime: '22:00', isOpen: weekdayOpen },
  { dayOfWeek: 4, openTime: '14:00', closeTime: '22:00', isOpen: weekdayOpen },
  { dayOfWeek: 5, openTime: '14:00', closeTime: '23:00', isOpen: true },
  { dayOfWeek: 6, openTime: '09:00', closeTime: '23:00', isOpen: true },
];

export const MOCK_FIELDS: IMockField[] = [
  {
    id: 'field_001',
    name: 'Campo Alpha',
    slug: 'campo-alpha',
    description: 'Il campo più grande della Lombardia con 15.000mq di terreno boschivo. Scenario militare con bunker, trincee e torrette. Ideale per partite tattiche e MilSim.',
    type: 'outdoor',
    status: 'active',
    ownerId: 'user_007',
    address: 'Via dei Colli 45',
    city: 'Bergamo',
    province: 'BG',
    region: 'Lombardia',
    coordinates: { lat: 45.6983, lng: 9.6773 },
    images: [],
    rating: 4.8,
    reviewCount: 234,
    amenities: [
      DEFAULT_AMENITIES[0], // Parcheggio
      DEFAULT_AMENITIES[1], // Spogliatoi
      DEFAULT_AMENITIES[2], // Noleggio
      DEFAULT_AMENITIES[4], // Bar
      DEFAULT_AMENITIES[6], // Primo Soccorso
    ],
    schedule: createDefaultSchedule(),
    pricePerHour: 15,
    maxPlayers: 60,
    sizeSquareMeters: 15000,
    createdAt: new Date('2021-05-10'),
    lastEventAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: 'field_002',
    name: 'Arena Tactix',
    slug: 'arena-tactix',
    description: 'Arena indoor climatizzata nel cuore di Milano. CQB professionale con strutture modulari riconfigurabile. Perfetto per allenamenti e tornei tutto l\'anno.',
    type: 'indoor',
    status: 'active',
    ownerId: 'user_011',
    address: 'Via Mecenate 84',
    city: 'Milano',
    province: 'MI',
    region: 'Lombardia',
    coordinates: { lat: 45.4509, lng: 9.2421 },
    images: [],
    rating: 4.6,
    reviewCount: 189,
    amenities: [
      DEFAULT_AMENITIES[0], // Parcheggio
      DEFAULT_AMENITIES[1], // Spogliatoi
      DEFAULT_AMENITIES[2], // Noleggio
      DEFAULT_AMENITIES[3], // Negozio
      DEFAULT_AMENITIES[4], // Bar
      DEFAULT_AMENITIES[5], // WiFi
      DEFAULT_AMENITIES[6], // Primo Soccorso
    ],
    schedule: createDefaultSchedule(true),
    pricePerHour: 20,
    maxPlayers: 30,
    sizeSquareMeters: 2500,
    createdAt: new Date('2022-09-15'),
    lastEventAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 'field_003',
    name: 'Bunker Zone',
    slug: 'bunker-zone',
    description: 'Ex area industriale riconvertita in campo softair. Strutture in cemento autentiche, scenario post-apocalittico. Esperienza unica per giocatori esperti.',
    type: 'outdoor',
    status: 'active',
    ownerId: 'user_012',
    address: 'Via dell\'Industria 12',
    city: 'Brescia',
    province: 'BS',
    region: 'Lombardia',
    coordinates: { lat: 45.5416, lng: 10.2118 },
    images: [],
    rating: 4.4,
    reviewCount: 156,
    amenities: [
      DEFAULT_AMENITIES[0], // Parcheggio
      DEFAULT_AMENITIES[1], // Spogliatoi
      DEFAULT_AMENITIES[6], // Primo Soccorso
      DEFAULT_AMENITIES[7], // Illuminazione
    ],
    schedule: createDefaultSchedule(false),
    pricePerHour: 12,
    maxPlayers: 40,
    sizeSquareMeters: 8000,
    createdAt: new Date('2020-03-20'),
    lastEventAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: 'field_004',
    name: 'Nuovo Campo',
    slug: 'nuovo-campo',
    description: 'Campo in fase di approvazione. Terreno misto con zona boschiva e area CQB costruita. Apertura prevista primavera 2025.',
    type: 'mixed',
    status: 'pending',
    ownerId: 'user_013',
    address: 'Via Campestre 78',
    city: 'Cremona',
    province: 'CR',
    region: 'Lombardia',
    coordinates: { lat: 45.1333, lng: 10.0333 },
    images: [],
    rating: 0,
    reviewCount: 0,
    amenities: [
      DEFAULT_AMENITIES[0], // Parcheggio
      DEFAULT_AMENITIES[1], // Spogliatoi
    ],
    schedule: createDefaultSchedule(),
    pricePerHour: 10,
    maxPlayers: 50,
    sizeSquareMeters: 12000,
    createdAt: new Date('2024-12-01'),
  },
];

export const MOCK_FIELD_REQUESTS: IMockFieldRequest[] = [
  {
    id: 'fr_001',
    fieldId: 'field_004',
    ownerId: 'user_013',
    status: 'pending',
    submittedAt: new Date('2024-12-01'),
    notes: 'In attesa di verifica documentazione e sopralluogo.',
    requiredDocuments: [
      { name: 'Certificato Proprietà/Affitto', submitted: true, approved: true },
      { name: 'Assicurazione RC', submitted: true, approved: false },
      { name: 'Certificato Agibilità', submitted: false, approved: false },
      { name: 'Piano di Sicurezza', submitted: true, approved: true },
      { name: 'Autorizzazione Comunale', submitted: false, approved: false },
    ],
  },
];

export const getFieldById = (id: string): IMockField | undefined => {
  return MOCK_FIELDS.find(f => f.id === id);
};

export const getFieldBySlug = (slug: string): IMockField | undefined => {
  return MOCK_FIELDS.find(f => f.slug === slug);
};

export const getActiveFields = (): IMockField[] => {
  return MOCK_FIELDS.filter(f => f.status === 'active');
};

export const getFieldsByRegion = (region: string): IMockField[] => {
  return MOCK_FIELDS.filter(f => f.region === region && f.status === 'active');
};

export const getFieldsByType = (type: FieldType): IMockField[] => {
  return MOCK_FIELDS.filter(f => f.type === type && f.status === 'active');
};

export const getPendingFieldRequests = (): IMockFieldRequest[] => {
  return MOCK_FIELD_REQUESTS.filter(r => r.status === 'pending');
};

export const getFieldRequest = (fieldId: string): IMockFieldRequest | undefined => {
  return MOCK_FIELD_REQUESTS.find(r => r.fieldId === fieldId);
};
