import { mockApi } from '../mock';

const mockTeamData = { id: '1', name: 'Alpha Team', members: [] };

export const teamsService = {
  getMyTeam: () => mockApi(mockTeamData),
};
