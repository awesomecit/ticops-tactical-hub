import { UserRole } from '@/types';
import { RoleConfig, RoleCapability } from '@/types/userRoles';
import { 
  Gamepad2, 
  Users, 
  Shield, 
  MapPin, 
  Store, 
  Settings 
} from 'lucide-react';

/**
 * Definizione di tutte le capabilities disponibili nel sistema
 */
export const CAPABILITIES: Record<string, RoleCapability> = {
  // Gameplay Capabilities
  PLAY_MATCHES: {
    id: 'play_matches',
    name: 'Partecipa a Partite',
    description: 'Può registrarsi e giocare partite competitive',
    category: 'gameplay'
  },
  DECLARE_KILLS: {
    id: 'declare_kills',
    name: 'Dichiarazione Kill',
    description: 'Può dichiarare kill durante le partite',
    category: 'gameplay'
  },
  VIEW_LEADERBOARD: {
    id: 'view_leaderboard',
    name: 'Classifica',
    description: 'Accesso alla classifica globale e tier',
    category: 'gameplay'
  },
  EARN_ACHIEVEMENTS: {
    id: 'earn_achievements',
    name: 'Achievement',
    description: 'Può sbloccare achievement e badge',
    category: 'gameplay'
  },
  USE_MARKETPLACE: {
    id: 'use_marketplace',
    name: 'Mercatino',
    description: 'Compra e vendi attrezzatura',
    category: 'commerce'
  },
  
  // Team Management
  CREATE_TEAM: {
    id: 'create_team',
    name: 'Crea Team',
    description: 'Può creare un nuovo team',
    category: 'management'
  },
  MANAGE_TEAM: {
    id: 'manage_team',
    name: 'Gestione Team',
    description: 'Gestisce roster, inviti e strategia',
    category: 'management'
  },
  ACTIVATE_RADIO: {
    id: 'activate_radio',
    name: 'Radio Team',
    description: 'Attiva e gestisce canali radio team',
    category: 'management'
  },
  ORGANIZE_MATCHES: {
    id: 'organize_matches',
    name: 'Organizza Match',
    description: 'Usa il Match Organizer per pianificare partite',
    category: 'management'
  },
  
  // Referee Capabilities
  REFEREE_MATCHES: {
    id: 'referee_matches',
    name: 'Arbitra Partite',
    description: 'Può essere assegnato come arbitro',
    category: 'gameplay'
  },
  RESOLVE_CONFLICTS: {
    id: 'resolve_conflicts',
    name: 'Risoluzione Conflitti',
    description: 'Conferma o rigetta kill contestate',
    category: 'gameplay'
  },
  ACCESS_REFEREE_VIEW: {
    id: 'access_referee_view',
    name: 'Vista Arbitro',
    description: 'Accesso agli strumenti di arbitraggio live',
    category: 'gameplay'
  },
  
  // Field Manager Capabilities
  MANAGE_FIELD: {
    id: 'manage_field',
    name: 'Gestione Campo',
    description: 'Gestisce disponibilità e prenotazioni campo',
    category: 'management'
  },
  CREATE_MATCHES: {
    id: 'create_matches',
    name: 'Crea Partite',
    description: 'Può organizzare partite sul proprio campo',
    category: 'management'
  },
  ASSIGN_REFEREES: {
    id: 'assign_referees',
    name: 'Assegna Arbitri',
    description: 'Assegna arbitri alle partite',
    category: 'management'
  },
  VIEW_FIELD_STATS: {
    id: 'view_field_stats',
    name: 'Statistiche Campo',
    description: 'Visualizza analytics e recensioni',
    category: 'management'
  },
  
  // Shop Owner Capabilities
  MANAGE_SHOP: {
    id: 'manage_shop',
    name: 'Gestione Negozio',
    description: 'Gestisce catalogo e ordini',
    category: 'commerce'
  },
  CREATE_PRODUCTS: {
    id: 'create_products',
    name: 'Crea Prodotti',
    description: 'Aggiunge prodotti al catalogo',
    category: 'commerce'
  },
  MANAGE_ORDERS: {
    id: 'manage_orders',
    name: 'Gestione Ordini',
    description: 'Processa ordini e spedizioni',
    category: 'commerce'
  },
  VIEW_SHOP_ANALYTICS: {
    id: 'view_shop_analytics',
    name: 'Analytics Negozio',
    description: 'Visualizza vendite e metriche',
    category: 'commerce'
  },
  
  // Admin Capabilities
  ACCESS_ADMIN_PANEL: {
    id: 'access_admin_panel',
    name: 'Pannello Admin',
    description: 'Accesso completo al pannello amministrativo',
    category: 'admin'
  },
  MANAGE_USERS: {
    id: 'manage_users',
    name: 'Gestione Utenti',
    description: 'CRUD utenti, ruoli e permessi',
    category: 'admin'
  },
  MANAGE_ORGANIZATIONS: {
    id: 'manage_organizations',
    name: 'Gestione Organizzazioni',
    description: 'Gestisce federazioni, org e divisioni',
    category: 'admin'
  },
  MANAGE_ALL_ENTITIES: {
    id: 'manage_all_entities',
    name: 'Gestione Anagrafiche',
    description: 'CRUD su tutte le entità (campi, team, match, etc.)',
    category: 'admin'
  },
  VIEW_SYSTEM_LOGS: {
    id: 'view_system_logs',
    name: 'Log Sistema',
    description: 'Visualizza log e attività sistema',
    category: 'admin'
  }
};

