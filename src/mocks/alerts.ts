import { Alert, AlertNotification, AlertPreferences, AlertCategory, AlertConditions, AlertFrequency } from '@/types';

// Mock Alerts
export const MOCK_ALERTS: Alert[] = [
  {
    id: 'alert_001',
    userId: 'current_user',
    category: 'field_availability',
    entityType: 'field',
    entityId: 'field_001',
    entityName: 'Campo Alpha',
    conditions: {
      dayOfWeek: [0, 6], // Weekend
      timeSlot: 'afternoon',
    },
    frequency: 'instant',
    isActive: true,
    createdAt: new Date('2024-12-01'),
    lastTriggeredAt: new Date('2024-12-20'),
    triggerCount: 5,
  },
  {
    id: 'alert_002',
    userId: 'current_user',
    category: 'shop_discount',
    entityType: 'shop',
    entityId: 'shop_001',
    entityName: 'Tactical Gear Shop',
    conditions: {
      discountPercentage: 20,
      categories: ['repliche', 'accessori'],
    },
    frequency: 'daily',
    isActive: true,
    createdAt: new Date('2024-11-15'),
    lastTriggeredAt: new Date('2024-12-18'),
    triggerCount: 12,
  },
  {
    id: 'alert_003',
    userId: 'current_user',
    category: 'price_drop',
    entityType: 'product',
    entityId: 'prod_001',
    entityName: 'M4A1 Tactical Pro',
    conditions: {
      maxPrice: 300,
    },
    frequency: 'instant',
    isActive: true,
    createdAt: new Date('2024-12-10'),
    triggerCount: 0,
  },
  {
    id: 'alert_004',
    userId: 'current_user',
    category: 'field_event',
    entityType: 'field',
    entityId: 'field_002',
    entityName: 'Arena Tactix',
    conditions: {
      keywords: ['torneo', 'MilSim', 'notturna'],
    },
    frequency: 'weekly',
    isActive: false,
    createdAt: new Date('2024-10-20'),
    triggerCount: 8,
  },
];

// Mock Alert Notifications
export const MOCK_ALERT_NOTIFICATIONS: AlertNotification[] = [
  {
    id: 'notif_001',
    alertId: 'alert_001',
    title: 'Slot Disponibile!',
    message: 'Campo Alpha ha nuovi slot disponibili per Sabato pomeriggio',
    entityType: 'field',
    entityId: 'field_001',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    actionUrl: '/locations/campo-alpha',
  },
  {
    id: 'notif_002',
    alertId: 'alert_002',
    title: 'Sconto del 25%!',
    message: 'Tactical Gear Shop ha scontato "Red Dot Sight Pro" del 25%',
    entityType: 'shop',
    entityId: 'shop_001',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    actionUrl: '/shop',
  },
  {
    id: 'notif_003',
    alertId: 'alert_001',
    title: 'Nuovo Evento!',
    message: 'Campo Alpha organizza una partita notturna questo weekend',
    entityType: 'field',
    entityId: 'field_001',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    actionUrl: '/locations/campo-alpha',
  },
];

// Default Alert Preferences
export const DEFAULT_ALERT_PREFERENCES: AlertPreferences = {
  userId: 'current_user',
  emailNotifications: true,
  pushNotifications: true,
  inAppNotifications: true,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
  maxAlertsPerDay: 10,
};

// Category labels and icons
export const ALERT_CATEGORY_CONFIG: Record<AlertCategory, { label: string; icon: string; description: string }> = {
  field_availability: {
    label: 'Disponibilità Campo',
    icon: '📅',
    description: 'Notifica quando un campo ha nuovi slot disponibili',
  },
  shop_discount: {
    label: 'Sconti Shop',
    icon: '🏷️',
    description: 'Notifica quando uno shop offre sconti',
  },
  shop_new_product: {
    label: 'Nuovi Prodotti',
    icon: '🆕',
    description: 'Notifica quando uno shop aggiunge nuovi prodotti',
  },
  field_event: {
    label: 'Eventi Campo',
    icon: '🎯',
    description: 'Notifica quando un campo organizza eventi speciali',
  },
  price_drop: {
    label: 'Calo Prezzo',
    icon: '📉',
    description: 'Notifica quando un prodotto scende sotto un certo prezzo',
  },
};

export const ALERT_FREQUENCY_CONFIG: Record<AlertFrequency, { label: string; description: string }> = {
  instant: { label: 'Istantanea', description: 'Ricevi subito la notifica' },
  daily: { label: 'Giornaliera', description: 'Riepilogo giornaliero' },
  weekly: { label: 'Settimanale', description: 'Riepilogo settimanale' },
};

// Utility functions
export const getAlertsByEntityType = (entityType: 'field' | 'shop' | 'product'): Alert[] => {
  return MOCK_ALERTS.filter(a => a.entityType === entityType);
};

export const getAlertsByCategory = (category: AlertCategory): Alert[] => {
  return MOCK_ALERTS.filter(a => a.category === category);
};

export const getActiveAlerts = (): Alert[] => {
  return MOCK_ALERTS.filter(a => a.isActive);
};

export const getAlertNotifications = (unreadOnly: boolean = false): AlertNotification[] => {
  if (unreadOnly) {
    return MOCK_ALERT_NOTIFICATIONS.filter(n => !n.isRead);
  }
  return MOCK_ALERT_NOTIFICATIONS;
};

export const hasAlertForEntity = (entityType: 'field' | 'shop' | 'product', entityId: string): boolean => {
  return MOCK_ALERTS.some(a => a.entityType === entityType && a.entityId === entityId && a.isActive);
};