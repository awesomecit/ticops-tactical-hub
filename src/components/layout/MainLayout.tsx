import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { TabBar } from './TabBar';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';

export const MainLayout: React.FC = () => {
  const { sidebarOpen } = useUIStore();

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
