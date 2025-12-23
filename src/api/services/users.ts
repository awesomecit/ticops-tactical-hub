import { mockApi } from '../mock';
import { MOCK_USERS } from '@/mocks/users';

export const usersService = {
  getAll: () => mockApi(MOCK_USERS),
  getById: (id: string) => mockApi(MOCK_USERS.find(u => u.id === id)),
};
