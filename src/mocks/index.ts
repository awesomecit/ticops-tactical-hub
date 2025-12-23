// Users
export {
  type IMockUser,
  type UserRole,
  type UserTier,
  type RefereeStatus,
  type TeamRole,
  MOCK_USERS,
  CURRENT_USER_ID,
  getCurrentUser,
  getUserById,
  getOnlineUsers,
  getUsersByTeam,
} from './users';

// Teams
export {
  type IMockTeam,
  type TeamStatus,
  type IMockJoinRequest,
  type JoinRequestStatus,
  MOCK_TEAMS,
  MOCK_JOIN_REQUESTS,
  getTeamById,
  getTeamMembers,
  getTeamJoinRequests,
  getRecruitingTeams,
  getTeamsByRank,
} from './teams';

// Fields
export {
  type IMockField,
  type FieldType,
  type FieldStatus,
  type IMockFieldAmenity,
  type IMockFieldSchedule,
  type IMockFieldRequest,
  type FieldRequestStatus,
  MOCK_FIELDS,
  MOCK_FIELD_REQUESTS,
  getFieldById,
  getFieldBySlug,
  getActiveFields,
  getFieldsByRegion,
  getFieldsByType,
  getPendingFieldRequests,
  getFieldRequest,
} from './fields';

// Rankings
export {
  type IRankingEntry,
  type ITeamRankingEntry,
  MOCK_GLOBAL_TOP_5,
  MOCK_GLOBAL_AROUND_USER,
  MOCK_REGIONAL_LOMBARDIA_TOP_3,
  MOCK_TEAM_RANKINGS,
  getGlobalTopRankings,
  getRankingsAroundUser,
  getRegionalRankings,
  getTeamRankings,
  getUserRanking,
  getTeamRanking,
  getRankChange,
} from './rankings';

// Legacy exports for backward compatibility
export { mockRanks, mockUser, mockTeams, mockGames, mockMessages, mockNotifications } from './data';
