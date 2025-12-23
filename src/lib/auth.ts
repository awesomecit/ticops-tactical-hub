import { UserRole } from '@/types';

// Role hierarchy - higher roles include permissions of lower roles
const ROLE_HIERARCHY: Record<UserRole, number> = {
  player: 1,
  team_leader: 2,
  referee: 3,
  field_manager: 3,
  shop_owner: 3,
  admin: 10,
};

// Admin-only roles
const ADMIN_ROLES: UserRole[] = ['admin'];

// Roles that can access team management features
const TEAM_MANAGEMENT_ROLES: UserRole[] = ['team_leader', 'admin'];

// Roles that can access referee features
const REFEREE_ROLES: UserRole[] = ['referee', 'admin'];

// Roles that can access field management
const FIELD_MANAGEMENT_ROLES: UserRole[] = ['field_manager', 'admin'];

// Roles that can access shop management
const SHOP_MANAGEMENT_ROLES: UserRole[] = ['shop_owner', 'admin'];

/**
 * Check if a user has a specific role
 */
export const hasRole = (userRole: UserRole | undefined, requiredRole: UserRole): boolean => {
  if (!userRole) return false;
  return userRole === requiredRole;
};

/**
 * Check if a user has any of the specified roles
 */
export const hasAnyRole = (userRole: UserRole | undefined, roles: UserRole[]): boolean => {
  if (!userRole) return false;
  return roles.includes(userRole);
};

/**
 * Check if user is an admin
 */
export const isAdmin = (userRole: UserRole | undefined): boolean => {
  return hasAnyRole(userRole, ADMIN_ROLES);
};

/**
 * Check if user can manage teams (team_leader or admin)
 */
export const canManageTeam = (userRole: UserRole | undefined): boolean => {
  return hasAnyRole(userRole, TEAM_MANAGEMENT_ROLES);
};

/**
 * Check if user has referee permissions
 */
export const isReferee = (userRole: UserRole | undefined): boolean => {
  return hasAnyRole(userRole, REFEREE_ROLES);
};

/**
 * Check if user can manage fields
 */
export const canManageField = (userRole: UserRole | undefined): boolean => {
  return hasAnyRole(userRole, FIELD_MANAGEMENT_ROLES);
};

/**
 * Check if user can manage shop
 */
export const canManageShop = (userRole: UserRole | undefined): boolean => {
  return hasAnyRole(userRole, SHOP_MANAGEMENT_ROLES);
};

/**
 * Get role display label
 */
export const getRoleLabel = (role: UserRole): string => {
  const labels: Record<UserRole, string> = {
    player: 'Giocatore',
    team_leader: 'Capitano',
    referee: 'Arbitro',
    field_manager: 'Gestore Campo',
    shop_owner: 'Negoziante',
    admin: 'Admin',
  };
  return labels[role] || role;
};

/**
 * Get role color for badges
 */
export const getRoleColor = (role: UserRole): string => {
  const colors: Record<UserRole, string> = {
    player: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    team_leader: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    referee: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    field_manager: 'bg-green-500/20 text-green-400 border-green-500/30',
    shop_owner: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    admin: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return colors[role] || 'bg-muted text-muted-foreground';
};
