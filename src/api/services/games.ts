import { mockApi } from '../mock';
import { mockGames } from '@/mocks/data';

export const gamesService = {
  getAll: () => mockApi(mockGames),
  getById: (id: string) => mockApi(mockGames.find(g => g.id === id)),
  getByStatus: (status: string) => mockApi(mockGames.filter(g => g.status === status)),
};
