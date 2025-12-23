import { mockApi } from '../mock';
import { useNotificationStore } from '@/stores/notificationStore';

export const notificationsService = {
  getAll: () => mockApi(useNotificationStore.getState().notifications),
};
