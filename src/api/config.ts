/**
 * API Configuration
 * 
 * This file contains the base configuration for API calls.
 * When Edge Functions are deployed, update the BASE_URL to point to your Supabase project.
 */

// Environment-based API URL
// In production, this would be: https://<project-ref>.supabase.co/functions/v1
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Simulated network delay for mock API (ms)
export const MOCK_DELAY = 300;

// API Version
export const API_VERSION = 'v1';

// Request timeout (ms)
export const REQUEST_TIMEOUT = 30000;

// Retry configuration
export const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 5000,
};

/**
 * API Endpoints mapping
 * These endpoints are designed to be compatible with Supabase Edge Functions
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  
  // User endpoints
  users: {
    list: '/users',
    get: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    stats: (id: string) => `/users/${id}/stats`,
    matches: (id: string) => `/users/${id}/matches`,
  },
  
  // Games/Matches endpoints
  games: {
    list: '/games',
    get: (id: string) => `/games/${id}`,
    create: '/games',
    update: (id: string) => `/games/${id}`,
    delete: (id: string) => `/games/${id}`,
    join: (id: string) => `/games/${id}/join`,
    leave: (id: string) => `/games/${id}/leave`,
    start: (id: string) => `/games/${id}/start`,
    end: (id: string) => `/games/${id}/end`,
    players: (id: string) => `/games/${id}/players`,
    events: (id: string) => `/games/${id}/events`,
  },
  
  // Locations/Fields endpoints
  locations: {
    list: '/locations',
    get: (id: string) => `/locations/${id}`,
    create: '/locations',
    update: (id: string) => `/locations/${id}`,
    delete: (id: string) => `/locations/${id}`,
    games: (id: string) => `/locations/${id}/games`,
    reviews: (id: string) => `/locations/${id}/reviews`,
    nearby: '/locations/nearby',
  },
  
  // Teams endpoints
  teams: {
    list: '/teams',
    get: (id: string) => `/teams/${id}`,
    create: '/teams',
    update: (id: string) => `/teams/${id}`,
    delete: (id: string) => `/teams/${id}`,
    members: (id: string) => `/teams/${id}/members`,
    invite: (id: string) => `/teams/${id}/invite`,
    join: (id: string) => `/teams/${id}/join`,
    leave: (id: string) => `/teams/${id}/leave`,
    stats: (id: string) => `/teams/${id}/stats`,
  },
  
  // Leaderboard endpoints
  leaderboard: {
    global: '/leaderboard/global',
    seasonal: '/leaderboard/seasonal',
    weekly: '/leaderboard/weekly',
    team: '/leaderboard/team',
    distribution: '/leaderboard/distribution',
  },
  
  // Notifications endpoints
  notifications: {
    list: '/notifications',
    get: (id: string) => `/notifications/${id}`,
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
    delete: (id: string) => `/notifications/${id}`,
    settings: '/notifications/settings',
  },
  
  // Chat/Messages endpoints
  chat: {
    conversations: '/chat/conversations',
    conversation: (id: string) => `/chat/conversations/${id}`,
    messages: (conversationId: string) => `/chat/conversations/${conversationId}/messages`,
    send: (conversationId: string) => `/chat/conversations/${conversationId}/messages`,
    markRead: (conversationId: string) => `/chat/conversations/${conversationId}/read`,
  },
  
  // Inbox endpoints
  inbox: {
    list: '/inbox',
    get: (id: string) => `/inbox/${id}`,
    respond: (id: string) => `/inbox/${id}/respond`,
    delete: (id: string) => `/inbox/${id}`,
  },
  
  // Referee endpoints
  referee: {
    matches: '/referee/matches',
    match: (id: string) => `/referee/matches/${id}`,
    confirmKill: (matchId: string) => `/referee/matches/${matchId}/confirm-kill`,
    rejectKill: (matchId: string) => `/referee/matches/${matchId}/reject-kill`,
    resolveConflict: (matchId: string) => `/referee/matches/${matchId}/resolve-conflict`,
    pause: (matchId: string) => `/referee/matches/${matchId}/pause`,
    resume: (matchId: string) => `/referee/matches/${matchId}/resume`,
    end: (matchId: string) => `/referee/matches/${matchId}/end`,
  },
  
  // Spectator endpoints
  spectator: {
    liveMatches: '/spectator/live',
    match: (id: string) => `/spectator/matches/${id}`,
    events: (id: string) => `/spectator/matches/${id}/events`,
    subscribe: (id: string) => `/spectator/matches/${id}/subscribe`,
  },
  
  // Admin endpoints
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    user: (id: string) => `/admin/users/${id}`,
    fields: '/admin/fields',
    field: (id: string) => `/admin/fields/${id}`,
    referees: '/admin/referees',
    referee: (id: string) => `/admin/referees/${id}`,
    matches: '/admin/matches',
    match: (id: string) => `/admin/matches/${id}`,
    reports: '/admin/reports',
    settings: '/admin/settings',
  },
  
  // Settings endpoints
  settings: {
    get: '/settings',
    update: '/settings',
    profile: '/settings/profile',
    notifications: '/settings/notifications',
    privacy: '/settings/privacy',
    appearance: '/settings/appearance',
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