/**
 * Configurazione completa per ogni ruolo
 */
export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  player: {
    role: 'player',
    label: 'Giocatore',
    description: 'Partecipa a partite, guadagna ELO, sblocca achievement',
    icon: '🎮',
    color: 'text-blue-500',
    capabilities: [
      CAPABILITIES.PLAY_MATCHES,
      CAPABILITIES.DECLARE_KILLS,
      CAPABILITIES.VIEW_LEADERBOARD,
      CAPABILITIES.EARN_ACHIEVEMENTS,
      CAPABILITIES.USE_MARKETPLACE,
      CAPABILITIES.CREATE_TEAM
    ],
    routes: ['/dashboard', '/games', '/leaderboard', '/marketplace', '/chat', '/team'],
    menuItems: ['dashboard', 'games', 'leaderboard', 'marketplace', 'team', 'chat']
  },
  
  team_leader: {
    role: 'team_leader',
    label: 'Capitano Squadra',
    description: 'Gestisce team, radio, strategie e organizza match',
    icon: '👑',
    color: 'text-yellow-500',
    capabilities: [
      CAPABILITIES.PLAY_MATCHES,
      CAPABILITIES.DECLARE_KILLS,
      CAPABILITIES.VIEW_LEADERBOARD,
      CAPABILITIES.EARN_ACHIEVEMENTS,
      CAPABILITIES.USE_MARKETPLACE,
      CAPABILITIES.CREATE_TEAM,
      CAPABILITIES.MANAGE_TEAM,
      CAPABILITIES.ACTIVATE_RADIO,
      CAPABILITIES.ORGANIZE_MATCHES
    ],
    routes: ['/dashboard', '/games', '/team', '/leaderboard', '/marketplace', '/chat', '/organize'],
    menuItems: ['dashboard', 'games', 'team', 'organize', 'leaderboard', 'marketplace', 'chat']
  },
  
  referee: {
    role: 'referee',
    label: 'Arbitro',
    description: 'Arbitra partite, risolve conflitti, garantisce fair play',
    icon: '⚖️',
    color: 'text-purple-500',
    capabilities: [
      CAPABILITIES.REFEREE_MATCHES,
      CAPABILITIES.RESOLVE_CONFLICTS,
      CAPABILITIES.ACCESS_REFEREE_VIEW,
      CAPABILITIES.VIEW_LEADERBOARD,
      CAPABILITIES.USE_MARKETPLACE
    ],
    routes: ['/dashboard', '/referee/assign-matches', '/games', '/leaderboard', '/chat'],
    menuItems: ['dashboard', 'referee', 'games', 'leaderboard', 'chat']
  },
  
  field_manager: {
    role: 'field_manager',
    label: 'Gestore Campo',
    description: 'Gestisce campo, organizza partite, assegna arbitri',
    icon: '🏟️',
    color: 'text-green-500',
    capabilities: [
      CAPABILITIES.MANAGE_FIELD,
      CAPABILITIES.CREATE_MATCHES,
      CAPABILITIES.ASSIGN_REFEREES,
      CAPABILITIES.VIEW_FIELD_STATS,
      CAPABILITIES.ORGANIZE_MATCHES,
      CAPABILITIES.USE_MARKETPLACE
    ],
    routes: ['/dashboard', '/admin/fields', '/admin/matches', '/games', '/chat'],
    menuItems: ['dashboard', 'field-management', 'matches', 'games', 'chat']
  },
  
  shop_owner: {
    role: 'shop_owner',
    label: 'Proprietario Negozio',
    description: 'Gestisce catalogo, ordini, vendite e spedizioni',
    icon: '🏪',
    color: 'text-orange-500',
    capabilities: [
      CAPABILITIES.MANAGE_SHOP,
      CAPABILITIES.CREATE_PRODUCTS,
      CAPABILITIES.MANAGE_ORDERS,
      CAPABILITIES.VIEW_SHOP_ANALYTICS,
      CAPABILITIES.USE_MARKETPLACE
    ],
    routes: ['/dashboard', '/shop', '/marketplace', '/chat'],
    menuItems: ['dashboard', 'shop-management', 'marketplace', 'chat']
  },
  
  admin: {
    role: 'admin',
    label: 'Amministratore',
    description: 'Controllo completo su piattaforma, org e utenti',
    icon: '⚙️',
    color: 'text-red-500',
    capabilities: [
      CAPABILITIES.ACCESS_ADMIN_PANEL,
      CAPABILITIES.MANAGE_USERS,
      CAPABILITIES.MANAGE_ORGANIZATIONS,
      CAPABILITIES.MANAGE_ALL_ENTITIES,
      CAPABILITIES.VIEW_SYSTEM_LOGS,
      CAPABILITIES.PLAY_MATCHES,
      CAPABILITIES.VIEW_LEADERBOARD,
      CAPABILITIES.USE_MARKETPLACE
    ],
    routes: ['/dashboard', '/admin/overview', '/admin/federations', '/admin/organizations', '/admin/divisions', '/admin/anagrafiche/fields', '/admin/anagrafiche/users', '/admin/anagrafiche/teams', '/admin/anagrafiche/matches', '/games', '/leaderboard'],
    menuItems: ['dashboard', 'admin', 'games', 'leaderboard']
  }
};

