import { Shop, Product, ProductCategory } from '@/types';

export const PRODUCT_CATEGORIES: { id: ProductCategory; name: string; icon: string }[] = [
  { id: 'repliche', name: 'Repliche', icon: '🔫' },
  { id: 'accessori', name: 'Accessori', icon: '🔧' },
  { id: 'abbigliamento', name: 'Abbigliamento', icon: '👕' },
  { id: 'protezioni', name: 'Protezioni', icon: '🛡️' },
  { id: 'ottiche', name: 'Ottiche', icon: '🔭' },
  { id: 'munizioni', name: 'Munizioni', icon: '🎯' },
  { id: 'upgrade', name: 'Upgrade', icon: '⚙️' },
  { id: 'altro', name: 'Altro', icon: '📦' },
];

export const MOCK_SHOPS: Shop[] = [
  {
    id: 'shop_1',
    name: 'Tactical Store Milano',
    description: 'Il più grande negozio di airsoft del Nord Italia. Specializzati in repliche di alta qualità e accessori tattici.',
    logo: undefined,
    coverImage: undefined,
    address: 'Via Torino 123',
    city: 'Milano',
    rating: 4.8,
    reviewCount: 342,
    categories: ['repliche', 'accessori', 'abbigliamento'],
    isVerified: true,
    ownerId: 'shop_owner_1',
  },
  {
    id: 'shop_2',
    name: 'AirSoft Pro Roma',
    description: 'Negozio specializzato in upgrade e customizzazioni. Tecnici certificati disponibili.',
    logo: undefined,
    coverImage: undefined,
    address: 'Via del Corso 45',
    city: 'Roma',
    rating: 4.6,
    reviewCount: 189,
    categories: ['upgrade', 'accessori', 'repliche'],
    isVerified: true,
    ownerId: 'shop_owner_2',
  },
  {
    id: 'shop_3',
    name: 'Gear Up Torino',
    description: 'Abbigliamento tattico e protezioni per ogni esigenza. Marchi premium disponibili.',
    logo: undefined,
    coverImage: undefined,
    address: 'Corso Francia 78',
    city: 'Torino',
    rating: 4.4,
    reviewCount: 156,
    categories: ['abbigliamento', 'protezioni', 'accessori'],
    isVerified: false,
    ownerId: 'shop_owner_3',
  },
  {
    id: 'shop_4',
    name: 'Optics World Napoli',
    description: 'Specialisti in ottiche e sistemi di puntamento. Red dot, scope e accessori.',
    logo: undefined,
    coverImage: undefined,
    address: 'Via Toledo 200',
    city: 'Napoli',
    rating: 4.7,
    reviewCount: 98,
    categories: ['ottiche', 'accessori'],
    isVerified: true,
    ownerId: 'shop_owner_4',
  },
  {
    id: 'shop_5',
    name: 'BB Factory Firenze',
    description: 'Munizioni di qualità e accessori per il caricamento. Spedizioni rapide in tutta Italia.',
    logo: undefined,
    coverImage: undefined,
    address: 'Via dei Calzaiuoli 12',
    city: 'Firenze',
    rating: 4.3,
    reviewCount: 234,
    categories: ['munizioni', 'accessori', 'altro'],
    isVerified: true,
    ownerId: 'shop_owner_5',
  },
];

