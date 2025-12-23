import { mockApi } from '../mock';

const mockLeaderboard = [{ id: '1', username: 'Player1', elo: 1500 }];
const mockTierDistribution = [{ tier: 'Gold', count: 100 }];

export const leaderboardService = {
  getGlobal: () => mockApi(mockLeaderboard),
  getTierDistribution: () => mockApi(mockTierDistribution),
};
