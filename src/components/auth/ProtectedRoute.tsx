import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Legacy props - ignored for now (all users have all roles) */
  requireAdmin?: boolean;
  roles?: string[];
  redirectTo?: string;
}

/**
 * ProtectedRoute - Only checks authentication, no role restrictions
 * All authenticated users can access all routes
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // All authenticated users can access everything
  return <>{children}</>;
};