export const MOCK_PRODUCTS: Product[] = [
  // Repliche
  {
    id: 'prod_1',
    shopId: 'shop_1',
    name: 'M4A1 CQB Full Metal',
    description: 'Replica M4A1 in metallo pieno con gearbox V2 rinforzato. Ideale per CQB.',
    price: 289.99,
    originalPrice: 349.99,
    images: [],
    category: 'repliche',
    subcategory: 'Fucili Elettrici',
    brand: 'G&G',
    inStock: true,
    stockCount: 12,
    rating: 4.7,
    reviewCount: 45,
    tags: ['bestseller', 'promo'],
  },
  {
    id: 'prod_2',
    shopId: 'shop_1',
    name: 'AK-47 Tactical',
    description: 'AK-47 con rail tattico integrato e calcio regolabile.',
    price: 199.99,
    images: [],
    category: 'repliche',
    subcategory: 'Fucili Elettrici',
    brand: 'CYMA',
    inStock: true,
    stockCount: 8,
    rating: 4.5,
    reviewCount: 32,
    tags: ['nuovo'],
  },
  {
    id: 'prod_3',
    shopId: 'shop_2',
    name: 'Glock 17 GBB',
    description: 'Pistola Glock 17 gas blowback con licenza ufficiale.',
    price: 149.99,
    images: [],
    category: 'repliche',
    subcategory: 'Pistole',
    brand: 'Tokyo Marui',
    inStock: true,
    stockCount: 15,
    rating: 4.9,
    reviewCount: 78,
    tags: ['bestseller'],
  },
  // Accessori
  {
    id: 'prod_4',
    shopId: 'shop_1',
    name: 'Silenziatore 14mm CCW',
    description: 'Silenziatore in alluminio con filettatura standard 14mm antioraria.',
    price: 34.99,
    images: [],
    category: 'accessori',
    subcategory: 'Silenziatori',
    brand: 'Element',
    inStock: true,
    stockCount: 25,
    rating: 4.3,
    reviewCount: 19,
    tags: [],
  },
  {
    id: 'prod_5',
    shopId: 'shop_2',
    name: 'Impugnatura Verticale',
    description: 'Impugnatura verticale ergonomica per rail Picatinny.',
    price: 19.99,
    images: [],
    category: 'accessori',
    subcategory: 'Impugnature',
    brand: 'Magpul',
    inStock: true,
    stockCount: 40,
    rating: 4.6,
    reviewCount: 28,
    tags: [],
  },
  // Abbigliamento
  {
    id: 'prod_6',
    shopId: 'shop_3',
    name: 'Combat Shirt Multicam',
    description: 'Combat shirt in materiale traspirante con inserti in tessuto elastico.',
    price: 59.99,
    images: [],
    category: 'abbigliamento',
    subcategory: 'Maglie',
    brand: 'Emerson',
    inStock: true,
    stockCount: 18,
    rating: 4.4,
    reviewCount: 36,
    tags: ['nuovo'],
  },
  {
    id: 'prod_7',
    shopId: 'shop_3',
    name: 'Pantaloni Tattici Gen3',
    description: 'Pantaloni tattici con ginocchiere integrate e tasche multiple.',
    price: 79.99,
    originalPrice: 99.99,
    images: [],
    category: 'abbigliamento',
    subcategory: 'Pantaloni',
    brand: 'Emerson',
    inStock: true,
    stockCount: 22,
    rating: 4.7,
    reviewCount: 54,
    tags: ['promo'],
  },
  // Protezioni
  {
    id: 'prod_8',
    shopId: 'shop_3',
    name: 'Maschera Full Face',
    description: 'Maschera protettiva full face con lenti anti-fog certificate.',
    price: 45.99,
    images: [],
    category: 'protezioni',
    subcategory: 'Maschere',
    brand: 'Dye',
    inStock: true,
    stockCount: 30,
    rating: 4.8,
    reviewCount: 89,
    tags: ['bestseller'],
  },
  {
    id: 'prod_9',
    shopId: 'shop_3',
    name: 'Guanti Tattici',
    description: 'Guanti tattici con protezione nocche e palmo rinforzato.',
    price: 29.99,
    images: [],
    category: 'protezioni',
    subcategory: 'Guanti',
    brand: 'Mechanix',
    inStock: true,
    stockCount: 50,
    rating: 4.5,
    reviewCount: 42,
    tags: [],
  },
  // Ottiche
  {
    id: 'prod_10',
    shopId: 'shop_4',
    name: 'Red Dot Holographic',
    description: 'Red dot holografico con 4 reticoli selezionabili e mount integrato.',
    price: 89.99,
    images: [],
    category: 'ottiche',
    subcategory: 'Red Dot',
    brand: 'Aim-O',
    inStock: true,
    stockCount: 14,
    rating: 4.6,
    reviewCount: 67,
    tags: ['bestseller'],
  },
  {
    id: 'prod_11',
    shopId: 'shop_4',
    name: 'Scope 4x32 ACOG Style',
    description: 'Ottica fissa 4x32 stile ACOG con reticolo illuminato.',
    price: 69.99,
    images: [],
    category: 'ottiche',
    subcategory: 'Scope',
    brand: 'Aim-O',
    inStock: false,
    stockCount: 0,
    rating: 4.4,
    reviewCount: 23,
    tags: ['esaurito'],
  },
  // Munizioni
  {
    id: 'prod_12',
    shopId: 'shop_5',
    name: 'BB 0.25g Premium (5000pz)',
    description: 'BB di precisione 0.25g in bottiglia da 5000 pezzi.',
    price: 14.99,
    images: [],
    category: 'munizioni',
    subcategory: 'BB',
    brand: 'G&G',
    inStock: true,
    stockCount: 200,
    rating: 4.7,
    reviewCount: 156,
    tags: ['bestseller'],
  },
  {
    id: 'prod_13',
    shopId: 'shop_5',
    name: 'BB Bio 0.28g (3000pz)',
    description: 'BB biodegradabili premium 0.28g per uso outdoor.',
    price: 18.99,
    images: [],
    category: 'munizioni',
    subcategory: 'BB Bio',
    brand: 'BLS',
    inStock: true,
    stockCount: 150,
    rating: 4.5,
    reviewCount: 89,
    tags: ['eco'],
  },
  // Upgrade
  {
    id: 'prod_14',
    shopId: 'shop_2',
    name: 'Hop-Up Chamber CNC',
    description: 'Camera hop-up CNC in alluminio per M4/AR15.',
    price: 39.99,
    images: [],
    category: 'upgrade',
    subcategory: 'Hop-Up',
    brand: 'Maxx',
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewCount: 34,
    tags: ['premium'],
  },
  {
    id: 'prod_15',
    shopId: 'shop_2',
    name: 'Canna di Precisione 6.03',
    description: 'Canna di precisione 6.03mm in ottone. Varie lunghezze disponibili.',
    price: 44.99,
    images: [],
    category: 'upgrade',
    subcategory: 'Canne',
    brand: 'Prometheus',
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 45,
    tags: ['premium'],
  },
];

// Utility functions
export const getShopById = (id: string): Shop | undefined => {
  return MOCK_SHOPS.find(shop => shop.id === id);
};

export const getProductsByShop = (shopId: string): Product[] => {
  return MOCK_PRODUCTS.filter(product => product.shopId === shopId);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return MOCK_PRODUCTS.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.brand?.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const filterProducts = (filters: {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  brand?: string;
  shopId?: string;
}): Product[] => {
  return MOCK_PRODUCTS.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.shopId && product.shopId !== filters.shopId) return false;
    return true;
  });
};

export const getAllBrands = (): string[] => {
  const brands = new Set<string>();
  MOCK_PRODUCTS.forEach(p => {
    if (p.brand) brands.add(p.brand);
  });
  return Array.from(brands).sort();
};

export const getAllCities = (): string[] => {
  const cities = new Set<string>();
  MOCK_SHOPS.forEach(s => cities.add(s.city));
  return Array.from(cities).sort();
};
