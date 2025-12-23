import React, { useEffect } from 'react';
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
      <Sidebar />
      
      <main
        className={cn(
          "pt-16 pb-20 lg:pb-0 transition-all duration-300",
          "lg:pl-64"
        )}
      >
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
      
      <TabBar />
    </div>
  );
};
