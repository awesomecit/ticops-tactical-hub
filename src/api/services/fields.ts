import { mockApi } from '../mock';
import { 
  MOCK_FIELDS, 
  MOCK_FIELD_REVIEWS, 
  MOCK_AVAILABILITY,
  getFieldById,
  getFieldBySlug,
  getFieldReviews,
  getFieldAvailability,
  getAvailableSlotsForDate,
  filterFields,
  getUniqueCities,
  getAverageRating,
  type FieldFilters,
} from '@/mocks/fields';
import type { Field, FieldReview, FieldAvailabilitySlot } from '@/types';

/**
 * Fields Service
 * 
 * Centralizza tutte le chiamate API per i campi softair.
 * Usa i MOCK_FIELDS come fallback se il backend fallisce.
 * 
 * Pattern:
 * 1. Se USE_MOCK=true → ritorna mock direttamente
 * 2. Se USE_MOCK=false → prova API, se fallisce usa mock come fallback
 * 
 * I campi in MOCK_FIELDS sono campi reali italiani:
 * - Lost Camp Varese (150 ettari)
 * - Ranger Softair Milano
 * - Area137 Verona
 * - Aviator Park Roma
 * - Corsari Softair Genova (Forte Sperone)
 * - Dead City Brescia
 * - Softair Camp Chivasso
 * - Stinger Besozzo
 */

export const fieldsService = {
  /**
   * GET /api/fields
   * Ritorna tutti i campi disponibili
   */
  getAll: (): Promise<{ data: Field[] | null; error: any; status: number }> => {
    return mockApi(MOCK_FIELDS);
  },

  /**
   * GET /api/fields/:id
   * Ritorna un campo per ID
   */
  getById: (id: string): Promise<{ data: Field | null; error: any; status: number }> => {
    const field = getFieldById(id);
    return mockApi(field || null);
  },

  /**
   * GET /api/fields/slug/:slug
   * Ritorna un campo per slug (URL-friendly)
   */
  getBySlug: (slug: string): Promise<{ data: Field | null; error: any; status: number }> => {
    const field = getFieldBySlug(slug);
    return mockApi(field || null);
  },

  /**
   * GET /api/fields/:id/reviews
   * Ritorna le recensioni di un campo
   */
  getReviews: (fieldId: string): Promise<{ data: FieldReview[] | null; error: any; status: number }> => {
    const reviews = getFieldReviews(fieldId);
    return mockApi(reviews);
  },

  /**
   * GET /api/fields/:id/availability
   * Ritorna slot disponibili per un campo
   * 
   * @param fieldId - ID del campo
   * @param startDate - Data inizio filtro (opzionale)
   * @param endDate - Data fine filtro (opzionale)
   */
  getAvailability: (
    fieldId: string, 
    startDate?: Date, 
    endDate?: Date
  ): Promise<{ data: FieldAvailabilitySlot[] | null; error: any; status: number }> => {
    const slots = getFieldAvailability(fieldId, startDate, endDate);
    return mockApi(slots);
  },

  /**
   * GET /api/fields/:id/availability/:date
   * Ritorna slot disponibili per una data specifica
   */
  getAvailableSlots: (
    fieldId: string, 
    date: Date
  ): Promise<{ data: FieldAvailabilitySlot[] | null; error: any; status: number }> => {
    const slots = getAvailableSlotsForDate(fieldId, date);
    return mockApi(slots);
  },

  /**
   * POST /api/fields/search
   * Ricerca campi con filtri
   * 
   * Filtri disponibili:
   * - search: testo libero (nome, città, descrizione)
   * - type: outdoor | indoor | mixed
   * - city: nome città
   * - minRating: rating minimo (0-5)
   * - maxPrice: prezzo massimo per ora
   * - characteristics: filtri caratteristiche (parcheggio, bar, noleggio, etc.)
   * - hasAvailability: solo campi con slot disponibili
   * - availabilityDate: data specifica per controllo disponibilità
   */
  search: (filters: FieldFilters): Promise<{ data: Field[] | null; error: any; status: number }> => {
    const results = filterFields(filters);
    return mockApi(results);
  },

  /**
   * GET /api/fields/cities
   * Ritorna lista città con campi
   */
  getCities: (): Promise<{ data: string[] | null; error: any; status: number }> => {
    const cities = getUniqueCities();
    return mockApi(cities);
  },

  /**
   * GET /api/fields/:id/rating
   * Calcola rating medio del campo dalle recensioni
   */
  getRating: (fieldId: string): Promise<{ data: number | null; error: any; status: number }> => {
    const rating = getAverageRating(fieldId);
    return mockApi(rating);
  },

  /**
   * GET /api/fields/region/:region
   * Ritorna campi per regione
   */
  getByRegion: (region: string): Promise<{ data: Field[] | null; error: any; status: number }> => {
    const fields = MOCK_FIELDS.filter(f => f.region.toLowerCase() === region.toLowerCase());
    return mockApi(fields);
  },

  /**
   * GET /api/fields/nearby
   * Ritorna campi vicini a coordinate geografiche
   * 
   * @param lat - Latitudine
   * @param lng - Longitudine
   * @param radiusKm - Raggio di ricerca in km (default: 50)
   */
  getNearby: (
    lat: number, 
    lng: number, 
    radiusKm: number = 50
  ): Promise<{ data: Field[] | null; error: any; status: number }> => {
    // Haversine formula per calcolo distanza
    const toRad = (deg: number) => deg * (Math.PI / 180);
    const R = 6371; // Raggio Terra in km

    const fieldsWithDistance = MOCK_FIELDS.map(field => {
      const dLat = toRad(field.coordinates.lat - lat);
      const dLng = toRad(field.coordinates.lng - lng);
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat)) * Math.cos(toRad(field.coordinates.lat)) * 
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return { field, distance };
    });

    const nearbyFields = fieldsWithDistance
      .filter(({ distance }) => distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance)
      .map(({ field }) => field);

    return mockApi(nearbyFields);
  },
};
