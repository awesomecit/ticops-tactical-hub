import { create } from 'zustand';
import { User } from '@/types';
import { mockUser } from '@/mocks/data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser, // Pre-authenticated for demo
  isAuthenticated: true,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ user: mockUser, isAuthenticated: true, isLoading: false });
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  setUser: (user: User) => {
    set({ user });
  },
}));
