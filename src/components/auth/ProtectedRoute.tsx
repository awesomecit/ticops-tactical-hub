import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { hasAnyRole, isAdmin } from '@/lib/auth';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Require admin role */
  requireAdmin?: boolean;
  /** Require any of these roles */
  roles?: UserRole[];
  /** Redirect path if unauthorized (default: /) */
  redirectTo?: string;
}

/**
 * ProtectedRoute - Blocks access to routes based on user role
 * Redirects unauthorized users to the specified path
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  roles,
  redirectTo = '/',
}) => {
  const { user, isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin requirement
  if (requireAdmin && !isAdmin(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check role requirement
  if (roles && roles.length > 0 && !hasAnyRole(user.role, roles)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
