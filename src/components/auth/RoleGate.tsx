import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types';
import { hasAnyRole, hasRole } from '@/lib/auth';

interface RoleGateProps {
  children: React.ReactNode;
  /** Single role required */
  role?: UserRole;
  /** Multiple roles - user needs ANY of these */
  roles?: UserRole[];
  /** What to render if access denied (default: nothing) */
  fallback?: React.ReactNode;
}

/**
 * Conditionally renders children based on user role
 */
export const RoleGate: React.FC<RoleGateProps> = ({
  children,
  role,
  roles,
  fallback = null,
}) => {
  const { user } = useAuthStore();
  const userRole = user?.role;

  let hasAccess = false;

  if (role) {
    hasAccess = hasRole(userRole, role);
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(userRole, roles);
  } else {
    // No role specified, allow access
    hasAccess = true;
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
