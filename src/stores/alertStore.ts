import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Alert, AlertNotification, AlertPreferences, AlertCategory, AlertConditions, AlertFrequency } from '@/types';
import { 
  MOCK_ALERTS, 
  MOCK_ALERT_NOTIFICATIONS, 
  DEFAULT_ALERT_PREFERENCES,
  hasAlertForEntity as checkHasAlert 
} from '@/mocks/alerts';

interface AlertState {
  alerts: Alert[];
  notifications: AlertNotification[];
  preferences: AlertPreferences;
  
  // Actions
  addAlert: (alert: Omit<Alert, 'id' | 'createdAt' | 'triggerCount'>) => void;
  updateAlert: (alertId: string, updates: Partial<Alert>) => void;
  deleteAlert: (alertId: string) => void;
  toggleAlert: (alertId: string) => void;
  
  // Quick alert creation
  createFieldAvailabilityAlert: (fieldId: string, fieldName: string, conditions?: AlertConditions) => void;
  createShopDiscountAlert: (shopId: string, shopName: string, conditions?: AlertConditions) => void;
  createPriceDropAlert: (productId: string, productName: string, maxPrice: number) => void;
  
  // Notifications
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  
  // Preferences
  updatePreferences: (updates: Partial<AlertPreferences>) => void;
  
  // Queries
  hasAlertForEntity: (entityType: 'field' | 'shop' | 'product', entityId: string) => boolean;
  getAlertForEntity: (entityType: 'field' | 'shop' | 'product', entityId: string) => Alert | undefined;
  getUnreadNotificationCount: () => number;
}

export const useAlertStore = create<AlertState>()(
  persist(
    (set, get) => ({
      alerts: MOCK_ALERTS,
      notifications: MOCK_ALERT_NOTIFICATIONS,
      preferences: DEFAULT_ALERT_PREFERENCES,

      addAlert: (alertData) => {
        const newAlert: Alert = {
          ...alertData,
          id: `alert_${Date.now()}`,
          createdAt: new Date(),
          triggerCount: 0,
        };
        set((state) => ({ alerts: [...state.alerts, newAlert] }));
      },

      updateAlert: (alertId, updates) => {
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === alertId ? { ...a, ...updates } : a
          ),
        }));
      },

      deleteAlert: (alertId) => {
        set((state) => ({
          alerts: state.alerts.filter((a) => a.id !== alertId),
        }));
      },

      toggleAlert: (alertId) => {
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === alertId ? { ...a, isActive: !a.isActive } : a
          ),
        }));
      },

      createFieldAvailabilityAlert: (fieldId, fieldName, conditions = {}) => {
        get().addAlert({
          userId: 'current_user',
          category: 'field_availability',
          entityType: 'field',
          entityId: fieldId,
          entityName: fieldName,
          conditions,
          frequency: 'instant',
          isActive: true,
        });
      },

      createShopDiscountAlert: (shopId, shopName, conditions = {}) => {
        get().addAlert({
          userId: 'current_user',
          category: 'shop_discount',
          entityType: 'shop',
          entityId: shopId,
          entityName: shopName,
          conditions: { discountPercentage: 10, ...conditions },
          frequency: 'daily',
          isActive: true,
        });
      },

      createPriceDropAlert: (productId, productName, maxPrice) => {
        get().addAlert({
          userId: 'current_user',
          category: 'price_drop',
          entityType: 'product',
          entityId: productId,
          entityName: productName,
          conditions: { maxPrice },
          frequency: 'instant',
          isActive: true,
        });
      },

      markNotificationRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n
          ),
        }));
      },

      markAllNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        }));
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },

      updatePreferences: (updates) => {
        set((state) => ({
          preferences: { ...state.preferences, ...updates },
        }));
      },

      hasAlertForEntity: (entityType, entityId) => {
        return get().alerts.some(
          (a) => a.entityType === entityType && a.entityId === entityId && a.isActive
        );
      },

      getAlertForEntity: (entityType, entityId) => {
        return get().alerts.find(
          (a) => a.entityType === entityType && a.entityId === entityId
        );
      },

      getUnreadNotificationCount: () => {
        return get().notifications.filter((n) => !n.isRead).length;
      },
    }),
    {
      name: 'alert-storage',
      partialize: (state) => ({
        alerts: state.alerts,
        preferences: state.preferences,
      }),
    }
  )
);