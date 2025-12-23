import { create } from 'zustand';
import { User, UserRole } from '@/types';
import { mockUser, mockRanks } from '@/mocks/data';
import { DEMO_USERS, DemoUser } from '@/mocks/demoUsers';

// Mock user database for demo - includes all demo users
const MOCK_USERS_DB: { email: string; password: string; user: User }[] = [
  {
    email: 'ghost@ticops.it',
    password: 'password123',
    user: mockUser,
  },
  // Add all demo users
  ...DEMO_USERS.map(du => ({
    email: du.email,
    password: du.password,
    user: du.user,
  })),
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User) => void;
  register: (email: string, password: string, username: string) => Promise<{ success: boolean; error?: string }>;
  loginAsRole: (role: UserRole) => Promise<{ success: boolean; error?: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS_DB.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      set({ user: foundUser.user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(foundUser.user));
      return { success: true };
    }
    
    set({ isLoading: false });
    return { success: false, error: 'Email o password non validi' };
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  },
  
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
  
  register: async (email: string, password: string, username: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const exists = MOCK_USERS_DB.some(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (exists) {
      set({ isLoading: false });
      return { success: false, error: 'Email già registrata' };
    }
    
    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      username,
      callsign: username.toUpperCase().substring(0, 6),
      email,
      avatar: undefined,
      role: 'player',
      rank: mockRanks[0],
      stats: {
        gamesPlayed: 0,
        wins: 0,
        kills: 0,
        deaths: 0,
        accuracy: 0,
        xp: 0,
      },
      createdAt: new Date(),
    };
    
    // Add to mock DB
    MOCK_USERS_DB.push({ email, password, user: newUser });
    
    set({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return { success: true };
  },

  // Quick login as demo role
  loginAsRole: async (role: UserRole) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const demoUser = DEMO_USERS.find(u => u.role === role);
    if (demoUser) {
      set({ user: demoUser.user, isAuthenticated: true, isLoading: false });
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(demoUser.user));
      return { success: true };
    }
    
    set({ isLoading: false });
    return { success: false, error: 'Ruolo non trovato' };
  },
}));

// Initialize from localStorage on app load
const storedUser = localStorage.getItem('currentUser');
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

if (isLoggedIn && storedUser) {
  try {
    const user = JSON.parse(storedUser);
    useAuthStore.setState({ user, isAuthenticated: true });
  } catch {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }
}
