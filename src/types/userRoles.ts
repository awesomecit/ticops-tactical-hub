import { UserRole } from './index';
import { LucideIcon } from 'lucide-react';

/**
 * Role Capability - definisce cosa può fare ogni ruolo
 */
export interface RoleCapability {
  id: string;
  name: string;
  description: string;
  category: 'gameplay' | 'management' | 'commerce' | 'admin';
}

/**
 * Role Configuration - configurazione completa di un ruolo
 */
export interface RoleConfig {
  role: UserRole;
  label: string;
  description: string;
  icon: string;
  color: string;
  capabilities: RoleCapability[];
  routes: string[];
  menuItems: string[];
}

/**
 * User Active Roles - gestisce i ruoli attivi dell'utente
 */
export interface UserActiveRoles {
  userId: string;
  activeRoles: UserRole[];
  primaryRole: UserRole;
  capabilities: Set<string>;
}

/**
 * Role Visibility Filter - per filtrare contenuti in base al ruolo
 */
export interface RoleVisibilityFilter {
  showGameplay: boolean;
  showTeamManagement: boolean;
  showRefereeTools: boolean;
  showFieldManagement: boolean;
  showShopManagement: boolean;
  showAdminPanel: boolean;
  showMarketplace: boolean;
  showChat: boolean;
}
