import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { TabBar } from './TabBar';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';

export const MainLayout: React.FC = () => {
  const { sidebarOpen } = useUIStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
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