/**
 * Helper per ottenere tutte le capabilities di un ruolo
 */
export const getRoleCapabilities = (role: UserRole): RoleCapability[] => {
  return ROLE_CONFIGS[role]?.capabilities || [];
};

/**
 * Helper per verificare se un ruolo ha una specifica capability
 */
export const hasCapability = (role: UserRole, capabilityId: string): boolean => {
  const capabilities = getRoleCapabilities(role);
  return capabilities.some(cap => cap.id === capabilityId);
};

/**
 * Helper per ottenere le rotte accessibili da un ruolo
 */
export const getAccessibleRoutes = (role: UserRole): string[] => {
  return ROLE_CONFIGS[role]?.routes || [];
};

/**
 * Helper per verificare se un ruolo può accedere a una rotta
 */
export const canAccessRoute = (role: UserRole, route: string): boolean => {
  const accessibleRoutes = getAccessibleRoutes(role);
  return accessibleRoutes.some(r => route.startsWith(r));
};

/**
 * Helper per ottenere le voci menu per un ruolo
 */
export const getMenuItems = (role: UserRole): string[] => {
  return ROLE_CONFIGS[role]?.menuItems || [];
};

/**
 * Helper per ottenere tutte le capabilities di un utente con più ruoli
 */
export const getUserCapabilities = (roles: UserRole[]): Set<string> => {
  const capabilities = new Set<string>();
  
  roles.forEach(role => {
    const roleCapabilities = getRoleCapabilities(role);
    roleCapabilities.forEach(cap => capabilities.add(cap.id));
  });
  
  return capabilities;
};

/**
 * Get role visibility from localStorage
 */
export const getRoleVisibility = (role: UserRole): boolean => {
  try {
    const stored = localStorage.getItem('role-visibility');
    if (stored) {
      const visibility = JSON.parse(stored);
      return visibility[role] !== false; // Default true if not set
    }
  } catch {
    // Fallback
  }
  return true; // Default visible
};

/**
 * Get all visible roles from localStorage
 */
export const getVisibleRoles = (roles: UserRole[]): UserRole[] => {
  return roles.filter(role => getRoleVisibility(role));
};
