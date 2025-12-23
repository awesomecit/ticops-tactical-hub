import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { TabBar } from './TabBar';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { useAchievementNotifications } from '@/hooks/useAchievementNotifications';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import { usePresence } from '@/hooks/usePresence';
import { cn } from '@/lib/utils';

export const MainLayout: React.FC = () => {
  const { sidebarOpen } = useUIStore();
  const { isAuthenticated, isHydrated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  const [loaderFading, setLoaderFading] = useState(false);
  
  // Global real-time features
  useAchievementNotifications();
  useRealtimeNotifications(isAuthenticated);
  const { updateCurrentPage } = usePresence('global', isAuthenticated);

  // Track page changes for presence
  useEffect(() => {
    if (isAuthenticated) {
      updateCurrentPage(location.pathname);
    }
  }, [location.pathname, isAuthenticated, updateCurrentPage]);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isHydrated, navigate]);

  // Handle loader fade-out transition
  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      setLoaderFading(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isHydrated, isAuthenticated]);

  // Show loading while hydrating auth state
  if (!isHydrated || (showLoader && isAuthenticated)) {
    return (
      <div 
        className={cn(
          "min-h-screen bg-background flex items-center justify-center transition-opacity duration-300",
          loaderFading ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      {/* Sidebar only visible on lg+ screens */}
      <Sidebar />
      
      {/* Main content: mobile-first padding, then add sidebar offset on lg+ */}
      <main
        className={cn(
          // Mobile-first: just top header offset and bottom tab bar offset
          "pt-16 pb-20",
          // Large screens: add left padding for sidebar, remove bottom padding (no tab bar)
          "lg:pb-6",
          // Dynamic sidebar width
          sidebarOpen ? "lg:pl-64" : "lg:pl-16"
        )}
      >
        {/* Mobile-first container with responsive padding */}
        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      
      {/* Tab bar only on mobile (hidden on lg+) */}
      <TabBar />
    </div>
  );
};
